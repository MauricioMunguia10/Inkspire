import styles from './CreatePost.module.css'
import BackupIcon from '@mui/icons-material/Backup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';

export default function CreatePost(){

    const [optionsVisible, setOptionsVisible] = useState(false)
    const [textSelectComponente, setTextSelectComponente] = useState('Selecciona una etiqueta')


    return(
        <div className={styles.CreatePostPageContainer}>

            <div className={styles.createFormContainer}>
                <div className={styles.inputUploadContainer}>
                    <BackupIcon/>
                    <p className={styles.txtInputUpload}>Elige un archivo o arrástralo y colócalo aquí</p>
                </div>
                <div className={styles.inputsTextContainer}>
                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Título</p>
                        <input type="text" className={styles.inputText} placeholder='Nuevos Descubrimientos en Neurociencia'/>
                    </div>

                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Categoías</p>
                        <div className={styles.selectComponent} onClick={()=>setOptionsVisible( optionsVisible ? false : true)}>
                            <p style={{userSelect:'none'}}>{textSelectComponente}</p>
                            {optionsVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            
                        </div>
                        <div className={styles.optionsContainer}  style={optionsVisible ? {display:'block'} : {display:'none'}}>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Opcion1'), setOptionsVisible(false)}}>Opcion1</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Opcion2'), setOptionsVisible(false)}}>Opcion2</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Opcion3'), setOptionsVisible(false)}}>Opcion3</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Opcion4'), setOptionsVisible(false)}}>Opcion4</p>
                        </div>
                    </div>   

                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Contenido</p>
                        <textarea name="" id="" className={styles.inputDescriptionText} placeholder='Esta historia comienza en un pequeño pueblo de Alabama...'></textarea>

                    </div>

                    <button className={styles.BtnPublicar}>Publicar</button>

                </div>
            </div>
        </div>
    )
}