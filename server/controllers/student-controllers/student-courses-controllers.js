const StudentCourses = require("../../models/StudentCourses");

const getCoursesByStudentID = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentBoughtCourses = await StudentCourses.findOne({
      userID: studentId,
    });

    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses || [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "some Error Occured" });
  }
};

const deleteBoughtCoursesByID = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await StudentCourses.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
      data: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "some Error Occured" });
  }
};

module.exports = { getCoursesByStudentID, deleteBoughtCoursesByID };
