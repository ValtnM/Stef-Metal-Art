import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeGrid.module.scss";
import Engrenages from "../../public/assets/engrenages-photo.webp";

type Work = {
  _id: Object;
  name: string;
  description: string;
  thumbnail: string;
  photos: Array<string>;
  instagram: boolean;
  like: number;
  create_date: Date;
  update_date: Date;
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

export default function HomeGrid(props: { sculpturesArray: Work[][]; nbOfSculpturesToDisplay: number }) {
  const [sculpturesArray, setSculpturesArray] = useState<Array<Array<Work>>>(props.sculpturesArray);
  const [nbOfSculpturesToDisplay, setNbOfSculpturesToDisplay] = useState(props.nbOfSculpturesToDisplay);
  const [previousRandomNumber, setPreviousRandomNumber] = useState(900);

  useEffect(() => {
    stockSculpturesToLocalStorage();
    if (sculpturesArray.length > 0) {
      const intervalId = setInterval(() => {
        const randomNumber = getRandomNumber(nbOfSculpturesToDisplay);
        getNewRandomSculpture(randomNumber);
      }, 5000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  // Stockage du tableau de sculptures dans le local storage
  const stockSculpturesToLocalStorage = () => {
    window.localStorage.setItem("sculptures", JSON.stringify(sculpturesArray));
  };

  // Récupération d'une sculpture aléatoire dans la base de données
  const getNewRandomSculpture = async (randomNumber: number) => {
    const listOfIds = formatListOfIds(getSculpturesFromLocalStorage());

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/random/1/${listOfIds}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSculpturesArray((sculpturesArray) => {
          if (data.length === 0) {
            return sculpturesArray;
          } else {
            let newArray = sculpturesArray;
            newArray[randomNumber].push(data[0]);

            deleteOldSculpture(randomNumber, newArray);
            setTimeout(() => {
              updateLocalStorageSculpturesArray(newArray, randomNumber);
            }, 500);
            return newArray;
          }
        });
      })
      .catch((err: Work[][]) => err);
  };

  // Récupération du tableau de sculptures dans le local storage
  const getSculpturesFromLocalStorage = () => {
    let sculptures = window.localStorage.getItem("sculptures");
    if (sculptures) {
      JSON.parse(sculptures);
      setSculpturesArray(JSON.parse(sculptures));
      return JSON.parse(sculptures);
    }
  };

  // Mise à jour du tableau de sculptures stocké dans le local storage
  const updateLocalStorageSculpturesArray = (newArray: Work[][], randomNumber: number) => {
    window.localStorage.setItem("sculptures", JSON.stringify(newArray));
  };

  // Suppression d'un élément du tableau de sculptures
  const deleteOldSculpture = (randomNumber: number, sculpturesArray: Work[][]) => {
    let newArray = sculpturesArray;

    setPreviousRandomNumber((previousRandomNumber) => {
      if (previousRandomNumber !== 900) {
        newArray[previousRandomNumber].splice(0, 1);
      }
      return randomNumber;
    });
  };

  // Récupération d'un nombre aléatoire
  const getRandomNumber = (nb: number) => {
    let randomNumber = Math.floor(Math.random() * nb);
    setPreviousRandomNumber((previousRandomNumber) => {
      while (randomNumber === previousRandomNumber) {
        randomNumber = Math.floor(Math.random() * nb);
      }
      return previousRandomNumber;
    });
    return randomNumber;
  };

  // Formatage d'un tableau contenant les IDs des sculptures selectionnées
  const formatListOfIds = (oldSculpturesArray: Work[][]) => {
    let listOfIds: string[] = [];

    for (let i = 0; i < oldSculpturesArray.length; i++) {
      oldSculpturesArray[i].forEach((sculpture) => {
        listOfIds.push(`${sculpture._id}`);
      });
    }
    const stringifyListOfIds = listOfIds.join("&");

    return stringifyListOfIds;
  };

  return (
    <div className={styles.container}>
      <Image className={styles.background} src={Engrenages} width={1920} height={1280} alt="Engrenages en vrac" />
      <div className={styles.backgroundFilter}></div>
      {sculpturesArray.length > 0 ? (
        <div className={styles.grid}>
          {sculpturesArray.map((element, index) => (
            <div key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.block}>
              {element.map((sculpture, index) => (
                <Link className={styles.sculptureThumb} key={index} href={`/sculptures/${sculpture._id}`}>
                  <Image className={styles.gridImg} loader={imageLoader} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${sculpture.thumbnail}`} alt={sculpture.name} width={300} height={300} style={{ objectFit: "cover" }} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noSculptureMessage}>Aucune sculpture disponible</div>
      )}
    </div>
  );
}
