import axios from "axios";
import Cookies from "js-cookie";

const TOKEN = localStorage.getItem("auth_token");

const USERAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default USERAPI;
