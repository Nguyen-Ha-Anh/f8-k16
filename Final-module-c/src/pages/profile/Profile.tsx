import { useDispatch, useSelector } from "react-redux";
import { Settings, Grid, Bookmark, UserSquare2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvatar } from "@/utils/getAvatar";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/types/posts/PostType";
import axiosClient from "@/api/profile/axiosClient";

export default function Profile() {
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.auth.profile);
  const dispatch = useDispatch();

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts",
  );
  const [filter, setFilter] = useState<"all" | "saved" | "tagged">("all");
  const [page, setPage] = useState(0);

  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  const limit = 20;

  useEffect(() => {
    if (!profile?._id) return;

    const offset = page * limit;

    let url = "";

    if (filter === "saved") {
      url = `/posts/saved`;
    } else {
      url = `/posts/user/${profile._id}`;
    }

    axiosClient
      .get(url, {
        params: {
          limit,
          offset,
        },
      })
      .then((res) => {
        const raw = res.data?.data;

        const list = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.posts)
            ? raw.posts
            : [];

        if (filter === "saved") {
          if (page === 0) {
            setSavedPosts(list);
          } else {
            setSavedPosts((prev) => [...prev, ...list]);
          }
        } else {
          if (page === 0) {
            setPosts(list);
          } else {
            setPosts((prev) => [...prev, ...list]);
          }
        }
      })
      .catch(() => setPosts([]));
  }, [profile, filter, page]);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile() as any);
    }
  }, [dispatch, profile]);

  const data = activeTab === "saved" ? savedPosts : posts;

  return (
    <div className="min-h-screen bg-background text-foreground pl-[240px]">
      <div className="max-w-5xl mx-auto px-16 py-10">
        <div className="flex gap-10 items-center">
          <div className="w-36 h-36 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={getAvatar(profile)}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                {profile?.fullName || profile?.username || "username"}
              </h2>

              <Settings
                size={18}
                className="cursor-pointer hover:text-muted-foreground"
              />
            </div>

            <div className="flex gap-8 text-sm">
              <span>
                <b>{posts.length}</b> posts
              </span>
              <span>
                <b>{profile?.followers || 0}</b> followers
              </span>
              <span>
                <b>{profile?.following || 0}</b> following
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              {profile?.bio || ""}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-10">
          <Button
            variant="secondary"
            size="lg"
            className="px-32"
            onClick={() => navigate("/profile/edit")}
          >
            Edit profile
          </Button>

          <Button variant="secondary" size="lg" className="px-32">
            View archive
          </Button>
        </div>

        <div className="mt-10 border-t border-border">
          <div className="flex justify-center gap-16 text-sm text-muted-foreground">
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
              <Grid size={16} />
              POSTS
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
              <Bookmark size={16} />
              SAVED
            </div>

            <div
              onClick={() => {
                setActiveTab("tagged");
                setFilter("tagged");
                setPage(0);
              }}
              className={`flex items-center gap-2 pt-4 cursor-pointer transition
              ${
                activeTab === "tagged"
                  ? "text-foreground border-t border-foreground -mt-px"
                  : "hover:text-foreground"
              }`}
            >
              <UserSquare2 size={16} />
              TAGGED
            </div>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24 text-center">
            <div className="w-20 h-20 border-2 border-foreground rounded-full flex items-center justify-center mb-6">
              <Camera size={32} />
            </div>

            <h2 className="text-2xl font-bold">
              {activeTab === "saved" ? "No Saved Posts" : "Share Photos"}
            </h2>

            <p className="text-foreground mt-2">
              {activeTab === "saved"
                ? "Posts you save will appear here."
                : "When you share photos, they will appear on your profile."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1 mt-10">
            {data.map((post) => {
              const img = post.image?.startsWith("http")
                ? post.image
                : `https://instagram.f8team.dev${post.image}`;

              return (
                <div key={post._id} className="aspect-square overflow-hidden">
                  <img
                    src={img}
                    onClick={() => navigate(`/posts/${post._id}`)}
                    className="w-full h-full object-cover hover:opacity-80 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
