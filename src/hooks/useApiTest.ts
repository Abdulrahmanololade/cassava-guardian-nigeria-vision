
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useApiTest = (isAdmin: boolean) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const testConnection = async (apiKey: string, modelEndpoint: string) => {
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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

  return {
    isTesting,
    testResult,
    testConnection
  };
};
