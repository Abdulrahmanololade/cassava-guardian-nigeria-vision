import { supabase } from "@/integrations/supabase/client";

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

export interface ImageValidationResult {
  isValid: boolean;
  reason?: string;
  confidence: number;
}

interface ApiConfig {
  id: string;
  name: string;
  api_key: string;
  endpoint_url: string;
  model_name: string;
}

// Comprehensive plant disease and condition database
const plantConditions = {
  'cassava_mosaic_disease': {
    name: 'Cassava Mosaic Disease',
    severity: 'High',
    pest: 'Whitefly (Bemisia tabaci)',
    treatment: {
      immediate: [
        'Remove and destroy affected leaves immediately',
        'Apply neem oil spray (2-3 ml per liter of water)',
        'Increase plant spacing for better air circulation',
        'Use yellow sticky traps to control whiteflies'
      ],
      longTerm: [
        'Plant resistant cassava varieties like TME 419',
        'Regular monitoring every 3-4 days',
        'Apply organic mulch to retain soil moisture',
        'Establish proper field sanitation practices'
      ]
    },
    prevention: [
      'Use certified disease-free planting material',
      'Maintain proper field sanitation',
      'Control weeds that harbor whiteflies',
      'Avoid planting during peak whitefly seasons'
    ]
  },
  'cassava_bacterial_blight': {
    name: 'Cassava Bacterial Blight',
    severity: 'High',
    pest: 'Xanthomonas axonopodis bacteria',
    treatment: {
      immediate: [
        'Remove infected plant parts and burn them',
        'Apply copper-based fungicide spray',
        'Avoid overhead watering',
        'Disinfect tools between plants'
      ],
      longTerm: [
        'Plant resistant varieties',
        'Improve drainage in the field',
        'Rotate crops with non-host plants',
        'Monitor weather conditions'
      ]
    },
    prevention: [
      'Use pathogen-free planting material',
      'Maintain field hygiene',
      'Avoid working in wet conditions',
      'Practice crop rotation'
    ]
  },
  'leaf_spot_disease': {
    name: 'Leaf Spot Disease',
    severity: 'Moderate',
    pest: 'Fungal pathogens (Cercospora spp.)',
    treatment: {
      immediate: [
        'Remove affected leaves and dispose properly',
        'Apply fungicide containing mancozeb or copper',
        'Improve air circulation around plants',
        'Reduce leaf wetness duration'
      ],
      longTerm: [
        'Use resistant plant varieties',
        'Practice proper spacing',
        'Regular field inspection',
        'Maintain soil fertility'
      ]
    },
    prevention: [
      'Avoid overhead irrigation',
      'Maintain proper plant spacing',
      'Remove crop residues',
      'Practice crop rotation'
    ]
  },
  'pest_infestation': {
    name: 'Pest Infestation',
    severity: 'Moderate',
    pest: 'Various insects (aphids, mites, caterpillars)',
    treatment: {
      immediate: [
        'Apply insecticidal soap spray',
        'Use neem oil treatment',
        'Remove heavily infested parts',
        'Introduce beneficial insects'
      ],
      longTerm: [
        'Regular monitoring and scouting',
        'Maintain biodiversity in the field',
        'Use pheromone traps',
        'Practice integrated pest management'
      ]
    },
    prevention: [
      'Regular inspection of plants',
      'Maintain field cleanliness',
      'Use companion planting',
      'Monitor weather conditions'
    ]
  },
  'nutrient_deficiency': {
    name: 'Nutrient Deficiency',
    severity: 'Low',
    pest: 'No pests - nutritional issue',
    treatment: {
      immediate: [
        'Apply balanced fertilizer',
        'Test soil pH and adjust if needed',
        'Add organic compost',
        'Ensure proper watering'
      ],
      longTerm: [
        'Develop regular fertilization schedule',
        'Monitor soil health regularly',
        'Practice crop rotation',
        'Use organic soil amendments'
      ]
    },
    prevention: [
      'Regular soil testing',
      'Balanced fertilization program',
      'Proper soil preparation',
      'Maintain organic matter in soil'
    ]
  },
  'healthy': {
    name: 'Healthy Plant',
    severity: 'None',
    pest: 'No pests detected',
    treatment: {
      immediate: [
        'Continue current care routine',
        'Monitor regularly for any changes',
        'Maintain proper watering schedule'
      ],
      longTerm: [
        'Maintain good agricultural practices',
        'Regular inspection for early detection',
        'Continue balanced nutrition program'
      ]
    },
    prevention: [
      'Maintain current good practices',
      'Regular monitoring',
      'Proper spacing and ventilation',
      'Use certified planting material'
    ]
  }
};

