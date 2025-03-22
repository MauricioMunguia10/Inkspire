import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Explore from "../pages/Explore/Explore";
import CreatePost from "../pages/CreatePost/CreatePost";
import Profile from "../pages/Profile/Profile";
import Saves from "../pages/Saves/Saves";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:idPost" element={<Dashboard />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Saves" element={<Saves />} />
    </Routes>
  );
};

export default AppRoutes;
