import type { Post } from "@/types/PostType";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";

export default function PostItem({ post }: { post: Post }) {
  return (
    <div className="border-b border-zinc-800 pb-6">
      <div className="flex items-center gap-3 mb-3">
        <img src={post.user.avatar} className="w-8 h-8 rounded-full" />
        <span className="font-semibold text-sm">{post.user.username}</span>
        <span className="text-zinc-400 text-xs">{post.time}</span>
      </div>

      {/* image */}
      <img src={post.image} className="w-full rounded-md object-cover" />

      {/* actions */}
      <div className="flex gap-4">
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Heart />
          <p className="text-sm font-semibold">
            {post.likes.toLocaleString()}K
          </p>
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <MessageCircle/>
          <p className="text-sm font-semibold">
            {post.comments.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Repeat2/>
          <p className="text-sm font-semibold">
            {post.repeat.toLocaleString()}
          </p>
        </div>
        <div className="flex gap-1 mt-3 text-xl items-center mb-2">
          <Send/>
        </div>
      </div>

      {/* caption */}
      <p className="text-sm">
        <span className="font-semibold">{post.user.username}</span>{" "}
        {post.caption}
      </p>
    </div>
  );
}
