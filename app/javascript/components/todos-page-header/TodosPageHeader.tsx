import * as React from "react";

import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodoButton";

function TodosPageHeader() {
  return (
    <>
      <h1>To-do App</h1>
      <SearchBar />
      <AddTodoButton />
    </>
  );
}

export default TodosPageHeader;
