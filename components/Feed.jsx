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
  let [prompts, setPrompts] = useState([]);
  //searchStates
  let [searchText, setSearchText] = useState("");
  let [searchTimeout, setSearchTimeout] = useState(null);
  let [searchResults, setSearchResults] = useState([]);

  let handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() => {
        let searchResult = filteredSearch(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  let filteredSearch = (searchText) => {
    const regex = new RegExp(searchText, "i"); //i for the casesensitive search
    return prompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.prompt) ||
        regex.test(item.tag)
    );
  };

  let handleTagClick = (tagname) => {
    setSearchText(tagname);
    let searchResult = filteredSearch(tagname);
    setSearchResults(searchResult);
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
      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
