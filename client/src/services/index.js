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

export async function mediaUploadService(formData) {
  const { data } = await axiosInstance.post("/media/upload", formData);
  return data;
}
