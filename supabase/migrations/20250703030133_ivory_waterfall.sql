/*
  # Digital Doppelgänger Schema

  1. New Tables
    - user_actions: Tracks user interactions with the Digital Doppelgänger tool
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - email (text)
      - action (text)
      - metadata (jsonb)
      - created_at (timestamp)
    
    - mockup_designs: Stores uploaded designs and mockup information
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - session_id (text)
      - model_id (text)
      - design_file (text)
      - placement (text)
      - size (integer)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for anonymous users
*/

-- Create user_actions table
CREATE TABLE IF NOT EXISTS user_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text,
  action text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create mockup_designs table
CREATE TABLE IF NOT EXISTS mockup_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id text NOT NULL,
  model_id text NOT NULL,
  design_file text NOT NULL,
  placement text NOT NULL,
  size integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mockup_designs ENABLE ROW LEVEL SECURITY;

-- Create policies for user_actions
CREATE POLICY "Users can create actions"
  ON user_actions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own actions"
  ON user_actions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all actions"
  ON user_actions
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Anonymous users can create actions"
  ON user_actions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policies for mockup_designs
CREATE POLICY "Users can create mockup designs"
  ON mockup_designs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own mockup designs"
  ON mockup_designs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all mockup designs"
  ON mockup_designs
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Anonymous users can create mockup designs with session_id"
  ON mockup_designs
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL AND session_id IS NOT NULL);

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_actions_user_id ON user_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_actions_action ON user_actions(action);
CREATE INDEX IF NOT EXISTS idx_user_actions_created_at ON user_actions(created_at);

CREATE INDEX IF NOT EXISTS idx_mockup_designs_user_id ON mockup_designs(user_id);
CREATE INDEX IF NOT EXISTS idx_mockup_designs_session_id ON mockup_designs(session_id);
CREATE INDEX IF NOT EXISTS idx_mockup_designs_status ON mockup_designs(status);