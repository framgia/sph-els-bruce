import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminApi from "../../../api/AdminApi";
import UserApi from "../../../api/UserApi";

const LessonDashboard = () => {
  if (!UserApi.isLogin()) {
    window.location = "/";
  }

  const [categoryList, setCategoryList] = useState([]);

  const category = async () => {
    const res = await AdminApi.viewCategory();
    setCategoryList(res.data);
  };
  console.log(categoryList);
  useEffect(() => {
    category();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {categoryList.map((item) => {
          return (
            <div className="col-sm-6 mt-3" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <Link to={``} className="btn btn-primary">
                    Start Learning
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
        {/* <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere*
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LessonDashboard;
