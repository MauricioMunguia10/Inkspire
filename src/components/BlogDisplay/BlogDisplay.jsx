import styles from "./BlogDisplay.module.css"
export default function BlogDisplay({title, category, creator, content, img}){
    return(
        <div className={styles.blogDisplayContainer}>
            <img src={img} alt="" className={styles.imgBlog}/>

            <p className={styles.blogCategory}>{category}</p>

            <p className={styles.blogTitle}>{title}</p>

            <p className={styles.blogCreator}>@{creator}</p>
            <p className={styles.dateCreated}>Publicado en Marzo 15, 2025</p>

            <p className={styles.mainText}>{content}</p>
        </div>
    )
}
