/* eslint-disable react/prop-types */
import { Button } from "@mui/joy";
import styles from "./logIn.module.css";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const LogIn = ({ sendData }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const navigate = useNavigate();

  const handleChangeSignIn = () => {
    sendData(3);
  };
  const handleChange = (name, newValue) => {
    if (name === "email") {
      setEmailAlert(false);
    } else if (name === "password") {
      setPasswordAlert(false);
    }
    setData((prevData) => ({
      ...prevData,
      [name]: newValue.trim(),
    }));
  };
  const handleSignIn = async () => {
    if (!data.email) {
      sendNotification("Falta el correo", 2);
      setEmailAlert(true);
      return;
    }
    if (!validateEmail(data.email)) {
      sendNotification("No es un correo valido", 2);
      setEmailAlert(true);
      return;
    }
    if (!data.password) {
      sendNotification("Falta la contraseña", 2);
      setPasswordAlert(true);
      return;
    }
    const response = await fetch(`${apiUrl}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      sendNotification("Inicio de Sesión Exitoso", 1);
      navigate("/dashboard");
    } else {
      const result = await response.json();
      const variable = result.message;
      if (typeof variable === "string") {
        sendNotification(variable, 2);
      } else {
        sendNotification("Ocurrió un error", 2);
      }
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
  const togglePasswordVisibility = () => {
    setShowPassword(true);
    setTimeout(() => {
      setShowPassword(false);
    }, 2500);
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>¡BIENVENIDO!</p>
      <div className={styles.column}>
        <p>Correo</p>
        <input
          className={clsx(styles.input, {
            [styles.inputAlert]: emailAlert,
          })}
          onChange={(e) => handleChange("email", e.target.value)}
        ></input>
        <p>Contraseña</p>
        <input
          className={clsx(styles.input, {
            [styles.inputAlert]: passwordAlert,
          })}
          onChange={(e) => handleChange("password", e.target.value)}
          type={showPassword ? "text" : "password"}
        ></input>
        <span className={styles.passwordIcon}>
          <FaEye color="gray" onClick={togglePasswordVisibility} />
        </span>
        <p className={styles.textLinkPassword} onClick={handleChangeSignIn}>
          ¿Olvidaste tu contraseña?
        </p>
        <Button className={styles.button} onClick={handleSignIn}>
          Iniciar Sesión
        </Button>
        <p className={styles.textLink} onClick={handleChangeSignIn}>
          ¿No tienes cuenta? Regístrate
        </p>
      </div>
    </div>
  );
};

export default LogIn;
