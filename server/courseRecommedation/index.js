const natural = require("natural");
const cosineSimilarity = require("cosine-similarity");
const Course = require("../models/Course"); // Import your Course model

// Function to extract features dynamically
async function extractCourseFeatures() {
  const courses = await Course.find(); // Get updated course list from MongoDB
  const tfidf = new natural.TfIdf();

  courses.forEach((course) => tfidf.addDocument(course.description));

  return courses.map((course) => {
    let textVector = [];
    tfidf.tfidfs(course.description, (i, measure) => textVector.push(measure));

    let categoryVector = [course.category === "Web Development" ? 1 : 0];
    let levelVector = [course.level === "Beginner" ? 1 : 0];
    let langVector = [course.primaryLanguage === "English" ? 1 : 0];

    let pricing = course.pricing / 100;
    let studentCount = course.students.length / 500;

    return {
      id: course._id,
      vector: [
        ...textVector,
        ...categoryVector,
        ...levelVector,
        ...langVector,
        pricing,
        studentCount,
      ],
    };
  });
}

// Compute Similarities
async function computeSimilarity(targetCourseId) {
  const featureVectors = await extractCourseFeatures();
  const targetCourse = featureVectors.find(
    (course) => course.id == targetCourseId,
  );

  if (!targetCourse) return [];

  let similarities = featureVectors
    .filter((course) => course.id !== targetCourseId)
    .map((course) => ({
      id: course.id,
      similarityScore: cosineSimilarity(targetCourse.vector, course.vector),
    }));

  return similarities.sort((a, b) => b.similarityScore - a.similarityScore);
}

module.exports = {
  computeSimilarity,
};
