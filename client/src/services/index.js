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

export async function checkAuth() {
  const data = await axiosInstance.get("/auth/check-auth");
  return data;
}
