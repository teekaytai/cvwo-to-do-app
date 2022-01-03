import React from "react";

import TodosPageHeader from "./TodosPageHeader";
import TodoList from "./TodoList";

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
