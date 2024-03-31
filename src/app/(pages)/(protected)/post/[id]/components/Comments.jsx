"use client";
import React, { useEffect, useState, useTransition } from "react";
import Post from "../../../components/Post";
import axios from "axios";

function Comments({id}) {
  const [pending, startTransition] = useTransition();
  const [comments, setComments] = useState(null)
  useEffect(() => {
    startTransition(async () => {
      const res = await axios.post("/api/posts/comments", { id: id });
      setComments(res.data.comments);
    });
  }, []);
  return (
    <>
      {comments &&
        comments.map((comment, index) => {
          return (
            <Post
              key={index}
              user={comment.createdBy}
              details={{
                comments: comment.comments,
                likes: comment.likes,
                createdAt: comment.createdAt,
                id: comment._id,
                image: comment.image,
              }}
            >
              {comment.content}
            </Post>
          );
        })}
    </>
  );
}

export default Comments;
