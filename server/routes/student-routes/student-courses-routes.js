const express = require("express");
const {
  getCoursesByStudentID,
  deleteBoughtCoursesByID,
} = require("../../controllers/student-controllers/student-courses-controllers");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentID);
router.delete("/student/course/:studentId/:courseId", deleteBoughtCoursesByID);

module.exports = router;
