import { connectDatabase } from "@/app/utils/connectDatabase";
import { Message } from "../models/message.model";
import { addUserToMessaging, getUserMessaging } from "./user.controller";


export async function getMessages(id1,id2){
    
    
    const messages = await Message.find({users: {$all: [id1,id2]}});
    
    return messages;
}


export async function createMessage(id1,id2, by,content){
    const reciever = id1 == by ? id2 : id1;
    
    await addUserToMessaging(reciever, by);
    await Message.create({users: [id1, id2], content: content, by:by})
}