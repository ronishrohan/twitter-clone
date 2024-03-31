import { like } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  const { id, userId } = await req.json();
  
  await like(id, userId);
  return Response.json({ status: 200 });
}
