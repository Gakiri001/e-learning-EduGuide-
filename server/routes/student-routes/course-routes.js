const express = require("express");
const {
  getAllStudentsViewCourses,
  getStudentViewCoursesDetails,
  checkCoursePurchaseInfo,
} = require("../../controllers/student-controllers/course-controller");

const router = express.Router();

router.get("/get", getAllStudentsViewCourses);

router.get("/get/details/:id", getStudentViewCoursesDetails);

router.get("/purchase-info/:id/:studentID", checkCoursePurchaseInfo);

module.exports = router;
