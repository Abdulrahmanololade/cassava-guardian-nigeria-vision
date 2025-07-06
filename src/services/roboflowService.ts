
export interface RoboflowResult {
  plantName: string;
  condition: string;
  severity: string;
  confidence: string;
  pest: string;
  treatment: {
    immediate: string[];
    longTerm: string[];
  };
  prevention: string[];
  diseaseDetected: boolean;
  analysisDetails: string;
}

interface RoboflowPrediction {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface RoboflowResponse {
  predictions: RoboflowPrediction[];
  time: number;
}

// Disease and treatment database for cassava
const cassavaConditions = {
  'cassava mosaic disease': {
    severity: 'High',
    pest: 'Whitefly (Bemisia tabaci)',
    treatment: {
      immediate: [
        'Remove and destroy affected leaves immediately',
        'Apply neem oil spray (2-3 ml per liter of water)',
        'Increase plant spacing for better air circulation'
      ],
      longTerm: [
        'Plant resistant cassava varieties like TME 419',
        'Use yellow sticky traps to monitor whitefly population',
        'Apply organic mulch to retain soil moisture',
        'Regular monitoring every 3-4 days'
      ]
    },
    prevention: [
      'Use certified disease-free planting material',
      'Maintain proper field sanitation',
      'Control weeds that harbor whiteflies',
      'Avoid planting during peak whitefly seasons'
    ]
  },
  'cassava bacterial blight': {
    severity: 'High',
    pest: 'Xanthomonas axonopodis bacteria',
    treatment: {
      immediate: [
        'Remove infected plant parts and burn them',
        'Apply copper-based fungicide spray',
        'Avoid overhead watering'
      ],
      longTerm: [
        'Plant resistant varieties',
        'Improve drainage in the field',
        'Rotate crops with non-host plants'
      ]
    },
    prevention: [
      'Use pathogen-free planting material',
      'Maintain field hygiene',
      'Avoid working in wet conditions'
    ]
  },
  'cassava anthracnose disease': {
    severity: 'Moderate',
    pest: 'Colletotrichum gloeosporioides fungus',
    treatment: {
      immediate: [
        'Apply fungicide containing copper or mancozeb',
        'Remove affected leaves',
        'Improve air circulation'
      ],
      longTerm: [
        'Use resistant varieties',
        'Practice crop rotation',
        'Regular field inspection'
      ]
    },
    prevention: [
      'Avoid overhead irrigation',
      'Maintain proper plant spacing',
      'Remove crop residues'
    ]
  },
  'healthy': {
    severity: 'None',
    pest: 'No pests detected',
    treatment: {
      immediate: ['Continue current care routine', 'Monitor regularly for any changes'],
      longTerm: ['Maintain good agricultural practices', 'Regular inspection for early detection']
    },
    prevention: [
      'Maintain current good agricultural practices',
      'Regular inspection for early detection',
      'Ensure proper spacing and ventilation',
      'Use certified disease-free planting material'
    ]
  }
};

export class RoboflowService {
  private static API_URL = 'https://detect.roboflow.com';
  
  static async analyzeImage(
    imageFile: File, 
    apiKey: string, 
    modelEndpoint: string
  ): Promise<RoboflowResult> {
    try {
      console.log('Starting Roboflow plant analysis...');
      
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile);
      
      // Make API call to Roboflow
      const response = await fetch(`${this.API_URL}/${modelEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_key: apiKey,
          image: base64Image,
          confidence: '0.4',
          overlap: '0.3'
        })
      });

      if (!response.ok) {
        throw new Error(`Roboflow API error: ${response.status} ${response.statusText}`);
      }

      const result: RoboflowResponse = await response.json();
      console.log('Roboflow API response:', result);

      // Process the results
      return this.processRoboflowResults(result);
      
    } catch (error) {
      console.error('Error during Roboflow analysis:', error);
      throw new Error('Failed to analyze plant image with Roboflow. Please check your API key and model endpoint.');
    }
  }

  private static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private static processRoboflowResults(results: RoboflowResponse): RoboflowResult {
    const predictions = results.predictions;
    
    if (!predictions || predictions.length === 0) {
      // No disease detected
      const healthyCondition = cassavaConditions['healthy'];
      return {
        plantName: 'Cassava (Manihot esculenta)',
        condition: 'Healthy Plant',
        severity: healthyCondition.severity,
        confidence: '95%',
        pest: healthyCondition.pest,
        treatment: healthyCondition.treatment,
        prevention: healthyCondition.prevention,
        diseaseDetected: false,
        analysisDetails: 'No diseases detected. Plant appears healthy based on Roboflow analysis.'
      };
    }

    // Get the highest confidence prediction
    const topPrediction = predictions.reduce((prev, current) => 
      (prev.confidence > current.confidence) ? prev : current
    );

    const confidence = Math.round(topPrediction.confidence * 100);
    const detectedClass = topPrediction.class.toLowerCase();
    
    // Map detected class to our condition database
    let conditionKey = 'healthy';
    if (detectedClass.includes('mosaic')) {
      conditionKey = 'cassava mosaic disease';
    } else if (detectedClass.includes('blight') || detectedClass.includes('bacterial')) {
      conditionKey = 'cassava bacterial blight';
    } else if (detectedClass.includes('anthracnose') || detectedClass.includes('spot')) {
      conditionKey = 'cassava anthracnose disease';
    }

    const conditionInfo = cassavaConditions[conditionKey as keyof typeof cassavaConditions];
    const diseaseDetected = conditionKey !== 'healthy';

    return {
      plantName: 'Cassava (Manihot esculenta)',
      condition: diseaseDetected 
        ? conditionKey.charAt(0).toUpperCase() + conditionKey.slice(1)
        : 'Healthy Plant',
      severity: conditionInfo.severity,
      confidence: `${confidence}%`,
      pest: conditionInfo.pest,
      treatment: conditionInfo.treatment,
      prevention: conditionInfo.prevention,
      diseaseDetected,
      analysisDetails: diseaseDetected
        ? `Disease "${topPrediction.class}" detected with ${confidence}% confidence using Roboflow AI model.`
        : `Plant appears healthy with ${confidence}% confidence based on Roboflow analysis.`
    };
  }
}
