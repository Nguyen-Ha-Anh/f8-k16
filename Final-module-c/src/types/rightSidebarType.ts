export type User = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  isFollowing: boolean;
};

export type SuggestedUser = User & {
  reason?: string;
};
