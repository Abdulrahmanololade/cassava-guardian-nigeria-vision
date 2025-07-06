
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ExternalLink, 
  Brain, 
  CheckCircle, 
  Star,
  Globe,
  Zap,
  Shield
} from "lucide-react";

interface ModelRecommendation {
  name: string;
  provider: string;
  accuracy: string;
  specialization: string;
  features: string[];
  pricing: string;
  apiUrl: string;
  documentation: string;
  pros: string[];
  cons: string[];
  difficulty: 'Easy' | 'Medium' | 'Advanced';
}

const ModelRecommendations = () => {
  const models: ModelRecommendation[] = [
    {
      name: "PlantNet API",
      provider: "Pl@ntNet",
      accuracy: "85-92%",
      specialization: "Plant identification and disease detection",
      features: [
        "Multi-species plant identification",
        "Disease pattern recognition",
        "Pest detection capabilities",
        "Geographic plant distribution data"
      ],
      pricing: "Free tier available, Premium from $29/month",
      apiUrl: "https://my.plantnet.org/",
      documentation: "https://my.plantnet.org/doc/",
      pros: [
        "Excellent for general plant identification",
        "Large database of plant species",
        "Good community support",
        "Regular model updates"
      ],
      cons: [
        "Limited cassava-specific disease detection",
        "Requires good image quality",
        "May not detect all pest types"
      ],
      difficulty: 'Easy'
    },
    {
      name: "Custom Vision (Azure)",
      provider: "Microsoft Azure",
      accuracy: "90-95%",
      specialization: "Custom trained models for specific crops",
      features: [
        "Custom model training",
        "Cassava-specific disease detection",
        "Real-time analysis",
        "Mobile SDK support"
      ],
      pricing: "Pay-per-use, starts at $2 per 1000 predictions",
      apiUrl: "https://www.customvision.ai/",
      documentation: "https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/",
      pros: [
        "Can be trained specifically for cassava diseases",
        "High accuracy with proper training data",
        "Scalable and reliable",
        "Good integration options"
      ],
      cons: [
        "Requires training data preparation",
        "More complex setup",
        "Ongoing costs for usage"
      ],
      difficulty: 'Medium'
    },
    {
      name: "Roboflow Universe Models",
      provider: "Roboflow",
      accuracy: "88-94%",
      specialization: "Agricultural computer vision",
      features: [
        "Pre-trained agricultural models",
        "Cassava disease detection",
        "Object detection for pests",
        "Easy API integration"
      ],
      pricing: "Free tier, Professional from $20/month",
      apiUrl: "https://roboflow.com/",
      documentation: "https://docs.roboflow.com/",
      pros: [
        "Ready-to-use agricultural models",
        "Good documentation",
        "Active community",
        "Regular model improvements"
      ],
      cons: [
        "Limited customization",
        "Dependent on pre-trained models",
        "May require fine-tuning"
      ],
      difficulty: 'Easy'
    },
    {
      name: "TensorFlow Hub - PlantVillage",
      provider: "Google/PlantVillage",
      accuracy: "87-93%",
      specialization: "Crop disease classification",
      features: [
        "Open-source models",
        "Multiple crop disease detection",
        "TensorFlow.js compatibility",
        "Mobile deployment ready"
      ],
      pricing: "Free (open source)",
      apiUrl: "https://tfhub.dev/",
      documentation: "https://www.tensorflow.org/hub",
      pros: [
        "Completely free",
        "Open source and customizable",
        "Can run in browser",
        "Good for learning and development"
      ],
      cons: [
        "Requires technical expertise",
        "Need to handle hosting",
        "Limited support"
      ],
      difficulty: 'Advanced'
    },
    {
      name: "Hugging Face - Agricultural Models",
      provider: "Hugging Face",
      accuracy: "86-91%",
      specialization: "Various agricultural AI models",
      features: [
        "Multiple pre-trained models",
        "Easy API access",
        "Community contributions",
        "Transformers library support"
      ],
      pricing: "Free tier, Pro from $9/month",
      apiUrl: "https://huggingface.co/",
      documentation: "https://huggingface.co/docs",
      pros: [
        "Large model repository",
        "Active community",
        "Easy to experiment",
        "Good documentation"
      ],
      cons: [
        "Model quality varies",
        "May need model comparison",
        "Some models require fine-tuning"
      ],
      difficulty: 'Medium'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Recommended AI Models for Cassava Analysis
        </h2>
        <p className="text-gray-600">
          Professional AI models for accurate pest and disease detection in cassava plants
        </p>
      </div>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>Current System:</strong> This app uses simulated AI analysis for demonstration. 
          For production use, integrate one of the recommended models below for real pest and disease detection.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {models.map((model, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>{model.name}</span>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    by {model.provider}
                  </CardDescription>
                </div>
                <Badge className={getDifficultyColor(model.difficulty)}>
                  {model.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Accuracy: {model.accuracy}</span>
                </div>
                <Badge variant="outline">{model.specialization}</Badge>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {model.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pros & Cons:</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="text-green-600 font-medium">Pros:</span>
                    <ul className="text-gray-600 mt-1">
                      {model.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="ml-2">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-red-600 font-medium">Cons:</span>
                    <ul className="text-gray-600 mt-1">
                      {model.cons.slice(0, 2).map((con, idx) => (
                        <li key={idx} className="ml-2">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>{model.pricing}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(model.apiUrl, '_blank')}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Visit API
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(model.documentation, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Implementation Recommendation:</strong> For production cassava analysis, we recommend starting with 
          <strong> PlantNet API</strong> or <strong>Roboflow</strong> for ease of use, or <strong>Azure Custom Vision</strong> 
          for maximum accuracy with custom training data specific to your cassava varieties and local disease patterns.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ModelRecommendations;
