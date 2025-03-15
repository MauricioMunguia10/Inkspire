/* eslint-disable react/prop-types */
import { Button } from "@mui/joy";
import styles from "./signIn.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const SignIn = ({ sendData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
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
  const [userAlert, setUserAlert] = useState(false);
  const [voidAlert, setVoidAlert] = useState(false);
  const navigate = useNavigate();
  const handleChangeLogIn = () => {
    sendData(2);
  };

  const handleChange = (name, newValue) => {
    if (name == "email") {
      setEmailAlert(false);
    } else if (name == "user") {
      setUserAlert(false);
    } else {
      setVoidAlert(false);
    }

    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.name === name ? { ...input, value: newValue } : input
      )
    );

    if (name in data) {
      setData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/users`, {
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

  return (
    <div className={styles.container}>
      <p className={styles.title}>¡REGÍSTRATE!</p>
      <div className={styles.column}>
        {inputs.map((input) => (
          <div key={input.id}>
            <p>{input.label}</p>
            <input
              className={clsx(styles[input.class], {
                [styles.inputAlert]:
                  voidAlert ||
                  emailAlert & (input.name == "email") ||
                  userAlert & (input.name == "user"),
              })}
              name={input.name}
              value={input.value}
              onChange={(e) => handleChange(input.name, e.target.value)}
            />
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
