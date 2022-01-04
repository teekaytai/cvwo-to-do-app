import React from "react";

import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodoButton";

function TodosPageHeader() {
  return (
    <>
      <SearchBar />
      <AddTodoButton />
    </>
  );
}

export default TodosPageHeader;
