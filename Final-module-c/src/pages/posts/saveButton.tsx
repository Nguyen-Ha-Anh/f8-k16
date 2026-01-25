import { Bookmark } from "lucide-react";
import { useSavePost } from "@/hooks/useSavePost";

export default function SaveButton({postId, initialSaved = false, size = 20}: {
  postId: string;
  initialSaved?: boolean;
  size?: number;
}) {
  const { saved, loading, handleToggleSave } = useSavePost(
    postId,
    initialSaved
  );

  return (
    <Bookmark
      size={size}
      onClick={handleToggleSave}
      className={`
        cursor-pointer transition-all duration-200
        ${saved ? "text-white fill-current fill-white" : "text-foreground"}
        ${loading ? "opacity-50 pointer-events-none" : ""}
      `}
    />
  );
}
