import axiosClient from "./axiosClient";

export const getProfile = async () => {
  const res = await axiosClient.get("/users/profile");
  console.log("API profile:", res.data);
  return res.data.data;
};

export const updateProfile = async (formData: FormData) => {
  const res = await axiosClient.patch("/users/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  console.log([...formData.entries()]);
  return res.data;
};

export const deleteProfilePicture = async () => {
  const res = await axiosClient.delete("/users/profile/picture");
  return res.data;
};

