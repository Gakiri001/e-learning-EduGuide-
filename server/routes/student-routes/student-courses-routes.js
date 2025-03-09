const express = require("express");
const {
  getCoursesByStudentID,
  deleteBoughtCoursesByID,
} = require("../../controllers/student-controllers/student-courses-controllers");

const router = express.Router();

router.get("/get/:studentId", getCoursesByStudentID);
router.delete("/delete/:id", deleteBoughtCoursesByID);

module.exports = router;
