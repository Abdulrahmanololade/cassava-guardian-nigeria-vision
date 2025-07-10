
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock } from "lucide-react";

interface AccessControlAlertsProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const AccessControlAlerts = ({ isLoggedIn, isAdmin }: AccessControlAlertsProps) => {
  if (!isLoggedIn) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <Lock className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <strong>Authentication Required:</strong> Please log in to access API configuration settings.
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoggedIn && !isAdmin) {
    return (
      <Alert className="border-red-200 bg-red-50">
        <Lock className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Access Restricted:</strong> Only admin users can modify API configuration settings. 
          Please contact the administrator (omotayoofficialbr@gmail.com) to make changes.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default AccessControlAlerts;
