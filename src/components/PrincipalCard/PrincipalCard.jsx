import styles from "./pcard.module.css";
const PrincipalCard = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Prepárate para algo diferente</p>
      <p className={styles.text}>
        Este no es solo un blog, es TU espacio. Aquí, cada voz cuenta, cada idea
        tiene un lugar y cada historia merece ser contada. Comparte, descubre y
        conecta con una comunidad que, como tú, busca expresarse sin límites.
        ¿Tienes algo que decir? Este es el momento. ¡Publica, inspírate y sé
        parte del cambio!
      </p>
    </div>
  );
};

export default PrincipalCard;
