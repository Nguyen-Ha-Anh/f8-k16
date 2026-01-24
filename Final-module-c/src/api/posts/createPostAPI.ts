import type { CreatePostResponse } from "@/types/posts/createPostType";
import axiosClient from "../profile/axiosClient";

export const createPost = async (
  file: File,
  caption?: string
): Promise<CreatePostResponse["data"]> => {
    console.log("USING AXIOS CLIENT - CREATE POST CALLED");

    const formData = new FormData();
    formData.append("file", file);
    if (caption) {
        formData.append("caption", caption);
    }

    const res = await axiosClient.post<CreatePostResponse>("/posts", formData);

    return res.data.data;
};
