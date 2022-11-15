import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function AppLogout() {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    if (await localStorage.getItem("token-user")) {
      await localStorage.removeItem("token-user");
    }

    return navigate("/app/login");
  };

  return null;
}

export default AppLogout;
