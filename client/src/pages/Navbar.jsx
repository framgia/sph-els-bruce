import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminApi from "../api/AdminApi";
import Logout from "../api/Logout";
import UserApi from "../api/UserApi";

const Navbar = () => {
  const logoutSubmit = (e) => {
    e.preventDefault();

    Logout.LogoutUser().then((res) => {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      swal("Success", res.data.message, "success");
      setTimeout(() => {
        window.location = "/";
      }, 3000);
    });
  };

  var AuthButtons = "";

  if (AdminApi.isAdmin() === "admin@gmail.com") {
    AuthButtons = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            Category
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/add-category">
            Add Category
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={logoutSubmit}
            className="nav-link btn btn-danger btn-sm text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    );
  } else if (!UserApi.isLogin()) {
    AuthButtons = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/lesson-dashboard">
            Lesson
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={logoutSubmit}
            className="nav-link btn btn-danger btn-sm text-white"
          >
            Logout
          </button>
        </li>
      </ul>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard  ">
          E-Learning
        </Link>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">{AuthButtons}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
