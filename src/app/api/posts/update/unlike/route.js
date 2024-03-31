import { unlike } from "@/app/mongodb/controllers/post.controller";

export async function POST(req, res) {
  const { id, userId } = await req.json();
  
  await unlike(id, userId);
  return Response.json({ status: 200 });
}
