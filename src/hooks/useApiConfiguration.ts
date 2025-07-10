
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

interface ApiConfigData {
  id: string;
  name: string;
  api_key: string;
  endpoint_url: string;
  model_name: string | null;
  is_active: boolean;
}

export const useApiConfiguration = () => {
  const [apiKey, setApiKey] = useState("");
  const [modelEndpoint, setModelEndpoint] = useState("");
  const [configName, setConfigName] = useState("");
  const [modelName, setModelName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ApiConfigData | null>(null);
  const { toast } = useToast();
  const { user, isLoggedIn } = useUser();

  const isAdmin = isLoggedIn && user?.email === "omotayoofficialbr@gmail.com";

  const loadActiveConfiguration = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.rpc('get_active_api_config');
      
      if (error) {
        console.error('Error loading configuration:', error);
        toast({
          title: "Error Loading Configuration",
          description: "Failed to load API configuration from database",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        const config = data[0];
        const configData: ApiConfigData = {
          ...config,
          is_active: true
        };
        setCurrentConfig(configData);
        setConfigName(config.name);
        setApiKey(config.api_key);
        setModelEndpoint(config.endpoint_url);
        setModelName(config.model_name || "");
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while loading configuration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfiguration = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admin users can modify API configuration",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim() || !modelEndpoint.trim() || !configName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      await supabase
        .from('api_configurations')
        .update({ is_active: false })
        .neq('id', 'dummy');

      let result;
      if (currentConfig) {
        result = await supabase
          .from('api_configurations')
          .update({
            name: configName,
            api_key: apiKey,
            endpoint_url: modelEndpoint,
            model_name: modelName || null,
            is_active: true,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentConfig.id);
      } else {
        result = await supabase
          .from('api_configurations')
          .insert({
            name: configName,
            api_key: apiKey,
            endpoint_url: modelEndpoint,
            model_name: modelName || null,
            is_active: true,
            created_by: user?.id
          });
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Configuration Saved",
        description: "Your API configuration has been saved successfully",
      });

      await loadActiveConfiguration();
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save API configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadActiveConfiguration();
  }, []);

  return {
    apiKey,
    setApiKey,
    modelEndpoint,
    setModelEndpoint,
    configName,
    setConfigName,
    modelName,
    setModelName,
    isLoading,
    isSaving,
    currentConfig,
    isAdmin,
    isLoggedIn,
    saveConfiguration,
    loadActiveConfiguration
  };
};
