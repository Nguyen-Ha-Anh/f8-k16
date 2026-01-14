import { posts } from "@/mock/postAPI";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
