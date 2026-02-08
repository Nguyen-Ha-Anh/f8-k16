import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MoreHorizontal, Send, X } from "lucide-react";
import { resolveMedia } from "@/utils/resolveMedia";
import { getPostDetail } from "@/api/posts/postDetailAPI";
import { getAvatar } from "@/utils/getAvatar";
import { useSelector } from "react-redux";
import axiosClient from "@/api/profile/axiosClient";
import { deletePost } from "@/api/posts/deletePostAPI";
import LikeButton from "./LikeButton";

export default function PostDetail() {
  const { postId } = useParams();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newCaption, setNewCaption] = useState("");

  //click vao ava thi chuyen qua profile
  const navigate = useNavigate();

  //edit caption
  const currentUser = useSelector((state: any) => state.auth.profile);
  //neu la post cua minh moi duoc edit
  const isOwner = currentUser?._id === post?.user?._id;

  const handleUpdateCaption = async () => {
    if (!isOwner) return;

    try {
      const res = await axiosClient.patch(`/posts/${post._id}`, {
        caption: newCaption,
      });

      setPost((prev: any) => ({
        ...prev,
        caption: res.data.data.caption,
      }));

      setEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    setError(false);

    getPostDetail(postId)
      .then((postData) => {
        console.log("raw", postData);
        console.log("user field", postData?.user);

        setPost(postData);
        setNewCaption(postData.caption || "");
      })
      .catch(() => {
        setError(true);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <p className="p-10">Loading post...</p>;
  if (error || !post) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-background rounded-xl p-8 text-center space-y-4">
          <p className="text-gray-500 text-sm">
            Post not found
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const media =
    post.mediaType === "image"
      ? resolveMedia(post.image)
      : resolveMedia(post.video);

  const username = post?.user?.username || "unknown";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center"
      onClick={() => navigate(-1)}
    >
      {/* close */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-foreground hover:scale-110 transition cursor-pointer"
      >
        <X />
      </button>

      <div
        className="bg-background rounded-xl overflow-hidden flex w-full max-w-7xl h-[900px] relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* left */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          {post.mediaType === "image" ? (
            <img src={media} className="max-h-full max-w-full object-contain" />
          ) : (
            <video
              src={media}
              controls
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>

        {/* right */}
        <div className="w-1/2 flex flex-col bg-background">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                onClick={() => navigate(`/profile/${post.user._id}`)}
                src={getAvatar(post.user) || "/avaauto.jpg"}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
              <b
                onClick={() => navigate(`/profile/${post.user._id}`)}
                className="cursor-pointer active:text-[#cccccc]/60"
              >
                {username}
              </b>
            </div>

            {isOwner && (
              <button
                onClick={() => setMenuOpen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition"
              >
                <MoreHorizontal size={18} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
            {editing ? (
              <div className="space-y-2">
                <textarea
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full border rounded-lg p-2 text-sm"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateCaption}
                    className="text-[#85A1FF] text-sm font-semibold"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setNewCaption(post.caption || "");
                    }}
                    className="text-sm text-muted-foreground"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p>
                <b
                  onClick={() => navigate(`/profile/${post.user._id}`)}
                  className="cursor-pointer active:text-[#cccccc]/60 hover:underline"
                >
                  {post.user?.username}
                </b>{" "}
                {post.caption}
              </p>
            )}

            {post.comments?.map((c: any) => (
              <p key={c._id}>
                <b
                  onClick={() => navigate(`/profile/${post.user._id}`)}
                  className="cursor-pointer active:text-[#cccccc]/60 hover:underline"
                >
                  {c.user.username}
                </b>{" "}
                {c.content}
              </p>
            ))}
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-4 mb-2">
              <LikeButton
                postId={post._id}
                initialLikes={post.likes}
                initialLiked={post.isLiked}
              />
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
      {/* popup */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="bg-background w-[360px] rounded-xl overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* delete */}
            <button
              onClick={async () => {
                if (!confirm("Delete this post?")) return;
                await deletePost(post._id);
                navigate(-1);
              }}
              className="w-full py-3 text-center text-red-500 font-semibold hover:bg-muted"
            >
              Delete
            </button>

            <div className="h-px bg-border" />

            {/* edit */}
            <button
              onClick={() => {
                setMenuOpen(false);
                setEditing(true);
              }}
              className="w-full py-3 text-center hover:bg-muted"
            >
              Edit
            </button>

            <div className="h-px bg-border" />

            {/* cancel */}
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 text-center hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
