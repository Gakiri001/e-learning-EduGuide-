import { useContext, Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "@/Context/Auth-context";

function RouteGuard({ element }) {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  if (!auth.authenticate) {
    return location.pathname.includes("/auth") ? (
      <Fragment>{element}</Fragment>
    ) : (
      <Navigate to="/auth" />
    );
  }

  if (auth.user?.role === "instructor") {
    if (!location.pathname.includes("instructor")) {
      return <Navigate to="/instructor" />;
    }
  } else if (location.pathname.includes("instructor")) {
    return <Navigate to="/home" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
