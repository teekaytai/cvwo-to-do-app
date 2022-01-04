import React from "react";

function SearchBar() {
  return (
    <form id="search-bar">
      <input type="text" placeholder="Search..." />
      <input type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;
