import { currentUser, suggestedUsers } from "./rightSidebarData";

export function fetchCurrentUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(currentUser);
    }, 500);
  });
}

export function fetchSuggestedUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(suggestedUsers);
    }, 800);
  });
}
