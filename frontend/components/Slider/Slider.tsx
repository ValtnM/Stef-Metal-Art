import React, { useState } from "react";
import Image from "next/image";
import styles from "./Slider.module.scss";
import { v4 as uuidv4 } from "uuid";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

type SliderProps = {
  setZoomedImage: React.Dispatch<React.SetStateAction<string>>;
  setZoomMode: React.Dispatch<React.SetStateAction<boolean>>;
  dataSlider: string[];
};

export default function Slider(props: SliderProps) {
  const [adminMode, setAdminMode] = useState(false)
  const [slideAnim, setSlideAnim] = useState({
    index: 1,
  });


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
    console.log("OK");

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

  const zoomImage = (image: string) => {
    console.log(image);
    
    props.setZoomMode(true);
    props.setZoomedImage(image)
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
                onClick={() => zoomImage(photo)}
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGES_SRC + photo}`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + photo}`}
                alt="Photo sculpture"
                fill
              />
              {
                adminMode &&
                <div className={styles.iconContainer}>

              <BsTrash className={styles.icon} />
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
