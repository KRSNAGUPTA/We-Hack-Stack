import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
  });
  
  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
  };
  
export default async function chatResponse  (req, res)  {
  try {
    const { message, history } = req.body;

    const chatSession = model.startChat({
      generationConfig,
      history: history || [],
    });

    const result = await chatSession.sendMessage(message);
    const responseText = await result.response.text();

    res.json({ response: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
};