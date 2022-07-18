
import React from "react";
import { useEffect } from "react";
import AdminApi from "../../../api/AdminApi";

const Dashboard = () => {
  useEffect((e) => {
    e.preventDefault();
  }, []);
  if (AdminApi) {
    window.location = "/admin/dashboard";
  }

  return <div>home</div>;
};

export default Dashboard;

