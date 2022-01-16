import * as React from "react";

import TodoCheckbox from "./TodoCheckbox";
import TodoExpandButton from "./TodoExpandButton";
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
        <TodoCheckbox todoId={todo.id} todoIsDone={todo.is_done} /> {todo.name}
        <TodoExpandButton todoId={todo.id} isExpanded={todo.isExpanded} />
      </div>
      {
        todo.isExpanded &&
          <div className="todo-full">
            {
              todo.details !== "" &&
                <div className="todo-full-row">
                  {todo.details}
                </div>
            }
            {
              todo.tags.length !== 0 && 
                <div className="todo-full-row">
                  <>
                    Tags: {todo.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </>
                </div>
            }
            <div className="todo-full-row">
              <DeleteTodoButton todoId={todo.id} />
              <EditTodoButton todoId={todo.id} />
            </div>  
          </div>
      }
    </div>
  );
}

export default TodoListEntry;
