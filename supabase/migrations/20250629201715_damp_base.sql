/*
  # Privacy Requests and Chat Interactions System

  1. New Tables
    - privacy_requests: Stores user privacy requests (opt-out, deletion, access)
    - chat_interactions: Stores Cipher AI assistant conversations

  2. Schema Changes
    - Add opted_out_of_sale column to profiles table

  3. Security
    - Enable RLS on new tables
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

-- Create chat_interactions table for Cipher AI assistant
CREATE TABLE IF NOT EXISTS chat_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  message text NOT NULL,
  response text NOT NULL,
  timestamp timestamptz DEFAULT now()
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

-- Enable RLS on new tables
ALTER TABLE privacy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DO $$ 
BEGIN
  -- Privacy requests policies
  DROP POLICY IF EXISTS "Users can create privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Users can view own privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Admins can manage all privacy requests" ON privacy_requests;
  DROP POLICY IF EXISTS "Anonymous users can submit privacy requests" ON privacy_requests;
  
  -- Chat interactions policies
  DROP POLICY IF EXISTS "Users can create chat interactions" ON chat_interactions;
  DROP POLICY IF EXISTS "Users can view own chat interactions" ON chat_interactions;
  DROP POLICY IF EXISTS "Admins can manage all chat interactions" ON chat_interactions;
  DROP POLICY IF EXISTS "Anonymous users can create chat interactions" ON chat_interactions;
EXCEPTION
  WHEN undefined_table THEN
    -- Tables don't exist yet, continue
    NULL;
  WHEN undefined_object THEN
    -- Policies don't exist yet, continue
    NULL;
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

CREATE POLICY "Anonymous users can submit privacy requests"
  ON privacy_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for chat_interactions
CREATE POLICY "Users can create chat interactions"
  ON chat_interactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own chat interactions"
  ON chat_interactions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all chat interactions"
  ON chat_interactions
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Anonymous users can create chat interactions"
  ON chat_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_privacy_requests_email ON privacy_requests(email);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_status ON privacy_requests(status);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_created_at ON privacy_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_chat_interactions_user_id ON chat_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_timestamp ON chat_interactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_email ON chat_interactions(email);