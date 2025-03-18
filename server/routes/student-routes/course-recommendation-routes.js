const express = require("express");

const {
  getCourseRecommedation,
} = require("../../controllers/student-controllers/course-recommedation-controllers");

const router = express.Router();

router.get("/recommend/:userId", getCourseRecommedation);

module.exports = router;
