import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import { getPosts } from "@/app/mongodb/controllers/post.controller";

async function page() {
  const posts = await getPosts();
  console.log(posts)
  return (
    <>
      <main className="size-full overflow-x-clip">
        <section className="font-roboto">
          <TopBar></TopBar>
          <CreatePost></CreatePost>
          {posts.map((post, index) => <Post>{post.content}</Post>)}
          
        </section>
      </main>
    </>
  );
}

export default page;
