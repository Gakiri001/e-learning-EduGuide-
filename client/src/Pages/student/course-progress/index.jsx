import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Context/Auth-context";
import { studentContext } from "@/Context/student-context";
import { getCurrentCourseProgressService } from "@/services";
import { ChevronLeft } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(studentContext);

  const courseid = useParams();
  console.log("Courseid", courseid.id);
  console.log("userID", auth?.user?._id);

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(
      auth?.user?._id,
      courseid.id,
    );

    console.log("response", response);
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [courseid]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      <div className="flex justify-between items-center p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => navigate(`/student-courses`)}
            className="text-black bg-white"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
          <h1>Oyah Mzee</h1>
        </div>
      </div>
    </div>
  );
}

export default StudentViewCourseProgressPage;
