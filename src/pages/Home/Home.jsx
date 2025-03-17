import { useState } from "react";
import styles from "./home.module.css";
import clsx from "clsx";
import SignIn from "../../components/SignIn/SignIn";
import LogIn from "../../components/LogIn/LogIn";
import PrincipalCard from "../../components/PrincipalCard/PrincipalCard";
import ModalPassword from "../../components/ModalPassword/ModalPassword";

const Home = () => {
  const [screen, setScreen] = useState(1); //1 Home 2 LogIn 3 SignIn 4 Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChangeScreen = (arg) => {
    setScreen(arg);
  };
  const handleChangeSection = (arg) => {
    if (arg === 4) {
      setIsModalOpen(true);
    } else {
      setScreen(arg);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.half} ${styles.left}`} />
        <div className={`${styles.half} ${styles.right}`} />
        <div className={styles.menu}>
          <img
            src="/logoFullBlack.png"
            alt="LogoWhite"
            width={250}
            className={styles.logoFull}
          />
          <p
            className={styles.menuButton}
            onClick={() => handleChangeScreen(1)}
          >
            Inicio
          </p>
          <p
            className={styles.menuButton}
            onClick={() => handleChangeScreen(2)}
          >
            Iniciar Sesión
          </p>
          <p
            className={styles.menuButton}
            onClick={() => handleChangeScreen(3)}
          >
            Registrarse
          </p>
        </div>
        <div
          className={clsx({
            [styles.none]: screen === 1 || screen === 3,
            [styles.imageWhite]: screen === 2,
          })}
        >
          <img src="/logoWhite.png" alt="LogoWhite" width={200} />
          <img src="/nameWhite.png" alt="NameWhite" width={200} />
        </div>
        <div
          className={clsx({
            [styles.none]: screen === 1 || screen === 2,
            [styles.imageBlack]: screen === 3,
          })}
        >
          <img src="/logoBlack.png" alt="LogoBlack" width={200} />
          <img src="/nameBlack.png" alt="NameBlack" width={200} />
        </div>
      </div>
      <div
        className={clsx({
          [styles.none]: screen === 1 || screen === 2,
          [styles.moduleRight]: screen === 3,
        })}
      >
        <SignIn sendData={handleChangeSection} />
      </div>
      <div
        className={clsx({
          [styles.none]: screen === 2 || screen === 3,
          [styles.moduleCenter]: screen === 1,
        })}
      >
        <PrincipalCard />
      </div>
      <div
        className={clsx({
          [styles.none]: screen === 1 || screen === 3,
          [styles.moduleLeft]: screen === 2,
        })}
      >
        <LogIn sendData={handleChangeSection} />
      </div>
      <ModalPassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Home;
