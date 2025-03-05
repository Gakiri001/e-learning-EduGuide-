const mongoose = require("mongoose");
const studentCourses2Schema = new mongoose.Schema({
  userID: String,
  courses2: [
    {
      courseID: String,
      title: String,
      instructorID: String,
      instructorName: String,
      dateOfPurchase: Date,
      courseImage: String,
    },
  ],
});

module.exports = mongoose.model("StudentCourses2", studentCourses2Schema);
