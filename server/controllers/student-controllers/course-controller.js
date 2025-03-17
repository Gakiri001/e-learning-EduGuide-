const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

const getAllStudentsViewCourses = async (req, res) => {
  try {
    const {
      category = [],
      level = [],
      primaryLanguage = [],
      sortBy = "price-lowtohigh",
    } = req.query;

    let filters = {};
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }
    if (level.length) {
      filters.level = { $in: level.split(",") };
    }
    if (primaryLanguage.length) {
      filters.primaryLanguage = { $in: primaryLanguage.split(",") };
    }

    let sortParams = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sortParams.pricing = 1;
        break;
      case "price-hightolow":
        sortParams.pricing = -1;
        break;
      case "title-atoz":
        sortParams.title = 1;
        break;
      case "title-ztoa":
        sortParams.title = -1;
        break;

      default:
        sortParams.pricing = 1;
        break;
    }

    const coursesList = await Course.find(filters).sort(sortParams);
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

const checkCoursePurchaseInfo = async (req, res) => {
  try {
    const { id, studentID } = req.params;
    const studentCourses = await StudentCourses.findOne({ userID: studentID });

    if (!studentCourses) {
      return res.status(200).json({
        success: true,
        data: false,
      });
    }

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseID === id) > -1;

    res.status(200).json({
      success: true,
      data: ifStudentAlreadyBoughtCurrentCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

const enrollStudentInCourse = async (req, res) => {
  try {
    const { studentID, studentName, studentEmail, courseID, paidAmount } =
      req.body;

    // Find the course
    const course = await Course.findById(courseID);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    // Check if student is already enrolled
    const isStudentAlreadyEnrolled = course.students.some(
      (student) => student.studentID === studentID,
    );
    if (isStudentAlreadyEnrolled) {
      return res
        .status(400)
        .json({ success: false, message: "Student already enrolled" });
    }

    // Add student to the course
    course.students.push({
      studentID,
      studentName,
      studentEmail,
      paidAmount,
    });

    await course.save();

    res
      .status(200)
      .json({ success: true, message: "Student enrolled successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error enrolling student" });
  }
};

module.exports = {
  getAllStudentsViewCourses,
  getStudentViewCoursesDetails,
  checkCoursePurchaseInfo,
  enrollStudentInCourse,
};
