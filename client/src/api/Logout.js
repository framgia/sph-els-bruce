import USERAPI from "./ApiBase";

const Logout = {
  LogoutUser: () => {
    const options = {
      method: "POST",
      url: "/logout",
    };

    return USERAPI.request(options);
  },
};

export default Logout;
