import type { SuggestedUser, User } from "@/types/rightSidebarType";

export const currentUser: User = {
  id: 1,
  username: "pie_f88",
  fullName: "Pie",
  avatar:
    "https://i.pinimg.com/736x/8e/84/b5/8e84b571f31c8d8167ae4a38ac495bd0.jpg",
};

export const suggestedUsers: SuggestedUser[] = [
  {
    id: 1,
    username: "fresh.zhd",
    fullName: "Fresh",
    avatar: "https://i.pinimg.com/1200x/e9/d7/b1/e9d7b157451f84b500cca174fe4ece7d.jpg",
  },
  {
    id: 2,
    username: "nguyn_trhng",
    fullName: "Nguyen",
    avatar: "https://i.pinimg.com/736x/25/59/46/255946056d94d69ac8acc60ac2d39433.jpg",
    followedBy: "hngdthu",
  },
  {
    id: 3,
    username: "hnht.dz22",
    fullName: "Hà Nhật",
    avatar: "https://i.pinimg.com/736x/fa/86/59/fa865985672b032744a054aa5c91a4fc.jpg",
  },
  {
    id: 4,
    username: "coder_tap_ta",
    fullName: "Coder",
    avatar: "https://i.pinimg.com/736x/b0/0c/05/b00c05d784c2b5c96137cc0e48b1fc98.jpg",
  },
  {
    id: 5,
    username: "vuquang",
    fullName: "Vũ Quang",
    avatar: "https://i.pinimg.com/736x/1d/69/13/1d691390078cce8bbe6bb987be7aef51.jpg",
    followedBy: "20thanggg7",
  },
];
