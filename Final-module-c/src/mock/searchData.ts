export type User = {
  id: number;
  username: string;
  fullName: string;
  avatar: string; 
};

export const users: User[] = [
  {
    id: 1,
    username: "jack",
    fullName: "Dom Dom oiii",
    avatar: "https://i.pinimg.com/736x/26/59/f0/2659f037cbc25c0753343a02356712e4.jpg",
  },
  {
    id: 2,
    username: "john_doe",
    fullName: "John Doe",
    avatar: "https://i.pinimg.com/736x/8a/8f/40/8a8f4011a08e9a3e52fe73af50f291ee.jpg",
  },
  {
    id: 3,
    username: "jjj_97",
    fullName: "Thien Ly oi",
    avatar: "https://i.pinimg.com/1200x/1d/a4/5d/1da45d46f903c7619033e42730ba2127.jpg",
  },
  {
    id: 4,
    username: "alex_88",
    fullName: "Alex 88",
    avatar: "https://i.pinimg.com/736x/f3/cc/52/f3cc529aada8d568759fa9213c115d24.jpg",
  },
];
