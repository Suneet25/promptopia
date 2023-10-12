"use client";
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";

let PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  let [searchText, setSearchText] = useState("");
  let [prompts, setPrompts] = useState([]);
  let handleSearchChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      let response = await fetch(`/api/prompt`);
      const data = await response.json();
      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Seacrh for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
