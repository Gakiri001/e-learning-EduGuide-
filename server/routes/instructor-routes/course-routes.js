const express = require("express");
const {
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseById,
  deleteCourseByID,
} = require("../../controllers/instructor-controller/course-controller");

const router = express.Router();
router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsByID);
router.put("/update/:id", updateCourseById);
router.delete("/delete/:id", deleteCourseByID);

module.exports = router;
