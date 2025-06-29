/*
  # Privacy Requests and Opt-Out System

  1. New Tables
    - privacy_requests
      - id (uuid, primary key)
      - email (text)
      - full_name (text)
      - request_type (text with check constraint)
      - reason (text, optional)
      - user_id (uuid, foreign key to auth.users)
      - status (text with check constraint)
      - created_at (timestamp)
      - processed_at (timestamp)

  2. Changes to existing tables
    - Add opted_out_of_sale column to profiles table

  3. Security
    - Enable RLS on privacy_requests table
    - Add policies for authenticated users, admins, and anonymous users
    - Add indexes for efficient querying
*/

-- Create privacy_requests table
CREATE TABLE IF NOT EXISTS privacy_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  full_name text NOT NULL,
  request_type text NOT NULL CHECK (request_type IN ('opt_out_sale', 'data_deletion', 'data_access')),
  reason text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'rejected')),
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- Add opted_out_of_sale column to profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'opted_out_of_sale'
  ) THEN
    ALTER TABLE profiles 
    ADD COLUMN opted_out_of_sale boolean DEFAULT false;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE privacy_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can create privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Users can view own privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Admins can manage all privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Anonymous users can submit privacy requests" ON privacy_requests;
END $$;

-- Create policies for privacy_requests
CREATE POLICY "Users can create privacy requests"
  ON privacy_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own privacy requests"
  ON privacy_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all privacy requests"
  ON privacy_requests
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Allow anonymous users to submit privacy requests
CREATE POLICY "Anonymous users can submit privacy requests"
  ON privacy_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_privacy_requests_email ON privacy_requests(email);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_status ON privacy_requests(status);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_created_at ON privacy_requests(created_at);