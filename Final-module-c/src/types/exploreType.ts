export interface ExploreUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

export interface ExplorePost {
  _id: string;
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: "image" | "video";
  likes: number;
  comments: number;
  engagementScore: number;
  createdAt: string;
  user: ExploreUser;
}

export interface ExplorePagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
}

export interface ExploreResponse {
  posts: ExplorePost[];
  pagination: ExplorePagination;
}
