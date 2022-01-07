import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Todo } from "./types";

type TodoFormProps = {
  formType: "add" | "edit";
}

function TodoForm({ formType }: TodoFormProps) {
  const isEditForm = formType == "edit";
  const { id } = useParams();
  const [todoToEdit, setTodoToEdit] = React.useState<Todo>(null);
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [tagsString, setTagsString] = React.useState("");
  const [details, setDetails] = React.useState("");
  const navigate = useNavigate();

  if (isEditForm) {
    React.useEffect(() => {
      const url = `/api/todos/${id}`;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch to-do.")
        })
        .then((data: Todo) => {
          setTodoToEdit(data);
          // Pre-fill form fields with the to-do's information
          setName(data.name);
          setCategory(data.category);
          setTagsString(data.tags.join(" "));
          setDetails(data.details);
        })
        .catch(error => console.log(error.message));
    }, []);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    switch (target.name) {
      case "todo[name]":
        setName(target.value);
        break;
      case "todo[category]":
        setCategory(target.value);
        break;
      case "tags":
        setTagsString(target.value);
        break;
      case "todo[details]":
        setDetails(target.value);
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const url = isEditForm ? `/api/todos/${id}` : "/api/todos";
    const token = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content;

    const body = {
      name,
      category,
      details,
      tags: tagsString.split(/\s+/).filter(tag => tag != "")
    };

    fetch(url, {
      method: isEditForm ? "PATCH" : "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          navigate("/");
        } else {
          throw new Error("To-do submission failed.");
        }
      })
      .catch(error => alert(error.message));
  };


  return (
    <>
      <h1>{isEditForm ? "Edit your to-do" : "Add a new to-do"}</h1>
      {
        // If the to-do to be edited could not be fetched, display an error message instead of the form
        isEditForm && todoToEdit === null ?
          <>
            <div>Error, unable to retrieve to-do</div>
            <Link to="/">
              <input type="button" value="Back" />
            </Link>
          </>
        :
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="todo-name">
                To-do
                <span title="This field is required" style={{color: "red"}}>*</span>
              </label>
              <input
                type="text"
                id="todo-name"
                name="todo[name]"
                value={name}
                size={50}
                maxLength={100}
                required
                onChange={handleChange}
                autoFocus />
            </div>
            <div>
              <label htmlFor="todo-category">
                Category
              </label>
              <input
                type="text"
                id="todo-category"
                name="todo[category]"
                value={category}
                maxLength={100}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="todo-tags">
                Tags (separate using spaces only)
              </label>
              <input
                type="text"
                id="todo-tags"
                name="tags"
                value={tagsString}
                size={50}
                maxLength={100}
                onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="todo-details">
                Details
              </label>
              <textarea
                id="todo-details"
                name="todo[details]"
                value={details}
                cols={50}
                onChange={handleChange} />
            </div>
            <input type="submit" value={isEditForm ? "Edit" : "Add"} />
            <Link to="/">
              <input type="button" value="Cancel" />
            </Link>
          </form>
      }
    </>
  );
}

export default TodoForm;
