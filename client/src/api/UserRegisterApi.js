import USERAPI from "./ApiBase";

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
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      },
    };

    return USERAPI.request(options);
  },
};

export default UserRegisterApi;
