import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./WorkGrid.module.scss";
import DeleteNotificationMsg from "../../components/DeleteNotificationMsg/DeleteNotificationMsg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Work = {
  _id: string;
  type: string;
  name: string;
  description: string;
  thumbnail: string;
  photos: string[];
  instagram: boolean;
  like: number;
};

type WorkProps = {
  worksArray: Work[];
  title: String;
};

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
  root?: string
}

const imageLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}`
}

export default function WorkGrid(props: WorkProps) {
  const [deleteNotificationMsg, setDeleteNotificationMsg] = useState<string>();

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    getMsgFromLocaleStorage();
  }, []);

  const getMsgFromLocaleStorage = () => {
    const msg = window.localStorage.getItem("delete-notification");
    if (msg) {
      setDeleteNotificationMsg(msg);
    }
    window.localStorage.removeItem("delete-notification");
  };

  return (
    <div className={styles.container}>
      {/* <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      </Head> */}

      <div className={styles.works}>
        <h1>{props.title}</h1>
        {deleteNotificationMsg && <DeleteNotificationMsg deleteNotificationMsg={deleteNotificationMsg} setDeleteNotificationMsg={setDeleteNotificationMsg} />}
        {props.worksArray.length > 0 && (
          <div className={styles.worksGrid}>
            {props.worksArray.map((element, index) => (
                <Link href={`${pathname}/${element._id}`} key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.workElement}>
                  <Image loader={imageLoader} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${element.thumbnail}`} alt={`Sculpture ${element.name}`} width={300} height={300} />
                  <h2>{element.name}</h2>
                </Link>
              // <div key={index} className={styles.workContainer}>
              //   <Link href={`${pathname}/${element._id}`} key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.workElement}>
              //     <img src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${element.thumbnail}`} alt={`Sculpture ${element.name}`} />
              //   </Link>
              // </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