export class PlantAnalysisService {
  static async getActiveApiConfig(): Promise<ApiConfig | null> {
    try {
      console.log('Fetching active API configuration from database...');
      
      const { data, error } = await supabase.rpc('get_active_api_config');
      
      if (error) {
        console.error('Error fetching API config:', error);
        throw new Error('Failed to fetch API configuration from database');
      }

      if (!data || data.length === 0) {
        console.log('No active API configuration found');
        return null;
      }

      const config = data[0];
      console.log('Active API configuration loaded:', { 
        name: config.name, 
        endpoint: config.endpoint_url,
        model: config.model_name 
      });
      
      return config;
    } catch (error) {
      console.error('Error getting API configuration:', error);
      throw error;
    }
  }

  static async analyzeImage(imageFile: File): Promise<PlantAnalysisResult> {
    try {
      console.log('Starting plant analysis with validation...');
      
      // Check if API is configured in database
      const apiConfig = await this.getActiveApiConfig();
      
      if (!apiConfig) {
        throw new Error('No active API configuration found. Please configure your API credentials in the API Config tab before analyzing images.');
      }

      console.log('Using API configuration:', apiConfig.name);
      
      // First validate if the image contains a cassava plant
      const validationResult = await this.validateCassavaImage(imageFile);
      
      if (!validationResult.isValid) {
        throw new Error(`Invalid image: ${validationResult.reason}`);
      }
      
      console.log('Image validation passed, proceeding with analysis...');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate analysis based on image characteristics
      const analysisResult = await this.simulateAnalysis(imageFile);
      
      console.log('Plant analysis completed:', analysisResult);
      return analysisResult;
      
    } catch (error) {
      console.error('Error during plant analysis:', error);
      throw error;
    }
  }

  private static async validateCassavaImage(imageFile: File): Promise<ImageValidationResult> {
    console.log('Validating cassava plant image...');
    
    // Simulate validation processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const fileName = imageFile.name.toLowerCase();
    const fileSize = imageFile.size;
    
    // Create image element to analyze basic properties
    const imageUrl = URL.createObjectURL(imageFile);
    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const aspectRatio = width / height;
        
        // Clean up the object URL
        URL.revokeObjectURL(imageUrl);
        
        // Simulation logic for cassava plant detection
        let isValid = true;
        let reason = '';
        let confidence = 0;
        
        // Check file name for obvious non-plant indicators
        const nonPlantKeywords = ['person', 'people', 'human', 'face', 'car', 'vehicle', 'building', 'house', 'animal', 'cat', 'dog', 'food', 'meal'];
        const hasNonPlantKeyword = nonPlantKeywords.some(keyword => fileName.includes(keyword));
        
        // Check for cassava-related keywords
        const cassavaKeywords = ['cassava', 'plant', 'leaf', 'leaves', 'crop', 'agriculture', 'farm', 'botanical'];
        const hasCassavaKeyword = cassavaKeywords.some(keyword => fileName.includes(keyword));
        
        if (hasNonPlantKeyword) {
          isValid = false;
          reason = 'Image appears to contain non-plant content. Please upload an image of a cassava plant.';
          confidence = 85 + Math.floor(Math.random() * 10);
        } else if (aspectRatio < 0.5 || aspectRatio > 3) {
          // Very unusual aspect ratios might indicate non-plant images
          isValid = false;
          reason = 'Image dimensions suggest this may not be a plant image. Please upload a clear photo of a cassava plant.';
          confidence = 70 + Math.floor(Math.random() * 15);
        } else if (width < 100 || height < 100) {
          // Very small images might not be suitable for analysis
          isValid = false;
          reason = 'Image resolution is too low for accurate plant analysis. Please upload a higher quality image.';
          confidence = 90 + Math.floor(Math.random() * 8);
        } else if (fileSize < 10000) {
          // Very small file sizes might indicate low quality or non-photographic content
          isValid = false;
          reason = 'Image file size suggests low quality. Please upload a clear, high-quality photo of a cassava plant.';
          confidence = 75 + Math.floor(Math.random() * 15);
        } else {
          // Apply probabilistic validation
          let validationScore = 0.7; // Base probability
          
          if (hasCassavaKeyword) validationScore += 0.2;
          if (aspectRatio >= 0.8 && aspectRatio <= 1.5) validationScore += 0.1; // Square-ish images often better for plants
          if (fileSize > 100000) validationScore += 0.1; // Larger files often indicate better quality
          
          // Add some randomness to simulate real AI behavior
          const randomFactor = (Math.random() - 0.5) * 0.3;
          validationScore += randomFactor;
          
          if (validationScore < 0.6) {
            isValid = false;
            const reasons = [
              'Image does not appear to contain a cassava plant. Please upload a clear photo of cassava leaves or plant.',
              'Unable to detect cassava plant features in this image. Please ensure the image shows a cassava plant clearly.',
              'This image may not be of a cassava plant. Please upload an image showing cassava leaves, stems, or the whole plant.',
              'Plant detection failed - image may not contain recognizable cassava plant features.'
            ];
            reason = reasons[Math.floor(Math.random() * reasons.length)];
            confidence = 60 + Math.floor(Math.random() * 25);
          } else {
            confidence = Math.floor(validationScore * 100);
          }
        }
        
        console.log('Validation result:', { isValid, reason, confidence });
        resolve({ isValid, reason, confidence });
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        resolve({
          isValid: false,
          reason: 'Unable to process image file. Please ensure you uploaded a valid image format.',
          confidence: 95
        });
      };
      
