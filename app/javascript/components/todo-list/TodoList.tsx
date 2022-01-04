import React, { useEffect, useState } from "react";

import TodoListHeader from "./TodoListHeader";
import TodoListEntry from "./TodoListEntry";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const url = "/api/todos";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then(data => setTodos(data))
      .catch(() => setTodos(null));
  }, []);


  if (todos === null) {
    return <div align="center">Error, unable to retrieve to-do list :(</div>
  }
  if (todos.length === 0) {
    return <div align="center">No to-dos yet. Use the add to-do button above to add one!</div>
  }

  return (
    <div id="todo-list">
      <TodoListHeader />
      {todos.map(todo =>
        <TodoListEntry key={todo.name} todo={todo} />
      )}
    </div>
  );
}

export default TodoList;
