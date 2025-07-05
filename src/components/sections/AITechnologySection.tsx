
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Cpu, CheckCircle } from "lucide-react";

const AITechnologySection = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powered by Advanced AI Technology
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our cutting-edge artificial intelligence system provides accurate plant health analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Deep Learning AI</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our AI system uses advanced deep learning algorithms trained on thousands of cassava plant images 
                  to identify diseases, pests, and health conditions with exceptional accuracy.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Convolutional Neural Networks (CNN) for image analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Machine learning models trained on extensive datasets
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Real-time processing for instant results
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Cpu className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900">Computer Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Advanced computer vision technology analyzes plant images to detect subtle signs of disease, 
                  pest damage, and nutritional deficiencies that might be missed by the human eye.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Pattern recognition for disease identification
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Image preprocessing and enhancement
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Multi-scale feature extraction
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITechnologySection;
