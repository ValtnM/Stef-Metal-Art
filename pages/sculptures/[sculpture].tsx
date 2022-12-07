import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Sculptures.module.scss";
import Slider from '../../components/Slider/Slider';

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string[];
};

export default function Sculpture(props: { sculpture: Sculpture }) {
  const [sculptureInfos, setSculptureInfos] = useState<Sculpture>();

  const router = useRouter();
  const sculptureId = router.query.sculpture;

  // useEffect(() => {
  //   console.log(router);
  //   if(router.isReady) {      
  //     getSculptureInfos();
  //   }
  // }, []);
  
  useEffect(() => {
    if(router.isReady) {      
      getSculptureInfos();
    }
  },[router.isReady])

  const getSculptureInfos = () => {
    console.log(sculptureId);
    
    fetch(`http://localhost:3000/api/sculptures/${sculptureId}`)
      .then((res) => res.json())
      .then((data) => {
        setSculptureInfos(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {sculptureInfos && (
        <div className={styles.sculpture}>
          <h1>{sculptureInfos.name}</h1>
          <div className={styles.sculptureDetails}>
            <img
              src={`/assets/sculptures/${sculptureInfos.thumb}`}
              alt="sculpture"
            />
            <p>{sculptureInfos.description}</p>
          </div>
          <Slider dataSlider={sculptureInfos.photos} />
        </div>
      )}
    </>
  );
}
