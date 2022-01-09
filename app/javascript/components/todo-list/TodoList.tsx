import * as React from "react";

import TodoListHeader from "./TodoListHeader";
import TodoListEntry from "./TodoListEntry";
import { Todo, SearchQuery } from "components/types";

export const TodosDispatch = React.createContext<React.Dispatch<todosReducerAction>>(null);

type todosReducerAction = {
  type: string;
  newTodos?: Todo[];
  todoId?: number;
  expand?: boolean;
};

function todosReducer(todos: Todo[], action: todosReducerAction): Todo[] {
  switch (action.type) {
    case "set":
      return action.newTodos;
    case "delete":
      return todos.filter(todo => todo.id != action.todoId);
    case "toggleDone":
      // Toggle the is_done status of the to-do
      return todos.map(todo => todo.id == action.todoId ? { ...todo, is_done: !todo.is_done } : todo);
    case "toggleExpanded":
      // Expand or collapse a to-do entry
      return todos.map(todo => todo.id == action.todoId ? { ...todo, isExpanded: !todo.isExpanded } : todo);
    case "toggleExpandedAll":
      // Expand or collapse all to-do entries
      return todos.map(todo => ({ ...todo, isExpanded: action.expand }));
    default:
      throw new Error("Unknown action type in todosReducer");
  }
}

// Return todos that contain all the tags and the exact text of the search query
function searchTodos(todos: Todo[], searchQuery: SearchQuery): Todo[] {
  if (searchQuery === null) {
    return todos;
  }

  const lowerCaseText = searchQuery.text.toLowerCase();

  return todos.filter(todo => {
    if (searchQuery.tags.some(tag => !todo.tags.includes(tag))) {
      // todo missing a searched tag
      return false;
    }
    if (lowerCaseText && !todo.name.toLowerCase().includes(lowerCaseText) &&
        !todo.details.toLowerCase().includes(lowerCaseText)) {
        // todo name and details do not contain searched text
        return false;
    }
    return true;
  })
}


type TodoListProps = {
  searchQuery: SearchQuery;
};

function TodoList({ searchQuery }: TodoListProps) {
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
      <TodosDispatch.Provider value={todosDispatch}>
        <TodoListHeader />
        {searchTodos(todos, searchQuery).map(todo =>
            <TodoListEntry key={todo.id} todo={todo} />
        )}
      </TodosDispatch.Provider>
    </div>
  );
}

export default TodoList;
