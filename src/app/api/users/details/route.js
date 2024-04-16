import { Post } from "@/app/mongodb/models/post.model";
import { User } from "@/app/mongodb/models/user.model";
import { connectDatabase } from "@/app/utils/connectDatabase";

export async function POST(req, res) {
  await connectDatabase();
  const { username, id } = await req.json();
  let user;
  if (username) {
    user = await User.findOne({ username: username }).lean();
    
  } else if (id) {
    user = await User.findById(id).lean();
  }
  const posts = await Post.find({createdBy: user._id}).countDocuments();
  user.posts = posts;

  return Response.json({ user });
}
