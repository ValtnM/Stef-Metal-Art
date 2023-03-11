import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./Thumbnail.module.scss";
import { v4 as uuidv4 } from "uuid";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string[];
};

interface IndexSculptures {
  // [index: number]: Sculpture[];
  // [index: number]: Sculpture[];
  // [index: number]: Sculpture[];
  // [index: number]: Sculpture[];
  // [index: number]: Sculpture[];
  //   [index: number]: Sculpture[];
}

// type ThumbProps = {
//     sculptures: {
//         '0': Sculpture[],
//         '1': Sculpture[],
//         '2': Sculpture[],
//         '3': Sculpture[],
//         '4': Sculpture[],
//         '5': Sculpture[],
//     };
//     num: number;
// }

export default function Thumbnail(props: {
  //   num: number;
  //   randomNumber: number;
  sculptures: Sculpture[];
}) {
  useEffect(() => {
    console.log("OK");
    // if(props.randomNumber === props.num) {

    // }
  }, []);
  return (
    <div
      // style={{ animationDelay: `${props.num * 100}ms` }}
      className={styles.block}
    >
      {props.sculptures.map((element, index) => (
        <div>
          <Link key={uuidv4()} href={`/sculptures/${element.id}`}>
            <div >
            <img src={`/assets/sculptures/${element.thumb}`} alt="Sculpture" />

            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
