import "./App.css";
import Registration from "./pages/Registration";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
// import AdminDashboard from "./pages/admin/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/user/Dashboard";
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
  const [auth, setAuth] = useState();

  useEffect(() => {
    setAuth(localStorage.getItem("auth_token"));
  }, [auth]);

  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={auth ? <Dashboard /> : <Login />} />
          <Route
            path="/register"
            element={auth ? <Dashboard /> : <Registration />}
          />
          <Route path="/dashboard" element={auth ? <Dashboard /> : <Login />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
