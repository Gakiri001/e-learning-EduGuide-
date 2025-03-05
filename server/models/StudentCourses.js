const mongoose = require("mongoose");
const studentCoursesSchema = new mongoose.Schema({
  userID: String,
  courses: [
    {
      courseID: String,
      title: String,
      instructorID: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
      price: Number, //added for testing
    },
  ],
});

module.exports = mongoose.model("StudentCourses", studentCoursesSchema);
