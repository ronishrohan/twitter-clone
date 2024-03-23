import TopBar from "./components/TopBar";
import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

import QuickAccessHolder from "@/app/components/quick-access/QuickAccessHolder";

async function page() {
 
  return (
    <>
      <main className="size-full overflow-x-clip">
        <section className="font-roboto h-full">
          <TopBar></TopBar>
          <CreatePost></CreatePost>
          <Posts></Posts>
        </section>
      </main>
      <QuickAccessHolder></QuickAccessHolder>
    </>
  );
}

export default page;
