-- Add new columns to support multiple API types
ALTER TABLE public.api_configurations 
ADD COLUMN api_provider TEXT DEFAULT 'custom',
ADD COLUMN api_version TEXT,
ADD COLUMN description TEXT,
ADD COLUMN rate_limit_per_minute INTEGER DEFAULT 60,
ADD COLUMN is_default BOOLEAN DEFAULT false;

-- Drop the unique constraint on name to allow multiple configs with same name for different providers
ALTER TABLE public.api_configurations DROP CONSTRAINT IF EXISTS api_configurations_name_key;

-- Add a composite unique constraint for name + api_provider
ALTER TABLE public.api_configurations 
ADD CONSTRAINT api_configurations_name_provider_unique UNIQUE (name, api_provider);

-- Create an index for better performance on provider lookups
CREATE INDEX idx_api_configurations_provider ON public.api_configurations (api_provider);
CREATE INDEX idx_api_configurations_active ON public.api_configurations (is_active);
CREATE INDEX idx_api_configurations_default ON public.api_configurations (is_default);

-- Update the existing function to support getting configs by provider
CREATE OR REPLACE FUNCTION public.get_active_api_config(provider_name TEXT DEFAULT NULL)
RETURNS TABLE (
  id UUID,
  name TEXT,
  api_key TEXT,
  endpoint_url TEXT,
  model_name TEXT,
  api_provider TEXT,
  api_version TEXT,
  description TEXT,
  rate_limit_per_minute INTEGER
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
    ac.model_name,
    ac.api_provider,
    ac.api_version,
    ac.description,
    ac.rate_limit_per_minute
  FROM public.api_configurations ac
  WHERE ac.is_active = true
    AND (provider_name IS NULL OR ac.api_provider = provider_name)
  ORDER BY ac.is_default DESC, ac.created_at DESC
  LIMIT 1;
$$;

-- Create a function to get all active configs
CREATE OR REPLACE FUNCTION public.get_all_active_api_configs()
RETURNS TABLE (
  id UUID,
  name TEXT,
  api_key TEXT,
  endpoint_url TEXT,
  model_name TEXT,
  api_provider TEXT,
  api_version TEXT,
  description TEXT,
  rate_limit_per_minute INTEGER,
  is_default BOOLEAN
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
    ac.model_name,
    ac.api_provider,
    ac.api_version,
    ac.description,
    ac.rate_limit_per_minute,
    ac.is_default
  FROM public.api_configurations ac
  WHERE ac.is_active = true
  ORDER BY ac.is_default DESC, ac.api_provider, ac.created_at DESC;
$$;

-- Insert some example configurations for different API providers
INSERT INTO public.api_configurations (name, api_key, endpoint_url, model_name, api_provider, api_version, description, is_active, is_default)
VALUES 
  ('OpenAI GPT-4', 'your-openai-key-here', 'https://api.openai.com/v1/chat/completions', 'gpt-4', 'openai', 'v1', 'OpenAI GPT-4 for general AI tasks', true, true),
  ('Plant Disease Detection', 'your-plant-api-key-here', 'https://api.plantnet.org/v2/identify', 'plant-classifier-v2', 'plantnet', 'v2', 'PlantNet API for plant identification', true, false),
  ('Roboflow Plant Analysis', 'your-roboflow-key-here', 'https://detect.roboflow.com/plant-disease-detection', 'plant-disease-v1', 'roboflow', 'v1', 'Roboflow computer vision for plant disease detection', false, false);

-- Update the existing default entry
UPDATE public.api_configurations 
SET api_provider = 'custom', 
    description = 'Custom plant analysis API configuration',
    is_default = false
WHERE name = 'Default Plant Analysis API';