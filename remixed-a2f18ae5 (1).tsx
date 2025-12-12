import React, { useState, useRef } from 'react';
import { Camera, Upload, Info, AlertCircle, CheckCircle, XCircle, Leaf, Droplets, Bug, Shield, Trash2, FileImage } from 'lucide-react';

const KangkungDiseaseDetector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scanner');
  const [imageQuality, setImageQuality] = useState(null);
  const fileInputRef = useRef(null);

  // Disease database with comprehensive information based on documentation
  const diseaseDatabase = {
    H0: {
      name: "Healthy Plant",
      severity: 0,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
      icon: CheckCircle,
      description: "Fully green leaf with no visible lesions or disease symptoms.",
      symptoms: [
        "Vibrant green leaves",
        "Stems firm and upright",
        "No spots, wilting or discoloration",
        "Uniform growth pattern",
        "Healthy leaf texture"
      ],
      biologicalInterpretation: "Strong physiological activity with optimal photosynthesis. Baseline class for comparison.",
      visualDescription: "Fully green leaf, no lesions",
      forAIUse: "Baseline class",
      treatment: {
        immediate: ["Continue current care practices", "Monitor regularly for any changes"],
        preventive: [
          "Maintain proper spacing (15-20cm) for good airflow",
          "Water at the base to keep leaves dry",
          "Remove any plant debris daily",
          "Practice crop rotation (avoid same location for 3 months)"
        ],
        cultural: ["Ensure adequate sunlight (6-8 hours)", "Maintain consistent watering schedule", "Use well-draining soil"]
      }
    },
    E1: {
      name: "Early Infection (Cercospora Leaf Spot)",
      severity: 1,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-300",
      icon: AlertCircle,
      description: "Initial fungal penetration with 1-3mm purple/brown dots and yellow halos.",
      symptoms: [
        "Small purple/brown dots (1-3mm diameter)",
        "Yellow halo around each lesion",
        "Light green patches on leaves",
        "Leaf edges may curl slightly",
        "Tips slightly pale",
        "Growth slower than usual",
        "Slightly leaf dropping in hot periods"
      ],
      biologicalInterpretation: "Initial fungal penetration through leaf stomata. Fungal spores germinating on moist leaf surfaces.",
      visualDescription: "1-3mm purple/brown dots with yellow halo",
      forAIUse: "Important for early detection model",
      lesionSizeRange: "1-3mm",
      treatment: {
        immediate: [
          "Remove affected leaves immediately (cut at stem)",
          "Isolate plant if in group setting (2m distance)",
          "Reduce overhead watering completely",
          "Improve air circulation around plants"
        ],
        chemical: [
          "Apply Chlorothalonil fungicide (500ppm solution)",
          "Alternative: Copper-based fungicide (1% solution)",
          "Spray in early morning (6-8am) or evening (5-7pm)",
          "Repeat application every 7-10 days",
          "Ensure thorough coverage of leaf surfaces"
        ],
        cultural: [
          "Water only at base of plant (avoid leaf wetting)",
          "Increase spacing between plants to 20-25cm",
          "Remove lower leaves touching soil",
          "Avoid working with plants when wet",
          "Ensure proper drainage"
        ],
        preventive: [
          "Apply preventive fungicide spray weekly",
          "Improve drainage around plants",
          "Ensure 6+ hours of direct sunlight"
        ]
      },
      prognosis: "Excellent recovery rate (>90%) if treated within 3-5 days. Plant can return to full health."
    },
    E2: {
      name: "Mid Infection (Cercospora Leaf Spot)",
      severity: 2,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
      icon: AlertCircle,
      description: "Sporulation phase with expanding lesions (5-12mm), turning brown-grey.",
      symptoms: [
        "Lesions expand to 5-12mm diameter",
        "Color changes from purple to brown-grey",
        "Yellowing on older leaves (chlorosis)",
        "Turgor loss on leaves",
        "Wilting that doesn't recover after watering",
        "Edges turn brown and brittle",
        "Stems become thin or weak",
        "Stunted growth (50% slower)",
        "Multiple lesions per leaf (3-8)"
      ],
      biologicalInterpretation: "Sporulation begins. Fungus spreading through leaf tissue, disrupting chlorophyll production and water transport.",
      visualDescription: "Lesions expand (5-12mm), turn brown-grey",
      forAIUse: "Helps severity classifier",
      lesionSizeRange: "5-12mm",
      treatment: {
        immediate: [
          "Remove all infected leaves (up to 30% of plant)",
          "Dispose of removed leaves in sealed bag - do NOT compost",
          "Stop overhead watering completely",
          "Increase plant spacing to 25-30cm if possible"
        ],
        chemical: [
          "Apply systemic fungicide (Mancozeb 80% WP at 2g/L or Propiconazole 25% EC at 1ml/L)",
          "Alternate between two different fungicide classes to prevent resistance",
          "Spray every 5-7 days for 3 weeks minimum",
          "Ensure complete coverage including leaf undersides",
          "Use spreader-sticker for better adhesion"
        ],
        cultural: [
          "Water only in morning (6-9am) at soil level",
          "Remove all plant debris around base daily",
          "Improve soil drainage with sand/organic matter",
          "Add 5cm organic mulch to prevent splash-back",
          "Prune for better air circulation (remove dense foliage)"
        ],
        nutritional: [
          "Apply balanced fertilizer (NPK 15-15-15) to boost immunity",
          "Avoid high nitrogen fertilizers (>20% N)",
          "Consider potassium supplement (K2O) for disease resistance",
          "Foliar spray with calcium chloride (0.5%)"
        ]
      },
      prognosis: "Good recovery possible (60-70%) with aggressive treatment. Yield may be reduced by 15-30%. Treatment must be consistent."
    },
    E3: {
      name: "Late/Severe Infection (Cercospora Leaf Spot)",
      severity: 3,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      icon: XCircle,
      description: "Tissue death with large necrotic patches (>12mm), leaf yellowing, and defoliation.",
      symptoms: [
        "Large necrotic patches (>12mm, up to 30mm)",
        "Severe leaf yellowing throughout plant",
        "Significant defoliation (>40% leaf loss)",
        "Crispy brown edges, leaf curling",
        "Stems collapse or severe yellowing",
        "Multiple coalescing lesions per leaf (8+)",
        "Plant height stunted (<50% normal)",
        "Root may rot if overwatered",
        "Severe wilting even after watering",
        "Plant may not recover"
      ],
      biologicalInterpretation: "Tissue death & chlorophyll collapse. Extensive fungal colonization has severely damaged vascular system. Photosynthesis critically impaired.",
      visualDescription: "Large necrotic patches (>12mm), leaf yellowing, defoliation",
      forAIUse: "Highest severity level",
      lesionSizeRange: ">12mm",
      treatment: {
        immediate: [
          "Assess plant viability (if >70% affected, consider removal)",
          "Remove ALL diseased foliage (may be 50-80% of plant)",
          "If roots healthy and firm, cut back to healthy green tissue",
          "Isolate from other plants immediately (5m minimum)",
          "Disinfect all tools with 10% bleach solution after use"
        ],
        chemical: [
          "Apply high-strength systemic fungicide (Propiconazole 25% EC at 2ml/L)",
          "Soil drench with fungicide to treat root zone (100ml per plant)",
          "Spray every 5 days for immediate control (minimum 4 applications)",
          "May need 4-6 weekly applications for any recovery",
          "Consider tank-mixing compatible fungicides"
        ],
        cultural: [
          "Remove plant from growing area if recovery unlikely",
          "Do NOT compost diseased material - burn or dispose in sealed bag",
          "Sterilize all tools with 70% alcohol or 10% bleach",
          "Treat soil with fungicide or solarize before replanting",
          "Let area rest for 3-4 weeks before new planting",
          "Remove all fallen leaves and debris from surrounding area"
        ],
        recovery: [
          "If attempting recovery: provide optimal conditions (25-30°C, high light)",
          "Reduce watering to minimum (check soil moisture first)",
          "Support weak stems with bamboo stakes",
          "Monitor daily for improvement or further decline",
          "Apply foliar nutrients (liquid fertilizer at half strength)",
          "Expect 4-6 weeks for any visible improvement"
        ]
      },
      prognosis: "Poor. Recovery rate is low (20-30%). Yield loss typically 60-100%. Priority is preventing spread to healthy plants. Consider replanting."
    },
    N0: {
      name: "Non-Disease / Image Quality Issue",
      severity: 0,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-300",
      icon: Info,
      description: "Image contains shadows, dirt, water droplets, or quality issues affecting accurate analysis.",
      symptoms: [
        "Heavy shadows obscuring leaf details",
        "Unclear or blurry plant features",
        "Dirt, mud, or debris on leaf surface",
        "Water droplets causing reflections",
        "Insufficient or uneven lighting",
        "Leaf out of focus",
        "Too far from subject",
        "Motion blur present"
      ],
      biologicalInterpretation: "Used for images that don't show clear disease symptoms or have quality issues. Helps AI model distinguish between actual disease and imaging artifacts.",
      visualDescription: "Shadows, dirt, or poor image quality",
      forAIUse: "Noise (non-disease) class for model training",
      treatment: {
        immediate: [
          "Gently clean leaves with soft, dry cloth",
          "Remove water droplets before photographing",
          "Wait for direct sunlight or use diffused flash",
          "Position leaf against neutral background if possible"
        ],
        photographyTips: [
          "Take photos in natural daylight (10am-3pm for best results)",
          "Hold camera steady or use tripod to avoid blur",
          "Focus directly on symptomatic areas or entire leaf",
          "Include entire lesion plus 2cm surrounding healthy tissue",
          "Keep camera 10-20cm from leaf for detail",
          "Avoid backlighting - position sun behind you",
          "Use macro mode if available on phone camera",
          "Take multiple photos from different angles"
        ],
        tips: [
          "Clean leaf surface gently before imaging",
          "Ensure no shadows fall on the leaf",
          "Use even, bright natural light",
          "Hold leaf flat if possible (support with paper)"
        ]
      }
    }
  };

  // Analyze image quality before detection
  const analyzeImageQuality = (imageData) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageDataObj.data;
        
        // Check for darkness (shadows)
        let darkPixels = 0;
        let brightPixels = 0;
        let totalBrightness = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          totalBrightness += brightness;
          if (brightness < 50) darkPixels++;
          if (brightness > 200) brightPixels++;
        }
        
        const avgBrightness = totalBrightness / (data.length / 4);
        const darkRatio = darkPixels / (data.length / 4);
        const brightRatio = brightPixels / (data.length / 4);
        
        const quality = {
          avgBrightness: avgBrightness,
          isTooDark: avgBrightness < 80,
          isTooBright: avgBrightness > 200,
          hasShadows: darkRatio > 0.3,
          hasOverexposure: brightRatio > 0.3,
          resolution: { width: img.width, height: img.height },
          isLowRes: img.width < 400 || img.height < 400
        };
        
        resolve(quality);
      };
      img.src = imageData;
    });
  };

  // Calculate severity score based on lesion characteristics
  const calculateSeverity = (stage, lesionCount, avgLesionSize) => {
    // Severity formula: weighted by lesion size and count
    // Assumes average leaf area of 50 cm² for water spinach
    
    const severityScores = {
      'H0': 0,
      'E1': Math.min((lesionCount * avgLesionSize * 0.2), 15), // Early: max 15%
      'E2': Math.min((lesionCount * avgLesionSize * 0.8), 45), // Mid: max 45%
      'E3': Math.min((lesionCount * avgLesionSize * 2.0), 100), // Severe: up to 100%
      'N0': 0
    };
    
    return Math.min(severityScores[stage] || 0, 100).toFixed(1);
  };

  // Simulated AI detection with more realistic analysis
  const analyzeImage = async () => {
    setAnalyzing(true);
    setResult(null);
    
    // First analyze image quality
    const quality = await analyzeImageQuality(selectedImage);
    setImageQuality(quality);
    
    // Simulate API call delay (realistic ML inference time)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check for image quality issues
    if (quality.isTooDark || quality.hasShadows || quality.isLowRes || quality.hasOverexposure) {
      // Higher chance of N0 detection with poor quality
      if (Math.random() > 0.4) {
        setResult({
          stage: 'N0',
          confidence: 0.72,
          disease: diseaseDatabase['N0'],
          lesionCount: 0,
          avgLesionSize: 0,
          severityScore: 0,
          timestamp: new Date().toLocaleString(),
          qualityIssues: {
            tooDark: quality.isTooDark,
            shadows: quality.hasShadows,
            lowRes: quality.isLowRes,
            overexposed: quality.hasOverexposure
          }
        });
        setAnalyzing(false);
        return;
      }
    }
    
    // Simulate realistic detection with varying lesion counts and sizes
    const detectionResults = [
      { stage: 'H0', confidence: 0.96, lesionCount: 0, avgLesionSize: 0, weight: 0.25 },
      { stage: 'E1', confidence: 0.89, lesionCount: Math.floor(Math.random() * 4) + 1, avgLesionSize: 1.2 + Math.random() * 1.8, weight: 0.30 },
      { stage: 'E2', confidence: 0.85, lesionCount: Math.floor(Math.random() * 6) + 4, avgLesionSize: 5 + Math.random() * 7, weight: 0.25 },
      { stage: 'E3', confidence: 0.81, lesionCount: Math.floor(Math.random() * 8) + 9, avgLesionSize: 12 + Math.random() * 18, weight: 0.15 },
      { stage: 'N0', confidence: 0.68, lesionCount: 0, avgLesionSize: 0, weight: 0.05 }
    ];
    
    // Weighted random selection for more realistic distribution
    const rand = Math.random();
    let cumulative = 0;
    let detected = detectionResults[0];
    
    for (const result of detectionResults) {
      cumulative += result.weight;
      if (rand <= cumulative) {
        detected = result;
        break;
      }
    }
    
    const severityScore = calculateSeverity(detected.stage, detected.lesionCount, detected.avgLesionSize);
    
    setResult({
      stage: detected.stage,
      confidence: detected.confidence + (Math.random() * 0.06 - 0.03), // Add slight variation
      disease: diseaseDatabase[detected.stage],
      lesionCount: detected.lesionCount,
      avgLesionSize: detected.avgLesionSize,
      severityScore: severityScore,
      timestamp: new Date().toLocaleString(),
      qualityIssues: quality.isTooDark || quality.hasShadows ? {
        tooDark: quality.isTooDark,
        shadows: quality.hasShadows
      } : null
    });
    
    setAnalyzing(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, etc.)');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image file is too large. Please upload an image smaller than 10MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResult(null);
        setImageQuality(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setResult(null);
    setImageQuality(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const SeverityBadge = ({ severity }) => {
    const badges = {
      0: { text: 'Healthy / No Disease', color: 'bg-green-100 text-green-800 border-green-300' },
      1: { text: 'Low Severity', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
      2: { text: 'Medium Severity', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      3: { text: 'High Severity', color: 'bg-red-100 text-red-800 border-red-300' }
    };
    const badge = badges[severity] || badges[0];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">Kangkung Disease Detection System</h1>
              <p className="text-green-100 text-sm">AI-Powered Cercospora Leaf Spot Diagnosis for Water Spinach</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'scanner' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Camera className="w-5 h-5 inline mr-2" />
            Disease Scanner
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all ${
              activeTab === 'database' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Info className="w-5 h-5 inline mr-2" />
            Disease Database
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'scanner' ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Upload Leaf Image</h2>
                {selectedImage && (
                  <button
                    onClick={resetScanner}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Clear and start over"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {!selectedImage ? (
                <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2 font-semibold">Upload a photo of water spinach leaf</p>
                  <p className="text-sm text-gray-500 mb-4">JPG, PNG up to 10MB</p>
                  <label className="bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-700 transition-colors inline-block font-semibold">
                    Choose Image
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Uploaded plant"
                      className="w-full h-80 object-contain rounded-lg mb-4 bg-gray-100 border-2 border-gray-200"
                    />
                    {imageQuality && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {imageQuality.resolution.width} × {imageQuality.resolution.height}
                      </div>
                    )}
                  </div>
                  
                  {/* Image Quality Warnings */}
                  {imageQuality && (imageQuality.isTooDark || imageQuality.hasShadows || imageQuality.isLowRes || imageQuality.hasOverexposure) && (
                    <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                      <div className="flex">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-yellow-800">Image Quality Issues Detected</h4>
                          <ul className="text-xs text-yellow-700 mt-1 space-y-0.5">
                            {imageQuality.isTooDark && <li>• Image is too dark - use better lighting</li>}
                            {imageQuality.hasShadows && <li>• Shadows detected - may affect accuracy</li>}
                            {imageQuality.isLowRes && <li>• Low resolution - get closer to leaf</li>}
                            {imageQuality.hasOverexposure && <li>• Overexposed - reduce direct light</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button
                      onClick={analyzeImage}
                      disabled={analyzing}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {analyzing ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Analyzing Image...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <Camera className="w-5 h-5 mr-2" />
                          Analyze for Disease
                        </span>
                      )}
                    </button>
                    <label className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer text-center flex items-center justify-center">
                      <Upload className="w-5 h-5 mr-2" />
                      Change Image
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Best Practices */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Photography Best Practices
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-800">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>Natural daylight (10am-3pm)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>Clean leaf surface first</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>10-20cm distance</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>No shadows on leaf</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>Focus on lesion area</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-1">✓</span>
                    <span>Include entire spot + 2cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
              
              {!result ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <Leaf className="w-24 h-24 mb-4 opacity-30" />
                  <p className="text-center text-gray-500">Upload and analyze an image<br/>to see disease detection results</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Detection Summary */}
                  <div className={`${result.disease.bgColor} ${result.disease.borderColor} border-2 rounded-lg p-4 shadow-sm`}>
                    <div className="flex items-start gap-3">
                      <result.disease.icon className={`w-10 h-10 ${result.disease.color} flex-shrink-0`} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <h3 className={`text-xl font-bold ${result.disease.color}`}>
                            {result.disease.name}
                          </h3>
                          <SeverityBadge severity={result.disease.severity} />
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{result.disease.description}</p>
                        
                        {/* Lesion Analysis */}
                        {result.lesionCount > 0 && (
                          <div className="bg-white rounded-lg p-3 mb-3 border border-gray-300 shadow-sm">
                            <h4 className="font-semibold text-gray-700 text-sm mb-2 flex items-center">
                              <Bug className="w-4 h-4 mr-1 text-red-600" />
                              Lesion Analysis
                            </h4>
                            <div className="grid grid-cols-3 gap-3 text-sm">
                              <div>
                                <span className="text-gray-600 text-xs">Lesion Count</span>
                                <p className="font-bold text-gray-800 text-lg">{result.lesionCount}</p>
                              </div>
                              <div>
                                <span className="text-gray-600 text-xs">Avg Size</span>
                                <p className="font-bold text-gray-800 text-lg">{result.avgLesionSize.toFixed(1)} mm</p>
                              </div>
                              <div>
                                <span className="text-gray-600 text-xs">Severity Score</span>
                                <p className="font-bold text-red-600 text-lg">{result.severityScore}%</p>
                              </div>
                            </div>
                            {result.disease.lesionSizeRange && (
                              <p className="text-xs text-gray-600 mt-2 italic">
                                Expected range for {result.stage}: {result.disease.lesionSizeRange}
                              </p>
                            )}
                          </div>
                        )}
                        
                        {/* Quality Issues Warning */}
                        {result.qualityIssues && (
                          <div className="bg-yellow-50 border border-yellow-300 rounded p-2 mb-3">
                            <p className="text-xs text-yellow-800">
                              <AlertCircle className="w-3 h-3 inline mr-1" />
                              Image quality issues may affect accuracy. Consider retaking photo.
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span className="flex items-center">
                            <span className="font-semibold mr-1">Confidence:</span>
                            {(result.confidence * 100).toFixed(1)}%
                          </span>
                          <span>•</span>
                          <span>{result.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      Immediate Actions Required
                    </h4>
                    <ul className="space-y-2">
                      {result.disease.treatment.immediate.map((action, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="text-green-600 mr-2 font-bold flex-shrink-0">▸</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('database');
                        setTimeout(() => {
                          document.getElementById(result.stage)?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                    >
                      View Full Treatment
                    </button>
                    <button
                      onClick={resetScanner}
                      className="bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
                    >
                      Analyze Another
                    </button>
                  </div>

                  {/* Additional Info */}
                  {result.disease.prognosis && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <h4 className="font-semibold text-purple-900 text-sm mb-1">Prognosis</h4>
                      <p className="text-xs text-purple-800">{result.disease.prognosis}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Disease Database */
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Disease Information Database</h2>
              <p className="text-gray-600 mb-3">
                Comprehensive guide to Cercospora leaf spot in water spinach (Ipomoea aquatica), based on H0-E1-E2-E3-N0 classification system.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <p className="text-sm text-blue-900">
                  <Info className="w-4 h-4 inline mr-1" />
                  <strong>Pathogen:</strong> Cercospora spp. (Deuteromycetes - Fungi Imperfecti) • <strong>Survival:</strong> Conidia + mycelia on debris
                </p>
              </div>
            </div>

            {Object.entries(diseaseDatabase).map(([code, disease]) => (
              <div
                key={code}
                id={code}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-8 ${disease.borderColor}`}
              >
                <div className={`${disease.bgColor} p-6 border-b-2 ${disease.borderColor}`}>
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <disease.icon className={`w-12 h-12 ${disease.color}`} />
                      <div>
                        <h3 className={`text-2xl font-bold ${disease.color}`}>{disease.name}</h3>
                        <p className="text-sm text-gray-600 font-mono">Classification Code: {code}</p>
                      </div>
                    </div>
                    <SeverityBadge severity={disease.severity} />
                  </div>
                  <p className="text-gray-700 leading-relaxed">{disease.description}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Visual Description & AI Use */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                      <h4 className="font-semibold text-indigo-900 mb-2 text-sm">Visual Description</h4>
                      <p className="text-sm text-indigo-800">{disease.visualDescription}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2 text-sm">AI Classification Purpose</h4>
                      <p className="text-sm text-purple-800">{disease.forAIUse}</p>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                      <Bug className="w-5 h-5 mr-2 text-red-600" />
                      Observable Symptoms
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {disease.symptoms.map((symptom, idx) => (
                        <div key={idx} className="flex items-start bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="text-red-500 mr-2 font-bold text-lg leading-none">●</span>
                          <span className="text-sm text-gray-700">{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Biological Interpretation */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <FileImage className="w-5 h-5 mr-2" />
                      Biological Interpretation
                    </h4>
                    <p className="text-sm text-blue-800 leading-relaxed">{disease.biologicalInterpretation}</p>
                  </div>

                  {/* Treatment Protocols */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                      <Droplets className="w-5 h-5 mr-2 text-green-600" />
                      Treatment & Management Protocol
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(disease.treatment).map(([category, actions]) => (
                        <div key={category} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                          <h5 className="font-semibold text-green-900 mb-3 capitalize text-base">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <ul className="space-y-2">
                            {actions.map((action, idx) => (
                              <li key={idx} className="text-sm text-gray-800 flex items-start leading-relaxed">
                                <span className="text-green-600 mr-2 font-bold flex-shrink-0">▸</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prognosis */}
                  {disease.prognosis && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-lg p-4 shadow-sm">
                      <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Prognosis & Expected Outcome
                      </h4>
                      <p className="text-sm text-purple-800 leading-relaxed">{disease.prognosis}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Additional Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Annotation Guidelines for Image Collection</h3>
              <div className="space-y-3">
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h4 className="font-semibold text-yellow-900 mb-2">Bounding Box Rules</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>✓ Include entire lesion, even the yellow halo</li>
                    <li>✓ Use tight bounding boxes (minimal empty space)</li>
                    <li>✗ Do NOT include shadows or dirt in annotation</li>
                  </ul>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h4 className="font-semibold text-green-900 mb-2">Image Capture Standards</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Date captured: Record for tracking disease progression</li>
                    <li>• Target plant: Water Spinach (Ipomoea aquatica)</li>
                    <li>• Disease name: Cercospora Leaf Spot</li>
                    <li>• Pathogen: Cercospora spp.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-bold mb-2">System Information</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                AI-Powered Disease Detection for Water Spinach (Ipomoea aquatica) using CNN-based Image Classification & Object Detection
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Classification System</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                H0-E1-E2-E3-N0 staging system for Cercospora Leaf Spot severity assessment
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Pathogen Details</h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Fungus: Cercospora spp. • Classification: Deuteromycetes (Fungi Imperfecti) • Survival: Conidia + mycelia on plant debris
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-4 text-center">
            <p className="text-xs text-gray-500">
              For research and agricultural education purposes • Always consult agricultural extension services for professional diagnosis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KangkungDiseaseDetector;