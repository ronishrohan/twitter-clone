import { Post } from "../models/post.model";
import mongoose, { ObjectId, connect } from "mongoose";
import { connectDatabase } from "@/app/utils/connectDatabase";
import { User } from "../models/user.model";

const n = 5;

export async function createPost({ createdBy, content, image, repost }) {
  await connectDatabase();
  try {
    const post = await Post.create({
      createdBy: new mongoose.Types.ObjectId(createdBy),
      content: content,
      image: image,
      repost: repost,
    });
    console.log(post);
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(page) {
  await connectDatabase();
  const posts = await Post.find({}, null, { limit: n, skip: n * page })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate({ path: "repost", populate: "createdBy" });

  return posts;
}

export async function getUserPosts(page, id) {
  await connectDatabase();
  const posts = await Post.find({ createdBy: id }, null, {
    limit: n,
    skip: n * page,
  })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate({ path: "repost", populate: "createdBy" });

  return posts;
}

export async function getLikedPosts(page, id) {
  await connectDatabase();
  const posts = await Post.find({ likedBy: { $in: [id] } }, null, {
    limit: n,
    skip: n * page,
  })
    .sort({ createdAt: -1 })
    .populate({ path: "createdBy" })
    .populate({ path: "repost", populate: "createdBy" });

  return posts;
}

export async function like(id, userId) {
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { likes: 1 },
      $push: { likedBy: userId },
    },
    { new: true }
  );
  console.log(existPost);
}

export async function unlike(id, userId) {
  await connectDatabase();
  const existPost = await Post.findByIdAndUpdate(
    id,
    {
      $inc: { likes: -1 },
      $pull: { likedBy: userId },
    },
    { new: true }
  );
  console.log(existPost);
}

export async function getSavedPosts(id) {
  await connectDatabase();
  const user = await User.findById(id)
    .populate("savedPosts")
    .populate({
      path: "savedPosts",
      populate: [
        {
          path: "createdBy",
        },
        {
          path: "repost",
          populate: "createdBy",
        },
      ],
    });

  console.log(user.savedPosts);

  return user.savedPosts;
}
