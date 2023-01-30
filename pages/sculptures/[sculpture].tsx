import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Sculptures.module.scss";
import Slider from "../../components/Slider/Slider";
import BackBtn from "../../components/BackBtn/BackBtn";

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

  useEffect(() => {
    if (router.isReady) {
      getSculptureInfos();
    }
  }, [router.isReady]);

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
    <div className={styles.sculptureContainer}>
      <BackBtn typeOfArt='sculpture' />

      {sculptureInfos && (
        <div className={styles.sculpture}>
          <h1>{sculptureInfos.name}</h1>
          <div className={styles.sculptureDetails}>
            <Image
              src={`/assets/sculptures/${sculptureInfos.thumb}`}
              alt="sculpture"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII="
            />
            <p>{sculptureInfos.description}</p>
          </div>
          <Slider dataSlider={sculptureInfos.photos} />
        </div>
      )}
    </div>
  );
}
