export type CommentType = {
  _id: string;
  content: string;
  userId: {
    _id: string;
    username: string;
    avatar?: string;
  };
};