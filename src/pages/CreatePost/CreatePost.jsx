import styles from './CreatePost.module.css'
import BackupIcon from '@mui/icons-material/Backup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState, useRef, useEffect } from 'react';
import {useDropzone} from 'react-dropzone';

export default function CreatePost(){
  const user = localStorage.getItem("user");
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div  key={file.name}>
      <div >
        <img
          src={file.preview}
          className={styles.imgPreview}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [textSelectComponente, setTextSelectComponente] = useState('Selecciona una etiqueta')
    const [title, setTitle] = useState('')
    const [categoria, setCategoria] = useState('')
    const [contenido, setContenido] = useState('')
    const [imgValue, setImageValue] = useState()
    const fileInputRef = useRef(null);

    
    const handleAddUser = async (event) => {
        console.log(files)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("categoria", categoria);
        formData.append("contenido", contenido);
        formData.append("image", files[0]);
        formData.append("creator", user);
      
        try {
          const response = await fetch("http://localhost:5000/posts", {
            method: "POST",
            body: formData,
          });
      
          const data = await response.json();
          console.log("Usuario agregado:", data);
          if (response.ok) {
            window.location.href = `/Profile/${user}`;
        }
        } catch (error) {
          console.error("Error al enviar datos:", error);
        } 

        
      };
      
      const mostrarDatos = async (event) => {

        try {
          const response = await fetch("http://localhost:5000/posts", {
            method: "GET"
          });
      
          const data = await response.json();
          console.log("Usuario agregado:", data);
        } catch (error) {
          console.error("Error al enviar datos:", error);
        }
      };


    return(
        <div className={styles.CreatePostPageContainer}>
            <p className={styles.titleCreatePost}>Create Post</p>
            <div className={styles.createFormContainer}>
                <div  onClick={()=>fileInputRef.current.click()}  {...getRootProps({className: `${styles.inputUploadContainer} dropzone`})}>
                    <BackupIcon/>
                    <p className={styles.txtInputUpload}>Elige un archivo o arrástralo y colócalo aquí</p>
                    <input type="file" name="" id=""  ref={fileInputRef} style={{display:'none'}} onChange={(e)=>setImageValue(e.target.files[0])}  {...getInputProps()}/>
                    <div className={styles.imgPreviewContainer} >
                      {thumbs}
                    </div>
                    
                </div>
                
                <div className={styles.inputsTextContainer}>
                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Título</p>
                        <input type="text" className={styles.inputText} placeholder='Nuevos Descubrimientos en Neurociencia' onChange={(e)=>setTitle(e.target.value)}/>
                    </div>

                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Categoías</p>
                        <div className={styles.selectComponent} onClick={()=>setOptionsVisible( optionsVisible ? false : true)}>
                            <p style={{userSelect:'none'}}>{textSelectComponente}</p>
                            {optionsVisible ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            
                        </div>
                        <div className={styles.optionsContainer}  style={optionsVisible ? {display:'block'} : {display:'none'}}>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Ciencia Ficción'), setOptionsVisible(false), setCategoria("Ciencia Ficción")}}>Ciencia Ficción</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Deportes'), setOptionsVisible(false), setCategoria("Deportes")}}>Deportes</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Espectáculos'), setOptionsVisible(false), setCategoria("Espectáculos")}}>Espectáculos</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Sociales'), setOptionsVisible(false), setCategoria("Sociales")}}>Sociales</p>
                            <p className={styles.option} onClick={()=>{setTextSelectComponente('Psicología'), setOptionsVisible(false), setCategoria("Psicología")}}>Psicología</p>
                        </div>
                    </div>   

                    <div className={styles.labelInputContainer}>
                        <p className={styles.labelTxt}>Contenido</p>
                        <textarea name="" id="" onChange={(e)=>setContenido(e.target.value)} className={styles.inputDescriptionText} placeholder='Esta historia comienza en un pequeño pueblo de Alabama...'></textarea>

                    </div>

                    <button className={styles.BtnPublicar} onClick={(e)=>handleAddUser(e)}>Publicar</button>

                </div>

                
            </div>
            
        </div>
    )
}

