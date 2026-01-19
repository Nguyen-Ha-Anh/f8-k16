import { useDispatch, useSelector } from "react-redux";
import { Settings, Grid, Bookmark, UserSquare2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvatar } from "@/utils/getAvatar";
import { useEffect } from "react";
import { fetchProfile } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate()
  const profile = useSelector((state: any) => state.auth.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile() as any);
    }
  }, [dispatch, profile]);

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
                <b>{profile?.posts || 0}</b> posts
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
            onClick={() => navigate('/profile/edit')}
          >
            Edit profile
          </Button>

          <Button variant="secondary" size="lg" className="px-32">
            View archive
          </Button>
        </div>

        <div className="mt-10 border-t border-border">
          <div className="flex justify-center gap-16 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground border-t border-foreground pt-4 -mt-px">
              <Grid size={16} />
              POSTS
            </div>

            <div className="flex items-center gap-2 pt-4 hover:text-foreground cursor-pointer">
              <Bookmark size={16} />
              SAVED
            </div>

            <div className="flex items-center gap-2 pt-4 hover:text-foreground cursor-pointer">
              <UserSquare2 size={16} />
              TAGGED
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="w-20 h-20 border-2 border-foreground rounded-full flex items-center justify-center mb-6">
            <Camera size={32} />
          </div>

          <h2 className="text-2xl font-bold">Share Photos</h2>

          <p className="text-foreground mt-2">
            When you share photos, they will appear on your profile.
          </p>

          <button className="text-[#85A1FF] mt-4 hover:underline">
            Share your first photo
          </button>
        </div>
      </div>
    </div>
  );
}
