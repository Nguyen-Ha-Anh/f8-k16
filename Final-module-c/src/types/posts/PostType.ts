export type User = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
};

export type Comment = {
  _id: string;
  content: string;
  user: {
    username: string;
  };
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
  isLiked: boolean;

  comments: number;
  createdAt: string;
  thumbnail?: string; 
  mediaType?: 'image' | 'video'

  isSaved?: boolean;
};


