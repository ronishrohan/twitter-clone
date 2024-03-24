import { Post } from "../models/post.model";
import mongoose, { ObjectId } from "mongoose";
import { connectDatabase } from "@/app/utils/connectDatabase";

const n = 5;

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

export async function getPosts(page) {
  await connectDatabase();
  const posts = await Post.find({}, null, {limit: n, skip: n*page}).sort({createdAt: -1})
    .populate({ path: "createdBy" })

  return posts;
}

export async function getUserPosts(page,id) {
  await connectDatabase();
  const posts = await Post.find({createdBy:id}, null, {limit: n, skip: n*page}).sort({createdAt: -1})
    .populate({ path: "createdBy" })

  return posts;
}
