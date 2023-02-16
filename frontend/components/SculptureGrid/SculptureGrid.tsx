import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./SculptureGrid.module.scss";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string[];
};

type SculptureGridProps = {
  sculptures: Sculpture[];
};

export default function SculptureGrid(props: SculptureGridProps) {
  const [sculpturesArray, setSculpturesArray] = useState([
    [props.sculptures[0]],
    [props.sculptures[1]],
    [props.sculptures[2]],
    [props.sculptures[3]],
    [props.sculptures[4]],
    [props.sculptures[5]],
    [props.sculptures[6]],
    [props.sculptures[7]],
  ]);
  const [previousRandomNumber, setPreviousRandomNumber] = useState(900);

  let blocks: NodeListOf<Element>;
  let sculptureThumb: NodeListOf<Element>;
  useEffect(() => {
    const intervalId = setInterval(() => {
      sculptureThumb = document.querySelectorAll(`.${styles.sculptureThumb}`);

      if (process.browser) {
        blocks = document.querySelectorAll(
          `.${styles.block}`
        ) as NodeListOf<Element>;
      }

      setSculpturesArray((sculpturesArray) => {
        let newArray = [...sculpturesArray];
        return changeSculpture(getRandomNumber(), newArray);
      });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getRandomNumber = () => {
    let randomNumber = Math.floor(Math.random() * 6);
    setPreviousRandomNumber((previousRandomNumber) => {
      while (randomNumber === previousRandomNumber) {
        randomNumber = Math.floor(Math.random() * 6);
      }
      return previousRandomNumber;
    });
    return randomNumber;
  };

  const changeSculpture = (randomNumber: number, array: Sculpture[][]) => {
    let newArray = [...array];

    setPreviousRandomNumber((previousRandomNumber) => {
      if (previousRandomNumber !== 900) {
        newArray[previousRandomNumber].splice(0, 1);
      }
      return randomNumber;
    });

    newArray.push([...newArray[randomNumber]]);
    newArray[randomNumber].push(...newArray[6]);
    newArray.splice(6, 1);

    return newArray;
  };

  return (
    <>
      <div className={styles.grid}>
        {sculpturesArray.slice(0, 6).map((element, index) => (
          <div
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            className={styles.block}
          >
            {element.map((sculpture, index) => (
              <Link
                className={styles.sculptureThumb}
                key={index}
                href={`/sculptures/${sculpture.id}`}
              >
                <img
                  src={`/assets/sculptures/${sculpture.thumb}`}
                  alt="Sculpture"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.sculpturesLink}>
        <Link href="/sculptures">Voir plus de sculptures</Link>
      </div>
    </>
  );
}
