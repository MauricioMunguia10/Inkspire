import styles from "./Profile.module.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import BlogDisplay from "../../components/BlogDisplay/BlogDisplay";
import {useAuth} from "../../context/AuthContext"

export default function Profile (){
    const {user} = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [blogVisible, setBlogVisible] = useState(false);
    const [blogCategory, setBlogCategory] = useState()
    const [blogTitle, setBlogTitle] = useState()
    const [blogCreator, setBlogCreator] = useState()
    const [blogImg, setBlogImg] = useState()
    const [blogContent, setBlogContent] = useState()
    const mostrarDatos = async (event) => {

        try {
          const response = await fetch(`http://localhost:5001/postsUser?user=${encodeURIComponent(user[0].user)}`, {
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
        <div className={styles.ProfileContainer}>
            <div className={styles.sideBarContainer}>

            </div>
            <div className={styles.centerContainer}>
                <div className={styles.headerProfile}>
                    <p className={styles.userName}>Daniel Trejo Velázquez</p>
                    <p className={styles.countPosts}>0 posts</p>
                </div>

                <div className={styles.imagesProfile}>
                    <div className={styles.banner}></div>
                    <div className={styles.imgProfileAndEditBtn}>
                        <div className={styles.ImgContainer}>
                            <img src="https://pbs.twimg.com/profile_images/1886512780116942852/mhjKy614_400x400.png" alt="" className={styles.imgProfile}/>
                        </div>
                        <button className={styles.editBtn}>
                            Edit Profile
                        </button>
                    </div> 
                </div>

                <div className={styles.userData}>
                    <p className={styles.userName}>Daniel Trejo Velázquez</p>
                    <p className={styles.userNick}>@DanielTrej97144</p>
                    <p className={styles.userJoinDate}>Se unió en Febrero 2025</p>
                </div>

                <div className={styles.blogsContainer}>
                   <p className={styles.titleBlogs}>Tus Blogs</p>
                     { 
                        blogs.map((element, index) => (
                            <div className={styles.blogCardContainer}>
                            <BlogCard
                              key={index}
                              title={element.title}
                              imgBackground={element.imgUrl}
                              creator = {element.creator}
                              onClick = {()=>showDataBlog(element.categoria, element.title, element.creator, element.contenido, element.imgUrl)}
                            />
                            </div>
                          ))
                    }
                    
                  
                </div>
                
            </div>
            <div className={styles.rightContainer}>

            </div>



            <div
            className={styles.displayBlogComponentContainer}
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