"use server"
import { revalidatePath } from "next/cache";
import { createPost } from "../controllers/post.controller";
export async function createPostAction(userId, content) {
  await createPost({createdBy: userId,content: content});
  revalidatePath("/home")
}
