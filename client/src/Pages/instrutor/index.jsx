import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Value } from "@radix-ui/react-select";
import { BarChart, Book, Component, icons, LogOut } from "lucide-react";
import React, { useState } from "react";

function InstructorDashboardPage() {
  const [activeTabs, setActiveTabs] = useState("dashboard");

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
      component: <InstructorCourses />,
    },
    {
      icon: LogOut,
      label: "LogOut",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {}

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItems) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItems.value}
                onClick={
                  menuItems.value === "logout"
                    ? handleLogout
                    : () => setActiveTabs(menuItems.value)
                }
              >
                <menuItems.icon className="mr-2 h-4 w-4" />
                {menuItems.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-2 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTabs} onValueChange={setActiveTabs}>
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
