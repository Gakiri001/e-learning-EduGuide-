import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  const [ActiveTab, setActiveTab] = useState("signin");

  function handleTabChange(value){
    setActiveTab(value)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <span className="font-extrabold text-xl">LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={ActiveTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList>
            <TabsTrigger>Sign In</TabsTrigger>
            <TabsTrigger>Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
