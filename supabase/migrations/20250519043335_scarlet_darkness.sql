/*
  # Visual Editor Schema Setup

  1. New Tables
    - pages
      - id (uuid, primary key)
      - slug (text, unique)
      - title (text)
      - content (jsonb)
      - metadata (jsonb)
      - is_draft (boolean)
      - created_at (timestamp)
      - updated_at (timestamp)
      - published_at (timestamp)
      
    - media
      - id (uuid, primary key)
      - filename (text)
      - url (text)
      - mime_type (text)
      - size (integer)
      - uploaded_by (uuid, references auth.users)
      - created_at (timestamp)
      
    - editor_settings
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - github_token (text)
      - github_repo (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  metadata jsonb NOT NULL DEFAULT '{}',
  is_draft boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  url text NOT NULL,
  mime_type text NOT NULL,
  size integer NOT NULL,
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create editor_settings table
CREATE TABLE IF NOT EXISTS editor_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE,
  github_token text,
  github_repo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE editor_settings ENABLE ROW LEVEL SECURITY;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  -- Add your admin email here
  RETURN EXISTS (
    SELECT 1 FROM auth.users 
    WHERE id = user_id 
    AND email = 'your-admin-email@manifestillusions.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for pages
CREATE POLICY "Public can view published pages"
  ON pages
  FOR SELECT
  USING (NOT is_draft);

CREATE POLICY "Admin can manage all pages"
  ON pages
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Policies for media
CREATE POLICY "Public can view media"
  ON media
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage media"
  ON media
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Policies for editor_settings
CREATE POLICY "Admin can manage editor settings"
  ON editor_settings
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Update function for pages
CREATE OR REPLACE FUNCTION handle_page_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for page updates
CREATE TRIGGER on_page_update
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION handle_page_update();