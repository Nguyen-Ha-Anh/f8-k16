import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "@/api/profile/userAPI";

export default function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!userId) return;
    getUserById(userId).then(setUser);
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <img src={user.profilePicture} />
      <h2>{user.username}</h2>
      <p>{user.bio}</p>

      <div>
        <span>{user.postsCount} posts</span>
        <span>{user.followersCount} followers</span>
        <span>{user.followingCount} following</span>
      </div>

      <button>
        {user.isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}
