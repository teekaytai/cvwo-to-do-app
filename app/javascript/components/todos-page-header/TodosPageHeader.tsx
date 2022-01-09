import * as React from "react";

import SearchBar from "./SearchBar";
import AddTodoButton from "./AddTodoButton";
import { SearchQuery } from "../types";

type TodosPageHeaderProps = {
  setSearchQuery: React.Dispatch<React.SetStateAction<SearchQuery>>
}

function TodosPageHeader({ setSearchQuery }: TodosPageHeaderProps) {
  return (
    <>
      <h1>To-do App</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      <AddTodoButton />
    </>
  );
}

export default TodosPageHeader;
