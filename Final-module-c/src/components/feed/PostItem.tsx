import { useAutoPlayVideo } from "@/hooks/useAutoPlayVideo";
import type { Post } from "@/types/posts/PostType";
import { getAvatar } from "@/utils/getAvatar";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostItem({ post }: { post: Post }) {
  const user = post.user

  const navigate = useNavigate();

  const videoRef = useAutoPlayVideo()

  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `https://instagram.f8team.dev${post.image}`
    : "/post-placeholder.jpg";

  const videoUrl = post.video
    ? post.video.startsWith("http")
      ? post.video
      : `https://instagram.f8team.dev${post.video}`
    : null;

  console.log("avatar:", user);

  return (
    <div className="border-b border-zinc-800 pb-6">
      <div
        className="flex items-center gap-3 mb-3 cursor-pointer"
        onClick={() => {
          console.log("navigate:", user?._id);
          if (user?._id) {
            navigate(`/profile/${user._id}`);
          }
        }}
      >
        <img
          src={getAvatar(user)}
          onError={(e) => {
            e.currentTarget.src = "/avaauto.jpg";
          }}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-semibold text-sm">
          {user?.username || "unknown"}
        </span>
        <span className="text-zinc-400 text-xs">
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
        </span>
      </div>

      {/* image | video */}
      {post.mediaType === "video" && videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          muted
          loop
          playsInline
          autoPlay={false}
          className="w-full rounded-md object-cover"
        />
      ) : (
        <img src={imageUrl} className="w-full rounded-md object-cover" />
      )}

      {/* actions */}
      <div className="flex gap-4 select-none">
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Heart />
          <p className="text-sm font-semibold ">{post.likes || 0}</p>
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <MessageCircle />
          <p className="text-sm font-semibold">{post.comments|| 0}</p>
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Repeat2 />
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Send />
        </div>
      </div>

      {/* caption */}
      <p className="text-sm">
        <span
          onClick={() => {
            if (user?._id) {
              navigate(`/profile/${user._id}`);
            }
          }}
          className="font-semibold cursor-pointer"
        >
          {user?.username || "unknown"}
        </span>{" "}
        {post.caption}
      </p>
    </div>
  );
}
