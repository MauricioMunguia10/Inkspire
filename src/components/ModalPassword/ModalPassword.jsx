import clsx from "clsx";
import styles from "./modalPassword.module.css";
import { useState } from "react";
import { Button } from "@mui/joy";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const ModalPassword = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [emailAlert, setEmailAlert] = useState(false);
  const [secondEmailAlert, setSecondEmailAlert] = useState(false);
  const [ready, setReady] = useState(false);
  const [dataPwd, setDataPwd] = useState({
    id: "",
    password: "",
  });
  const [data, setData] = useState({
    email: "",
    second_email: "",
  });
  const [passwords, setPasswords] = useState({
    password: "",
    confirmation: "",
  });
  if (!isOpen) return null;

  const handleChange = (name, newValue) => {
    if (name === "email") {
      setEmailAlert(false);
    } else if (name === "second_email") {
      setSecondEmailAlert(false);
    }
    setData((prevData) => ({
      ...prevData,
      [name]: newValue.trim(),
    }));
  };
  const handleRecovery = async () => {
    if (!data.email || !data.second_email) {
      sendNotification("Todos los datos son obligatorios", 2);
      setEmailAlert(true);
      setSecondEmailAlert(true);
      return;
    }
    const response = await fetch(`${apiUrl}/api/users/recovery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 200) {
      sendNotification(result.message, 1);
      setDataPwd((prevData) => ({
        ...prevData,
        ["id"]: result.value.trim(),
      }));
      setReady(true);
    } else {
      sendNotification(result.message, 2);
    }
  };
  const handleChangePsw = (name, newValue) => {
    setPasswords((prevData) => ({
      ...prevData,
      [name]: newValue.trim(),
    }));
    setDataPwd((prevData) => ({
      ...prevData,
      ["password"]: newValue.trim(),
    }));
  };
  const handleChangePassword = async () => {
    if (!(passwords.password === passwords.confirmation)) {
      sendNotification("Las contraseñas no coinciden", 2);
      return;
    }
    const response = await fetch(`${apiUrl}/api/users/changePwd`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataPwd),
    });
    if (response.status === 201) {
      sendNotification("Contraseña cambiada exitosamente", 1);
      sendNotification("Inicia Sesión", 1);
      onClose();
    } else {
      sendNotification("Ocurrió un error, inténtalo de nuevo", 2);
    }
  };

  const sendNotification = (msg, type) => {
    if (type === 1) {
      toast.success(msg, {
        toastStyle: { backgroundColor: "green", color: "white" },
      });
    } else if (type === 2) {
      toast.error(msg, {
        toastStyle: { backgroundColor: "red", color: "white" },
      });
    }
  };

  return (
    <>
      <div
        className={clsx(styles.background, {
          [styles.none]: !isOpen,
        })}
        onClick={onClose}
      ></div>
      <div
        className={clsx(styles.container, {
          [styles.none]: !isOpen,
        })}
      >
        <p className={styles.title}>Recupera tu contraseña</p>
        <div className={styles.column}>
          {ready ? null : (
            <>
              <p>Correo</p>
              <input
                className={clsx(styles.input, {
                  [styles.inputAlert]: emailAlert,
                })}
                onChange={(e) => handleChange("email", e.target.value)}
              ></input>
              <p>Correo de contacto </p>
              <input
                className={clsx(styles.input, {
                  [styles.inputAlert]: secondEmailAlert,
                })}
                onChange={(e) => handleChange("second_email", e.target.value)}
              ></input>
            </>
          )}
          {!ready ? null : (
            <>
              <p className={styles.passwordLabel}>Nueva Contraseña</p>
              <input
                className={styles.input}
                onChange={(e) => handleChangePsw("password", e.target.value)}
              ></input>
              <p className={styles.passwordLabel}>Confirma Contraseña</p>
              <input
                className={styles.input}
                onChange={(e) =>
                  handleChangePsw("confirmation", e.target.value)
                }
              ></input>
            </>
          )}
          {ready ? null : (
            <Button className={styles.button} onClick={handleRecovery}>
              Recuperar Contraseña
            </Button>
          )}
          {!ready ? null : (
            <Button className={styles.button} onClick={handleChangePassword}>
              Cambiar Contraseña
            </Button>
          )}
          <div className={styles.closeButton}>
            <Button color="danger" className={styles.button} onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPassword;
