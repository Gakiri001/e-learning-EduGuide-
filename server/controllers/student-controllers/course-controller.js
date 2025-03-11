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
    const { id, studentID } = req.params;
    const courseDetails = await Course.findById(id);
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "No course details Found",
        data: null,
      });
    }
    //check if the student has already bought the course or not
    const studentCourses = await StudentCourses.findOne({ userID: studentID });

    console.log("studentCourses", studentCourses);

    const ifStudentAlreadyBoughtCurrentCourse =
      studentCourses.courses.findIndex((item) => item.courseID === id) > -1;

    console.log("ifStudentAlreadyBoughtCurrentCourse", ifStudentAlreadyBoughtCurrentCourse);
    

    res.status(200).json({
      success: true,
      data: courseDetails,
      coursePurchasedID: ifStudentAlreadyBoughtCurrentCourse ? id : null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some error occured" });
  }
};

module.exports = { getAllStudentsViewCourses, getStudentViewCoursesDetails };
