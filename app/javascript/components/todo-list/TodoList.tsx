import * as React from "react";

import TodoListHeader from "./TodoListHeader";
import TodoListEntry from "./TodoListEntry";
import { Todo } from "components/types";

type todosReducerAction = {
  type: string;
  newTodos?: Todo[];
  todoId?: number;
};

function todosReducer(todos: Todo[], action: todosReducerAction): Todo[] {
  switch (action.type) {
    case "set":
      return action.newTodos;
    case "delete":
      return todos.filter(todo => todo.id != action.todoId);
    default:
      throw new Error("Unknown action type in todosReducer");
  }
}

export const TodosDispatch = React.createContext<React.Dispatch<todosReducerAction>>(null);


function TodoList() {
  const [todos, todosDispatch] = React.useReducer(todosReducer, []);

  React.useEffect(() => {
    const url = "/api/todos";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch to-dos.");
      })
      .then(data => todosDispatch({ type: "set", newTodos: data }))
      .catch(() => todosDispatch({ type: "set", newTodos: null }));
  }, []);


  if (todos === null) {
    return <div style={{textAlign: "center"}}>Error, unable to retrieve to-do list :(</div>
  }
  if (todos.length === 0) {
    return <div style={{textAlign: "center"}}>No to-dos yet. Use the add to-do button above to add one!</div>
  }

  return (
    <div id="todo-list">
      <TodoListHeader />
      <TodosDispatch.Provider value={todosDispatch}>
        {todos.map(todo =>
          <TodoListEntry key={todo.id} todo={todo} />
        )}
      </TodosDispatch.Provider>
    </div>
  );
}

export default TodoList;
