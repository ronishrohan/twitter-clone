"use client"
import React from "react";
import Post from "./Post";

export default function Chunk(){
    return <>
    <div>tyest</div></>
}

// function Chunk({posts}) {
//   return (
//     <>
//       {posts.map((post, index) => (
//         <Post
//           key={index}
//           user={post.createdBy}
//           details={{
//             comments: post.comments,
//             reposts: post.reposts,
//             likes: post.reposts,
//             created: post.createdAt,
//           }}
//         >
//           {post.content}
//         </Post>
//       ))}
//     </>
//   );
// }

// export default Chunk;
