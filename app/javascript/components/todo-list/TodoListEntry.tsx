import React from "react";

import TodoCheckbox from "./TodoCheckbox";
import EditTodoButton from "./EditTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";
import { Todo } from "../types";

type TodoListEntryProps = {
  key: string;
  todo: Todo;
}

function TodoListEntry({ todo }: TodoListEntryProps) {
  return (
    <div className="todo-entry">
      <div className="todo-summary">
        <div className="todo-col">
          <TodoCheckbox />{todo.name}
        </div>
        <div className="category-col">{todo.category}</div>
      </div>
      <div className="todo-details">
        <p>{todo.details}</p>
        <DeleteTodoButton />
        <EditTodoButton />
      </div>
    </div>
  );
}

export default TodoListEntry;
