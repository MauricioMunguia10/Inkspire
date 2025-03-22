import SideBar from "../../components/SideBar/SideBar";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import BlogDisplay from "../../components/BlogDisplay/BlogDisplay";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate, useParams } from 'react-router-dom';
const Dashboard = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const { idPost } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [blogVisible, setBlogVisible] = useState(false);
  const [blogCategory, setBlogCategory] = useState()
  const [blogId, setBlogId] = useState()
  const [blogTitle, setBlogTitle] = useState()
  const [blogCreator, setBlogCreator] = useState()
  const [blogImg, setBlogImg] = useState()
  const [blogContent, setBlogContent] = useState()
  const mostrarDatos = async (event) => {
      console.log("mostrandoDAtos")
      try {
        const response = await fetch("http://localhost:5000/posts", {
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

    function showDataBlog(id, category, title, creator, content, img){
      setBlogId(id)
      setBlogVisible(true)
      setBlogCategory(category)
      setBlogTitle(title)
      setBlogCreator(creator)
      setBlogContent(content)
      setBlogImg(img)
      var blogTitulo = title.split(" ").join("")
      navigate(`/dashboard/${id}`);
    }

    async function savePost(postId, username) {
      console.log(postId)
      console.log(username)
      try {
        const response = await fetch('http://localhost:5000/postsSaved/add', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, user: username }),
        });
    
        const data = await response.json();
        console.log("Post actualizado:", data);
      } catch (error) {
        console.error("Error al guardar el post:", error);
      }
    }
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
                onClick = {()=>showDataBlog(element._id, element.categoria, element.title, element.creator, element.contenido, element.imgUrl)}
              />
              </div>
            ))
        }

        
      </div>
      <div className={styles.right}></div>

      <div className={styles.displayBlogComponentContainer}
          style={blogVisible ? { display: "flex" } : { display: "none" }}
          onClick={() => setBlogVisible(false)} 
          >
          <div onClick={(e) => e.stopPropagation()} style={{height:"90%", width:"25%"}}>
              <BlogDisplay
              title={blogTitle}
              category={blogCategory}
              creator={blogCreator}
              content={blogContent}
              img = {blogImg} 
              />
             
          </div>
          <div className={styles.btnGuardarContainer}>
            <button className={styles.btnGuardarPost} onClick={()=>savePost(blogId, user)}> <BookmarkIcon/> </button>
          </div>
         
      </div>
    </div>
  );
};

export default Dashboard;
