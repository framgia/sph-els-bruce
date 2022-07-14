import React from "react";
import { useState } from "react";

const AddCategories = () => {
  const [categoriesInput, setCategoriesInput] = useState({
    title: "",
    description: "",
  });

  const handleInput = (e) => {
    e.preventDefault();
  };
  const submitCategories = () => {};
  return (
    <>
      <div className="container max-width-500">
        <form action={submitCategories}>
          <div className="flex mt-5">
            <h4>Add Categories</h4>
            <div className="form-floating">
              <input
                type="email"
                name="email"
                className="form-control"
                //   value={}
                //   onChange={}
              />
              <label>Email address</label>
              <span className="text-danger">{}</span>
            </div>
            <div className="form-floating mt-2">
              <textarea
                type="email"
                name="email"
                className="form-control"
                //   value={}
                //   onChange={}
              />
              <label>Description</label>
              <span className="text-danger">{}</span>
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

export default AddCategories;
