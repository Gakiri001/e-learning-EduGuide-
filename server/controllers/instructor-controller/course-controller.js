const { json } = require("express");
const Course = require("../../models/Course");

const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    if (saveCourse) {
      res.status(201).json({
        success: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured in adding the new course",
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courseList = await Course.find();

    res.status(200).json({
      success: true,
      data: courseList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured in adding the new course",
    });
  }
};

const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const CourseDetails = await Course.findById(id);

    if (!CourseDetails) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: CourseDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured in adding the new course",
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true },
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured in adding the new course",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseById,
  getCourseDetailsByID,
};
