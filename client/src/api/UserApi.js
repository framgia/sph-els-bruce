import BASEAPI from "./ApiBase";

const UserApi = {
  isLogin: () => {
    return localStorage.getItem("auth_token");
  },

  userLogin: ({ email, password }) => {
    const options = {
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    };
    return BASEAPI.request(options);
  },

  getuser: () => {
    const options = {
      method: "GET",
      url: "/dashboard",
    };

    return BASEAPI.request(options);
  },
};

export default UserApi;
