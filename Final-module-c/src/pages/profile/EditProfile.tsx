import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchProfile } from "@/store/authSlice";
import { Textarea } from "@/components/ui/textarea";
import { deleteProfilePicture, updateProfile } from "@/api/profile/profileAPI";
import { getAvatar } from "@/utils/getAvatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EditProfile() {
  const profile = useSelector((state: any) => state.auth.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //form state 
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [gender, setGender] = useState<string | undefined>(undefined);

  //avatar
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  
  //mo change photo 
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null);

  //load profile vao form
  useEffect(() => {
    if (!profile) return;

    setFullName(profile.fullName || "");
    setBio(profile.bio || "");
    setWebsite(profile.website || "");
    setGender(profile.gender || 'private');
    setPreview(profile.profilePicture || "");
  }, [profile]);

  //kiem tra thay doi
  const isChange =
      fullName !== (profile?.fullName || "") ||
      bio !== (profile?.bio || "") ||
      website !== (profile?.website || "") ||
      gender !== (profile?.gender ?? undefined) ||
      avatar !== null

  //chon file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      if (fullName) formData.append("fullName", fullName);
      if (bio) formData.append("bio", bio);
      if (website) formData.append("website", website);
      if (gender) formData.append("gender", gender);
      if (avatar) formData.append("profilePicture", avatar);

      await updateProfile(formData);
      await dispatch(fetchProfile() as any);
      navigate("/profile");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  //remove ava 
  const handleRemoveAvatar = async () => {
    try {
      setLoading(true)
      await deleteProfilePicture()
      await dispatch(fetchProfile() as any)

      setPreview('')
      setAvatar(null)
      setOpen(false)
    } catch (err) {
      alert('delete avatar failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex justify-center pt-12">
      <div className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Edit profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* avatar */}
          <Card className="flex w-full p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                  className="object-cover"
                  src={preview || getAvatar(profile)} />
                  {/* <img
                  src={getAvatar(profile)}
                  alt="avatar"
                  className="w-full h-full object-cover"
                /> */}
                </Avatar>

                <div>
                  <p className="font-semibold">
                    {fullName || profile?.username}
                  </p>
                </div>
              </div>

              <label>
                <Button
                  className="bg-[#4A5DF9] hover:bg-[#4A5DC6] text-white"
                  size="sm"
                  onClick={() => {
                    const hasAvatar = preview || profile?.profilePicture;

                    if (hasAvatar) {
                      setOpen(true)
                    } else {
                      fileInputRef.current?.click()
                    }
                  }}
                >
                  <span className="text-white">Change photo</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </Card>

          {/* website */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="something.."
            />
          </div>

          {/* full name */}
          <div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={bio}
              maxLength={150}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/150
            </p>
          </div>

          {/* gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Prefer not to say" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Prefer not to say</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* submit */}
          <div className="flex justify-end disabled:opacity-50 disabled:cursor-not-allowed">
            <Button
              className="py-5 px-22 bg-[#4A5DF9] hover:bg-[#4A5DD6] text-white font-semibold"
              onClick={handleSubmit}
              disabled={!isChange || loading}
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </CardContent>
      </div>

      {/* change photo */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs bg-[#222222] text-center rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center m-3">Change profile photo</DialogTitle>
          </DialogHeader>
          <SelectSeparator/>

          <div className="flex flex-col gap-2">
            <Button
              className="bg-[#222222] text-[#4A5DF9]"
              variant="secondary"
              onClick={() => {
                fileInputRef.current?.click();
                setOpen(false);
              }}
            >
              Upload photo
            </Button>
            <SelectSeparator/>

            <Button
              className="text-red-500 hover:text-red-500"
              variant="ghost"
              onClick={handleRemoveAvatar}
            >
              Remove current photo
            </Button>
            <SelectSeparator/>

            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
