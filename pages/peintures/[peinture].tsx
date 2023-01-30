import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Peintures.module.scss";
import BackBtn from "../../components/BackBtn/BackBtn";


type Peinture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photo: string;
};

export default function Peinture() {
  const [peintureInfos, setPeintureInfos] = useState<Peinture>();

  const router = useRouter();
  const peintureId = router.query.peinture;

  useEffect(() => {
    console.log(peintureId);

    if (router.isReady) {
      getPeintureInfos();
    }
  }, [router.isReady]);

  const getPeintureInfos = () => {
    fetch(`http://localhost:3000/api/peintures/${peintureId}`)
      .then((res) => res.json())
      .then((data) => {
        setPeintureInfos(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.peintureContainer}>
      <BackBtn typeOfArt='peinture' />
      {peintureInfos && (
        <div className={styles.peinture}>
          <h1>{peintureInfos.name}</h1>
          <Image
            src={`/assets/peintures/${peintureInfos.photo}`}
            alt="peinture"
            width={1000}
            height={400}
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII="
          />
          <p>{peintureInfos.description}</p>
        </div>
      )}
    </div>
  );
}
