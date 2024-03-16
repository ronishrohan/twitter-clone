import { createPost } from "@/app/mongodb/controllers/post.controller";

export async function GET(req,res){
    await createPost();
    return Response.json({status: 201})
}