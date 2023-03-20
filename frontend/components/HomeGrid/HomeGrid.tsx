import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./HomeGrid.module.scss";
import { v4 as uuidv4 } from "uuid";

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

export default function HomeGrid() {
  const [nbOfSculpturesToDisplay, setNbOfSculpturesToDisplay] = useState(6);
  const [sculpturesArray, setSculpturesArray] = useState<Array<Array<Work>>>([]);
  const [previousRandomNumber, setPreviousRandomNumber] = useState(900);

  useEffect(() => {
    getRandomSculptures(nbOfSculpturesToDisplay);
    const intervalId = setInterval(() => {
      const randomNumber = getRandomNumber(nbOfSculpturesToDisplay);
      getNewRandomSculpture(randomNumber);
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getRandomSculptures = (nb: number) => {
    fetch(`http://localhost:8080/api/works/random/${nb}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let newSculpturesArray: Work[][] = [];
        for (let i = 0; i < data.length; i++) {
          newSculpturesArray.push([data[i]]);
        }
        setSculpturesArray(newSculpturesArray);
        window.localStorage.setItem("sculptures", JSON.stringify(newSculpturesArray));
      })
      .catch((err) => console.log(err));
  };

  const getNewRandomSculpture = async (randomNumber: number) => {
    const listOfIds = formatListOfIds(getSculpturesFromLocalStorage());

    fetch(`http://localhost:8080/api/works/random/1/${listOfIds}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSculpturesArray((sculpturesArray) => {
          console.log(sculpturesArray);
          
          if (data.length === 0) {
            return sculpturesArray;
          } else {
            let newArray = sculpturesArray;
            newArray[randomNumber].push(data[0]);

            deleteOldSculpture(randomNumber, newArray);
            updateLocalStorageSculpturesArray(newArray, randomNumber);

            return deleteOldSculpture(randomNumber, newArray);
          }
        });
      })
      .catch((err: Work[][]) => err);
  };

  const getSculpturesFromLocalStorage = () => {
    let sculptures = window.localStorage.getItem("sculptures");
    if (sculptures) {
      JSON.parse(sculptures);
      setSculpturesArray(JSON.parse(sculptures));
      return JSON.parse(sculptures);
    }
  };

  const updateLocalStorageSculpturesArray = (newArray: Work[][], randomNumber: number) => {
    window.localStorage.setItem("sculptures", JSON.stringify(newArray));
  };

  const deleteOldSculpture = (randomNumber: number, sculpturesArray: Work[][]) => {
    setPreviousRandomNumber((previousRandomNumber) => {
      if (previousRandomNumber !== 900) {
        sculpturesArray[previousRandomNumber].splice(0, 1);
      }
      return randomNumber;
    });
    return sculpturesArray;
  };

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
    <>
      {sculpturesArray && (
        <div className={styles.grid}>
          {sculpturesArray.map((element, index) => (
            <div key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.block}>
              {element.map((sculpture, index) => (
                <Link className={styles.sculptureThumb} key={index} href={`/sculptures/${sculpture._id}`}>
                  <img src={`/assets/images/${sculpture.thumbnail}`} alt="Vignette de sculpture" />
                  {/* <Image className={styles.gridImg} loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC + sculpture.thumbnail}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + sculpture.thumbnail}`} alt="peinture" width={300} height={300} style={{ objectFit: "contain" }} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" /> */}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
