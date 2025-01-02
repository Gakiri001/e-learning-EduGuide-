import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Context/Auth-context";
import React, { useContext } from "react";

function StudentHomePage() {
  const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div>
      StudentHomePage
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  );
}

export default StudentHomePage;
