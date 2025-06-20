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
    
    console.log('Generating cocktail with prompt:', prompt);
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Elena, a mystical mixologist with centuries of cocktail wisdom. Create cocktails that are both delicious and have a touch of magic. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    // Parse the response
    const cocktailData = JSON.parse(completion.choices[0].message.content);
    
    // Add some mystical flair
    const response = {
      ...cocktailData,
      mysticalNote: generateMysticalNote(mood),
      brewedAt: new Date().toISOString(),
      elenasSeal: "✨🍹✨"
    };

    res.json({
      success: true,
      cocktail: response
    });

  } catch (error) {
    console.error('Error generating cocktail:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to brew your magical elixir',
      details: error.message
    });
  }
});

// Helper function to build OpenAI prompt
function buildCocktailPrompt(flavors, fanciness, alcoholTypes, mood, description) {
  let prompt = `Create a cocktail recipe with these preferences:
  
Flavors: ${flavors ? flavors.join(', ') : 'surprise me'}
Fanciness level: ${fanciness}/10
Alcohol types: ${alcoholTypes ? alcoholTypes.join(', ') : 'any'}
Mood: ${mood ? (Array.isArray(mood) ? mood.join(', ') : mood) : 'relaxed'}
Description: ${description || 'something delicious'}

Return ONLY valid JSON in this exact format:
{
  "name": "Cocktail Name",
  "description": "Brief mystical description",
  "ingredients": [
    {"item": "ingredient name", "amount": "measurement"},
    {"item": "ingredient name", "amount": "measurement"}
  ],
  "instructions": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "glassware": "type of glass",
  "garnish": "garnish description",
  "difficulty": "Easy/Medium/Hard",
  "prepTime": "X minutes"
}`;

  return prompt;
}

// Generate mystical notes based on mood
function generateMysticalNote(mood) {
  const notes = {
    'transcendent': '🌌 A cosmic elixir that elevates the spirit beyond earthly bounds',
    'mysterious': '🌙 A shadowy potion shrouded in ancient secrets and moonlight magic',
    'energetic': '⚡ An electrifying brew that sparks lightning in your veins',
    'contemplative': '🔮 A wisdom-infused draught for deep thoughts and inner reflection',
    'passionate': '🔥 A fiery concoction that ignites the flames of desire',
    'serene': '🕊️ A peaceful elixir that brings harmony to mind, body, and soul'
  };
  
  // Handle mood as array or string
  if (Array.isArray(mood) && mood.length > 0) {
    const primaryMood = mood[0];
    return notes[primaryMood] || '🔮 A mysterious elixir with unknown powers';
  }
  
  return notes[mood] || '🔮 A mysterious elixir with unknown powers';
}

// Health check endpoint
app.get('/cocktail-generator', (req, res) => {
  res.json({
    message: "Elena's Cocktail Generator is brewing! 🧙‍♀️",
    status: "ready",
    endpoints: {
      generate: "POST /cocktail-generator"
    }
  });
});

module.exports = app;