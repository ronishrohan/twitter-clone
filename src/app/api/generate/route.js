import { GoogleGenerativeAI } from "@google/generative-ai";



export async function POST(req){
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET)
    
        const model = genAI.getGenerativeModel({model: "gemini-pro"})
        const data = await req.json()
    
        const result = await model.generateContent(data.query)
        const response = await result.response;
        const text = response.text();
        console.log(text)
        return Response.json({status: 201, response: text})
        
    } catch (error) {
        console.log(error)
        return Response.json({status: 404})
    }
}