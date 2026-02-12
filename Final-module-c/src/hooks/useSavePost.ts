import { savePost, unsavePost } from "@/api/posts/savePost";
import { useState } from "react";

export function useSavePost(postId: string, initialSaved = false) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleToggleSave = async () => {
    if (loading) return;

    try {
      setLoading(true);

      if (saved) {
        await unsavePost(postId);
        setSaved(false);
      } else {
        await savePost(postId);
        setSaved(true);
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    saved,
    loading,
    handleToggleSave,
  };
}
