import "./App.css";
import Registration from "./pages/Registration";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/components/admin/Dashboard.jsx";

import AddCategory from "./pages/components/admin/AddCategory";
import EditCategory from "./pages/components/admin/EditCategory";
import AddWord from "./pages/components/admin/AddWord";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/components/user/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />
          <Route path="/admin/add-word/:id" element={<AddWord />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
