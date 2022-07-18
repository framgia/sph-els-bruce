import axios from "axios";

const TOKEN = localStorage.getItem("auth_token");

const BASEAPI = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default BASEAPI;
