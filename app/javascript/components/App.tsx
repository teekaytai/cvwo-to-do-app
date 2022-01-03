import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodosListPage from "./TodosListPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodosListPage />} />
      </Routes>
    </Router>
  );
}
