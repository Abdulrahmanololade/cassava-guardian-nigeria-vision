
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

const SupportedApis = () => {
  const apiServices = [
    {
      name: "Roboflow",
      description: "Agricultural computer vision models",
      endpoint: "https://detect.roboflow.com/your-model/version"
    },
    {
      name: "Custom Vision",
      description: "Microsoft Azure Custom Vision API",
      endpoint: "https://southcentralus.api.cognitive.microsoft.com/"
    },
    {
      name: "Hugging Face",
      description: "Pre-trained agricultural models",
      endpoint: "https://api-inference.huggingface.co/models/"
    },
    {
      name: "PlantNet",
      description: "Plant identification and disease detection",
      endpoint: "https://my.plantnet.org/api/v2/"
    }
  ];

  return (
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
          {apiServices.map((service) => (
            <div key={service.name} className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
              <p className="text-sm text-gray-600 mb-2">
                {service.description}
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                {service.endpoint}
              </code>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupportedApis;
