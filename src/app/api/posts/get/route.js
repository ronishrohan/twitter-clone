import { getPosts } from "@/app/mongodb/controllers/post.controller";

export  async function POST(req,res){
    const {page} = await req.json();
    const params = await req.nextUrl.searchParams;
    
    const posts = await getPosts(page, params.get("query"));
    return Response.json({posts});
}