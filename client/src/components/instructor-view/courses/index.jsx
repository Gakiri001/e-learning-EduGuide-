import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InstructorContext } from "@/Context/intructor-context";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { deleteCourseByIDService } from "@/services";
import { AuthContext } from "@/Context/Auth-context";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const {
    setCurrentEditedCourseID,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentDeleteCourseID,
    setCurrentDeleteCourseID,
    courseLandingFormData,
    courseCurriculumFormData,
  } = useContext(InstructorContext);

  async function handleDelete() {
    if (!currentDeleteCourseID) {
      console.error("No course selected");
      return;
    }
    const courseFinalFormData = {
      instructorID: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response = await deleteCourseByIDService(
      currentDeleteCourseID,
      courseFinalFormData,
    );
    console.log("responseDelete", response);
    if (response.success) {
      setCourseLandingFormData(null);
      setCourseCurriculumFormData(null);
      alert("Course Deleted successfully");
      navigate(-1);
    }
  }

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            setCurrentEditedCourseID(null);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Create New Courses
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto ">
          <Table>
            <TableCaption>A list of the courses available</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Courses</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0
                ? listOfCourses.map((course) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {course?.title}
                      </TableCell>
                      <TableCell>{course?.students?.length}</TableCell>
                      <TableCell>
                        ${course?.students?.length * course?.pricing}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          <Edit className="h-6 w-6 " />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentDeleteCourseID(course?._id);
                            handleDelete();
                          }}
                        >
                          <Delete className="h-6 w-6 " />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
