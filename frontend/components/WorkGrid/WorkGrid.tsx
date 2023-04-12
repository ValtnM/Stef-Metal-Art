import Head from "next/head";
import Link from "next/link";
import styles from "./WorkGrid.module.scss";
import { GetStaticProps } from "next";
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

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.works}>
        <h1>{props.title}</h1>
        {deleteNotificationMsg && <DeleteNotificationMsg deleteNotificationMsg={deleteNotificationMsg} setDeleteNotificationMsg={setDeleteNotificationMsg} />}
        {props.worksArray && (
          <div className={styles.worksGrid}>
            {props.worksArray.map((element, index) => (
              <div key={index} className={styles.workContainer}>
                <Link href={`${pathname}/${element._id}`} key={index} style={{ animationDelay: `${index * 100}ms` }} className={styles.workElement}>
                  <img src={process.env.NEXT_PUBLIC_IMAGES_SRC + element.thumbnail} alt={`Sculpture ${element.name}`} />
                </Link>
                {/* {adminMode && (


                  <div className={styles.editBlock}>
                    <div onClick={() => setEditThumbnail(element._id)} className={styles.iconContainer}>
                      <FaEdit className={styles.icon} />
                    </div>

                    <div className={editThumbnail === element._id ? `${styles.editFormContainer} ${styles.active}` : `${styles.editFormContainer}`}>
                      <div className={styles.editForm}>
                        <input type="file" />
                        <div className={styles.editBtn}>
                          <button>Modifier</button>
                          <button onClick={() => setEditThumbnail("")}>Annuler</button>
                        </div>
                      </div>
                    </div>
                  </div>



                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
