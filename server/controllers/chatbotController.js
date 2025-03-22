import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


import  {GoogleGenerativeAI} from "@google/generative-ai";
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export default async function chatResponse  (req, res)  {
    try {
        const { message } = req.body;
    
        if (!message) {
          return res.status(400).json({ error: "Message is required." });
        }
    
        const result = await model.generateContent([message]);

        console.log(result.response.text());
        const reply = result.response.text();
    
        return res.json({ reply });
    
      } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Failed to generate response" });
      }
};