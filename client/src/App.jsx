import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/auth";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./Context/Auth-context";
import InstructorDashboardPage from "./Pages/instrutor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./Pages/student/home";
import NotFoundPage from "./Pages/not-found";
import AddNewCoursePage from "./Pages/instrutor/add-new-course";
import StudentViewCoursesPage from "./Pages/student/courses";
import StudentViewCourseDetailsPage from "./Pages/student/courseDetails";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor/edit-course/:courseID"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="/home" element={<StudentHomePage />} />
        <Route path="/" element={<StudentHomePage />} />
        <Route path="/courses" element={<StudentViewCoursesPage />} />
        <Route
          path="/course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
