import { useEffect, useState } from "react";
import type { ExplorePost, ExplorePagination } from "@/types/exploreType";
import { Heart, MessageCircle } from "lucide-react";
import { getExplorePosts } from "@/api/posts/exploreAPI";
import { resolveMedia } from "@/utils/resolveMedia";
import { useLocation, useNavigate } from "react-router-dom";

export default function Explore() {
  const [posts, setPosts] = useState<ExplorePost[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<ExplorePagination | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const openPost = (postId: string) => {
    navigate(`/posts/${postId}`, {
      state: { backgroundLocation: location },
    });
  };

  const fetchExplore = async () => {
    setLoading(true);
    try {
      const postsData = await getExplorePosts(page, 20);
      const cleanPosts = postsData.posts.filter((p) => p.image || p.video);

      setPosts((prev) =>
        page === 1 ? cleanPosts : [...prev, ...cleanPosts],
      );
      setPagination(postsData.pagination);
    } finally {
      setLoading(false);
    }
  };

  const removePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  useEffect(() => {
    setPage(1);
    setPosts([]);
  }, []);

  useEffect(() => {
    fetchExplore();
  }, [page]);

  return (
    <div className="p-6 max-w-[935px] mx-auto">
      <div className="grid grid-cols-3 gap-1">
        {posts.map((post) => (
          <div
            key={post._id}
            onClick={() => openPost(post._id)}
            className="relative group cursor-pointer"
          >
            {post.mediaType === "image" ? (
              <img
                src={resolveMedia(post.image)}
                className="w-full h-full object-cover"
                onError={() => removePost(post._id)}
              />
            ) : (
              <video
                src={resolveMedia(post.video)}
                className="w-full h-full object-cover"
                onError={() => removePost(post._id)}
              />
            )}

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white transition">
              <p className="flex gap-2">
                <Heart />
                {post.likes}
              </p>
              <p className="flex gap-2">
                <MessageCircle />
                {post.comments}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* load more */}
      {pagination?.hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
            className="px-6 py-2 bg-white text-black rounded-lg font-semibold"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
