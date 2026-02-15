export type FollowButtonType = {
  userId: string;
  initialFollowing?: boolean;
  onChange?: (following: boolean) => void;
};
