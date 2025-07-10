
-- Create a table to store API configurations
CREATE TABLE public.api_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  api_key TEXT NOT NULL,
  endpoint_url TEXT NOT NULL,
  model_name TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Add Row Level Security (RLS)
ALTER TABLE public.api_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for API configurations access
-- Only authenticated users can view configurations
CREATE POLICY "Authenticated users can view API configurations" 
  ON public.api_configurations 
  FOR SELECT 
  TO authenticated
  USING (true);

-- Only admin user can insert configurations
CREATE POLICY "Admin can create API configurations" 
  ON public.api_configurations 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.email() = 'omotayoofficialbr@gmail.com');

-- Only admin user can update configurations
CREATE POLICY "Admin can update API configurations" 
  ON public.api_configurations 
  FOR UPDATE 
  TO authenticated
  USING (auth.email() = 'omotayoofficialbr@gmail.com');

-- Only admin user can delete configurations
CREATE POLICY "Admin can delete API configurations" 
  ON public.api_configurations 
  FOR DELETE 
  TO authenticated
  USING (auth.email() = 'omotayoofficialbr@gmail.com');

-- Create a function to get the active API configuration
CREATE OR REPLACE FUNCTION public.get_active_api_config()
RETURNS TABLE (
  id UUID,
  name TEXT,
  api_key TEXT,
  endpoint_url TEXT,
  model_name TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    ac.id,
    ac.name,
    ac.api_key,
    ac.endpoint_url,
    ac.model_name
  FROM public.api_configurations ac
  WHERE ac.is_active = true
  LIMIT 1;
$$;

-- Insert a default configuration entry (you can modify this later)
INSERT INTO public.api_configurations (name, api_key, endpoint_url, model_name, is_active)
VALUES (
  'Default Plant Analysis API',
  'your-api-key-here',
  'https://api.example.com/v1/plant-analysis',
  'plant-disease-detector-v1',
  true
);
