export type FollowButtonType = {
  userId: string;
  initialFollowing?: boolean;
  onChange?: (following: boolean) => void;
};

export type UserFollow = {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
};

export type FollowProps = {
  type: "followers" | "following";
  userId: string;
  onClose: () => void;
};
