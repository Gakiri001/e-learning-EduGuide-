const Course = require("../../models/Course");

const getAllStudentsViewCourses = async (req, res) => {
  try {
    const coursesList = await Course.find({});
    if (coursesList.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No course Found", data: [] });
    }
    res.status(200).json({
      success: true,
      data: coursesList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const getStudentViewCoursesDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details Found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = { getAllStudentsViewCourses, getStudentViewCoursesDetails };
