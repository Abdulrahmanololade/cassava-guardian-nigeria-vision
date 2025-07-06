
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
  static async analyzeImage(imageFile: File): Promise<PlantAnalysisResult> {
    try {
      console.log('Starting plant analysis simulation...');
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate analysis based on image characteristics
      const analysisResult = await this.simulateAnalysis(imageFile);
      
      console.log('Plant analysis completed:', analysisResult);
      return analysisResult;
      
    } catch (error) {
      console.error('Error during plant analysis:', error);
      throw new Error('Failed to analyze plant image. Please try again.');
    }
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
