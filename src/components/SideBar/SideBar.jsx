import { Button } from "@mui/material";
import styles from "./SideBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = () => {
  return (
    <div className={styles.box}>
      <a href="/explore" className={styles.linkSideBar}>Explorar</a>
      <a href="/Saves" className={styles.linkSideBar}>Guardados</a>
      <a href="/profile" className={styles.linkSideBar}>Perfil</a>
      <a href="/create" className={styles.linkSideBar}>Crear</a>
      <a href="/" className={styles.linkSideBar}>Cerrar Sesión</a>
    </div>
  );
};

export default SideBar;
