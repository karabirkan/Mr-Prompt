"use client";

import PostForm from "@components/PostForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    date: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmit(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          date: post.date,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };
  return (
    <PostForm
      type="Create"
      post={post}
      setPost={setPost}
      submit={submit}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
