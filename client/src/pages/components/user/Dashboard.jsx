import React from "react";

import AdminApi from "../../../api/AdminApi";

const Dashboard = () => {
  if (AdminApi.isAdmin() === "admin@gmail.com") {
    window.location = "/admin/dashboard";
  }

  return <div>home</div>;
};

export default Dashboard;
