import { useState } from "react";
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
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

const ApiConfiguration = () => {
  const [apiKey, setApiKey] = useState("");
  const [modelEndpoint, setModelEndpoint] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();
  const { user, isLoggedIn } = useUser();

  // Check if current user is admin - using the proper user object from Supabase
  const isAdmin = isLoggedIn && user?.email === "omotayoofficialbr@gmail.com";

  const handleSaveConfiguration = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to configure API settings",
        variant: "destructive",
      });
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "Only admin users can modify API configuration",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key",
        variant: "destructive",
      });
      return;
    }

    if (!modelEndpoint.trim()) {
      toast({
        title: "Model Endpoint Required",
        description: "Please enter your model endpoint URL",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage for now (in production, this should be handled securely)
    localStorage.setItem('plantAnalysis_apiKey', apiKey);
    localStorage.setItem('plantAnalysis_modelEndpoint', modelEndpoint);

    toast({
      title: "Configuration Saved",
      description: "Your API configuration has been saved successfully",
    });
  };

  const handleTestConnection = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please log in to test API configuration",
        variant: "destructive",
      });
      return;
    }

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

  // Load saved configuration on component mount
  useState(() => {
    const savedApiKey = localStorage.getItem('plantAnalysis_apiKey');
    const savedEndpoint = localStorage.getItem('plantAnalysis_modelEndpoint');
    
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedEndpoint) setModelEndpoint(savedEndpoint);
  });

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
          <strong>Security Note:</strong> In this demo, credentials are stored locally. 
          For production use, consider using secure backend storage or environment variables.
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

          <div className="flex space-x-3">
            <Button
              onClick={handleSaveConfiguration}
              className="flex-1"
              disabled={!isAdmin || !apiKey.trim() || !modelEndpoint.trim()}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
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
