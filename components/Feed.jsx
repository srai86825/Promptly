"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  // console.log("Trying to show prompts feed")
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }
  function handleTagClick(tag) {
    console.log(tag);
    const fetchPosts = async () => {
      const respone = await fetch("/api/prompt");
      const data = await respone.json();
      const filteredPosts = data.filter((post) => {
        return post.tag === tag || post.creator.username === tag;
      });
      setPosts(filteredPosts);
      setSearchText(tag);
    };
    fetchPosts();
  }
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("searched for: " + searchText);
    if (!searchText) {
      const fetchPosts = async () => {
        const respone = await fetch("/api/prompt");
        const data = await respone.json();
        setPosts(data);
      };
      fetchPosts();
      // console.log("Going in undefined")
    } else {
      const fetchPosts = async () => {
        const respone = await fetch("/api/prompt");
        let data = await respone.json();
        data = data.filter((p) => {
          // console.log(p.creator.username === searchText || p.tag === searchText);
          console.log(
            p.creator.username === searchText ||
              p.tag ===
                searchText + " for " + p.creator.username + " " + searchText
          );
          return p.creator.username === searchText || p.tag === searchText;
        });
        console.log(data);
        setPosts(data);
      };
      fetchPosts();
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const respone = await fetch("/api/prompt");
      const data = await respone.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed" onSubmit={handleSearch}>
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          // required
          onChange={handleSearchChange}
          value={searchText}
          placeholder="Search for a tag or a user"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
