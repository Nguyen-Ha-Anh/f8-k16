export type Notification = {
  id: number;
  user: {
    username: string;
    avatar: string;
  };
  postThumbnail: string;
  time: string;
};

export const notifications: Notification[] = [
  {
    id: 1,
    user: {
      username: "aza.anhshang",
      avatar: "https://i.pinimg.com/736x/25/09/b6/2509b6b369a3febdea168a8e1ab86aaa.jpg",
    },
    postThumbnail: "https://i.pinimg.com/736x/7d/94/d5/7d94d59da0fa6ed4a2fd9b4df785793c.jpg",
    time: "1d",
  },
  {
    id: 2,
    user: {
      username: "phm_ei05",
      avatar: "https://i.pinimg.com/1200x/91/af/07/91af077b7a6651d4ac6ccb9766b19e3a.jpg",
    },
    postThumbnail: "https://i.pinimg.com/736x/89/c0/2f/89c02faf34580671bd0dc3c698631eba.jpg",
    time: "2d",
  },
  {
    id: 3,
    user: {
      username: "kyduyen1",
      avatar: "https://i.pinimg.com/736x/7d/de/a7/7ddea7a80afa3006601d98548ff445f4.jpg",
    },
    postThumbnail: "https://i.pinimg.com/736x/36/72/7b/36727baf11780fe272820d422864663b.jpg",
    time: "3d",
  },
];
