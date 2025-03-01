import styles from "./pcard.module.css";
const PrincipalCard = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Prepárate para algo diferente</p>
      <p className={styles.text}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
    </div>
  );
};

export default PrincipalCard;
