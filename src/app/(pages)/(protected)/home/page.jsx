import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import { getPosts } from "@/app/mongodb/controllers/post.controller";

import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";

async function page() {
  const posts = await getPosts();
  return (
    <>
      <main className="size-full overflow-x-clip">
        <section className="font-roboto">
          <TopBar></TopBar>
          <CreatePost></CreatePost>
          {posts.map((post, index) => (
            <Post
              key={index}
              userId={post.createdBy}
              details={{
                comments: post.comments,
                reposts: post.reposts,
                likes: post.reposts,
                created: post.createdAt,
              }}
            >
              {post.content}
            </Post>
          ))}
        </section>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
}

export default page;
