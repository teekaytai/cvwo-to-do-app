import React from "react";

import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodoButton";

function TodosPageHeader() {
  return (
    <>
      <AddTodoButton />
      <SearchBar />
    </>
  );
}

export default TodosPageHeader;
