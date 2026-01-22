export type UserProfile = {
  _id: string;
  username: string;
  fullName: string;
  bio?: string;
  profilePicture: string;
  posts?: {
    _id: string;
    image: string;
  }[];
  postsCount?: number;
  followersCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
};
