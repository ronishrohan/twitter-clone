import { updateUsername } from "@/app/mongodb/controllers/user.controller";

export async function POST(req,res){
    const {username, id} = await req.json();
    const status = await updateUsername(username, id);
    if(status==0){
        return Response.json({status: 500})
    }
    else if(status==1){
        return Response.json({status: 200})
    }
}