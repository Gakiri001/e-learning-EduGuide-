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

//Remember when you are deleting a course from student. Restart you 'studentCourses'in the course-controller.js, Its flikerring and deleting the courseDetails of other courses.

const deleteBoughtCoursesByID = async (req, res) => {
  try {
    const { studentId, courseId } = req.params;

    const result = await StudentCourses.findOneAndUpdate(
      { userID: studentId },
      { $pull: { courses: { courseID: courseId } } }, // Match courseID instead of _id
      { new: true }, // Return updated document
    );

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found or not removed" });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

module.exports = { getCoursesByStudentID, deleteBoughtCoursesByID };
