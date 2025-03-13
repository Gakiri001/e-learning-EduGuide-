const express = require("express");
const {
  getCurrentCourseProgress,
} = require("../../controllers/student-controllers/course-progress-controllers");

const router = express.Router();

router.get("/get/:userId/:courseId", getCurrentCourseProgress);

module.exports = router;
