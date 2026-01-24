import { useEffect, useRef, useState } from "react";
import { X, ImagePlus } from "lucide-react";
import { createPost } from "@/api/posts/createPostAPI";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const close = () => {
    navigate(-1);
  };

  const handleSelectFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      await createPost(file, caption);
      close();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="bg-zinc-900 w-[700px] h-[700px] rounded-xl overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            console.log("CLOSE! OK!");
            close();
          }}
          className="fixed cursor-pointer top-3 right-3 z-10 text-zinc-400 hover:text-white"
        >
          <X />
        </button>
        {/* header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700">
          <span className="font-semibold">Create new post</span>

          {preview && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="absolute right-4 text-[#85A1FF] hover:text-[#85A1FF]/80 hover:underline font-semibold disabled:opacity-50"
            >
              {loading ? "Sharing..." : "Share"}
            </button>
          )}
        </div>

        {!preview ? (
          <div
            className="flex-1 flex flex-col items-center justify-center gap-4 text-zinc-400"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) {
                handleSelectFile(e.dataTransfer.files[0]);
              }
            }}
          >
            <ImagePlus size={48} />
            <p>Drag photos and videos here</p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold"
            >
              Select from computer
            </button>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleSelectFile(e.target.files[0]);
                }
              }}
            />
          </div>
        ) : (
          <>
            <div className="flex-1 bg-black flex items-center justify-center">
              {file?.type.startsWith("video") ? (
                <video
                  src={preview}
                  controls
                  className="max-h-full object-contain"
                />
              ) : (
                <img src={preview} className="max-h-full object-contain" />
              )}
            </div>

            <div className="p-3 border-t border-zinc-700">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full bg-transparent border border-zinc-700 rounded-lg p-2 text-sm resize-none"
              />

              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-2 w-full bg-blue-500 py-2 rounded-lg font-semibold disabled:opacity-50"
              >
                Share
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
