import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import VideoPlayer from "@/components/video-player";
import { AuthContext } from "@/Context/Auth-context";
import { studentContext } from "@/Context/student-context";
import {
  createPaymentService,
  fetchStudentViewCourseDetailsService,
} from "@/services";
import { CheckCircle, Globe, Lock, PlayCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

function StudentViewCourseDetailsPage() {
  const {
    studentViewCoursesDetails,
    setStudentViewCoursesDetails,
    currentCourseDetailsID,
    setCurrentCourseDetailsID,
    loadingState,
    setLoadingState,
  } = useContext(studentContext);

  const { auth } = useContext(AuthContext);

  const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =
    useState(null);
  const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
  const [approvalurl, setApprovalURL] = useState("");
  const [coursePurchasedID, setCoursePurchasedID] = useState(null)
  // const [coursePurchasedID, setCoursePurchasedID] = useState(null);

  const { id } = useParams();
  const location = useLocation();

  async function fetchStudentViewCourseDetails() {
    const response = await fetchStudentViewCourseDetailsService(
      currentCourseDetailsID,
      auth?.user?._id
    );

    if (response?.success) {
      setStudentViewCoursesDetails(response?.data);
      setCoursePurchasedID(response?.coursePurchasedID)
      // setCoursePurchasedID(response?.coursePurchasedID);
      setLoadingState(false);
    } else {
      setStudentViewCoursesDetails(null);
      setCoursePurchasedID(false)
      // setCoursePurchasedID(false);
      setLoadingState(false);
    }
  }

  async function handleCreatePayment() {
    const paymentPayload = {
      userID: auth?.user?._id,
      userName: auth?.user?.userName,
      userEmail: auth?.user?.userEmail,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "initiated",
      orderDate: new Date(),
      paymentID: "",
      payerID: "",
      instructorID: studentViewCoursesDetails?.instructorID,
      instructorName: studentViewCoursesDetails?.instructorName,
      CourseImage: studentViewCoursesDetails?.image,
      CourseTitle: studentViewCoursesDetails?.title,
      courseID: studentViewCoursesDetails?._id,
      coursePricing: studentViewCoursesDetails?.pricing,
    };
    console.log("paymentPayload", paymentPayload);
    const response = await createPaymentService(paymentPayload);

    if (response.success) {
      sessionStorage.setItem(
        "currentOrderID",
        JSON.stringify(response?.data?.orderID),
      );
      setApprovalURL(response?.data?.approvalURL);
    }
  }

  function handleSetFreePreview(getcurentVideoInfo) {
    console.log(getcurentVideoInfo);
    setDisplayCurrentVideoFreePreview(getcurentVideoInfo?.videoUrl);
  }

  useEffect(() => {
    if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
  }, [displayCurrentVideoFreePreview]);

  useEffect(() => {
    if (currentCourseDetailsID !== null) fetchStudentViewCourseDetails();
  }, [currentCourseDetailsID]);

  useEffect(() => {
    if (id) setCurrentCourseDetailsID(id);
  }, [id]);

  useEffect(() => {
    if (!location.pathname.includes("/course/details/")) {
      setStudentViewCoursesDetails(null),
        setCurrentCourseDetailsID(null);
        // setCoursePurchasedID(null);
    }
  }, [location.pathname]);

  if (loadingState) return <Skeleton />;

  if(coursePurchasedID !== null && coursePurchasedID) {
    return <Navigate to={`/course-progress/${coursePurchasedID}`} />
  }

  // if (coursePurchasedID !== null) {
  //   return <Navigate to={`/course-progress/${coursePurchasedID}`} />;
  // }

  if (approvalurl !== "") {
    window.location.href = approvalurl;
  }

  const getIndexOfFreePreviewURL =
    studentViewCoursesDetails !== null
      ? studentViewCoursesDetails?.curriculum.findIndex(
          (item) => item.freePreview,
        )
      : -1;

  return (
    <div className="mx-auto p-4 ">
      <div className="bg-gray-900 text-white p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold mb-4">
          {studentViewCoursesDetails?.title}
        </h1>
        <p className="mb-4">{studentViewCoursesDetails?.subtitle}</p>
        <div className="flex items-center space-x-4 mt-2 text-sm">
          <span className="capitalize">
            {" "}
            Created By {studentViewCoursesDetails?.instructorName}
          </span>
          <span>
            Created on {studentViewCoursesDetails?.date.split("T")[0]}
          </span>
          <span className="flex items-center capitalize">
            <Globe className="mr-1 h-4 w-4" />
            {studentViewCoursesDetails?.primaryLanguage}
          </span>
          <span>
            {" "}
            {studentViewCoursesDetails?.students.length}{" "}
            {studentViewCoursesDetails?.students.length <= 1
              ? "student"
              : "students"}{" "}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <main className="flex-grow">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What you will learn</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grip-cols-2 gap-2">
                {studentViewCoursesDetails?.objectives
                  .split(",")
                  .map((objectives, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{objectives}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>{studentViewCoursesDetails?.description}</CardContent>
          </Card>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
            </CardHeader>
            <CardContent>
              {studentViewCoursesDetails?.curriculum?.map(
                (curriculumItem, index) => (
                  <li
                    className={`${curriculumItem?.freePreview ? "cursor-pointer" : "cursor-not-allowed"} flex items-center mb-4`}
                    onClick={
                      curriculumItem?.freePreview
                        ? () => handleSetFreePreview(curriculumItem)
                        : null
                    }
                  >
                    {curriculumItem?.freePreview ? (
                      <PlayCircle className="mr-2 h-4 w-4" />
                    ) : (
                      <Lock className="mr-2 h-4 w-4" />
                    )}
                    <span>{curriculumItem?.title}</span>
                  </li>
                ),
              )}
            </CardContent>
          </Card>
        </main>
        <aside className="w-full md:w-[500px]">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg flex items-center justify-center">
                <VideoPlayer
                  url={
                    getIndexOfFreePreviewURL !== -1
                      ? studentViewCoursesDetails?.curriculum[
                          getIndexOfFreePreviewURL
                        ].videoUrl
                      : ""
                  }
                  width="450px"
                  height="200px"
                />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold">
                  Ksh.{studentViewCoursesDetails?.pricing}
                </span>
              </div>
              <Button onClick={handleCreatePayment} className="w-full">
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
      <Dialog
        open={showFreePreviewDialog}
        onOpenChange={() => {
          setShowFreePreviewDialog(false);
          setDisplayCurrentVideoFreePreview(null);
        }}
      >
        <DialogContent className="w-[600px]">
          <DialogHeader>
            <DialogTitle>Course Preview</DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg flex items-center justify-center">
            <VideoPlayer
              url={displayCurrentVideoFreePreview}
              width="450px"
              height="200px"
            />
          </div>
          <div className="flex flex-col gap-2">
            {studentViewCoursesDetails?.curriculum
              ?.filter((item) => item.freePreview)
              .map((filteredItems) => (
                <p
                  onClick={() => handleSetFreePreview(filteredItems)}
                  className="cursor-pointer text-[16px] font-medium"
                >
                  {filteredItems?.title}
                </p>
              ))}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentViewCourseDetailsPage;
