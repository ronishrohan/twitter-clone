import mongoose from "mongoose";

let connected;

export async function connectDatabase(){
    if(connected){
        return;
    }
    try {
        const client = await mongoose.connect(`${process.env.MONGODB_URI}/waffle`)
        connected = client.connections[0].readyState;
    } catch (error) {
        console.log(error)
    }
}