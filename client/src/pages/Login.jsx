import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import UserApi from "../api/UserApi";

function Login(props) {
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [error_list, setError_list] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();

    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const data = {
    email: loginInput.email,
    password: loginInput.password,
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    UserApi.userLogin(data).then((res) => {
      if (res.data.status === 200) {
        localStorage.setItem("auth_token", res.data.token);
        localStorage.setItem("auth_name", res.data.username);
        swal("Success", res.data.message, "success");
        // console.log(res.data.role);
        if (res.data.role == "admin") {
          window.location = "/admin/dashboard";
        } else {
          window.location = "/";
        }
      } else if (res.data.status === 401) {
        swal("Warning", res.data.message, "warning");
      } else {
        setError_list(res.data.validate_err);
      }
    });
  };

  return (
    <div className="text-center container-sm mt-5">
      <main className="form-signin w-100 m-auto ">
        <form onSubmit={submitLogin} className=" w-60">
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          <div className="form-floating">
            <input
              type="email"
              name="email"
              className="form-control"
              value={loginInput.email}
              onChange={handleInput}
            />
            <label>Email address</label>
            <span className="text-danger">{error_list?.email}</span>
          </div>
          <div className="form-floating">
            <input
              type="password"
              name="password"
              className="form-control"
              value={loginInput.password}
              onChange={handleInput}
            />
            <label>Password</label>
            <span className="text-danger">{error_list?.password}</span>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary">Sign in</button>
          <Link to={`/register`} className="mt-5 mb-3 text-muted">
            Sign Up
          </Link>
        </form>
      </main>
    </div>
  );
}

export default Login;
