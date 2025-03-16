/* eslint-disable react/prop-types */
import { Button } from "@mui/joy";
import styles from "./signIn.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const SignIn = ({ sendData }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [inputs, setInputs] = useState([
    { id: 1, name: "name", label: "Nombre", class: "input", value: "" },
    { id: 2, name: "user", label: "Usuario", class: "input", value: "" },
    { id: 3, name: "email", label: "Correo", class: "input", value: "" },
    {
      id: 4,
      name: "password",
      label: "Contraseña",
      class: "input",
      value: "",
    },
    {
      id: 5,
      name: "passwordCheck",
      label: "Confirma tu Contraseña",
      class: "input",
      value: "",
    },
    {
      id: 6,
      name: "second_email",
      label: "Email de contacto",
      class: "input",
      value: "",
    },
  ]);
  const [data, setData] = useState({
    name: "",
    user: "",
    email: "",
    password: "",
    second_email: "",
    type_user: "user", //admin
    active: "1",
  });
  const [emailAlert, setEmailAlert] = useState(false);
  const [secondEmailAlert, setSecondEmailAlert] = useState(false);
  const [userAlert, setUserAlert] = useState(false);
  const [voidAlert, setVoidAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState({});
  const navigate = useNavigate();
  const handleChangeLogIn = () => {
    sendData(2);
  };
  const togglePasswordVisibility = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: true,
    }));
    setTimeout(() => {
      setShowPassword((prev) => ({
        ...prev,
        [name]: false,
      }));
    }, 2500);
  };

  const handleChange = (name, newValue) => {
    if (name == "passwordCheck") {
      setPasswordCheck(newValue.trim());
      setPasswordAlert(false);
    }
    if (name == "password") {
      setPassword(newValue.trim());
      setPasswordAlert(false);
    }

    if (name == "email") {
      setEmailAlert(false);
    } else if (name == "second_email") {
      setSecondEmailAlert(false);
    } else if (name == "user") {
      setUserAlert(false);
    } else {
      setVoidAlert(false);
    }

    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value: newValue.trim() } : input
      )
    );

    if (name in data) {
      setData((prevData) => ({
        ...prevData,
        [name]: newValue.trim(),
      }));
    }
  };

  const handleRegister = async () => {
    if (
      !data.name ||
      !data.user ||
      !data.email ||
      !data.second_email ||
      !data.password ||
      !passwordCheck
    ) {
      sendNotification("Todos los datos son obligatorios", 2);
      setVoidAlert(true);
      return;
    }
    if (password != passwordCheck) {
      sendNotification("Las contraseñas no coinciden", 2);
      setPasswordAlert(true);
      return;
    }
    if (data.email == data.second_email) {
      sendNotification("Los correos no pueden ser el mismo", 2);
      setEmailAlert(true);
      setSecondEmailAlert(true);
      return;
    }
    if (!validateEmail(data.email)) {
      sendNotification("No es un correo valido", 2);
      setEmailAlert(true);
      return;
    }
    if (!validateEmail(data.second_email)) {
      sendNotification("No es un correo valido", 2);
      setSecondEmailAlert(true);
      return;
    }
    const response = await fetch(`${apiUrl}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      sendNotification("Se inserto con exito", 1);
      navigate("/dashboard");
    } else {
      const result = await response.json();
      //console.log(result);
      const variable = result.message;

      if (typeof variable === "string") {
        sendNotification(variable, 2);
        setVoidAlert(true);
      } else if (typeof variable === "object" && variable !== null) {
        if (Array.isArray(variable)) {
          //console.log("Es un arreglo");
        } else {
          if (Object.keys(variable)[0] == "email") {
            sendNotification("El correo ya se encuentra registrado", 2);
            setEmailAlert(true);
          } else if (Object.keys(variable)[0] == "user") {
            sendNotification("El usuario ya se encuentra registrado", 2);
            setUserAlert(true);
          }
        }
      } else {
        //console.log("Es otro tipo de dato");
      }
    }
  };
  const sendNotification = (msg, type) => {
    if (type == 1) {
      toast.success(msg, {
        toastStyle: { backgroundColor: "green", color: "white" },
      });
    } else if (type == 2) {
      toast.error(msg, {
        toastStyle: { backgroundColor: "red", color: "white" },
      });
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>¡REGÍSTRATE!</p>
      <div className={styles.column}>
        {inputs.map((input) => (
          <div key={input.id}>
            <p>{input.label}</p>
            <input
              type={
                input.name === "password" || input.name === "passwordCheck"
                  ? showPassword[input.name]
                    ? "text"
                    : "password"
                  : "text"
              }
              className={clsx(styles[input.class], {
                [styles.inputAlert]:
                  voidAlert ||
                  emailAlert & (input.name == "email") ||
                  secondEmailAlert & (input.name == "second_email") ||
                  userAlert & (input.name == "user") ||
                  passwordAlert &
                    (input.name == "password" || input.name == "passwordCheck"),
              })}
              name={input.name}
              value={input.value}
              onChange={(e) => handleChange(input.name, e.target.value)}
            />
            <span
              className={clsx(styles.icon, {
                [styles.passwordIcon]:
                  input.name === "password" || input.name === "passwordCheck",
                [styles.none]: !(
                  input.name === "password" || input.name === "passwordCheck"
                ),
              })}
            >
              <FaEye
                color="gray"
                onClick={() => togglePasswordVisibility(input.name)}
              />
            </span>
          </div>
        ))}
        <Button className={styles.button} onClick={handleRegister}>
          Registrarse
        </Button>
        <p className={styles.textLink} onClick={handleChangeLogIn}>
          ¿Ya tienes una cuenta?
        </p>
      </div>
    </div>
  );
};

export default SignIn;
