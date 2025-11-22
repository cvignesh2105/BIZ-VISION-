import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const generateBlueprint = async (ideaTitle: string): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `Analyze the business idea: ${ideaTitle}. Create a comprehensive 2026-ready business blueprint. Include these exact sections with emoji headers: 
    
    📊 Executive Summary
    🚀 Marketing & Branding (Viral angles)
    💰 Sales Strategy
    🛠 Tech Stack & Tools (suggest specific modern software/AI tools)
    📅 Step-by-Step Launch Guide
    
    Base all advice on projected 2025-2026 technology trends. Format as clean Markdown. Use bolding for emphasis. Keep paragraphs concise.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No analysis could be generated at this time.";
  } catch (error) {
    console.error("Error generating blueprint:", error);
    throw new Error("Failed to generate blueprint. Please check your connection or API key.");
  }
};