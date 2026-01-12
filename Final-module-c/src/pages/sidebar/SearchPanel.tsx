import { searchUsers } from "@/mock/searchAPI";
import { users, type User } from "@/mock/searchData";
import { useEffect, useState } from "react";

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults(users.slice(0, 4));
      setLoading(false)
      return;
    }

    setLoading(true);
    searchUsers(query).then((res) => {
      setResults(res);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="w-[400px] h-screen border-l border-border bg-background p-4 flex flex-col">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 rounded bg-muted outline-none mb-4"
      />

      {loading && <p className="text-sm text-gray-400">Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-sm text-gray-400">No results found</p>
      )}

      <div className="flex-1 overflow-y-auto">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-2 hover:bg-accent rounded cursor-pointer"
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{user.username}</span>
              <span className="text-sm text-gray-400">{user.fullName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
