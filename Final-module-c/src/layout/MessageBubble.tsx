import { Send } from "lucide-react"

export default function MessageBubble() {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-background text-foreground">
      <button className="flex items-center gap-2 bg-neutral-800 px-4 py-3 rounded-full shadow-lg">
        <span className="relative">
          <Send/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
            9+
          </span>
        </span>
        <span className="text-sm font-semibold">Messages</span>
      </button>
    </div>
  );
}
