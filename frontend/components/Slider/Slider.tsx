import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.scss";
import { v4 as uuidv4 } from "uuid";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

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

  const zoomPhoto = (image: string) => {
    props.setZoomMode(true);
    props.setZoomedPhoto(image);
  };

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

  const handlePhotoInput = (target: HTMLInputElement) => {
    setImagePreview(target.files![0]);
    props.handleNewPhoto(target);
  };

  const addingPhoto = () => {
    props.updateWork("photos");
    setImagePreview(undefined);
    props.setAddPhoto(false);
  };

  return (
    <div className={styles.containerSlider}>
      {props.dataSlider.length > 0 &&
        props.dataSlider.map((photo, index) => {
          return (
            <div key={uuidv4()} className={slideAnim.index === index + 1 ? `${styles.slide} ${styles.activeAnim}` : `${styles.slide}`}>
              <Image onClick={() => zoomPhoto(photo)} loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${photo}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${photo}`} alt="Photo sculpture" fill />
              {props.adminMode && (
                <div className={styles.iconsContainer}>
                  <FaEdit onClick={() => props.handleEditForms("photos")} className={styles.icon} />
                  <BsTrash onClick={() => handleDeleteBtn(photo)} className={styles.icon} />
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
            <div className={styles.photoImgPreview}>{imgPreview && <img src={URL.createObjectURL(imgPreview)} alt="Aperçu image" />}</div>
            <div className={styles.editingFormBtns}>
              <button onClick={() => addingPhoto()}>Ajouter</button>
              <button onClick={() => props.setAddPhoto(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
