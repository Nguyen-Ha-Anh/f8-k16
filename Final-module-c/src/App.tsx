import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./layout/MainLayout";
import Home from "./pages/sidebar/Home";
import Explore from "./pages/sidebar/Explore";
import Reels from "./pages/sidebar/Reels";
import Messages from "./pages/sidebar/Messages";
import Profile from "./pages/profile/Profile";
import Notifications from "./pages/sidebar/NotificationPanel";
import { SidebarProvider } from "./context/SidebarContext";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetPassword from "./pages/password/ResetPassword";
import EditProfile from "./pages/profile/EditProfile";
import UserProfile from "./pages/profile/UserProfile";
import PostDetail from "./pages/posts/PostDetail";
import Create from "./pages/sidebar/create/Create";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "./store/authSlice";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchProfile() as any);
    }
  }, []);

  return (
    <SidebarProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="posts/:postId" element={<PostDetail />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="reels" element={<Reels />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="create" element={<Create />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="profile/:userId" element={<UserProfile />} />
        </Route>
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="posts/:postId" element={<PostDetail />} />
        </Routes>
      )}
    </SidebarProvider>
  );
}
