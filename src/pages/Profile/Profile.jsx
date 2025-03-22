import styles from "./Profile.module.css";
import BlogCard from "../../components/BlogCard/BlogCard";
import { useRef, useState } from "react";
import { useEffect } from "react";
import BlogDisplay from "../../components/BlogDisplay/BlogDisplay";
import SideBar from "../../components/SideBar/SideBar";
import { useParams } from 'react-router-dom';
import WhoToFollow from "../../components/WhoToFollowCard/WhoToFollowCard";
export default function Profile (){
    const { user } = useParams();
    console.log(user)
    const [blogs, setBlogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [blogVisible, setBlogVisible] = useState(false);
    const [blogCategory, setBlogCategory] = useState()
    const [blogTitle, setBlogTitle] = useState()
    const [blogCreator, setBlogCreator] = useState()
    const [blogImg, setBlogImg] = useState()
    const [blogContent, setBlogContent] = useState()
    const [countPost, setCountPost] = useState(0)
    const [nombreUsuario, setNombreUsuario] = useState(0)
    const [nickName, setNickName] = useState(0)
    const [createdAt, setCreatedAt] = useState()
    const [elementVisible, setElementVisible] = useState(false);
    const containerRef = useRef(null);
    const mostrarDatosPost = async (event) => {

        try {
          const response = await fetch(`http://localhost:5000/postsUser?user=${encodeURIComponent(user)}`, {
            method: "GET"
          });
      
          const data = await response.json();
          console.log(data)
          setBlogs(data);
          setCountPost(data.length)
          
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      };
     
      const mostrarDatosUser = async (event) => {

        try {
          const response = await fetch(`http://localhost:5000/user?user=${encodeURIComponent(user)}`, {
            method: "GET"
          });
      
          const data = await response.json();
          console.log(data)
          const createdAtDate = new Date(data[0].createdAt);
          const onlyDate = createdAtDate.toLocaleDateString();
          setNombreUsuario(data[0].name)
          setNickName(data[0].user)
          setCreatedAt(onlyDate)
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      };

      const mostrarDatosUsuarios = async (event) => {
        console.log("mostrandoDAtos")
        try {
          const response = await fetch("http://localhost:5000/users", {
            method: "GET"
          });
      
          const data = await response.json();
          console.log(data)
          setUsers(data);
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      };
useEffect(() => {
  mostrarDatosPost();
  mostrarDatosUser() 
  mostrarDatosUsuarios()
  console.log(user)
  }, []);


  function showDataBlog(category, title, creator, content, img){
    setBlogVisible(true)
    setBlogCategory(category)
    setBlogTitle(title)
    setBlogCreator(creator)
    setBlogContent(content)
    setBlogImg(img)
  }
  const getRandomUsers = (users) => {
    console.log(users)
    const shuffledUsers = users.sort(() => Math.random() - 0.5);
    
    return shuffledUsers.slice(0, 3);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      
      if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        setElementVisible(true); 
      } else {
        setElementVisible(false); 
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  const randomBlogs = getRandomUsers(users);
    return(
        <div className={styles.ProfileContainer}>
            <div className={styles.sideBarContainer}>
              <SideBar/>
            </div>
            <div className={styles.centerContainer}>
                <div className={styles.headerProfile}>
                    <p className={styles.userName}>{nombreUsuario}</p>
                    <p className={styles.countPosts}>{countPost} posts</p>
                </div>

              

                <div className={styles.userData}>
                    <p className={styles.userNick}>@{nickName}</p>
                    <p className={styles.userJoinDate}>Se unió en {createdAt}</p>
                </div>

                <div className={styles.blogsContainer} ref={containerRef}>
                   <p className={styles.titleBlogs}>Tus Blogs</p>
                     { 
                        blogs.map((element, index) => (
                            <div className={styles.blogCardContainer} key={index}>
                            
                            <BlogCard
                              title={element.title}
                              imgBackground={element.imgUrl}
                              creator = {element.creator}
                              onClick = {()=>showDataBlog(element.categoria, element.title, element.creator, element.contenido, element.imgUrl)}
                            />
                            </div>
                          ))
                    }
                    
                    {elementVisible && (
                    <div className={styles.AddPostElement}>
                      <a href="/create" className={styles.btnAgregarPost}>¡Agrega un nuevo post!</a>
                    </div>
                  )}
                </div>
                
            </div>
            <div className={styles.rightContainer}>
                    <div className={styles.whoToFollowContainer}>
                     <p className={styles.titleWTF}>Recomendados</p>
                     {
                        randomBlogs.map((user, index)=>(
                          <WhoToFollow user={user.user} name={user.name} key={index}></WhoToFollow>
                        ))
                      }
                    </div>
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