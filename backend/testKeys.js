const { GoogleGenerativeAI } = require('@google/generative-ai');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const geminiKey = process.env.GEMINI_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

console.log('==================================================');
console.log('          API KEY DIAGNOSTICS UTILITY             ');
console.log('==================================================\n');

async function testGemini() {
  console.log('--- Testing Gemini API ---');
  if (!geminiKey || geminiKey === 'your_gemini_api_key_here' || geminiKey.startsWith('your_')) {
    console.log('⚠️  GEMINI_API_KEY is not configured in .env\n');
    return;
  }

  const maskedKey = geminiKey.substring(0, 7) + '...' + geminiKey.substring(geminiKey.length - 4);
  console.log(`Key found: ${maskedKey}`);
  console.log('Sending test request to Gemini (gemini-1.5-flash)...');

  try {
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say "Gemini connection active!" and nothing else.');
    const text = result.response.text().trim();
    console.log(`✅ Success! Response: "${text}"\n`);
  } catch (error) {
    console.log(`❌ Failed: ${error.message}\n`);
  }
}

async function testOpenAI() {
  console.log('--- Testing OpenAI API ---');
  if (!openaiKey || openaiKey === 'your_openai_api_key_here' || openaiKey.startsWith('your_')) {
    console.log('⚠️  OPENAI_API_KEY is not configured in .env\n');
    return;
  }

  const maskedKey = openaiKey.substring(0, 7) + '...' + openaiKey.substring(openaiKey.length - 4);
  console.log(`Key found: ${maskedKey}`);
  console.log('Sending test request to OpenAI (gpt-4o-mini)...');

  try {
    const openai = new OpenAI({ apiKey: openaiKey });
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: 'Say "OpenAI connection active!" and nothing else.' }],
      max_tokens: 15
    });
    const text = response.choices[0].message.content.trim();
    console.log(`✅ Success! Response: "${text}"\n`);
  } catch (error) {
    console.log(`❌ Failed: ${error.message}\n`);
    if (error.message.includes('quota')) {
      console.log('💡 Note: Your key is valid, but your OpenAI account has run out of credits or billing is not set up.\n');
    }
  }
}

async function run() {
  await testGemini();
  await testOpenAI();
  console.log('==================================================');
}

run();
