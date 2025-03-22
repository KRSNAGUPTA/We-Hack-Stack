import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export default async function generateQuiz  (req, res)  {
  try {
    const { topic, difficulty } = req.body;

    if (!topic || !difficulty ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `
  Generate a multiple-choice quiz strictly on **legal laws and related topics**.

  **Guidelines:**
  - The quiz must be related to **criminal law, civil law, constitutional law, corporate law, intellectual property law, human rights law, or international law**.
  - The topic entered by the user is: **"${topic}"**.
  - If the topic is **not related to law**, ignore it and generate a **legally relevant** quiz instead.
  - Ensure questions are fact-based and aligned with actual legal principles.
  - Avoid fictional scenarios, political bias, or speculative questions.

  **Quiz Format:**
  - **Number of Questions:** Exactly **10**
  - **Difficulty Level:** ${difficulty}
  - Each question should have:
    - A clear and precise legal question.
    - Four answer choices labeled (A, B, C, D).
    - A correct answer marked in "answer" field.
    - NO extra formatting like markdown  or explanations.
  **Output JSON format:**  
  [
    { "question": "What is the primary purpose of contract law?", "options": ["A. Enforce agreements", "B. Punish criminals", "C. Protect copyrights", "D. Regulate elections"], "answer": "A" },
    { "question": "Which amendment in the U.S. Constitution protects against self-incrimination?", "options": ["A. First Amendment", "B. Fourth Amendment", "C. Fifth Amendment", "D. Sixth Amendment"], "answer": "C" }
  ]

  **Generate exactly 10 questions now.**
  ### **STRICT JSON OUTPUT (NO EXTRAS)**
`;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const cleanJSON = responseText.replace(/```json|```/g, "").trim();


    // console.log(cleanJSON);
    let quizData;
    
    try {
      quizData = JSON.parse(cleanJSON);
    } catch (error) {
      return res.status(500).json({ error: "Failed to parse Gemini response" });
    }

    res.json({ quiz: quizData });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};
