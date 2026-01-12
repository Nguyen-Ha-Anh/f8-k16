import { users } from "./searchData";
import type { User } from "./searchData";

export function searchUsers(query: string): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 300);
  });
}
