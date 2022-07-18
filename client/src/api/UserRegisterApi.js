import BASEAPI from "./ApiBase";

const UserRegisterApi = {
  registerUser: ({
    firstname,
    lastname,
    email,
    password,
    password_confirmation,
  }) => {
    const options = {
      method: "POST",
      url: "/register",
      data: {
        firstname,
        lastname,
        email,
        password,
        password_confirmation,
      },
    };

    return BASEAPI.request(options);
  },
};

export default UserRegisterApi;
