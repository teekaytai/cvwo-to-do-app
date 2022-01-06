import * as React from "react";

import { TodosDispatch } from "./TodoList";

type TodoCheckboxProps = {
  todoId: number;
  todoIsDone: boolean;
}

function TodoCheckbox({ todoId, todoIsDone }: TodoCheckboxProps) {
  const todosDispatch = React.useContext(TodosDispatch);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>): void => {
    const url = `/api/todos/${todoId}`;
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;

    const body = {
      is_done: event.currentTarget.checked
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.ok) {
        todosDispatch({ type: "toggleDone", todoId });
      } else {
        throw new Error("To-do completion status could not be updated.");
      }
    })
    .catch(error => alert(error.message));
  };

  return (
    <input type="checkbox" onClick={handleClick} checked={todoIsDone} />
  );
}

export default TodoCheckbox;
