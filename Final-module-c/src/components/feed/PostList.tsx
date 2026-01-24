import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import type { Post } from "@/types/posts/PostType";
import { getFeedPosts } from "@/api/posts/postAPI";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-zinc-400">Loading feed...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </div>
  );
}
