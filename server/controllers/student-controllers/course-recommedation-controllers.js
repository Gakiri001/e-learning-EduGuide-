const { computeSimilarity } = require("../../courseRecommedation/index");
const StudentCourses = require("../../models/StudentCourses");
const Course = require("../../models/Course"); // Import your Course model

const getCourseRecommedation = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCourses = await StudentCourses.findOne({ userID: userId });

    if (!userCourses || userCourses.courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No purchased courses yet!",
      });
    }

    const lastCourseID = userCourses.courses.slice(-1)[0].courseID;
    const recommendations = await computeSimilarity(lastCourseID);

    const recommendedCourses = await Course.find({
      _id: { $in: recommendations.map((rec) => rec.id) },
    }).limit(5);

    res.status(200).json({
      success: true,
      message: "Recommended courses",
      data: recommendedCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occured",
    });
  }
};

module.exports = {
  getCourseRecommedation,
};
