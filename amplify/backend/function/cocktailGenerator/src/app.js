const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const OpenAI = require('openai');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Initialize OpenAI (API key from environment variables)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// POST endpoint for cocktail generation
app.post('/cocktail-generator', async (req, res) => {
  try {
    const { flavors, fanciness, alcoholTypes, mood, description } = req.body;
    
    // Build the OpenAI prompt
    const prompt = buildCocktailPrompt(flavors, fanciness, alcoholTypes, mood, description);
    
    console.log('🧙‍♀️ Elena is channeling mystical energies with prompt:', prompt);
    
    // Call OpenAI API with GPT-4.1 mini
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are Elena, an ancient mystical mixologist with centuries of cocktail wisdom. You possess deep knowledge of flavor profiles, ingredient interactions, and proper cocktail techniques. Your recipes are both delicious and have a touch of magic. You always provide precise measurements, proper techniques, and mystical descriptions. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000 // Increased for more detailed responses
    });

    // Parse the response
    const cocktailData = JSON.parse(completion.choices[0].message.content);
    
    // Add Elena's magical signature
    const response = {
      ...cocktailData,
      brewedAt: new Date().toISOString(),
      elenasSeal: "✨🍹✨",
      moonPhase: getCurrentMoonPhase(), // Add some extra mystical flair
      energyLevel: calculateEnergyLevel(fanciness, mood)
    };

    res.json({
      success: true,
      cocktail: response
    });

  } catch (error) {
    console.error('🔮 Mystical brewing error:', error);
    res.status(500).json({
      success: false,
      error: 'The cosmic energies are misaligned - your elixir could not be brewed',
      details: error.message
    });
  }
});

// Helper function to build the enhanced OpenAI prompt
function buildCocktailPrompt(flavors, fanciness, alcoholTypes, mood, description) {
  const template = `Create a mystical cocktail recipe with these preferences:

Flavors (use flavors to inform the user palette): ${formatArray(flavors)}
Fanciness level (for fancier cocktails, use more premium ingredients, for top fanciness, use rarest most unique ingredients): ${fanciness}/10
Alcohol types (be a mind reader here, if user selected too many, you can choose which alcohols would benefit cocktail best): ${formatArray(alcoholTypes)}
Mood (channel the users energy and vibes to create a perfect elixir): ${formatArray(mood)}
Description (pay attention here, this is user's own voice, make sure to channel their magic): ${description || 'surprise me with your mystical wisdom'}

Requirements:
- Use proper cocktail measurements (oz, dashes, splash, etc.)
- Include specific spirits and brands when relevant
- Provide detailed step-by-step instructions with proper techniques
- Match the fanciness level (${fanciness}/10 = ${getFancinessDescription(fanciness)})
- Incorporate the mood into flavor profile and presentation
- Use mystical, witchy language while remaining practical
- Combine all information you have to read users energy, keep things open ended and wise, suggest a tarot card representing their current mood.

Return ONLY valid JSON in this exact format:
{
  "name": "Cocktail Name (mystical/creative)",
  "description": "2-3 sentence mystical description that captures the essence and mood",
  "ingredients": [
    {"item": "specific ingredient name", "amount": "precise measurement"},
    {"item": "specific ingredient name", "amount": "precise measurement"}
  ],
  "instructions": [
    "Step 1 with specific technique (muddle, shake, stir, etc.)",
    "Step 2 with timing and method details",
    "Step 3 with presentation notes",
    "Final garnish and serving instructions"
  ],
  "glassware": "specific glass type (coupe, rocks, highball, etc.)",
  "garnish": "detailed garnish with preparation instructions",
  "difficulty": "Easy/Medium/Hard",
  "prepTime": "X minutes",
  "servingSize": "1 cocktail",
  "alcoholContent": "Medium/Strong/Light",
  "flavorProfile": ["primary", "secondary", "tertiary"],
  "techniques": ["shaking", "muddling", "etc"],
  "mysticalProperties": "Brief note about the cocktail's magical effects",
  "tarotCard": "card name",
  "tarotReading": "Explain how the tarot card fits them."
}`;

  return template;
}

// Helper function to format arrays for prompt
function formatArray(arr) {
  if (!arr || arr.length === 0) return 'surprise me';
  if (Array.isArray(arr)) return arr.join(', ');
  return arr.toString();
}

// Helper function to get fanciness description
function getFancinessDescription(fanciness) {
  if (fanciness <= 3) return 'simple and approachable';
  if (fanciness <= 6) return 'moderately sophisticated';
  if (fanciness <= 8) return 'sophisticated but not overly complex';
  return 'extremely fancy with rare, premium ingredients';
}

// Add some extra mystical functions
function getCurrentMoonPhase() {
  const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();
  const phaseIndex = Math.floor((dayOfMonth / 30) * 8) % 8;
  return phases[phaseIndex];
}

function calculateEnergyLevel(fanciness, mood) {
  const baseEnergy = fanciness || 5;
  const moodMultiplier = Array.isArray(mood) && mood.includes('energetic') ? 1.5 : 1;
  const energy = Math.min(10, Math.floor(baseEnergy * moodMultiplier));
  
  if (energy <= 3) return 'Gentle';
  if (energy <= 6) return 'Balanced';
  if (energy <= 8) return 'Vibrant';
  return 'Transcendent';
}

// Health check endpoint
app.get('/cocktail-generator', (req, res) => {
  res.json({
    message: "Elena's Mystical Cocktail Generator is brewing with enhanced cosmic energies! 🧙‍♀️✨",
    status: "ready",
    model: "gpt-4.1-mini",
    capabilities: [
      "Mystical cocktail creation",
      "Tarot card readings", 
      "Moon phase tracking",
      "Energy level assessment"
    ],
    endpoints: {
      generate: "POST /cocktail-generator"
    }
  });
});

module.exports = app;