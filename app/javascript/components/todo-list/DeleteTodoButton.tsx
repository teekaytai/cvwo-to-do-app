import * as React from "react";

import { TodosDispatch } from "./TodoList";

type DeleteTodoButtonProps = {
  todoId: number;
};

function DeleteTodoButton({ todoId }: DeleteTodoButtonProps) {
  const todosDispatch = React.useContext(TodosDispatch);

  const handleDelete = (): void => {
    if (!confirm("Are you sure?")) {
      return;
    }
    
    const url = `/api/todos/${todoId}`;
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        todosDispatch({ type: "delete", todoId });
      } else {
        throw new Error("To-do deletion failed.");
      }
    })
    .catch(error => alert(error.message));
  };

  return (
    <button className="material-icons todo-button" onClick={handleDelete}>
      delete
    </button>
  );
}

export default DeleteTodoButton;
