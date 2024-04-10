import { getImagePosts } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  const { page } = await req.json();
  const posts = await getImagePosts(page);

  return Response.json({ status: 200, posts });
}
