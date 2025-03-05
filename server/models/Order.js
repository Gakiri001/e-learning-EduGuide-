const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userID: String,
  userName: String,
  userEmail: String,
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  orderDate: Date,
  paymentID: String,
  payerID: String,
  instructorID: String,
  instructorName: String,
  CourseImage: String,
  CourseTitle: String,
  courseID: String,
  coursePricing: String,
});

module.exports = mongoose.model("Orde", OrderSchema);
