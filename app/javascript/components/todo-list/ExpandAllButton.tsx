import * as React from "react";

import { TodosDispatch } from "./TodoList";

function TodoExpandButton() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const todosDispatch = React.useContext(TodosDispatch);

  const handleClick = (): void => {
    todosDispatch({type: "toggleExpandedAll", expand: !isExpanded});
    setIsExpanded(!isExpanded);
  }

  return (
    <button className="material-icons expand-button" onClick={handleClick}>
      {isExpanded ? "expand_less" : "expand_more"}
    </button>
  );
}

export default TodoExpandButton;
