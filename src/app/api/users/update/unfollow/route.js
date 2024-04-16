import { unfollowUser } from "@/app/mongodb/controllers/user.controller";

export async function POST(req,res){
    const {id, userId} = await req.json();
    const followers = await unfollowUser(id, userId);

    return Response.json({followers});
}