import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./SculptureGrid.module.scss";
import { v4 as uuidv4 } from "uuid";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string;
};

type SculptureGridProps = {
  sculptures: Sculpture[];
};

export default function SculptureGrid(props: SculptureGridProps) {
  const [sculpturesArray, setSculpturesArray] = useState(props.sculptures);

  let blocks: NodeListOf<Element>;

  useEffect(() => {
    const intervalId = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 6);

      if (process.browser) {
        blocks = document.querySelectorAll(
          `.${styles.block}`
        ) as NodeListOf<Element>;
      }

      setSculpturesArray((sculpturesArray) => {
        let newArray = sculpturesArray;
        addNewImage(randomNumber, newArray);
        return changeSculpture(randomNumber, newArray);
      });

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

  const addNewImage = (index: number, array: Sculpture[]) => {
    blocks[index].insertAdjacentHTML(
      "beforeend",
      `<img src="/assets/sculpture/${array[6].thumb}" alt="Sculpture" />`
    );
  };

  const changeSculpture = (randomNumber: number, array: Sculpture[]) => {
    const oldItem = array[randomNumber];
    const newItem = array[6];
    array.splice(randomNumber, 1, newItem);
    array.splice(6, 1);
    array.push(oldItem);
    return array;
  };

  return (
    <>
      <div className={styles.grid}>
        {sculpturesArray.slice(0, 6).map((element, index) => (
          <div
            key={uuidv4()}
            style={{ animationDelay: `${index * 100}ms` }}
            className={styles.block}
          >
            <img src={`/assets/sculpture/${element.thumb}`} alt="Sculpture" />
          </div>
        ))}
      </div>
      <div className={styles.sculpturesLink}>
        <Link href="/sculptures">Voir plus de sculptures</Link>
      </div>
    </>
  );
}
