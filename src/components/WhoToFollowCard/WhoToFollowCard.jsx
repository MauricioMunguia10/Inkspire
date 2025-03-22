import styles from "./WhoToFollowCard.module.css";

export default function WhoToFollow({imgURL, name, user}){
    return(
        <>
            


              <div className={styles.wtfCard}>
                
                <div className={styles.infoProfileHTF}>
                  <p className={styles.userNameWTFCard}>{name}</p>
                  <p className={styles.atNameWTFCard}>@{user}</p>
                </div>
                <a className={styles.WTFbutton} href={`/profile/${user}`}>Ver Perfil</a>
              </div>


        </>
    )
}