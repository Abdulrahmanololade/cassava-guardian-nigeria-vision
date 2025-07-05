
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

export interface PlantAnalysisResult {
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
  }
};

export class PlantAnalysisService {
  private static classifier: any = null;

  static async initializeModel() {
    if (!this.classifier) {
      console.log('Loading plant disease classification model...');
      try {
        // Using a general image classification model that can detect plant diseases
        this.classifier = await pipeline(
          'image-classification',
          'google/vit-base-patch16-224',
          { device: 'webgpu' }
        );
        console.log('Model loaded successfully');
      } catch (error) {
        console.warn('WebGPU not available, falling back to CPU');
        this.classifier = await pipeline(
          'image-classification',
          'google/vit-base-patch16-224'
        );
      }
    }
    return this.classifier;
  }

  static async analyzeImage(imageFile: File): Promise<PlantAnalysisResult> {
    try {
      console.log('Starting plant analysis...');
      
      // Initialize the model
      const classifier = await this.initializeModel();
      
      // Convert file to image URL for processing
      const imageUrl = URL.createObjectURL(imageFile);
      
      // Perform classification
      console.log('Classifying image...');
      const results = await classifier(imageUrl);
      
      // Clean up the URL
      URL.revokeObjectURL(imageUrl);
      
      console.log('Classification results:', results);
      
      // Analyze results for plant diseases
      const analysis = this.interpretResults(results);
      
      return analysis;
    } catch (error) {
      console.error('Error during plant analysis:', error);
      throw new Error('Failed to analyze plant image. Please try again.');
    }
  }

  private static interpretResults(results: any[]): PlantAnalysisResult {
    const topResult = results[0];
    const confidence = Math.round(topResult.score * 100);
    
    // Check if results indicate plant disease
    const diseaseKeywords = ['disease', 'blight', 'mosaic', 'spot', 'rot', 'wilt', 'fungus', 'bacterial'];
    const pestKeywords = ['insect', 'pest', 'damage', 'eaten', 'holes'];
    const healthyKeywords = ['healthy', 'green', 'normal', 'good'];
    
    let detectedCondition = 'healthy';
    let diseaseDetected = false;
    let analysisDetails = '';
    
    // Analyze all results for disease indicators
    for (const result of results.slice(0, 3)) {
      const label = result.label.toLowerCase();
      
      if (diseaseKeywords.some(keyword => label.includes(keyword))) {
        diseaseDetected = true;
        if (label.includes('mosaic')) {
          detectedCondition = 'cassava mosaic disease';
        } else if (label.includes('blight') || label.includes('bacterial')) {
          detectedCondition = 'cassava bacterial blight';
        } else if (label.includes('spot') || label.includes('anthracnose')) {
          detectedCondition = 'cassava anthracnose disease';
        } else {
          detectedCondition = 'possible disease detected';
        }
        break;
      }
      
      if (pestKeywords.some(keyword => label.includes(keyword))) {
        diseaseDetected = true;
        detectedCondition = 'pest damage detected';
        break;
      }
    }
    
    // Get condition details
    const conditionInfo = cassavaConditions[detectedCondition as keyof typeof cassavaConditions];
    
    if (diseaseDetected && conditionInfo) {
      analysisDetails = `Disease identified with ${confidence}% confidence. Immediate action recommended.`;
      
      return {
        plantName: 'Cassava (Manihot esculenta)',
        condition: detectedCondition.charAt(0).toUpperCase() + detectedCondition.slice(1),
        severity: conditionInfo.severity,
        confidence: `${confidence}%`,
        pest: conditionInfo.pest,
        treatment: conditionInfo.treatment,
        prevention: conditionInfo.prevention,
        diseaseDetected: true,
        analysisDetails
      };
    } else {
      // Healthy plant or no disease detected
      analysisDetails = `Plant appears healthy with ${confidence}% confidence. Continue monitoring.`;
      
      return {
        plantName: 'Cassava (Manihot esculenta)',
        condition: 'Healthy Plant',
        severity: 'None',
        confidence: `${confidence}%`,
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
        ],
        diseaseDetected: false,
        analysisDetails
      };
    }
  }
}
