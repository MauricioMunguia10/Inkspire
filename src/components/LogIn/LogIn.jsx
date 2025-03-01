import { Button } from "@mui/joy";
import styles from "./logIn.module.css";
const LogIn = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>¡BIENVENIDO!</p>
      <div className={styles.column}>
        <p>Usuario o correo</p>
        <input className={styles.input}></input>
        <p>Contraseña</p>
        <input className={styles.input}></input>
        <Button className={styles.button}>Iniciar Sesión</Button>
      </div>
    </div>
  );
};

export default LogIn;
