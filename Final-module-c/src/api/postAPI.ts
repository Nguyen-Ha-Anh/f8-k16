import type { Post } from "@/types/PostType";

export const posts: Post[] = [
  {
    id: 1,
    user: {
      username: "ela_donche",
      avatar:
        "https://i.pinimg.com/736x/98/60/cb/9860cb29f66451f61b3726ebf4bbbd61.jpg",
    },
    image:
      "https://i.pinimg.com/736x/c4/e4/46/c4e446726d7613fc0747c7c7bcc2abfd.jpg",
    likes: 8.9,
    comments: 30,
    repeat: 522,
    caption: "autumn is such the cool time of the year",
    time: "1d",
  },
  {
    id: 2,
    user: {
      username: "jessi_kkk",
      avatar:
        "https://i.pinimg.com/736x/ea/55/a1/ea55a15cdca4c4e136a26dc85dcde021.jpg",
    },
    image:
      "https://i.pinimg.com/736x/10/d3/86/10d3861e9d04eba653484794f3688716.jpg",
    likes: 4.2,
    comments: 56,
    repeat: 35,
    caption: "fresh 🌿",
    time: "2d",
  },
];
