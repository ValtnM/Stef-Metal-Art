import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Peintures.module.scss";
import BackBtn from "../../components/BackBtn/BackBtn";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

type Painting = {
  _id: Object;
  name: string;
  description: string;
  thumbnail: string;
  photos: Array<string>;
  instagram: boolean;
  like: number;
  create_date: Date;
  update_date: Date;
};

export default function Peinture() {
  const [paintingInfos, setPaintingInfos] = useState<Painting>();
  const [adminMode, setAdminMode] = useState(true);
  const [editName, setEditName] = useState(false);
  const [editThumb, setEditThumb] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const router = useRouter();
  const paintingId = router.query.peinture;

  useEffect(() => {

    if (router.isReady) {
      getPaintingInfos();
    }
  }, [router.isReady]);

  const getPaintingInfos = () => {
    fetch(`http://localhost:8080/api/works/paintings/${paintingId}`)
      .then((res) => res.json())
      .then((data) => {
       
        setPaintingInfos(data);
      })
      .catch((err) => console.log(err));
  };

  const deletePainting = () => {
    fetch(`http://localhost:8080/api/works/painting/${paintingId}`, {
      method: "DELETE",
    })
      .then(() => {
        if (paintingInfos) {
          window.localStorage.setItem(
            "delete-notification",
            `"${paintingInfos.name}" a bien été supprimé`
          );
        } else {
          window.localStorage.setItem(
            "delete-notification",
            `La peinture a bien été supprimée`
          );
        }
        router.push("/peintures");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.paintingContainer}>
      {paintingInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>
              Confirmer la suppression de "{paintingInfos.name}" ?
            </div>
            <div className={styles.deleteConfirmationBtn}>
              <button onClick={() => deletePainting()}>Confirmer</button>
              <button onClick={() => setDeleteMode(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      <BackBtn typeOfArt="painting" />
      {paintingInfos && (
        <div className={styles.painting}>
          {adminMode && (
            <div
              onClick={() => setDeleteMode(true)}
              className={styles.deleteElement}
            >
              <BsTrash className={styles.icon} />
              <div>Supprimer</div>
            </div>
          )}
          <div className={styles.name}>
            <h1>{paintingInfos.name}</h1>
            {adminMode && (
              <div className={styles.iconContainer}>
                <FaEdit
                  onClick={() => setEditName(!editName)}
                  className={styles.icon}
                />
              </div>
            )}
          </div>
          {adminMode && (
            <div
              className={
                editName
                  ? `${styles.editName} ${styles.editBlock} ${styles.showForm}`
                  : `${styles.editName} ${styles.editBlock}`
              }
            >
              <input type="text" id="name" value={paintingInfos.name} />
              <div className={styles.editNameBtn}>
                <button>Modifier</button>
                <button onClick={() => setEditName(false)}>Annuler</button>
              </div>
            </div>
          )}
          {

          paintingInfos.photos &&
          <div className={styles.paintingThumb}>
            <Image
              loader={() =>
                `${process.env.NEXT_PUBLIC_IMAGES_SRC + paintingInfos.photos[0]}`
              }
              src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + paintingInfos.photos[0]}`}
              alt="peinture"
              width={1000}
              height={400}
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII="
            />
            {adminMode && (
              <div>
                <div
                  onClick={() => setEditThumb(!editThumb)}
                  className={styles.iconContainer}
                >
                  <FaEdit className={styles.icon} />
                </div>
                <div
                  className={
                    editThumb
                      ? `${styles.editThumb} ${styles.editBlock} ${styles.showForm}`
                      : `${styles.editThumb} ${styles.editBlock}`
                  }
                >
                  <input type="file" />

                  <div>
                    <button>Modifier</button>
                    <button onClick={() => setEditThumb(false)}>Annuler</button>
                  </div>
                </div>
              </div>
            )}
          </div>
      }
          <div className={styles.paintingDescription}>
              <p>{paintingInfos.description}</p>
              {adminMode && (
                <div>
                  <div
                    onClick={() => setEditDescription(!editDescription)}
                    className={styles.iconContainer}
                  >
                    <FaEdit className={styles.icon} />
                  </div>
                  <div
                    className={
                      editDescription
                        ? `${styles.editDescription} ${styles.editBlock} ${styles.showForm}`
                        : `${styles.editDescription} ${styles.editBlock}`
                    }
                  >
                    <textarea rows={10} />

                    <div>
                      <button>Modifier</button>
                      <button onClick={() => setEditDescription(false)}>
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      )}
    </div>
  );
}
