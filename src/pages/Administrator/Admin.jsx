import { useEffect } from "react";
import Table from "../../components/Table/Table";
import styles from "./Admin.module.css";
import { useState } from "react";
import { toast } from "react-toastify";

const Admin = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const columns = [
    { key: "_id", label: "ID" },
    { key: "name", label: "Nombre" },
    { key: "user", label: "Usuario" },
    { key: "email", label: "Correo Electrónico" },
    { key: "type_user", label: "Tipo de Usuario" },
    { key: "active", label: "Activo" },
    { key: "actions", label: "Acciones" },
  ];

  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        const data = await response.json();

        const filteredData = data.map(
          ({ _id, name, email, user, active, type_user }) => ({
            _id,
            name,
            email,
            user,
            active,
            type_user,
          })
        );

        setUsers(filteredData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUsers();
  }, [update]);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userId}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.status === 201) {
        sendNotification("Eliminado con exito", 1);
        setUpdate(!update);
      }
    } catch (error) {
      sendNotification("Ocurrio un error: ", error, 2);
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
    <div className={styles.container}>
      <Table
        columns={columns}
        data={users.map((user) => ({
          ...user,
          actions: (
            <button onClick={() => deleteUser(user._id)}>Eliminar</button>
          ),
        }))}
      />
    </div>
  );
};

export default Admin;
