import { Post } from "../models/post.model";
import mongoose, { ObjectId } from "mongoose";
import { connectDatabase } from "@/app/utils/connectDatabase";

export async function createPost({ createdBy, content }) {
  await connectDatabase();
  try {
    const post = await Post.create({
      createdBy: new mongoose.Types.ObjectId(createdBy),
      content: content,
    });
    console.log("Post created");
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts() {
  await connectDatabase();
  // const posts = await Post.find({})
  //   .populate({ path: "createdBy" })
  //   .sort({ createdAt: -1 })
  //   .limit(5);
  const posts = [{}]
  return posts;
}

export async function getUserPosts(id) {
  await connectDatabase();
  const posts = await Post.find({createdBy: id}).populate({ path: "createdBy" }).limit(10);
  return posts;
}
