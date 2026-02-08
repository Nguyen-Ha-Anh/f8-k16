import { searchUsers } from "@/api/search/searchAPI";
import type { UserProfile } from "@/types/users/userType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecentSearches,
  addRecentSearch,
  type RecentSearch,
  deleteRecentSearch,
} from "@/utils/recentSearch";
import { X } from "lucide-react";
import { getAvatar } from "@/utils/getAvatar";

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    //debounce
    const timeout = setTimeout(() => {
      setLoading(true);
      searchUsers(query)
        .then((res) => {
          setResults(res);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div
      className="
      fixed
      top-0
      left-[59px]
      h-screen
      w-[396px]
      bg-background
      border-r
      z-30
      p-5"
    >
      <h1 className="mb-8 text-2xl font-semibold">Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 pl-3 rounded rounded-full bg-muted outline-none mb-4"
      />

      {loading && <p className="text-sm text-gray-400">Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-sm text-gray-400">No results found</p>
      )}

      {!query && recentSearches.length > 0 && (
        <>
          <p className="mb-2 text-sm font-semibold">Recent</p>

          {recentSearches.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between gap-3 p-2 hover:bg-accent rounded"
            >
              {/* click user */}
              <div
                onClick={() => navigate(`/profile/${user._id}`)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={getAvatar(user)}
                  onError={(e) => (e.currentTarget.src = "/avaauto.jpg")}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-400">{user.fullName}</p>
                </div>
              </div>

              {/* delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRecentSearch(user._id);
                  setRecentSearches(getRecentSearches());
                }}
                className="text-gray-400 text-sm cursor-pointer"
              >
                <X />
              </button>
            </div>
          ))}
        </>
      )}

      <div className="flex-1 overflow-y-auto">
        {results.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              addRecentSearch({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePicture: user.profilePicture,
              });

              setRecentSearches(getRecentSearches());
              navigate(`/profile/${user._id}`);
            }}
            className="flex items-center gap-3 p-2 hover:bg-accent rounded cursor-pointer"
          >
            <img
              src={getAvatar(user)}
              alt={user.username}
              onError={(e) => {
                e.currentTarget.src = "/avaauto.jpg";
              }}
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
