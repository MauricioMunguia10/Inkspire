import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatePost from "../pages/CreatePost/CreatePost";
import Profile from "../pages/Profile/Profile";
import Saves from "../pages/Saves/Saves";
import Admin from "../pages/Administrator/Admin";
import News from "../pages/News/News";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:idPost" element={<Dashboard />} />
      <Route path="/explore" element={<News />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:user" element={<Profile />} />
      <Route path="/Saves" element={<Saves />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;
