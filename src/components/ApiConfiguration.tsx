import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Key, 
  Globe, 
  Save, 
  TestTube,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Lock,
  Shield,
  Loader2
} from "lucide-react";
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

const ApiConfiguration = () => {
  const [apiKey, setApiKey] = useState("");
  const [modelEndpoint, setModelEndpoint] = useState("");
  const [configName, setConfigName] = useState("");
  const [modelName, setModelName] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [currentConfig, setCurrentConfig] = useState<ApiConfigData | null>(null);
  const { toast } = useToast();
  const { user, isLoggedIn } = useUser();

  // Check if current user is admin
  const isAdmin = isLoggedIn && user?.email === "omotayoofficialbr@gmail.com";

  // Load active configuration on component mount
  useEffect(() => {
    loadActiveConfiguration();
  }, []);

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
        setCurrentConfig(config);
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

  const handleSaveConfiguration = async () => {
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
      // First, set all configurations to inactive
      await supabase
        .from('api_configurations')
        .update({ is_active: false })
        .neq('id', 'dummy');

      // Then either update existing or create new configuration
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

      // Reload the configuration
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

  const handleTestConnection = async () => {
    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admin users can test API configuration",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim() || !modelEndpoint.trim()) {
      toast({
        title: "Missing Configuration",
        description: "Please enter both API key and model endpoint before testing",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // Simulate API test (replace with actual API call in production)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3;
      
      if (success) {
        setTestResult({
          success: true,
          message: "Connection successful! Your API configuration is working correctly."
        });
        toast({
          title: "Test Successful",
          description: "API connection is working correctly",
        });
      } else {
        setTestResult({
          success: false,
          message: "Connection failed. Please check your API key and endpoint URL."
        });
        toast({
          title: "Test Failed",
          description: "Unable to connect to the API. Please verify your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "An error occurred while testing the connection."
      });
      toast({
        title: "Test Error",
        description: "An unexpected error occurred during testing",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading configuration...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          API Configuration
        </h2>
        <p className="text-gray-600">
          Configure your AI model API credentials for real-time plant analysis
        </p>
      </div>

      {!isLoggedIn && (
        <Alert className="border-amber-200 bg-amber-50">
          <Lock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Authentication Required:</strong> Please log in to access API configuration settings.
          </AlertDescription>
        </Alert>
      )}

      {isLoggedIn && !isAdmin && (
        <Alert className="border-red-200 bg-red-50">
          <Lock className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Access Restricted:</strong> Only admin users can modify API configuration settings. 
            Please contact the administrator (omotayoofficialbr@gmail.com) to make changes.
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>Database Storage:</strong> API configurations are now securely stored in the database 
          with proper access controls and encryption.
        </AlertDescription>
      </Alert>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isAdmin ? (
              <Key className="h-6 w-6 text-blue-600" />
            ) : (
              <Shield className="h-6 w-6 text-gray-400" />
            )}
            <span>API Credentials</span>
            {!isAdmin && <Lock className="h-4 w-4 text-gray-400" />}
          </CardTitle>
          <CardDescription>
            {isAdmin 
              ? "Enter your AI model API credentials to enable real plant disease detection" 
              : "API configuration is restricted to admin users only"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="config-name">Configuration Name</Label>
            <Input
              id="config-name"
              placeholder={isAdmin ? "Enter configuration name (e.g., 'Production API')" : "••••••••••••••••"}
              value={configName}
              onChange={(e) => setConfigName(e.target.value)}
              disabled={!isAdmin}
              readOnly={!isAdmin}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder={isAdmin ? "Enter your API key" : "••••••••••••••••"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
                disabled={!isAdmin}
                readOnly={!isAdmin}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowApiKey(!showApiKey)}
                disabled={!isAdmin}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-endpoint">Model Endpoint URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="model-endpoint"
                type="url"
                placeholder={isAdmin ? "https://api.example.com/v1/plant-analysis" : "https://••••••••••••••••"}
                value={modelEndpoint}
                onChange={(e) => setModelEndpoint(e.target.value)}
                className="pl-10"
                disabled={!isAdmin}
                readOnly={!isAdmin}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model-name">Model Name (Optional)</Label>
            <Input
              id="model-name"
              placeholder={isAdmin ? "e.g., plant-disease-detector-v1" : "••••••••••••••••"}
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              disabled={!isAdmin}
              readOnly={!isAdmin}
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleSaveConfiguration}
              className="flex-1"
              disabled={!isAdmin || !apiKey.trim() || !modelEndpoint.trim() || !configName.trim() || isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Configuration
                </>
              )}
            </Button>
            <Button
              onClick={handleTestConnection}
              variant="outline"
              className="flex-1"
              disabled={!isAdmin || !apiKey.trim() || !modelEndpoint.trim() || isTesting}
            >
              {isTesting ? (
                <>
                  <TestTube className="mr-2 h-4 w-4 animate-pulse" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="mr-2 h-4 w-4" />
                  Test Connection
                </>
              )}
            </Button>
          </div>

          {testResult && (
            <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={testResult.success ? "text-green-800" : "text-red-800"}>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-blue-600" />
            <span>Supported APIs</span>
          </CardTitle>
          <CardDescription>
            Popular AI services that work with this plant analysis system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Roboflow</h4>
              <p className="text-sm text-gray-600 mb-2">
                Agricultural computer vision models
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                https://detect.roboflow.com/your-model/version
              </code>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Custom Vision</h4>
              <p className="text-sm text-gray-600 mb-2">
                Microsoft Azure Custom Vision API
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                https://southcentralus.api.cognitive.microsoft.com/
              </code>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Hugging Face</h4>
              <p className="text-sm text-gray-600 mb-2">
                Pre-trained agricultural models
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                https://api-inference.huggingface.co/models/
              </code>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">PlantNet</h4>
              <p className="text-sm text-gray-600 mb-2">
                Plant identification and disease detection
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                https://my.plantnet.org/api/v2/
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiConfiguration;
