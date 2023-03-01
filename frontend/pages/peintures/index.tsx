import Head from "next/head";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Peintures.module.scss";
import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import DeleteNotificationMsg from "../../components/DeleteNotificationMsg/DeleteNotificationMsg";

type Painting = {
  _id: string;
  type: string;
  name: string;
  description: string;
  thumbnail: string;
  photos: string[];
  instagram: boolean;
  like: number;
};

type PaintingsProps = {
  paintingsArray: Painting[];
}

export default function Peintures(props: PaintingsProps) {  

  const [deleteNotificationMsg, setDeleteNotificationMsg] = useState<string>()


  const getMsgFromLocaleStorage = () => {
    const msg = window.localStorage.getItem('delete-notification');
    if(msg) {
      setDeleteNotificationMsg(msg)
    }
    window.localStorage.removeItem('delete-notification')
  }

  useEffect(() => {
    getMsgFromLocaleStorage();
  }, [])

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
      <div className={styles.paintings}>
        <h1>Peintures</h1>
        {
          deleteNotificationMsg &&
          <DeleteNotificationMsg deleteNotificationMsg={deleteNotificationMsg} setDeleteNotificationMsg={setDeleteNotificationMsg} />

        }
        <div className={styles.grid}>
          {props.paintingsArray.map((element, index) => (
            <Link
            href={`/peintures/${element._id}`}
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
              className={styles.block}
            >
              <img src={process.env.NEXT_PUBLIC_IMAGES_SRC + element.thumbnail} alt={`Peinture ${element.name}`} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:8080/api/works/painting");
  const paintingsArray = await data.json();

  return {
    props: {
      paintingsArray,
    },
  };
};
