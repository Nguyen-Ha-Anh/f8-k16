export type UserPost = {
  _id: string;
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: "image" | "video";
  likes: number;
  comments: number;
  createdAt: string;
};
