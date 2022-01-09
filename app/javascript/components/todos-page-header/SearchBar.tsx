import * as React from "react";

import { SearchQuery } from "../types";

type SearchBarProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>
}

function SearchBar({ setSearchQuery }: SearchBarProps) {
  const [tagsString, setTagsString] = React.useState("");
  const [searchText, setSearchText] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    if (target.name == "tags") {
      setTagsString(target.value);
    } else if (target.name == "searchText") {
      setSearchText(target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const searchQuery: SearchQuery = {
      tags: tagsString.split(/\s+/).filter(tag => tag != ""),
      text: searchText
    };
    setSearchQuery(searchQuery);
  };

  return (
    <form id="search-bar" onSubmit={handleSubmit} >
      <input type="text" className="tags-input" name="tags" placeholder="tag1 tag2..." onChange={handleChange} style={{display: "block"}} />
      <input type="text" name="searchText" placeholder="text..." onChange={handleChange} />
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;
