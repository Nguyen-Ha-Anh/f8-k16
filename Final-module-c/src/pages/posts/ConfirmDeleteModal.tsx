import type { confirmDeleteType } from "@/types/posts/confirmDeleteType";

export default function ConfirmDeleteModal({
  open,
  onCancel,
  onConfirm,
}: confirmDeleteType) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
      <div className="w-[400px] rounded-xl bg-[#1c1c1e] overflow-hidden text-center">
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-lg font-semibold text-white">Delete post?</p>
          <p className="mt-1 text-sm text-white/60">
            Are you sure you want to delete this post?
          </p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full py-3 text-red-500 font-semibold border-b border-white/10 hover:bg-white/5"
        >
          Delete
        </button>

        <button
          onClick={onCancel}
          className="w-full py-3 text-white hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
