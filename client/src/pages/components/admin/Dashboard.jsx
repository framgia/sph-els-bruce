import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import AdminApi from "../../../api/AdminApi";

const Dashboard = () => {
  const [categoryList, setCategoryList] = useState([]);

  const category = async () => {
    const res = await AdminApi.viewCategory();
    setCategoryList(res.data);
  };
  useEffect(() => {
    category();
  }, []);

  const deleteCategory = async (e, id) => {
    e.preventDefault();
    const Clicked = e.currentTarget;
    Clicked.innerText = "Deleting...";
    await AdminApi.deleteCategory(id)
      .then((res) => {
        swal("Success", "Successfully Deleted.", "success");
        setTimeout(() => {
          window.location = "/admin/dashboard";
        }, 2000);
      })
      .catch(() => {
        Clicked.innerText = "Delete";
        alert("Cannot be delete it contains words");
      });
  };
  return (
    <>
      <div className="container mt-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>
                    <Link
                      to={`/admin/add-word/${item.id}`}
                      className="btn btn-info btn-sm"
                    >
                      {" "}
                      Add Word
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/admin/edit-category/${item.id}`}
                      className="btn btn-success btn-sm"
                    >
                      {" "}
                      Edit
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={(e) => deleteCategory(e, item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
