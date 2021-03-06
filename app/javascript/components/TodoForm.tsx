import * as React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Todo } from "./types";

type TodoFormProps = {
  formType: "add" | "edit";
}

function TodoForm({ formType }: TodoFormProps) {
  const isEditForm = formType == "edit";
  const { id } = useParams();
  const [fetchDone, setFetchDone] = React.useState(false);
  const [todoToEdit, setTodoToEdit] = React.useState<Todo>(null);
  const [name, setName] = React.useState("");
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
          setTagsString(data.tags.join(" "));
          setDetails(data.details);
        })
        .catch(error => console.log(error.message))
        .finally(() => setFetchDone(true));
    }, []);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    switch (target.name) {
      case "todo[name]":
        setName(target.value);
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
        isEditForm && !fetchDone ?
          <div>Loading to-do...</div>
        : isEditForm && todoToEdit === null ?
          // If the to-do to be edited could not be fetched, display an error message instead of the form
          <>
            <div>Error, unable to retrieve to-do</div>
            <Link to="/">
              <input type="button" value="Back" />
            </Link>
          </>
        :
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="todo-name">
                To-do
                <span title="This field is required" style={{color: "red"}}>*</span>
              </label>
              <input
                type="text"
                id="todo-name"
                name="todo[name]"
                value={name}
                size={60}
                maxLength={100}
                required
                onChange={handleChange}
                autoFocus />
            </div>
            <div className="form-field">
              <label htmlFor="todo-tags">
                Tags (separate using spaces only)
              </label>
              <input
                type="text"
                id="todo-tags"
                className="tags-input"
                name="tags"
                value={tagsString}
                size={60}
                maxLength={100}
                onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="todo-details">
                Details
              </label>
              <textarea
                id="todo-details"
                name="todo[details]"
                value={details}
                cols={60}
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
