import { useState } from "react";
import axiosClient from "@/api/profile/axiosClient";

export default function EditCaption({
  postId,
  initialCaption,
  onCancel,
  onSaved,
}: {
  postId: string;
  initialCaption: string;
  onCancel: () => void;
  onSaved: (newCaption: string) => void;
}) {
  const [value, setValue] = useState(initialCaption);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axiosClient.patch(`/posts/${postId}`, {
        caption: value,
      });
      onSaved(res.data.data.caption);
    } catch {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        className="w-full border rounded-lg p-2 text-sm"
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-blue-500 font-semibold text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="text-sm text-muted-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
