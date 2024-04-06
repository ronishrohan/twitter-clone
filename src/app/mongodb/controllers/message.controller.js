import { connectDatabase } from "@/app/utils/connectDatabase";
import { Message } from "../models/message.model";


export async function getMessages(id1,id2){
    await connectDatabase();
    console.log(id1,id2);
    const messages = await Message.find({users: {$all: [id1,id2]}});
    
    return messages;
}

export async function createMessage(id1,id2, by,content){
    await connectDatabase();
    await Message.create({users: [id1, id2], content: content, by:by})
}