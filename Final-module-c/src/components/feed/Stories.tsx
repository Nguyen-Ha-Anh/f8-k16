import { stories } from "@/mock/storiesAPI";

export default function Stories() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {stories.map((s) => (
        <div key={s.id} className="flex flex-col items-center gap-1">
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-yellow-600 to-pink-600">
            <img
              src={s.avatar}
              className="w-19 h-19 rounded-full border-2 border-black object-cover"
            />
          </div>
          <span className="text-xs">{s.username}</span>
        </div>
      ))}
    </div>
  );
}
