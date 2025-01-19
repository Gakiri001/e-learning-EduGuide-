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

export async function fetchStudentViewCourseListService() {
  const { data } = await axiosInstance.get(`/student/course/get`);
  return data;
}

export async function fetchStudentViewCourseDetailsService(courseid) {
  const { data } = await axiosInstance.get(
    `/student/course/get/details/${courseid}`,
  );
  return data;
}
