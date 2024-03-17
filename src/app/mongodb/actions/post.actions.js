"use server"
import { revalidatePath } from "next/cache";
import { createPost } from "../controllers/post.controller";
import { getServerSession } from "next-auth";
import { getUserDetails } from "../controllers/user.controller";
export async function createPostAction( content) {
  const session = await getServerSession();

  const {id} = await getUserDetails(session.user.email)
  
  await createPost({createdBy: id,content: content});
  revalidatePath("/home")
}
