import Head from "next/head";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Sculptures.module.scss";
import { GetStaticProps } from "next";
import Sculpture from "./[sculpture]";
import DeleteNotificationMsg from "../../components/DeleteNotificationMsg/DeleteNotificationMsg";
import { useEffect, useState } from "react";

type Sculpture = {
  _id: string;
  type: string;
  name: string;
  description: string;
  thumbnail: string;
  photos: string[];
  instagram: boolean;
  like: number;
};

type SculpturesProps = {
  sculpturesArray: Sculpture[];
}

export default function Sculptures(props: SculpturesProps) {  
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
      <div className={styles.sculptures}>
        <h1>Sculptures</h1>
        {
          deleteNotificationMsg &&
          <DeleteNotificationMsg deleteNotificationMsg={deleteNotificationMsg} setDeleteNotificationMsg={setDeleteNotificationMsg} />

        }
        {
          props.sculpturesArray &&
        <div className={styles.grid}>
          {props.sculpturesArray.map((element, index) => (
            <Link
            href={`/sculptures/${element._id}`}
            key={index}
            style={{ animationDelay: `${index * 100}ms` }}
            className={styles.block}
            >
              <img src={process.env.NEXT_PUBLIC_IMAGES_SRC + element.thumbnail} alt={`Sculpture ${element.name}`} />
            </Link>
          ))}
        </div>
        }
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:8080/api/works/sculpture");
  const sculpturesArray = await data.json();

  return {
    props: {
      sculpturesArray,
    },
  };
};
