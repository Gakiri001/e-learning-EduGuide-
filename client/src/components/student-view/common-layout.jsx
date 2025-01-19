import React from "react";
import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";

function StudentViewCommonLayout() {
  return (
    <div>
      <StudentViewCommonHeader />
      <Outlet />
    </div>
  );
}

export default StudentViewCommonLayout;
