import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event, context) => {
  console.log("--- Oracle Function Started ---");
  
  const key = process.env.GEMINI_API_KEY;
  console.log("Checking API Key:", key ? "Key exists" : "KEY IS MISSING");

  if (!key) {
    return { statusCode: 500, body: JSON.stringify({ error: "API Key is missing from environment" }) };
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    console.log("Calling Gemini API...");
    const result = await model.generateContent("Give me a one-sentence Unix fortune.");
    const responseText = result.response.text();
    
    console.log("Gemini Response:", responseText);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: responseText })
    };
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
