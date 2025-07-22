-- Fix function search path mutable warnings by setting search_path
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
SET search_path = public
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

-- Fix the second function as well
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
SET search_path = public
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