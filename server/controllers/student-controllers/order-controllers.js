const paypal = require('../../helpers/paypal')
const Order = require('../../models/Order')
const StudentCourses = require('../../models/StudentCourses')
const Course = require('../../models/Course')

const createOrder = async(req, res) => {
  try {
    const {
      userID,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      paymentID,
      payerID,
      instructorID,
      instructorName,
      CourseImage,
      CourseTitle,
      courseID,
      coursePricing
    } = req.body
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message:"Error Occured"})
  }
}

const capturePaymentAndFinanlizeOrder  = async(res, req) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message:"Error Occured"})
  }
}

module.exports = {createOrder, capturePaymentAndFinanlizeOrder}