import SideBar from "../../components/SideBar/SideBar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.box}>
      <div>
        <img src="/logoFullWhite.png" alt="Inkspire" className={styles.image} />
      </div>
      <div className={styles.left}>
        <SideBar />
      </div>
      <div className={styles.center}>Enter Dashboard 640</div>
      <div className={styles.right}></div>
    </div>
  );
};

export default Dashboard;
