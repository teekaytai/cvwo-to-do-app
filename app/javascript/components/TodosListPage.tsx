import * as React from "react";

import TodosPageHeader from "./todos-page-header/TodosPageHeader";
import TodoList from "./todo-list/TodoList";

function TodosListPage() {
  return (
    <>
      <TodosPageHeader />
      <TodoList />
    </>
  );
}

export default TodosListPage;
