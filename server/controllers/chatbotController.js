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
  const legalSystemPrompt = `
You are a legal expert chatbot. You must ONLY respond to queries about laws, legal concepts, and related topics. 
DO NOT provide responses to unrelated questions. If a user asks about non-legal topics, politely redirect them.

### Example Topics You Should Cover:
- Criminal Law (e.g., theft, assault, fraud)
- Civil Law (e.g., contracts, torts, property law)
- Constitutional Law
- Legal Rights (e.g., right to privacy, right to an attorney)
- Court Procedures
- Legal Defenses
- International Law

### Example of How You Should Respond:
- "Under the **Indian Penal Code (IPC) Section 420**, fraud is defined as..."
- "The **Miranda Rights** in the US ensure that..."
- "In **contract law**, consideration is required to form a binding agreement."

If the user asks a non-legal question, respond with:
"I'm here to discuss legal topics. Please ask a question related to laws or legal rights."

Stick strictly to legal content.
`;
const formatLegalResponse = (text) => {
    return text
      .replace(/\*/g, " ") // Removes asterisks 
      .replace(/_/g, " ") // Removes underscores
      .replace(/#+/g, " ") // Removes hashtags 
      .replace(/\n{2,}/g, "\n\n")
      .trim();
  };
export default async function chatResponse  (req, res)  {
    try {
        const { message } = req.body;
    
        if (!message) {
          return res.status(400).json({ error: "Message is required." });
        }
    
        const result = await model.generateContent([`${legalSystemPrompt}\n User: ${message}`]);

        
        console.log(result.response.text());
        const reply = formatLegalResponse(result.response.text());
    
        return res.json({ reply });
    
      } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: "Failed to generate response" });
      }
};