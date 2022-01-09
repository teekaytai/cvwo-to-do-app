import * as React from "react";

import ExpandAllButton from "./ExpandAllButton";

function TodoListHeader() {
  return (
    <div className="todo-list-header">
      To-do List
      <ExpandAllButton />
    </div>
  );
}

export default TodoListHeader;
