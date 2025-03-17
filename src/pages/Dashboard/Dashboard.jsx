import SideBar from "../../components/SideBar/SideBar";
import styles from "./Dashboard.module.css";
import {useAuth} from "../../context/AuthContext"
import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);

  const mostrarDatos = async (event) => {
      console.log("mostrandoDAtos")
      try {
        const response = await fetch("http://localhost:5001/posts", {
          method: "GET"
        });
    
        const data = await response.json();
        console.log(data)
        setBlogs(data);
      } catch (error) {
        console.error("Error al enviar datos:", error);
      }
    };
       
  
      
  useEffect(() => {
      mostrarDatos(); // Se ejecuta una sola vez al montar
    }, []);
  return (
    <div className={styles.box}>
      <div>
        <img src="/logoFullWhite.png" alt="Inkspire" className={styles.image} />
      </div>
      <div className={styles.left}>
        <SideBar />
      </div>
      <div className={styles.center}>
        { 
          blogs.map((element, index) => (
            <div className={styles.item} key={index}>
              <BlogCard
                title={element.title}
                imgBackground={element.imgUrl}
                creator = {element.creator}
                onClick = {()=>showDataBlog(element.categoria, element.title, element.creator, element.contenido, element.imgUrl)}
              />
              </div>
            ))
        }

        
      </div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Dashboard;
