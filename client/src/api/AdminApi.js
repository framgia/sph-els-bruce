import BASEAPI from "./ApiBase";

const AdminApi = {
  isAdmin: () => {
    return localStorage.getItem("auth_name");
  },

  updateCategory: ({ title, description, id }) => {
    const options = {
      method: "PUT",
      url: `admin/update-category/${id}`,
      data: {
        title,
        description,
      },
    };
    return BASEAPI.request(options);
  },

  editCategory: (id) => {
    const options = {
      method: "GET",
      url: `/admin/edit-category/${id}`,
    };
    return BASEAPI.request(options);
  },

  deleteCategory: (id) => {
    const options = {
      method: "delete",
      url: `/admin/delete-category/${id}`,
    };
    return BASEAPI.request(options);
  },

  createCategory: ({ title, description }) => {
    const options = {
      method: "POST",
      url: "admin/create-category",
      data: {
        title,
        description,
      },
    };
    return BASEAPI.request(options);
  },

  viewCategory: () => {
    const options = {
      method: "GET",
      url: "admin/view-category",
    };
    return BASEAPI.request(options);
  },
};

export default AdminApi;
