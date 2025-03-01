import { Button } from "@mui/joy";
import styles from "./signIn.module.css";
const SignIn = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>¡REGISTRATE!</p>
      <div className={styles.column}>
        <p>Nombre</p>
        <input className={styles.input}></input>
        <p>Usuario</p>
        <input className={styles.input}></input>
        <p>Correo</p>
        <input className={styles.input}></input>
        <p>Contraseña</p>
        <input className={styles.input}></input>
        <p>Confirma Contraseña</p>
        <input className={styles.input}></input>
        <Button className={styles.button}>Registrarse</Button>
      </div>
    </div>
  );
};

export default SignIn;
