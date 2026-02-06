import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event, context) => {
  const key = process.env.GEMINI_API_KEY;

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    const result = await model.generateContent("Give me a one-sentence Unix fortune.");
    const responseText = result.response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: responseText })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
