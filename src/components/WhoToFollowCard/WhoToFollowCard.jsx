import styles from "./WhoToFollowCard.module.css";

export default function WhoToFollow({imgURL}){
    return(
        <>
            


              <div className={styles.wtfCard}>
                <img src={imgURL} alt="" className={styles.imgProfileWTF}/>
                <div className={styles.infoProfileHTF}>
                  <p className={styles.userNameWTFCard}>National Geographic</p>
                  <p className={styles.atNameWTFCard}>@NatGeo</p>
                </div>
                <button className={styles.WTFbutton}>Follow</button>
              </div>


        </>
    )
}