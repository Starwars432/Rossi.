/*
  # Create ad_requests table for Shortform Ad Killshots service

  1. New Tables
    - ad_requests
      - id (uuid, primary key)
      - user_id (uuid, optional foreign key to auth.users)
      - email (text)
      - name (text)
      - business (text)
      - industry (text)
      - ad_goal (text)
      - has_footage (boolean)
      - logo_url (text, optional)
      - ad_examples (text, optional)
      - tone (text)
      - notes (text, optional)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users, admins, and anonymous users
    - Add indexes for efficient querying
*/

-- Create ad_requests table
CREATE TABLE IF NOT EXISTS ad_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  name text NOT NULL,
  business text NOT NULL,
  industry text NOT NULL,
  ad_goal text NOT NULL,
  has_footage boolean DEFAULT false,
  logo_url text,
  ad_examples text,
  tone text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ad_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create ad requests"
  ON ad_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own ad requests"
  ON ad_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all ad requests"
  ON ad_requests
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Allow anonymous users to create ad requests
CREATE POLICY "Anonymous users can create ad requests"
  ON ad_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_ad_requests_user_id ON ad_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_ad_requests_email ON ad_requests(email);
CREATE INDEX IF NOT EXISTS idx_ad_requests_status ON ad_requests(status);
CREATE INDEX IF NOT EXISTS idx_ad_requests_created_at ON ad_requests(created_at);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_ad_request_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_ad_requests_updated_at
  BEFORE UPDATE ON ad_requests
  FOR EACH ROW
  EXECUTE FUNCTION handle_ad_request_updated_at();