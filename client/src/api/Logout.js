import BASEAPI from "./ApiBase";

const Logout = {
  LogoutUser: () => {
    const options = {
      method: "POST",
      url: "/logout",
    };

    return BASEAPI.request(options);
  },
};

export default Logout;
