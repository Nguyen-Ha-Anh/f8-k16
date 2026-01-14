import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/MainLayout";
import Home from "./pages/sidebar/Home";
import Explore from "./pages/sidebar/Explore";
import Reels from "./pages/sidebar/Reels";
import Messages from "./pages/sidebar/Messages";
import Profile from "./pages/sidebar/Profile";
import Notifications from "./pages/sidebar/NotificationPanel";
import Create from "./pages/sidebar/Create";
import { SidebarProvider } from "./context/SidebarContext";

export default function App() {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </SidebarProvider>
  );
}
