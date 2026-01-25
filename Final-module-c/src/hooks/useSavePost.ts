import { savePost, unsavePost } from "@/api/posts/savePost";
import { useEffect, useState } from "react";

export function useSavePost(postId: string, initialSaved = false) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const key = `saved_${postId}`;

  useEffect(() => {
    const local = localStorage.getItem(key);
    if (local !== null) {
      setSaved(local === "true");
    }
  }, [key]);

  const handleToggleSave = async () => {
    if (loading) return;

    const prev = saved;
    const next = !saved;

    try {
      setLoading(true);

      // UI
      setSaved(next);
      localStorage.setItem(key, String(next));

      if (next) {
        await savePost(postId);
      } else {
        await unsavePost(postId);
      }
    } catch {
      // rollback
      setSaved(saved);
      localStorage.setItem(key, String(prev));
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
