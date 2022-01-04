import React from "react";

import TodosPageHeader from "./todos-page-header/TodosPageHeader";
import TodoList from "./todo-list/TodoList";

function TodosListPage() {
  return (
    <>
      <h1>To-do List</h1>
      <TodosPageHeader />
      <TodoList />
    </>
  );
}

export default TodosListPage;
