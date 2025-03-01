import { Button } from "@mui/material";
import styles from "./SideBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SideBar = () => {
  return (
    <div className={styles.box}>
      <Button
        variant="text"
        startIcon={<SearchIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "25px",
          fontSize: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          "&:hover": { backgroundColor: "#1f1f20" },
        }}
      >
        Explorar
      </Button>
      <Button
        variant="text"
        startIcon={<BookmarkIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "25px",
          fontSize: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          "&:hover": { backgroundColor: "#1f1f20" },
        }}
      >
        Guardados
      </Button>
      <Button
        variant="text"
        startIcon={<SettingsIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "25px",
          fontSize: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          "&:hover": { backgroundColor: "#1f1f20" },
        }}
      >
        Configuraciones
      </Button>
      <Button
        variant="text"
        startIcon={<AccountCircleIcon />}
        sx={{
          color: "white",
          backgroundColor: "black",
          borderRadius: "25px",
          fontSize: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          "&:hover": { backgroundColor: "#1f1f20" },
        }}
      >
        Perfil
      </Button>
    </div>
  );
};

export default SideBar;
