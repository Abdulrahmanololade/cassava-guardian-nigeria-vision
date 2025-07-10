
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
import { useState } from "react";

interface ApiCredentialsFormProps {
  configName: string;
  setConfigName: (value: string) => void;
  apiKey: string;
  setApiKey: (value: string) => void;
  modelEndpoint: string;
  setModelEndpoint: (value: string) => void;
  modelName: string;
  setModelName: (value: string) => void;
  isAdmin: boolean;
  isSaving: boolean;
  isTesting: boolean;
  testResult: { success: boolean; message: string } | null;
  onSave: () => void;
  onTest: () => void;
}

const ApiCredentialsForm = ({
  configName,
  setConfigName,
  apiKey,
  setApiKey,
  modelEndpoint,
  setModelEndpoint,
  modelName,
  setModelName,
  isAdmin,
  isSaving,
  isTesting,
  testResult,
  onSave,
  onTest
}: ApiCredentialsFormProps) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
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
            onClick={onSave}
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
            onClick={onTest}
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
  );
};

export default ApiCredentialsForm;
