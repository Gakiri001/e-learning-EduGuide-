import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
            value="signin" 
            className="px-2 py-2 text-center font-semibold text-gray-600 transition-all data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900">
              Sign In
            </TabsTrigger>
            <TabsTrigger 
            value="signup"
            className="px-4 py-2 text-center font-semibold text-gray-600 transition-all data-[state=active]:bg-gray-300 data-[state=active]:text-gray-900"
            >Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">Signin</TabsContent>
          <TabsContent value="signup">Signup</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
