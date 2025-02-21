const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  publicID: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  instructorID: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  pricing: Number,
  objectives: String,
  image: String,
  welcomeMessage: String,
  students: [
    {
      studentID: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublished: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);
