import { getPosts } from "@/app/mongodb/controllers/post.controller";

export  async function POST(req,res){
    const {page, following} = await req.json();
    const params = await req.nextUrl.searchParams;
    const posts = await getPosts(page, params.get("query"), following);
    return Response.json({posts});
}