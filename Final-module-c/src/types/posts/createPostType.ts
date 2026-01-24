export type CreatePostResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    userId: string;
    caption?: string;
    image?: string | null;
    video?: string | null;
    mediaType: "image" | "video";
    likes: number;
    comments: number;
    createdAt: string;
  };
};
