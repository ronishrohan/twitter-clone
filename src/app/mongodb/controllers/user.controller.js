import { connectDatabase } from "../../utils/connectDatabase";
import { User } from "../models/user.model";
export async function createUser(profile) {
  console.log(profile);

  await connectDatabase();
  const existUser = await User.findOne({ email: profile.email });
  
  if (!existUser) {
    const username = profile.email.slice(0, profile.email.indexOf("@"));
    const user = await User.create({
      username: username,
      fullName: profile.name,
      email: profile.email,
      avatar: profile.picture,
    });
    console.log("User created");
  } else {
    console.log("User already exists");
  }
}

export async function getUserDetailsById(id) {
  const user = await User.findById(id);
  return {
    username: user.username,
    fullName: user.fullName,
    avatar: user.avatar,
  };
}

export async function getUserDetails(email) {
  
  const user = await User.findOne({ email: email });
  return {
    id: user._id,
    username: user.username,
    fullName: user.fullName,
    avatar: user.avatar,
  };
}
