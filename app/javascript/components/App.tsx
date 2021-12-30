import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodosPage from "../components/TodosPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodosPage />} />
      </Routes>
    </Router>
  );
}