
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Key, Loader2 } from "lucide-react";
import { useApiConfiguration } from "@/hooks/useApiConfiguration";
import { useApiTest } from "@/hooks/useApiTest";
import AccessControlAlerts from "@/components/api-configuration/AccessControlAlerts";
import ApiCredentialsForm from "@/components/api-configuration/ApiCredentialsForm";
import SupportedApis from "@/components/api-configuration/SupportedApis";

const ApiConfiguration = () => {
  const {
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
    isAdmin,
    isLoggedIn,
    saveConfiguration
  } = useApiConfiguration();

  const { isTesting, testResult, testConnection } = useApiTest(isAdmin);

  const handleTestConnection = () => {
    testConnection(apiKey, modelEndpoint);
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

      <AccessControlAlerts isLoggedIn={isLoggedIn} isAdmin={isAdmin} />

      <Alert>
        <Key className="h-4 w-4" />
        <AlertDescription>
          <strong>Database Storage:</strong> API configurations are now securely stored in the database 
          with proper access controls and encryption.
        </AlertDescription>
      </Alert>

      <ApiCredentialsForm
        configName={configName}
        setConfigName={setConfigName}
        apiKey={apiKey}
        setApiKey={setApiKey}
        modelEndpoint={modelEndpoint}
        setModelEndpoint={setModelEndpoint}
        modelName={modelName}
        setModelName={setModelName}
        isAdmin={isAdmin}
        isSaving={isSaving}
        isTesting={isTesting}
        testResult={testResult}
        onSave={saveConfiguration}
        onTest={handleTestConnection}
      />

      <SupportedApis />
    </div>
  );
};

export default ApiConfiguration;
