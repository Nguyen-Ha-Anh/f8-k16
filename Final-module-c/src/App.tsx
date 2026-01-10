import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from './pages/Register';
import AppLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>

      <Route element={<AppLayout/>}>
        <Route path='/feed' element={<Home/>}/>
        <Route path="/explore" element={<Explore/>}/>
        <Route path='/reels' element={<Reels/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Route>
    </Routes>
  )
}
