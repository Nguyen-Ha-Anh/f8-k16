import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAvatar } from "@/utils/getAvatar";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/types/users/userType";
import { getUserById } from "@/api/users/userAPI";
import { getUserPosts } from "@/api/posts/userPostsAPI";
import { Bookmark, Clapperboard, Grid, Video } from "lucide-react";
import { resolveMedia } from "@/utils/resolveMedia";
import FollowButton from "../follow/FollowButton";

export default function UserProfile() {
  const { userId } = useParams();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "video" | "saved">("all");
  const [page, setPage] = useState(0);
  const [activeTab, setActiveTab] = useState<"posts" | "video" | "saved">(
    "posts",
  );

  const [, setFollowers] = useState<number>(0);

  useEffect(() => {
    if (user?.followersCount !== undefined) {
      setFollowers(user.followersCount);
    }
  }, [user]);

  const location = useLocation();
  const navigate = useNavigate();

  const limit = 20;

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    getUserById(userId)
      .then((data) => {
        console.log("raw:", data);
        setUser(data);
      })
      .catch((err) => {
        console.log("error:", err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const offset = page * limit;

    getUserPosts(userId, filter, limit, offset).then((data) => {
      if (page === 0) {
        setPosts(data.posts || []);
      } else {
        setPosts((prev) => [...prev, ...(data.posts || [])]);
      }
    });
  }, [userId, filter, page]);

  if (loading) return <p className="p-10">Loading profile...</p>;
  if (!user) return null;

  return (
    <div className="p-10 max-w-4xl mx-auto mt-6">
      <div className="flex gap-10 items-center">
        <img
          src={getAvatar(user)}
          className="w-32 h-32 rounded-full object-cover"
        />

        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="mt-3">{user.fullName}</p>

          <div className="flex gap-6 mt-3">
            <span>
              <b>{user.postsCount || posts.length}</b> posts
            </span>
            <span>
              <b>{user.followersCount}</b> followers
            </span>
            <span>
              <b>{user.followingCount}</b> following
            </span>
          </div>

          <p className="mt-3">{user.bio}</p>
        </div>
      </div>
      <div className="mt-12 flex gap-2">
        <FollowButton
          userId={user._id}
          initialFollowing={!user.isFollowing}
          onChange={(followed: boolean) => {
            setFollowers((f) => (followed ? f + 1 : f - 1));
          }}
        />
        <Button className="px-40 py-6 bg-[#333333] hover:bg-[#333333]/90 text-white rounded rounded-xl font-semibold">
          Message
        </Button>
      </div>

      <div className="mt-10 border-t border-border">
        <div className="relative flex justify-center gap-16 text-sm text-muted-foreground">
          <div
            onClick={() => {
              setActiveTab("posts");
              setFilter("all");
              setPage(0);
            }}
            className={`flex items-center gap-2 pt-4 cursor-pointer transition
        ${
          activeTab === "posts"
            ? "text-foreground border-t border-foreground -mt-px"
            : "hover:text-foreground"
        }`}
          >
            <Grid size={25} />
          </div>

          <div
            onClick={() => {
              setActiveTab("video");
              setFilter("video");
              setPage(0);
            }}
            className={`flex items-center gap-2 pt-4 cursor-pointer transition
        ${
          activeTab === "video"
            ? "text-foreground border-t border-foreground -mt-px"
            : "hover:text-foreground"
        }`}
          >
            <Clapperboard size={25} />
          </div>

          <div
            onClick={() => {
              setActiveTab("saved");
              setFilter("saved");
              setPage(0);
            }}
            className={`flex items-center gap-2 pt-4 cursor-pointer transition
        ${
          activeTab === "saved"
            ? "text-foreground border-t border-foreground -mt-px"
            : "hover:text-foreground"
        }`}
          >
            <Bookmark size={25} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-6">
        {posts.map((post) => {
          const media =
            post.mediaType === "image"
              ? resolveMedia(post.image)
              : resolveMedia(post.video);

          return (
            <div
              key={post._id}
              onClick={() =>
                navigate(`/posts/${post._id}`, {
                  state: { backgroundLocation: location },
                })
              }
              className="aspect-square overflow-hidden bg-black relative cursor-pointer"
            >
              {post.mediaType === "image" ? (
                <img src={media} className="w-full h-full object-cover" />
              ) : (
                <>
                  <video
                    src={media}
                    autoPlay
                    muted
                    preload="metadata"
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                    <Video size={20} className="text-white fill-white" />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
