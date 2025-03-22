import { Button } from "@mui/material";
import styles from "./SideBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = () => {
  const user = localStorage.getItem("user");
  return (
    <div className={styles.box}>
      <a href="/dashboard" className={styles.linkSideBar}>Dashboard</a>
      <a href="/explore" className={styles.linkSideBar}>Explorar</a>
      <a href="/Saves" className={styles.linkSideBar}>Guardados</a>
      <a href={`/profile/${user}`} className={styles.linkSideBar}>Perfil</a>
      <a href="/create" className={styles.linkSideBar}>Crear</a>
      <a href="/" className={styles.linkSideBar}>Cerrar Sesión</a>
    </div>
  );
};

export default SideBar;
