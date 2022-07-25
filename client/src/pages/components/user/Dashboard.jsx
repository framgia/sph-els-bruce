import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import AdminApi from "../../../api/AdminApi";

const Dashboard = () => {
  if (AdminApi.isAdmin() === "admin@gmail.com") {
    window.location = "/admin/dashboard";
  }

  return <div>home</div>;
};

export default Dashboard;
