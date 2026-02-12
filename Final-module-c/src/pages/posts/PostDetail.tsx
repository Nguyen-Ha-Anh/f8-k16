import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Heart, MoreHorizontal, X } from "lucide-react";
import { resolveMedia } from "@/utils/resolveMedia";
import { getPostDetail } from "@/api/posts/postDetailAPI";
import { getAvatar } from "@/utils/getAvatar";
import { useSelector } from "react-redux";
import LikeButton from "./LikeButton";
import PostMenu from "./PostMenu";
import { deletePost } from "@/api/posts/postAPI";
import EditCaption from "./EditCaption";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { useComments } from "@/hooks/useComments";

export default function PostDetail() {
  const { postId } = useParams();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  //click vao ava thi chuyen qua profile
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || -1;

  //edit caption
  const currentUser = useSelector((state: any) => state.auth.profile);
  //neu la post cua minh moi duoc edit
  const isOwner = currentUser?._id === post?.user?._id;

  const videoRef = useRef<HTMLVideoElement>(null);

  // comments
  const [posting, setPosting] = useState(false);
  const { comments, addComment, fetchComments, hasMore, toggleLike } =
    useComments(post?._id || "");
  const commentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post?.mediaType === "video") {
      videoRef.current?.play().catch(() => {});
    }
  }, [post]);

  useEffect(() => {
    if (!postId) return;

    setLoading(true);
    setError(false);

    getPostDetail(postId)
      .then((postData) => {
        console.log("raw", postData);
        console.log("user field", postData?.user);

        setPost(postData);
      })
      .catch(() => {
        setError(true);
        setPost(null);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  useEffect(() => {
    const container = commentContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 50;

      if (isBottom && hasMore) {
        fetchComments();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, fetchComments]);

  if (loading) return <p className="p-10">Loading post...</p>;
  if (error || !post) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-background rounded-xl p-8 text-center space-y-4">
          <p className="text-gray-500 text-sm">Post not found</p>
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
        onClick={(e) => {
          e.stopPropagation();
          navigate(from);
        }}
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
              ref={videoRef}
              muted
              playsInline
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
              <PostMenu
                postUserId={post.user._id}
                onDelete={() => {
                  setShowDeleteConfirm(true);
                }}
                onEdit={() => {
                  setEditing(true);
                }}
              />
            )}
          </div>

          <div
            ref={commentContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 text-sm"
          >
            {editing ? (
              <EditCaption
                postId={post._id}
                initialCaption={post.caption}
                onCancel={() => setEditing(false)}
                onSaved={(newCaption) => {
                  setPost((p: any) => ({ ...p, caption: newCaption }));
                  setEditing(false);
                }}
              />
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

            {comments.map((c) => (
              <div key={c._id} className="flex justify-between">
                <div className="flex gap-2 mt-3">
                  <img
                    src={getAvatar(c.userId) || "/avaauto.jpg"}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-semibold mr-2">
                        {c.userId?.username}
                      </span>
                      {c.content}
                    </div>

                    {/* line */}
                    <div className="flex items-center gap-4 text-xs text-zinc-500 mt-1">
                      <span>
                        {c.createdAt ? formatTimeAgo(c.createdAt) : "Now"}
                      </span>

                      {c.likes > 0 && (
                        <span className="font-medium">
                          {c.likes} {c.likes === 1 ? "like" : "likes"}
                        </span>
                      )}

                      <button className="hover:text-foreground">Reply</button>

                      <button className="hover:text-foreground">
                        <MoreHorizontal size={15}/>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                  <button
                    onClick={() => toggleLike(c._id, c.isLiked)}
                    className="transition transform active:scale-90"
                  >
                    <Heart
                      size={16}
                      className={`transition ${
                        c.isLiked
                          ? "text-red-500 fill-red-500"
                          : "text-foreground"
                      }`}
                    />
                  </button>

                  {c.likes > 0 && <span>{c.likes}</span>}
                </div>
              </div>
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
                <b>{post.likes}</b>
              </span>
            </div>
            <p className="text-zinc-400 text-xs mb-3">
              {post.createdAt ? formatTimeAgo(post.createdAt) : ""}
            </p>

            <div className="flex gap-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-transparent border rounded-lg px-3 py-2 text-sm"
              />
              <button
                disabled={posting || !comment.trim()}
                onClick={async () => {
                  if (!comment.trim() || posting) return;

                  try {
                    setPosting(true);
                    await addComment(comment);
                    setComment("");
                  } finally {
                    setPosting(false);
                  }
                }}
                className={`font-semibold flex items-center gap-1 ${
                  posting || !comment.trim()
                    ? "text-gray-600"
                    : "text-gray-200 hover:underline cursor-pointer"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        open={showDeleteConfirm}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          await deletePost(post._id);
          setShowDeleteConfirm(false);
          navigate(-1);
        }}
      />
    </div>
  );
}
