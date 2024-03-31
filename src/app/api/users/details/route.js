import { User } from "@/app/mongodb/models/user.model";
import { connectDatabase } from "@/app/utils/connectDatabase";

export async function POST(req,res){
    await connectDatabase();
    const {username} = await req.json();
    const user = await User.findOne({username: username});
    
    return Response.json({user})
}