import { Button } from "@mui/material";
import styles from "./SideBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const SideBar = () => {
  const user = localStorage.getItem("user");
  const [path, setPath] = useState("/dashboard")
  const location = useLocation();
  console.log(location.pathname)
  return (
    <div className={styles.box}>
      <a href="/dashboard" className={styles.linkSideBar} style={location.pathname=="/dashboard" ? {borderBottom:"2px solid white", fontWeight:"600"}:{}}>Dashboard</a>
      <a href="/explore" className={styles.linkSideBar} style={location.pathname=="/explore" ? {borderBottom:"2px solid white", fontWeight:"600"}:{}}>Explorar</a>
      <a href="/Saves" className={styles.linkSideBar} style={location.pathname=="/Saves" ? {borderBottom:"2px solid white", fontWeight:"600"}:{}}>Guardados</a>
      <a href={`/profile/${user}`} className={styles.linkSideBar} style={location.pathname==`/profile/${user}` ? {borderBottom:"2px solid white", fontWeight:"600"}:{}}>Perfil</a>
      <a href="/create" className={styles.linkSideBar} style={location.pathname=="/create" ? {borderBottom:"2px solid white", fontWeight:"600"}:{}}>Crear</a>
      <a href="/" className={styles.linkSideBar}>Cerrar Sesión</a>
    </div>
  );
};

export default SideBar;
