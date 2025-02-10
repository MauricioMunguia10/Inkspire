import styles from "./BlogCard.module.css";
export default function BlogCard({imgBackground, title, creator}){
    return(
         <div className={styles.elementoReciente}>
            <img className={styles.imgBackground} src={imgBackground} alt="" />
            <div className={styles.filtroCard}></div>
            <div className={styles.elementoRecienteTxtsContainer}>
              <p className={styles.txtTituloElementoReciente}>{title}</p>
              <p className={styles.txtCreadorElementoReciente}>{creator}</p>
            </div>
                        
        </div>
    )
}
