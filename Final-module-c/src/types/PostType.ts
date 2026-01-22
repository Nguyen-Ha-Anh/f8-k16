export type User = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
};

export type Post = {
  _id: string;
  image?: string;
  video?: string
  caption: string;
  user: {
    _id: string;
    username: string;
    profilePicture?: string | null;
  } 
  likes: number;
  comments: number;
  createdAt: string;
  mediaType?: 'image' | 'video'
};
