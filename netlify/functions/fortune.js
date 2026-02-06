import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event, context) => {
  // Use an environment variable for the key
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a Unix fortune database. Output one short, cryptic, or funny sentence. 15 words max."
  });

  try {
    const result = await model.generateContent("Fetch fortune.");
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: result.response.text() })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "The stars are misaligned." }) };
  }
};
