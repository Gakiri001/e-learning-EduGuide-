import { Card, CardContent } from "@/components/ui/card";
import { AuthContext } from "@/Context/Auth-context";
import { studentContext } from "@/Context/student-context";
import { fetchStudentBoughtCourseService } from "@/services";
import { useContext, useEffect } from "react";
import banner from "../../../assets/c4.avif";

const StudentCoursesPage = () => {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } =
    useContext(studentContext);

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
                {console.log("image url", course?.courseImage)}
              </CardContent>
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
