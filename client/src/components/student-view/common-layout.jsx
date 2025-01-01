import React from "react";
import { Outlet } from "react-router-dom";

function StudentViewCommonLayout() {
  return (
    <div>
      StudentViewCommonLayout
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
