import React from "react";
import { useState } from "react";
import AdminApi from "../../../api/AdminApi";
import swal from "sweetalert";
import { useEffect } from "react";
import { useParams } from "react-router";

const EditCategory = () => {
  const params = useParams();

  const [categoriesInput, setCategoriesInput] = useState([]);
  const handleInput = (e) => {
    e.preventDefault();

    setCategoriesInput({ ...categoriesInput, [e.target.name]: e.target.value });
  };

  const id = params.id;
  const category = () => {
    AdminApi.editCategory(id)
      .then((response) => {
        setCategoriesInput(response.data);
      })
      .catch(({ e }) => {
        setCategoriesInput(e.data);
      });
  };

  useEffect(() => {
    category();
  }, []);

  const [error_list, setError_list] = useState([]);

  const updateCategory = (e) => {
    e.preventDefault();
    const data = categoriesInput;
    AdminApi.updateCategory(data)
      .then((res) => {
        swal("Success", res.data.message, "success");
        setTimeout(() => {
          window.location = "/admin/dashboard";
        }, 3000);
      })
      .catch(({ response }) => {
        setError_list(response.data);
      });
  };
  return (
    <>
      <div className="container max-width-500">
        <form onSubmit={updateCategory}>
          <div className="flex mt-5">
            <h4>Edit Categories</h4>
            <div className="form-floating">
              <input
                type="text"
                name="title"
                className="form-control"
                value={categoriesInput.title}
                onChange={handleInput}
              />
              <label>Title</label>
              <span className="text-danger">{error_list?.title}</span>
            </div>
            <div className="form-floating mt-2">
              <textarea
                type="text"
                name="description"
                className="form-control"
                value={categoriesInput.description}
                onChange={handleInput}
              />

              <label>Description</label>
              <span className="text-danger">{error_list?.description}</span>
            </div>
            <button className="w-100 mt-2 btn btn-lg btn-primary">
              Update Categories
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
