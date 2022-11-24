import React, { useEffect, useState } from "react";
import styles from "./SculptureGrid.module.scss";
import Image, { StaticImageData } from "next/image";
import { v4 as uuidv4 } from "uuid";
import Peinture1 from "../../public/assets/sculpture/velo.jpg";
import Peinture2 from "../../public/assets/sculpture/couche-de-soleil.png";
import Peinture3 from "../../public/assets/sculpture/foret.jpg";
import Peinture4 from "../../public/assets/sculpture/mer.jpg";
import Peinture5 from "../../public/assets/sculpture/papillon.jpg";
import Peinture6 from "../../public/assets/sculpture/peinture.jpg";
import GarsLouis from "../../public/assets/sculpture/gars-louis-apercu.jpg";
import LePatrouilleur from "../../public/assets/sculpture/le-patrouilleur-apercu.jpg";
import RouleMaPoule from "../../public/assets/sculpture/roule-ma-poule-apercu.jpg";

export default function SculptureGrid() {
  const [sculptureList, setSculptureList] = useState([
    GarsLouis,
    LePatrouilleur,
    RouleMaPoule,
  ]);

  const [sculptureSelected, setSculptureSelected] = useState([
    Peinture1,
    Peinture2,
    Peinture3,
    Peinture4,
    Peinture5,
    Peinture6,
  ]);

  let blocks: NodeListOf<Element>;

  useEffect(() => {
    const intervalId = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * sculptureSelected.length);

      if (process.browser) {
        blocks = document.querySelectorAll(
          `.${styles.block}`
        ) as NodeListOf<Element>;
      }

      addNewImage(randomNumber);
      changeSculpture(randomNumber);

      setTimeout(() => {
        deleteOldImage(blocks[randomNumber].children[0] as HTMLImageElement);
      }, 1000);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const deleteOldImage = (image: HTMLImageElement) => {
    image.remove();
  };

  const addNewImage = (index: number) => {
    blocks[index].insertAdjacentHTML(
      "beforeend",
      `<Image src=${sculptureList[0].src} alt="peinture 3" />`
    );
  };

  const changeSculpture = (randomNumber: number) => {
    let newSculptureList: StaticImageData[];
    let newSculptureSelected: StaticImageData[];
    setSculptureList((sculptureList) => {
      newSculptureList = sculptureList;
      newSculptureList.push(sculptureSelected[randomNumber]);
      return newSculptureList;
    });
    setSculptureSelected((sculptureSelected) => {
      newSculptureSelected = sculptureSelected;
      newSculptureSelected.splice(randomNumber, 1, sculptureList[0]);
      return newSculptureSelected;
    });
    setSculptureList((sculptureList) => {
      newSculptureList = sculptureList;
      newSculptureList.splice(0, 1);
      return newSculptureList;
    });
  };

  return (
    <div className={styles.grid}>
      {sculptureSelected.map((element) => (
        <div key={uuidv4()} className={styles.block}>
          <Image src={element} alt="velo" />
        </div>
      ))}
    </div>
  );
}
