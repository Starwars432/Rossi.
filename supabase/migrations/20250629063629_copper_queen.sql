/*
  # Create chat interactions table for Cipher AI assistant

  1. New Tables
    - chat_interactions
      - id (uuid, primary key)
      - user_id (uuid, optional foreign key to auth.users)
      - email (text, optional)
      - message (text, user's message)
      - response (text, Cipher's response)
      - timestamp (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users and anonymous users
    - Add indexes for efficient querying
*/

-- Create chat_interactions table
CREATE TABLE IF NOT EXISTS chat_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  message text NOT NULL,
  response text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Allow anonymous users to create chat interactions
CREATE POLICY "Anonymous users can create chat interactions"
  ON chat_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_chat_interactions_user_id ON chat_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_timestamp ON chat_interactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_email ON chat_interactions(email);