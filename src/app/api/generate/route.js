import { GoogleGenerativeAI } from "@google/generative-ai";



export async function GET(req){
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET)

    const model = genAI.getGenerativeModel({model: "gemini-pro"})
    const body = await req.body;

    const result = await model.generateContent("Write numbers from 1-10")
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return Response.json({status: "ok"})
    
}