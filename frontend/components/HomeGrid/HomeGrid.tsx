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
  const [sculpturesArray, setSculpturesArray] = useState<Array<Array<Work>>>([]);
  const [previousRandomNumber, setPreviousRandomNumber] = useState(900);

  useEffect(() => {

    getRandomSculptures(6);
    const intervalId = setInterval(() => {
      const randomNumber = getRandomNumber(6);
      setSculpturesArray((sculpturesArray) => {
        let newArray = [...sculpturesArray];
        getNewRandomSculpture(newArray, randomNumber);
        deleteOldSculpture(randomNumber, newArray);
      });
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const deleteOldSculpture = (randomNumber: number, sculpturesArray: Work[][]) => {
    setPreviousRandomNumber((previousRandomNumber) => {
      if (previousRandomNumber !== 900) {
        sculpturesArray[previousRandomNumber].splice(0, 1);
      }
      return randomNumber;
    });
  };

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
      })
      .catch((err) => console.log(err));
  };

  const getNewRandomSculpture = (sculpturesArray: Work[][], randomNumber: number) => {
    const listOfIds = formatListOfIds(sculpturesArray);

    fetch(`http://localhost:8080/api/works/random/1/${listOfIds}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // let newArray = sculpturesArray;
        sculpturesArray[randomNumber].push(data[0]);
        setSculpturesArray(sculpturesArray);
      })
      .catch((err) => console.log(err));
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
      {/* {
        sculpturesArray?.map(element => (
          <h2>{element[0].name}</h2>
        ))
      }
      {
        newSculpture &&
        <h2>{newSculpture.name}</h2>
      } */}
      {sculpturesArray && (
        <div className={styles.grid}>
          {sculpturesArray.slice(0, 6).map((element, index) => (
            <div key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.block}>
              {element.map((sculpture, index) => (
                <Link className={styles.sculptureThumb} key={uuidv4()} href={`/sculptures/${sculpture._id}`}>
                  {/* <img src={`/assets/images/${sculpture.thumbnail}`} alt="Vignette de sculpture" /> */}
                  <Image loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC + sculpture.thumbnail}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + sculpture.thumbnail}`} alt="peinture" width={300} height={300} style={{ objectFit: "contain" }} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
                  {/* <img src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}${sculpture.thumbnail}`} alt="Vignette de sculpture" /> */}
                  {/* <h2>{sculpture.name}</h2> */}
                </Link>
              ))}
            </div>
          ))}
        </div>
     )}
    </>
  );
}

// const url = 'http://localhost:8080/api/works';
// const array = ['image1', 'image2','image3'];

// const formatImageList = (array) => {
//    let imageListStringify = "";
//   let newArray = [];
//   for(let i = 0; i < array.length; i++) {
//     newArray.push(`/${array[i]}`)
//   }
//   newArray.join()
//   return newArray.join('');
// }

// console.log(url+formatImageList(array))
