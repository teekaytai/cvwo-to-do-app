import * as React from "react";

import TodosPageHeader from "./todos-page-header/TodosPageHeader";
import TodoList from "./todo-list/TodoList";
import { SearchQuery } from "./types";

function TodosListPage() {
  const [searchQuery, setSearchQuery] = React.useState<SearchQuery>(null);

  return (
    <>
      <TodosPageHeader setSearchQuery={setSearchQuery} />
      <TodoList searchQuery={searchQuery} />
    </>
  );
}

export default TodosListPage;
