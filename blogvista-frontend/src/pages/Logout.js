import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Logs out the currently logged in user. This is a non - destructive action as there is no guarantee that the user will be logged out of the system at this point.
 *
 *
 * @return { Object } React component that renders the logout page after navigating to the logout page and returning
 */
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
      method: "GET",
      credentials: "include",
    }).then(() => {
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
      navigate("/login", { replace: true });
    });
  }, [navigate]);
  return <div>Logout</div>;
}

export default Logout;
