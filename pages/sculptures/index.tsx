import { useState } from "react";
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
    <div className={styles.sculptures}>
      <h1>Sculptures</h1>
      <div className={styles.grid}>
        {sculptureList.map((element, index) => (
          <div key={uuidv4()} style={{animationDelay: `${index * 100}ms`}} className={styles.block}>
            <img src={`/assets/sculpture/${element}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
