import React, { useEffect } from "react";
import Navbar from "./navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const AdmMain = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const tokenExpiration = sessionStorage.getItem("tokenExpiration");
    const userId = sessionStorage.getItem("userId");

    if (!token || !tokenExpiration || !userId) {
      const currentTime = new Date().getTime();

      if (currentTime > tokenExpiration) {
        navigate("/auth/login");
      }
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdmMain;
