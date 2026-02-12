import { useDispatch, useSelector } from "react-redux";
import {
  Settings,
  Grid,
  Bookmark,
  UserSquare2,
  Camera,
  Video,
} from "lucide-react";
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
  const [page, setPage] = useState(0);

  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  const limit = 20;

  useEffect(() => {
    if (activeTab === "saved") {
      setPage(0); // reset page
    }
  }, [activeTab]);

  useEffect(() => {
    if (!profile?._id) return;

    let url =
      activeTab === "saved" ? `/posts/saved` : `/posts/user/${profile._id}`;

    const config =
      activeTab === "saved" ? {} : { params: { limit, offset: page * limit } };

    axiosClient.get(url, config).then((res) => {
      const list = res.data?.data?.posts || res.data?.data || [];

      if (activeTab === "saved") {
        setSavedPosts(list);
      } else {
        setPosts(list);
      }
    });
  }, [profile?._id, activeTab, page]);

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

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">
                {profile?.username || "username"}
              </h2>

              <Settings
                size={18}
                className="cursor-pointer hover:text-muted-foreground"
              />
            </div>

            <p>{profile?.fullName}</p>

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

            <p className="mt-6 text-sm text-foreground whitespace-pre-line">
              {profile?.bio || ""}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
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
                console.log("CLICK SAVED");
                setActiveTab("saved");
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
              console.log("post:", post);

              const videoUrl = post.video
                ? post.video.startsWith("http")
                  ? post.video
                  : `https://instagram.f8team.dev${post.video}`
                : "";

              const img = post.image
                ? post.image.startsWith("http")
                  ? post.image
                  : `https://instagram.f8team.dev${post.image}`
                : "/post-placeholder.jpg";

              const thumbnail = post.thumbnail
                ? post.thumbnail.startsWith("http")
                  ? post.thumbnail
                  : `https://instagram.f8team.dev${post.thumbnail}`
                : "/video-placeholder.jpg";

              return (
                <div
                  key={post._id}
                  className="aspect-square overflow-hidden relative cursor-pointer"
                  onClick={() => navigate(`/posts/${post._id}`)}
                >
                  {post.mediaType === "video" ? (
                    <>
                      <video
                        src={videoUrl}
                        poster={thumbnail}
                        autoPlay
                        muted
                        preload="metadata"
                        playsInline
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                        <Video size={16} className="text-white fill-white" />
                      </div>
                    </>
                  ) : (
                    <img src={img} className="w-full h-full object-cover" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
