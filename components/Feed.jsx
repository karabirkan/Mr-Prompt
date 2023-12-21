"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PostForm from "./PostForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          date: Date(),
        }),
      });

      if (response.ok) {
        fetchPosts();
        setPost({
          prompt: "",
          tag: "",
          date: "",
        });
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
      {session ? (
        <>
          <h1 className="head_text text-center">
            <br className="max-md:hidden" />
            <span className="orange_gradient">unleash your rage</span>
          </h1>
          <p className="desc text-center">
            spill the tea, vent the rage. it is your space to express without
            judgment.
          </p>
          <PostForm
            type="submit your madness"
            post={post}
            setPost={setPost}
            submit={submit}
            handleSubmit={createPost}
          />
        </>
      ) : (
        <>
          <Image
            src="/assets/images/logo.png"
            width={300}
            height={300}
            alt="pp"
          />
          <h1 className="head_text_login text-center">
            Please log in to unlock the vault and unleash your inner storm.{" "}
            <br className="max-md:hidden" />
            <span className="orange_gradient text-center">
              Share what made you mad today!
            </span>
          </h1>
        </>
      )}

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
