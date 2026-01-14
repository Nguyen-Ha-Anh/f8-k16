export type Post = {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  image: string;
  likes: number;
  comments: number;
  repeat: number;
  caption: string;
  time: string;
};
