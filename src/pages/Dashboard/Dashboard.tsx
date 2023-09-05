import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import axios from "axios";
import { headers, urls } from "../../env";
import { useEffect, useState } from "react";

import { Bar } from "./Bar";
import AdminBar from "./Admin/Panel";

const Dashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkPrivileges();
  }, []);

  const checkPrivileges = async () => {
    try {
      await axios.get(urls.admin_checker, { headers });
      setIsAdmin(true);
    } catch (err) {}
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Bar isAdmin={isAdmin} />
      {isAdmin ? <AdminBar /> : <></>}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          padding: "60px 10px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
