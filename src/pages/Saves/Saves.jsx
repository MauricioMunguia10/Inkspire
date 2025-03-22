import { useEffect, useState } from "react";
import styles from "./Saves.module.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import BlogDisplay from "../../components/BlogDisplay/BlogDisplay";

export default function Saves(){
    const user = localStorage.getItem("user");
    const [blogs, setBlogs] = useState([]);
    const [blogVisible, setBlogVisible] = useState(false);
    const [blogCategory, setBlogCategory] = useState()
    const [blogTitle, setBlogTitle] = useState()
    const [blogCreator, setBlogCreator] = useState()
    const [blogImg, setBlogImg] = useState()
    const [blogContent, setBlogContent] = useState()

    const mostrarDatos = async (event) => {
          console.log("mostrandoDAtos")
          try {
            const response = await fetch(`http://localhost:5000/postsSaved?user=${encodeURIComponent(user)}`, {
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

        function showDataBlog(category, title, creator, content, img){
            setBlogVisible(true)
            setBlogCategory(category)
            setBlogTitle(title)
            setBlogCreator(creator)
            setBlogContent(content)
            setBlogImg(img)
          }
    return(
        <div className={styles.SavesPageContainer}>
            <div className={styles.HeaderSaves}>
                <p className={styles.titleSaves}>Tus blogs guardadas</p>
                <a href="/profile"><img src="https://pbs.twimg.com/profile_images/1886512780116942852/mhjKy614_400x400.png" alt="" className={styles.imgAccount}/></a>
                
            </div>
            <div className={styles.SavedBlogsContainer}>
                { 
                  blogs.map((element, index) => (
                    <div className={styles.BlogCardSaved} key={index}>
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
            </div>
        </div>
    )
}