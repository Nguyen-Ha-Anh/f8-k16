export type User = {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  followedBy?: string
};

export type SuggestedUser = User & {
  reason?: string;
};
