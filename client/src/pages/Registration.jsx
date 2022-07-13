import React from "react";
import { useState, useEffect } from "react";
import UserApi from "../api/UserApi";

import swal from "sweetalert";

import UserRegisterApi from "../api/UserRegisterApi";

function Registration({ params }) {
  useEffect(() => {
    if (UserApi.isLogin()) {
      window.location = "/dashboard";
    }
  }, []);

  const [registerInput, setRegisterInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error_list, setError_list] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      firstname: registerInput.firstname,
      lastname: registerInput.lastname,
      email: registerInput.email,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation,
    };
    UserRegisterApi.registerUser(data)
      .then((response) => {

        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("auth_name", response.data.username);

        window.location = "/dashboard";
      })
      .catch(({ response }) => {
        setError_list(response.data);
      });
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Registration</h4>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleInput}
                      className="form-control"
                      value={registerInput.firstname}
                    />
                    <span className="text-danger">{error_list?.firstname}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.lastname}
                    />
                    <span className="text-danger">{error_list?.lastname}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.email}
                    />
                    <span className="text-danger">{error_list?.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.password}
                    />
                    <span className="text-danger">{error_list?.password}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      className="form-control"
                      onChange={handleInput}
                      value={registerInput.password_confirmation}
                    />
                    <span className="text-danger">
                      {error_list?.password_confirmation}
                    </span>
                  </div>
                  <div className="form-group mb-3">
                    <button className="btn btn-primary">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
