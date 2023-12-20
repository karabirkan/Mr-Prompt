"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PostForm from "./PostForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Feed = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState("");

  const [posts, setPosts] = useState([]);

  const [filteredPosts, setFilteredPosts] = useState([]);

  const [submit, setSubmit] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
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
        }),
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = () => {};

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const searchedText = posts.filter(
      (item) =>
        item.tag.includes(searchText) ||
        item.creator.email.includes(searchText) ||
        item.creator.username.includes(searchText) ||
        item.prompt.includes(searchText)
    );
    setFilteredPosts(searchedText);
  }, [searchText, posts]);

  return (
    <section className="feed">
      <PostForm
        type="submit your madness"
        post={post}
        setPost={setPost}
        submit={submit}
        handleSubmit={createPost}
      />

      {/* <form className=" mt-16 relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}

      <div className="mt-16 prompt_layout">
        {filteredPosts.length > 0
          ? filteredPosts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              />
            ))
          : posts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              />
            ))}
      </div>
    </section>
  );
};

export default Feed;
