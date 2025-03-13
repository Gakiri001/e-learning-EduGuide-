const CourseProgress = require(`../../models/CourseProgress`);
const Course = require(`../../models/Course`);
const StudentCourses = require(`../../models/StudentCourses`);

//Mark the current course as viewed
const markCurrentLectureAsViewed = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

//Get the current course progress
const getCurrentCourseProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    const studentPurchasedCourses = await StudentCourses.findOne({
      userID: userId,
    });

    console.log("studentPurchasedCourses", studentPurchasedCourses);

    const isCurrentCoursePurchasedByCurrentUserOrNot =
      studentPurchasedCourses?.courses?.findIndex(
        (item) => item.courseID === courseId,
      ) > -1;

    console.log(
      "isCurrentCoursePurchasedByCurrentUserOrNot",
      isCurrentCoursePurchasedByCurrentUserOrNot,
    );

    if (!isCurrentCoursePurchasedByCurrentUserOrNot) {
      return res.status(200).json({
        success: true,
        data: {
          isPurchased: false,
        },
        message: "You need to purchase this course to access it",
      });
    } else {
      console.log("Course is purchased by the user");
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    //Student bado hajaanza kuwatch course
    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress?.lecturesProgress?.length === 0
    ) {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "No courses found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "No Progress Found, you can start watching the courses",
        data: {
          courseDetails: course,
          progress: [],
          isPurchased: true,
        },
      });
    }

    const courseDetails = await Course.findById(courseId);

    res.status(200).json({
      success: true,
      data: {
        courseDetails,
        progress: currentUserCourseProgress.lecturesProgress,
        completed: currentUserCourseProgress.completed,
        completionDate: currentUserCourseProgress.completionDate,
        isPurchased: true,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

//reset course Progress
const resetCourseProgress = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some Error occured",
    });
  }
};

module.exports = {
  markCurrentLectureAsViewed,
  getCurrentCourseProgress,
  resetCourseProgress,
};
