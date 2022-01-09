import * as React from "react";
import { Link } from "react-router-dom";

type EditTodoButtonProps = {
  todoId: number;
};

function EditTodoButton({ todoId }: EditTodoButtonProps) {
  return (
    <Link to={`/edit/${todoId}`}>
      <button className="material-icons todo-button">edit</button>
    </Link>
  );
}

export default EditTodoButton;
