import { createPost } from "@/app/mongodb/controllers/post.controller";

export async function POST(req,res){
    const data = await req.json();

    await createPost({createdBy: data.userId, content: data.content});
    return Response.json({status: 201})
}