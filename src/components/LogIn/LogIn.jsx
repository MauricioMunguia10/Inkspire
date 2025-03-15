/* eslint-disable react/prop-types */
import { Button } from "@mui/joy";
import styles from "./logIn.module.css";
const LogIn = ({ sendData }) => {
  const handleChangeSignIn = () => {
    sendData(3);
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>¡BIENVENIDO!</p>
      <div className={styles.column}>
        <p>Usuario o correo</p>
        <input className={styles.input}></input>
        <p>Contraseña</p>
        <input className={styles.input}></input>
        <Button className={styles.button}>Iniciar Sesión</Button>
        <p className={styles.textLink} onClick={handleChangeSignIn}>
          ¿No tienes cuenta? Regístrate
        </p>
      </div>
    </div>
  );
};

export default LogIn;
