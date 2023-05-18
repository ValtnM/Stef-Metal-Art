import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.scss";
import { v4 as uuidv4 } from "uuid";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { BiImageAdd } from "react-icons/bi";

type SliderProps = {
  adminMode: boolean;
  deletePhoto: Function;
  handleEditForms: Function;
  setZoomedPhoto: React.Dispatch<React.SetStateAction<string>>;
  setZoomMode: React.Dispatch<React.SetStateAction<boolean>>;
  dataSlider: string[];
  addPhoto: boolean;
  setAddPhoto: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewPhoto: Function;
  updateWork: Function;
  photosInputRef: React.MutableRefObject<any>;
};

type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
  root?: string;
};

const imageLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}`;
};

export default function Slider(props: SliderProps) {
  const [imgPreview, setImagePreview] = useState<File>();

  const [slideAnim, setSlideAnim] = useState({
    index: 1,
  });

  // Faire défilé les photos vers la gauche
  const nextSlide = () => {
    if (props.dataSlider.length > 1) {
      if (slideAnim.index !== props.dataSlider.length) {
        setSlideAnim({ index: slideAnim.index + 1 });
      } else if (slideAnim.index === props.dataSlider.length) {
        setSlideAnim({ index: 1 });
      }
    }
  };

  // Faire défilé les photos vers la droite
  const prevSlide = () => {
    if (props.dataSlider.length > 1) {
      if (slideAnim.index !== 1) {
        setSlideAnim({ index: slideAnim.index - 1 });
      } else if (slideAnim.index === 1) {
        setSlideAnim({ index: props.dataSlider.length });
      }
    }
  };

  // Faire défilé le point
  const moveDot = (index: number) => {
    setSlideAnim({ index: index });
  };

  // Activer le mode zoom
  const zoomPhoto = (image: string) => {
    props.setZoomMode(true);
    props.setZoomedPhoto(image);
  };

  // Gestion du bouton de suppression de photo
  const handleDeleteBtn = (photoName: string) => {
    props.deletePhoto(photoName);
    if (checkPhotosArray(props.dataSlider, photoName)) {
      if (slideAnim.index !== 1) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // Verification du bon déroulement de la suppression d'une photo
  const checkPhotosArray = (photosArray: string[], deletedPhoto: string) => {
    for (let i = 0; i < photosArray.length; i++) {
      if (photosArray[i] === deletedPhoto) {
        console.log("The photo was not deleted");
        return false;
      } else {
        return true;
      }
    }
  };

  // Récupération de l'image ajouté par l'utilisateur
  const handlePhotoInput = (target: HTMLInputElement) => {
    setImagePreview(target.files![0]);
    props.handleNewPhoto(target);
  };

  // Annulation de l'ajout de photo
  const cancelAddingPhoto = () => {
    props.setAddPhoto(false)
    clearPhotoInput()
  }

  // Ajout de la photo
  const validateAddingPhoto = () => {
    props.updateWork("photos");
    clearPhotoInput();
  };
  
  const clearPhotoInput = () => {
    setImagePreview(undefined)
    props.handleNewPhoto()
  }

  return (
    <div className={styles.containerSlider}>
      {props.dataSlider.length > 0 &&
        props.dataSlider.map((photo, index) => {
          return (
            <div key={uuidv4()} className={slideAnim.index === index + 1 ? `${styles.slide} ${styles.activeAnim}` : `${styles.slide}`}>
              <Image onClick={() => zoomPhoto(photo)} loader={imageLoader} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${photo}`} alt="Photo sculpture" fill />
              {props.adminMode && (
                <div className={styles.iconsContainer}>
                  <BiImageAdd onClick={() => props.handleEditForms("photos")} className={styles.icon} />
                  {props.dataSlider.length > 1 && <BsTrash onClick={() => handleDeleteBtn(photo)} className={styles.icon} />}
                </div>
              )}
            </div>
          );
        })}

      <FaArrowAltCircleRight onClick={() => nextSlide()} className={props.dataSlider.length > 1 ? `${styles.btnSlide} ${styles.next}` : `${styles.btnSlide} ${styles.next} ${styles.disabledBtn}`} />

      <FaArrowAltCircleLeft onClick={() => prevSlide()} className={props.dataSlider.length > 1 ? `${styles.btnSlide} ${styles.prev}` : `${styles.btnSlide} ${styles.prev} ${styles.disabledBtn}`} />

      <div className={styles.containerDots}>
        {Array.from({ length: props.dataSlider.length }).map((item, index) => {
          return <button key={uuidv4()} onClick={() => moveDot(index + 1)} className={slideAnim.index === index + 1 ? `${styles.dot} ${styles.active}` : `${styles.dot}`}></button>;
        })}
      </div>

      {props.adminMode && props.addPhoto && (
        <div className={props.addPhoto ? `${styles.addingPhoto} ${styles.visibleForm}` : `${styles.addingPhoto}`}>
          <div className={styles.editBlock}>
            <h3>Ajouter une photo</h3>
            <label htmlFor="file" className={styles.photoLabel}>
              Choisir une image
            </label>
            <input id="file" className={styles.photoInput} onChange={(e) => handlePhotoInput(e.target)} type="file" ref={props.photosInputRef} />
            {imgPreview && <div className={styles.photoImgPreview}><Image src={URL.createObjectURL(imgPreview)} alt="Aperçu image" fill /></div>}
            <div className={styles.editingFormBtns}>
              <button onClick={() => validateAddingPhoto()}>Ajouter</button>
              <button onClick={() => cancelAddingPhoto()}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
