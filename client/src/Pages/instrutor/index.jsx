import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/Context/Auth-context";
import { InstructorContext } from "@/Context/intructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { Value } from "@radix-ui/react-select";
import { BarChart, Book, Component, icons, LogOut } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();

    console.log("response", response);
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "LogOut",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItems) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItems.value}
                variant={activeTab === menuItems.value ? "secondary" : "ghost"}
                onClick={
                  menuItems.value === "logout"
                    ? handleLogout
                    : () => setActiveTab(menuItems.value)
                }
              >
                <menuItems.icon className="mr-2 h-4 w-4" />
                {menuItems.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItems) => (
              <TabsContent value={menuItems.value}>
                {menuItems.component !== null ? menuItems.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardPage;
