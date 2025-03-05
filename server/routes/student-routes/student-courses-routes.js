const express = require("express");
const {
  getCoursesByStudentID,
} = require("../../controllers/student-controllers/student-courses-controllers");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentID);

module.exports = router;
