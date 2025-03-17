import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const data = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });

  return data;
}

export async function logInService(formData) {
  const data = await axiosInstance.post("/auth/login", formData);
  return data;
}

export async function checkAuthService() {
  const data = await axiosInstance.get("/auth/check-auth");
  return data;
}

export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (ProgressEvent) => {
      const percentCompleted = Math.round(
        (ProgressEvent.loaded * 100) / ProgressEvent.total,
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);
  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);
  return data;
}

export async function fetchInstructorCourseDetailsByIDService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`,
  );
  return data;
}

export async function updateCourseByIDService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData,
  );
  return data;
}
export async function deleteCourseByIDService(id, formData) {
  const { data } = await axiosInstance.delete(
    `/instructor/course/delete/${id}`,
    {
      data: formData,
    },
  );
  return data;
}

export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (ProgressEvent) => {
      const percentCompleted = Math.round(
        (ProgressEvent.loaded * 100) / ProgressEvent.total,
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}

export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);
  return data;
}

export async function fetchStudentViewCourseDetailsService(courseid) {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseid}`,
  );
  return data;
}

export async function checkCoursePurchaseInfoService(courseid, studentID) {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseid}/${studentID}`,
  );
  return data;
}

export async function enrollStudentInCourseService(formData) {
  const { data } = await axiosInstance.post(
    `/student/course/courses/enroll`,
    formData,
  );
  return data;
}

//1
export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);
  return data;
}
//2
export async function captureAndfinalizePaymentService(
  paymentID,
  payerID,
  orderID,
) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentID,
    payerID,
    orderID,
  });
  return data;
}

export async function fetchStudentBoughtCourseService(studentId) {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`,
  );
  return data;
}

export async function deleteBoughtCourseByIDService(id) {
  const { data } = await axiosInstance.delete(
    `/student/courses-bought/delete/${id}`,
  );
  return data;
}

export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`,
  );
  return data;
}

export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    },
  );
  return data;
}

export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    },
  );
  return data;
}
