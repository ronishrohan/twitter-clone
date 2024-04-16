import { followUser } from "@/app/mongodb/controllers/user.controller";

export async function POST(req,res){
    const {id, userId} = await req.json();
    const followers = await followUser(id, userId);

    return Response.json({followers});
}