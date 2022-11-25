import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SculptureGrid.module.scss";
import { v4 as uuidv4 } from "uuid";


export default function SculptureGrid() {
  const [sculptureSelected, setSculptureSelected] = useState([
    "couche-de-soleil.png",
    "foret.jpg",
    "gars-louis-apercu.jpg",
    "le-patrouilleur-apercu.jpg",
    "mer.jpg",
    "papillon.jpg",
  ]);

  const [sculptureList, setSculptureList] = useState([   
    "roule-ma-poule-apercu.jpg",
    "velo.jpg",
    "peinture.jpg",
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
      `<img src="/assets/sculpture/${sculptureList[0]}" alt="Sculpture" />`
    );
  };

  const changeSculpture = (randomNumber: number) => {
    let newSculptureList: string[];
    let newSculptureSelected: string[];
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
    <>
      <div className={styles.grid}>
        {sculptureSelected.map((element, index) => (
          <div key={uuidv4()} style={{animationDelay: `${index * 100}ms`}} className={styles.block}>
            {/* <Image quality="10"  src={element} alt="velo" /> */}
            <img src={`/assets/sculpture/${element}`} alt="Sculpture" />
          </div>
        ))}
      </div>      
      <div className={styles.sculpturesLink}>
        <Link href="/sculptures">Voir plus de sculptures</Link>
      </div>
    </>
  );
}
