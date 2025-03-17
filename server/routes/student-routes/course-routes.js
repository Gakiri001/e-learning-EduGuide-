const express = require("express");
const {
  getAllStudentsViewCourses,
  getStudentViewCoursesDetails,
  checkCoursePurchaseInfo,
  enrollStudentInCourse,
} = require("../../controllers/student-controllers/course-controller");

const router = express.Router();

router.get("/get", getAllStudentsViewCourses);

router.get("/get/details/:id", getStudentViewCoursesDetails);

router.get("/purchase-info/:id/:studentID", checkCoursePurchaseInfo);

router.post("/courses/enroll", enrollStudentInCourse);

module.exports = router;
