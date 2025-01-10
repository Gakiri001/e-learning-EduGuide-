const { json } = require('express');
const Course = require('../../models/Course')

const addNewCourse = async (req,res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();

    res.status(201).json({
      
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Some error occured in adding the new course'})
    
  }
}

const getAllCourses = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Some error occured in adding the new course'})
    
  }
}

const getCourseDetails = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Some error occured in adding the new course'})
    
  }
}

const updateCourseById = async (req,res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: 'Some error occured in adding the new course'})
    
  }
}

module.exports = {addNewCourse, getAllCourses, updateCourseById, getCourseDetails}