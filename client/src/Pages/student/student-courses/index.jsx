import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/Context/Auth-context";
import { studentContext } from "@/Context/student-context";
import {
  deleteBoughtCourseByIDService,
  fetchStudentBoughtCourseService,
} from "@/services";
import { useContext, useEffect } from "react";
import banner from "../../../assets/congratulations.webp";
import { Button } from "@/components/ui/button";
import { Delete, Watch } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentCoursesPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {
    studentBoughtCoursesList,
    setStudentBoughtCoursesList,
    currentDeleteBoughtCourseID,
    setCurrentDeleteBoughtCourseID,
  } = useContext(studentContext);

  console.log("studentId", auth?.user?._id);

  async function fetchStudentBoughtCourse() {
    const response = await fetchStudentBoughtCourseService(auth?.user?._id);
    console.log("response", response);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
    }
  }

  useEffect(() => {
    fetchStudentBoughtCourse();
  }, []);

  async function handleDelete() {
    if (!currentDeleteBoughtCourseID) {
      console.error("No course selected");
      return;
    }
    const response = await deleteBoughtCourseByIDService(
      currentDeleteBoughtCourseID,
    );
    console.log("responseDelete", response);
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card key={course._id} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage || banner}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-700 mb-2 capitalize">
                  Instructor : {course?.instructorName}
                </p>
                <p className="text-sm text-gray-700">
                  Purchased on:{" "}
                  {new Date(course?.dateOfPurchase).toDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  onClick={() =>
                    navigate(`/course-progress/${course?.courseID}`)
                  }
                  className="flex-1 "
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
                {/* <Button
                  className="flex-1 bg-red-500"
                  onClick={() => handleDelete(course._id)}
                >
                  <Delete className="mr-2 h-4 w-4" />
                  Delete Course
                </Button> */}
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Courses Found</h1>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
