const express = require("express");
const {
  getAllStudentsViewCourses,
  getStudentViewCoursesDetails,
} = require("../../controllers/student-controllers/course-controller");

const router = express.Router();

router.get("/get", getAllStudentsViewCourses);

router.get("/get/details/:id", getStudentViewCoursesDetails);

module.exports = router;
