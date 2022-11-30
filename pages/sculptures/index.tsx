import { useState } from "react";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Sculptures.module.scss";

export default function Sculptures() {
  const [sculptureList, setSculptureList] = useState([
    "couche-de-soleil.png",
    "foret.jpg",
    "gars-louis-apercu.jpg",
    "le-patrouilleur-apercu.jpg",
    "mer.jpg",
    "papillon.jpg",
    "peinture.jpg",
    "roule-ma-poule-apercu.jpg",
    "velo.jpg",
  ]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={styles.sculptures}>
        <h1>Sculptures</h1>
        <div className={styles.grid}>
          {sculptureList.map((element, index) => (
            <div
              key={uuidv4()}
              style={{ animationDelay: `${index * 100}ms` }}
              className={styles.block}
            >
              <img src={`/assets/sculpture/${element}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
