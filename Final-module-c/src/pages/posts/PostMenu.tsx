import type { PostMenuType } from "@/types/posts/postMenuType";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function PostMenu({ postUserId, onEdit, onDelete }: PostMenuType) {
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state: any) => state.auth.profile);

  const isOwner = currentUser?._id === postUserId;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="p-1 rounded-full hover:bg-zinc-800"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background w-[320px] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isOwner ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                    onDelete?.()
                  }}
                  className="w-full py-3 text-red-500 font-semibold hover:bg-muted"
                >
                  Delete
                </button>

                <div className="h-px bg-border" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    onEdit?.();
                  }}
                  className="w-full py-3 hover:bg-muted"
                >
                  Edit
                </button>
              </>
            ) : (
              <button className="w-full py-3 text-red-500 font-semibold hover:bg-muted">
                Report
              </button>
            )}

            <div className="h-px bg-border" />

            <button
              onClick={() => setOpen(false)}
              className="w-full py-3 hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
