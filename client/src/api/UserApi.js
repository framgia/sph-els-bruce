import USERAPI from "./ApiBase";

const UserApi = {
  isLogin: () => {
    return localStorage.getItem("auth_token");
  },

  userLogin: ({ email, password }) => {
    const options = {
      method: "POST",
      url: "/login",
      data: {
        email: email,
        password: password,
      },
    };
    return USERAPI.request(options);
  },
};

export default UserApi;
