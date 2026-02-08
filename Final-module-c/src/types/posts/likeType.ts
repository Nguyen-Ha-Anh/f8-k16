export type LikeParams = {
  postId: string;
  initialLikes: number;
};

export type LikeProps = {
  postId: string;
  initialLikes: number;
  initialLiked: boolean;
  size?: number;
};