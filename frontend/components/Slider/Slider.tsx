import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.scss";
import { v4 as uuidv4 } from "uuid";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

type SliderProps = {
  deletePhoto: Function;
  handleEditForms: Function;
  setZoomedImage: React.Dispatch<React.SetStateAction<string>>;
  setZoomMode: React.Dispatch<React.SetStateAction<boolean>>;
  dataSlider: string[];
};

export default function Slider(props: SliderProps) {
  const [adminMode, setAdminMode] = useState(true)
  const [slideAnim, setSlideAnim] = useState({
    index: 1,
  });

  const [addPhoto, setAddPhoto] = useState(true)


  // Faire défilé les photos vers la gauche
  const nextSlide = () => {
    if (slideAnim.index !== props.dataSlider.length) {
      setSlideAnim({ index: slideAnim.index + 1 });
    } else if (slideAnim.index === props.dataSlider.length) {
      setSlideAnim({ index: 1 });
    }
  };

  // Faire défilé les photos vers la droite
  const prevSlide = () => {
    if (slideAnim.index !== 1) {
      setSlideAnim({ index: slideAnim.index - 1 });
    } else if (slideAnim.index === 1) {
      setSlideAnim({ index: props.dataSlider.length });
    }
  };

  // Faire défilé le point
  const moveDot = (index: number) => {
    setSlideAnim({ index: index });
  };

  const zoomPhoto = (image: string) => {
    props.setZoomMode(true);
    props.setZoomedImage(image)
  }

  const handleDeleteBtn = (photoName: string) => {
    props.deletePhoto(photoName)
    if(checkPhotosArray(props.dataSlider, photoName)) {
      if(slideAnim.index !== 1) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  }

  const checkPhotosArray = (photosArray: string[], deletedPhoto: string) => {
    for(let i = 0; i < photosArray.length; i++) {
      if(photosArray[i] === deletedPhoto) {
        console.log("The photo was not deleted");
        return false;        
      } else {
        return true;
      }
    }
  }

  return (
    <div className={styles.containerSlider}>
      {props.dataSlider.length > 0 &&
        props.dataSlider.map((photo, index) => {
          return (
            <div
              key={uuidv4()}
              className={
                slideAnim.index === index + 1
                  ? `${styles.slide} ${styles.activeAnim}`
                  : `${styles.slide}`
              }
            >
              <Image
                onClick={() => zoomPhoto(photo)}
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGES_SRC + photo}`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + photo}`}
                alt="Photo sculpture"
                fill
              />
              {
                adminMode &&
                <div className={styles.iconsContainer}>
                  <div onClick={() => props.handleEditForms('photos')} className={styles.iconBlock}>
                    
                  <FaEdit className={styles.icon} />
                  </div>
                  <div className={styles.iconBlock}>
                  <BsTrash onClick={() => handleDeleteBtn(photo)} className={styles.icon} />

                  </div>
              </div>
              }
            </div>
          );
        })}

      <FaArrowAltCircleRight
        onClick={() => nextSlide()}
        className={`${styles.btnSlide} ${styles.next}`}
      />

      <FaArrowAltCircleLeft
        onClick={() => prevSlide()}
        className={`${styles.btnSlide} ${styles.prev}`}
      />

      <div className={styles.containerDots}>
        {Array.from({ length: props.dataSlider.length }).map((item, index) => {
          return (
            <button
              key={uuidv4()}
              onClick={() => moveDot(index + 1)}
              className={
                slideAnim.index === index + 1
                  ? `${styles.dot} ${styles.active}`
                  : `${styles.dot}`
              }
            ></button>
          );
        })}
      </div>
     
    </div>
  );
}
