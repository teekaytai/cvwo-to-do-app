import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TodosListPage from "./TodosListPage";
import TodoForm from "./TodoForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodosListPage />} />
        <Route path="/add" element={<TodoForm formType="add" />} />
        <Route path="/edit/:id" element={<TodoForm formType="edit" />} />
      </Routes>
    </Router>
  );
}
