import React from "react";

import TodoCheckbox from "./TodoCheckbox";
import { Todo } from "./types";

type TodoListEntryProps = {
  key: string;
  todo: Todo;
}

function TodoListEntry({ todo }: TodoListEntryProps) {
  return (
    <div className="test">
      <div className="todo-col flex-row">
        <div><TodoCheckbox /></div>
        <div>{todo.name}</div>
      </div>
      <div className="category-col">{todo.category}</div>
    </div>
  );
}

export default TodoListEntry;
