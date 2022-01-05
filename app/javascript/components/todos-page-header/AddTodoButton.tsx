import * as React from "react";
import { Link } from "react-router-dom";

function AddTodoButton() {
  return (
    <Link to="/add">
      <input id="add-todo-button" type="button" value="Add To-do" />
    </Link>
  );
}

export default AddTodoButton;