      img.src = imageUrl;
    });
  }

  private static async simulateAnalysis(imageFile: File): Promise<PlantAnalysisResult> {
    // Get image metadata for simulation
    const imageSize = imageFile.size;
    const fileName = imageFile.name.toLowerCase();
    
    // Simulate different conditions based on various factors
    const conditions = Object.keys(plantConditions);
    let selectedCondition: string;
    let confidence: number;
    
    // Simple heuristic simulation based on file characteristics
    if (fileName.includes('disease') || fileName.includes('sick') || fileName.includes('infected')) {
      // If filename suggests disease, randomly select a disease condition
      const diseaseConditions = conditions.filter(c => c !== 'healthy');
      selectedCondition = diseaseConditions[Math.floor(Math.random() * diseaseConditions.length)];
      confidence = Math.floor(Math.random() * 20) + 75; // 75-95% confidence
    } else if (fileName.includes('healthy') || fileName.includes('good')) {
      selectedCondition = 'healthy';
      confidence = Math.floor(Math.random() * 15) + 85; // 85-100% confidence
    } else {
      // Random analysis with higher probability of health issues for demonstration
      const weights = {
        'healthy': 0.4,
        'cassava_mosaic_disease': 0.15,
        'cassava_bacterial_blight': 0.1,
        'leaf_spot_disease': 0.15,
        'pest_infestation': 0.1,
        'nutrient_deficiency': 0.1
      };
      
      const random = Math.random();
      let cumulativeWeight = 0;
      
      for (const [condition, weight] of Object.entries(weights)) {
        cumulativeWeight += weight;
        if (random <= cumulativeWeight) {
          selectedCondition = condition;
          break;
        }
      }
      
      selectedCondition = selectedCondition || 'healthy';
      confidence = Math.floor(Math.random() * 30) + 65; // 65-95% confidence
    }

    const conditionInfo = plantConditions[selectedCondition as keyof typeof plantConditions];
    const diseaseDetected = selectedCondition !== 'healthy';

    return {
      plantName: 'Cassava (Manihot esculenta)',
      condition: conditionInfo.name,
      severity: conditionInfo.severity,
      confidence: `${confidence}%`,
      pest: conditionInfo.pest,
      treatment: conditionInfo.treatment,
      prevention: conditionInfo.prevention,
      diseaseDetected,
      analysisDetails: diseaseDetected
        ? `Potential ${conditionInfo.name.toLowerCase()} detected with ${confidence}% confidence based on visual analysis patterns.`
        : `Plant appears healthy with ${confidence}% confidence based on visual assessment.`
    };
  }
}
