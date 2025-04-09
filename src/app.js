import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import cafePage from './pages/cafePage';
import employeePage from './pages/employeePage';
import addEditCafePage from './pages/addEditCafePage';
import AddEditEmployeePage from './pages/addEditEmployeePage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<cafePage />} />
      <Route path="/employees" element={<employeePage />} />
      <Route path="/add-cafe" element={<addEditCafePage />} />
      <Route path="/edit-cafe/:id" element={<addEditCafePage />} />
      <Route path="/add-employee" element={<AddEditEmployeePage />} />
      <Route path="/edit-employee/:id" element={<AddEditEmployeePage />} />
    </Routes>
  </Router>
);

export default App;