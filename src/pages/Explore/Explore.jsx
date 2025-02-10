import { useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import styles from "./Explore.module.css";
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import BlogCard from "../../components/BlogCard/BlogCard";
import HashTagExplore from "../../components/HashTagExplore/HashTagExplore";

const Dashboard = () => {
  const [hasText, setHasText] = useState(false)
  const [sectionSelected, setSectionSelected] = useState(1)
  const [isScrolling, setIsScrolling] = useState(false)

  function mostrarChange(valorSearch){
    console.log(valorSearch)
    if(valorSearch.length > 0){
      setHasText(true)
    }
    if (valorSearch.length == 0){
      setHasText(false)
    }
  }

  function limpiarInputSearch(){
    document.querySelector("#inputSearch").value=""
    setHasText(false)
  }

  function seleccionarSeccion(idSeccion){
    setSectionSelected(idSeccion)
  }

  function mostrarScroll(){
    
  }

    return (
      <div className={styles.ExploreContainer}>
        <div className={styles.sidebarContainer}>
        {/* <SideBar /> */}
        </div>

        <div className={styles.centerContainer} onScroll={mostrarScroll} id="centerContainer">
          <div className={styles.headerCenter}>
            <div className={styles.searchBarContainer}>
              <SearchIcon />
              <input type="text" placeholder="Search" id="inputSearch" className={styles.inputSearch} onChange={(e)=>mostrarChange(e.target.value)}/>
              {hasText ? <button className={styles.btnLimpiarSearch} onClick={limpiarInputSearch}><CancelIcon /></button> : ""}
            </div>
            <button className={styles.btnConfigSearch}><SettingsIcon /></button>
          </div>

          <div className={styles.controlSectionContianer}>
            <button className={styles.btnControlSection} onClick={()=>seleccionarSeccion(1)}><p className={sectionSelected == 1 ? styles.txtControlSectionSelected : styles.txtControlSection}>Para Ti</p> </button>
            <button className={styles.btnControlSection} onClick={()=>seleccionarSeccion(2)}><p className={sectionSelected == 2 ? styles.txtControlSectionSelected : styles.txtControlSection}>Entretenimiento</p> </button>
            <button className={styles.btnControlSection} onClick={()=>seleccionarSeccion(3)}><p className={sectionSelected == 3 ? styles.txtControlSectionSelected : styles.txtControlSection}>Noticias</p> </button>
            <button className={styles.btnControlSection} onClick={()=>seleccionarSeccion(4)}><p className={sectionSelected == 4 ? styles.txtControlSectionSelected : styles.txtControlSection}>Deportes</p> </button>
            <button className={styles.btnControlSection} onClick={()=>seleccionarSeccion(5)}><p className={sectionSelected == 5 ? styles.txtControlSectionSelected : styles.txtControlSection}>Educativo</p> </button>
          </div>

          <div className={styles.sectionRecientesContainer}>
            <p className={styles.titleSectionReciente}>Publicaciones Recientes</p>
            <div className={styles.elementosRecientesContainer}>
              <BlogCard title="Super Bowl LIZ Showdown: Eagles Clash width chiefs in New Orleans" creator="@CarlitosBodoque1" imgBackground="https://images.immediate.co.uk/production/volatile/sites/3/2025/02/Super-Bowl-2025-stadium-5480adb.jpg?resize=1200%2C630" ></BlogCard>
              <BlogCard title="Gulf of America Day Proclaimed by Trump" creator="@CarlitosBodoque2" imgBackground="https://irp.cdn-website.com/b44e0cd2/dms3rep/multi/gulf+of+america+map+3.jpg"></BlogCard>
              <BlogCard title="Jalen Hurts 'Unbannable' Air Jordan Cleats Steal the Show at Super Bowl LIX "  creator="@CarlitosBodoque3" imgBackground="https://media.cnn.com/api/v1/images/stellar/prod/230417122441-01-jalen-hurts-file.jpg?c=original"></BlogCard>
            </div>
          </div>

          <div className={styles.hashTagsContainer}>
            
            <HashTagExplore hastag="#SuperBowlLIX" numPostHastag="292K posts"></HashTagExplore>
            <HashTagExplore hastag="#Mahomes" numPostHastag="176K posts"></HashTagExplore>
            <HashTagExplore hastag="#Chiefs" numPostHastag="529K posts"></HashTagExplore>
            <HashTagExplore hastag="#Student Loan Forgiveness" numPostHastag="6K posts"></HashTagExplore>
            <HashTagExplore hastag="#Kendrick" numPostHastag="226K posts"></HashTagExplore>
            <HashTagExplore hastag="#Air Force One" numPostHastag="38K posts"></HashTagExplore>

          </div>

        </div>

        <div className={styles.rightContainer}></div>
      </div>
    );
  };
  
  export default Dashboard;