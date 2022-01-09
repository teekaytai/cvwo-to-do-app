import * as React from "react";

import { TodosDispatch } from "./TodoList";

type TodoExpandButtonProps = {
  todoId: number;
  isExpanded: boolean;
};

function TodoExpandButton({ todoId, isExpanded }: TodoExpandButtonProps) {
  const todosDispatch = React.useContext(TodosDispatch);

  const handleClick = (): void => {
    todosDispatch({type: "toggleExpanded", todoId});
  }

  return (
    <button className="material-icons expand-button" onClick={handleClick}>
      {isExpanded ? "expand_less" : "expand_more"}
    </button>
  );
}

export default TodoExpandButton;
