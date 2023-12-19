"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const searchedText = posts.filter(
      (item) =>
        item.tag.includes(searchText) ||
        item.creator.email.includes(searchText) ||
        item.creator.username.includes(searchText) ||
        item.prompt.includes(searchText)
    );
    setFilteredPosts([...searchedText]);
    console.log(searchText);
  }, [searchText]);

  const handleTagClick = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      console.log(data);
    };



  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
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
