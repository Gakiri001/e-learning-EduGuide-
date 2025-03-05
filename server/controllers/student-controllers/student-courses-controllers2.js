const StudentCourses2 = require("../../models/StudentCourses2");

const getCoursesByStudentID = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log("Fetching courses for studentId: ", studentId);
    const studentBoughtCourses = await StudentCourses2.findOne({
      userID: studentId,
    });

    // Check if no courses are found
    if (!studentBoughtCourses) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this student.",
      });
    }

    res.status(200).json({
      success: true,
      data: studentBoughtCourses.courses2 || [],
    });
    console.log("Fetched Student Courses: ", studentBoughtCourses);
    console.log("kkkk");
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "some Error Occured" });
  }
};

console.log("kkkk");

module.exports = { getCoursesByStudentID };
