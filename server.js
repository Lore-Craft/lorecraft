'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const apiKey = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());

const axios = require('axios');

// OpenAI API endpoint and payload
const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo-0613';

// Function to generate a character backstory
async function generateBackstory(prompt) {
  try {
    // Request to the OpenAI API endpoint
    const response = await axios.post(
      OPENAI_API_ENDPOINT,
      {
        model: OPENAI_MODEL,
        messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const generatedStory = response.data.choices[0].message.content;
    return generatedStory;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('An error occurred');
  }
}

// Endpoint to generate a character backstory
app.post('/generate-backstory', async (req, res) => {
  try {
    const userInput = req.body;

    const prompt = `Generate a unique backstory for ${userInput.name}, a ${userInput.gender} ${userInput.race} ${userInput.charClass} character with a ${userInput.alignment} alignment in a fantasy setting in a unique place.`;

    const generatedStory = await generateBackstory(prompt);
    res.json({ generatedStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to regenerate a character backstory 
app.post('/regenerate-backstory', async (req, res) => {
  try {
    const userInput = req.body;

    const prompt = `Generate a different backstory for ${userInput.name}, a ${userInput.gender} ${userInput.race} ${userInput.charClass} character with a ${userInput.alignment} alignment in a fantasy setting in a unique place.`;

    const generatedStory = await generateBackstory(prompt);
    res.json({ generatedStory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
