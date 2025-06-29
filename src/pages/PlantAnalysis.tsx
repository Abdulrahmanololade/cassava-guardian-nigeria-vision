import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Camera, 
  FileImage, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Sprout,
  Bug,
  Stethoscope
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlantAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate analysis with mock data
    setTimeout(() => {
      const mockResults = [
        {
          plantName: "Cassava (Manihot esculenta)",
          condition: "Cassava Mosaic Disease Detected",
          severity: "Moderate",
          confidence: "94%",
          pest: "Whitefly (Bemisia tabaci)",
          treatment: {
            immediate: [
              "Remove and destroy affected leaves immediately",
              "Apply neem oil spray (2-3 ml per liter of water)",
              "Increase plant spacing for better air circulation"
            ],
            longTerm: [
              "Plant resistant cassava varieties like TME 419",
              "Use yellow sticky traps to monitor whitefly population",
              "Apply organic mulch to retain soil moisture",
              "Regular monitoring every 3-4 days"
            ]
          },
          prevention: [
            "Use certified disease-free planting material",
            "Maintain proper field sanitation",
            "Control weeds that harbor whiteflies",
            "Avoid planting during peak whitefly seasons"
          ]
        },
        {
          plantName: "Cassava (Manihot esculenta)",
          condition: "Healthy Plant",
          severity: "None",
          confidence: "98%",
          pest: "No pests detected",
          treatment: {
            immediate: ["Continue current care routine"],
            longTerm: ["Regular monitoring and preventive measures"]
          },
          prevention: [
            "Maintain current good agricultural practices",
            "Regular inspection for early detection"
          ]
        }
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Plant identified: ${randomResult.plantName}`,
      });
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      case 'mild':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plant Health Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of your cassava plant for instant AI-powered analysis and treatment recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-6 w-6 text-green-600" />
                <span>Upload Plant Image</span>
              </CardTitle>
              <CardDescription>
                Take a clear photo of your cassava plant showing any affected areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700">Click to upload image</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Selected plant"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Plant...
                      </>
                    ) : (
                      <>
                        <FileImage className="mr-2 h-5 w-5" />
                        Analyze Plant Health
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Stethoscope className="h-6 w-6 text-blue-600" />
                <span>Analysis Results</span>
              </CardTitle>
              <CardDescription>
                Detailed plant health assessment and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult ? (
                <div className="text-center py-12">
                  <Sprout className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Upload an image to get started with plant analysis</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Plant Identification */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Sprout className="h-5 w-5 text-green-600 mr-2" />
                      Plant Identification
                    </h3>
                    <p className="text-lg font-medium text-green-700">{analysisResult.plantName}</p>
                    <Badge variant="outline" className="mt-1">
                      Confidence: {analysisResult.confidence}
                    </Badge>
                  </div>

                  {/* Health Status */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                      Health Status
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(analysisResult.severity)}>
                        {analysisResult.condition}
                      </Badge>
                      {analysisResult.severity !== "None" && (
                        <Badge variant="outline">
                          Severity: {analysisResult.severity}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pest Detection */}
                  {analysisResult.pest !== "No pests detected" && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Bug className="h-5 w-5 text-red-600 mr-2" />
                        Pest Detection
                      </h3>
                      <p className="text-red-700 font-medium">{analysisResult.pest}</p>
                    </div>
                  )}

                  {/* Treatment Recommendations */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      Treatment Recommendations
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">Immediate Actions:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {analysisResult.treatment.immediate.map((action: string, index: number) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {analysisResult.treatment.longTerm && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Long-term Management:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {analysisResult.treatment.longTerm.map((action: string, index: number) => (
                              <li key={index}>{action}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prevention Tips */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Prevention Tips:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {analysisResult.prevention.map((tip: string, index: number) => (
                          <li key={index} className="text-sm">{tip}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlantAnalysis;
