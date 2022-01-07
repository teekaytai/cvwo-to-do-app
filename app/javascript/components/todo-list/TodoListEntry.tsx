import * as React from "react";

import TodoCheckbox from "./TodoCheckbox";
import EditTodoButton from "./EditTodoButton";
import DeleteTodoButton from "./DeleteTodoButton";
import { Todo } from "../types";

type TodoListEntryProps = {
  key: number;
  todo: Todo;
};

function TodoListEntry({ todo }: TodoListEntryProps) {
  return (
    <div className="todo-entry">
      <div className="todo-summary">
        <div className="todo-col">
          <TodoCheckbox todoId={todo.id} todoIsDone={todo.is_done} /> {todo.name}
        </div>
        <div className="category-col">{todo.category}</div>
      </div>
      <div className="todo-full">
        <p>{todo.details}</p>
      </div>
      <div className="todo-full">
        Tags: {todo.tags.length ? todo.tags.join(" ") : "NONE"}
      </div>
      <div className="todo-buttons">
        <DeleteTodoButton todoId={todo.id} />
        <EditTodoButton todoId={todo.id} />
      </div>
    </div>
  );
}

export default TodoListEntry;
