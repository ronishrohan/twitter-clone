import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 200,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: generationConfig
    });
    const data = await req.json();

    const result = await model.generateContent(data.query)
    const response = await result.response;
    const text = response.text();
    console.log(text)

    return Response.json({status: 201, response: text})
  } catch (error) {
    console.log(error);
    return Response.json({ status: 404 });
  }
}
