import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export const getGeminiResponse = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw error;
  }
};