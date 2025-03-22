import styles from "./Bn.module.css";

const BlogNew = ({ title, imgBackground, creator, url }) => {
  return (
    <div className={styles.card}>
      <img src={imgBackground} alt={title} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardCreator}>Creado por: {creator}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
      >
        Leer más
      </a>
    </div>
  );
};

export default BlogNew;
