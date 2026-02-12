import { useCallback, useEffect, useRef, useState } from "react";
import PostItem from "./PostItem";
import type { Post } from "@/types/posts/PostType";
import { getFeedPosts } from "@/api/posts/postAPI";

export default function PostList() {
  console.log("PostList render");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);

    try {
      const res = await getFeedPosts(limit, offset);
      console.log("API RESULT:", res);
      

    setPosts((prev) => [...prev, ...res.posts]);
    setHasMore(res.hasMore);
    setOffset((prev) => prev + limit);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }, [offset, hasMore]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  // useEffect(() => {
  //   loadMorePosts();
  //   getFeedPosts()
  //     .then(setPosts)
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadMorePosts]);

  if (posts.length === 0 && loading) {
    return <p className="text-center text-zinc-400">Loading feed...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}

      {hasMore && (
        <div
          ref={observerRef}
          className="h-10 flex items-center justify-center"
        >
          {loading && <p className="text-zinc-400 text-sm">Loading...</p>}
        </div>
      )}
    </div>
  );
}
