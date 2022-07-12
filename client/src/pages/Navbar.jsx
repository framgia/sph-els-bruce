import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Logout from "../api/Logout";
import UserApi from "../api/UserApi";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutSubmit = (e) => {
    e.preventDefault();

    Logout.LogoutUser().then((res) => {
      if (res.data.status === 200) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        swal("Success", res.data.message, "success");
        window.location = "/";
      }
    });
  };

  var AuthButtons = "";

  if (!UserApi.isLogin()) {
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
          <Link className="nav-link" to="/">
            Home
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
        <Link className="navbar-brand" to="/dashboard">
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
