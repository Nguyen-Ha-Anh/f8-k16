import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Send } from "lucide-react";
import { resolveMedia } from "@/utils/resolveMedia";
import { getPostDetail } from "@/api/posts/postDetailAPI";
import { getAvatar } from "@/utils/getAvatar";

export default function PostDetail() {
  const { postId } = useParams();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    getPostDetail(postId)
      .then((postData) => {
        console.log("FINAL POST:", postData);
        setPost(postData);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p className="p-10">Loading post...</p>;
  if (!post || !post.user) return null;

  const media =
    post.mediaType === "image"
      ? resolveMedia(post.image)
      : resolveMedia(post.video);

  const username = post?.user?.username || "unknown";

  return (
    <div className="min-h-screen flex items-center justify-center bg-black/80 p-10">
      <div className="bg-background rounded-xl overflow-hidden flex w-full max-w-5xl h-[600px]">
        {/* left */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          {post.mediaType === "image" ? (
            <img src={media} className="max-h-full object-contain" />
          ) : (
            <video src={media} controls className="max-h-full object-contain" />
          )}
        </div>

        {/* right */}
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b">
            <img
              src={getAvatar(post.user) || "/avaauto.jpg"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <b>{username}</b>
          </div>

          {/* comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            <p>
              <b>{post.user?.username}</b> {post.caption}
            </p>

            {post.commentsList?.map((c: any) => (
              <p key={c._id}>
                <b>{c.user.username}</b> {c.content}
              </p>
            ))}
          </div>

          {/* likes */}
          <div className="border-t p-4">
            <div className="flex items-center gap-4 mb-2">
              <Heart className="cursor-pointer hover:text-red-500 transition" />
              <span className="text-sm">
                <b>{post.likes}</b> likes
              </span>
            </div>

            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm"
              />
              <button className="text-blue-500 font-semibold flex items-center gap-1">
                <Send size={16} /> Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
