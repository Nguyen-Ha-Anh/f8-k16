export interface FollowButtonProps {
  userId: string;
  initialFollowing: boolean;
  onChange?: (followed: boolean) => void;
}