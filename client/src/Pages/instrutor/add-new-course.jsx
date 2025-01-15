import CourseCurriculum from "@/components/instructor-view/courses/add-new-courses/CourseCurriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-courses/CourseLanding";
import CourseSetting from "@/components/instructor-view/courses/add-new-courses/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/Context/Auth-context";
import { InstructorContext } from "@/Context/intructor-context";
import { addNewCourseService } from "@/services";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function AddNewCoursePage() {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.publicID)
      ) {
        return false;
      }
      if (item.freePreview) {
        hasFreePreview = true; //Found at least one free preview
      }
    }
    return hasFreePreview;
  }

  async function handleCreateCourse() {
    const courseFinalFormData = {
      instructorID: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };

    const response = await addNewCourseService(courseFinalFormData);
    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
    }

    console.log("courseFinalFormData", courseFinalFormData);
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create A New Course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4 ">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="Course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="Course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSetting />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;
