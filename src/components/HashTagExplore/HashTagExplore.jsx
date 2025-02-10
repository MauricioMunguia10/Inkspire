import styles from "./HashTagExplore.module.css";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function HashTagExplore({hastag, numPostHastag}){
    return(
        <>
        <div className={styles.hashTagContainer}>
            <div className={styles.txtsHastagContainer}>
                <p className={styles.txtHashTag}>{hastag}</p>
                <p className={styles.numPostsHashTag}>{numPostHastag}</p>
            </div>

            <div>
                <button className={styles.btnOpcionsHastag}> <MoreHorizIcon /> </button>
            </div>
        </div>
        </>
    )
}
