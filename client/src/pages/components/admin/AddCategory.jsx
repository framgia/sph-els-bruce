import React from "react";
import { useState } from "react";
import AdminApi from "../../../api/AdminApi";
import swal from "sweetalert";
import LessonApi from "../../../api/LessonApi";

const AddCategory = () => {
  const [categoriesInput, setCategoriesInput] = useState({
    title: "",
    description: "",
  });

  const [error_list, setError_list] = useState([]);

  const handleInput = (e) => {
    e.preventDefault();

    setCategoriesInput({ ...categoriesInput, [e.target.name]: e.target.value });
  };
  const submitCategories = (e) => {
    e.preventDefault();

    const data = {
      title: categoriesInput.title,
      description: categoriesInput.description,
    };

    AdminApi.createCategory(data)
      .then((res) => {
        const data1 = {
          category_id: res.data.data.id,
          name: res.data.data.title,
        };
        LessonApi.createLesson(data1).then((res) => {
          swal("Success", "Category Added.", "success");
        });

        setTimeout(() => {
          window.location = "/admin/dashboard";
        }, 2000);
      })
      .catch(({ response }) => {
        setError_list(response.data.validate_err);
      });
  };
  return (
    <>
      <div className="container max-width-500">
        <form onSubmit={submitCategories}>
          <div className="flex mt-5">
            <h4>Add Categories</h4>
            <div className="form-floating">
              <input
                type="text"
                name="title"
                className="form-control"
                value={categoriesInput.title}
                onChange={handleInput}
              />
              <label>Title</label>
              <span className="text-danger">{error_list.title}</span>
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
              <span className="text-danger">{error_list.description}</span>
            </div>
            <button className="w-100 mt-2 btn btn-lg btn-primary">
              Add Categories
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
