import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Peintures.module.scss";
import BackBtn from "../../components/BackBtn/BackBtn";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";

type Peinture = {
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
  const [peintureInfos, setPeintureInfos] = useState<Peinture>();
  const [adminMode, setAdminMode] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editThumb, setEditThumb] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const router = useRouter();
  const peintureId = router.query.peinture;

  useEffect(() => {
    console.log(peintureId);

    if (router.isReady) {
      getPeintureInfos();
    }
  }, [router.isReady]);

  const getPeintureInfos = () => {
    fetch(`http://localhost:8080/api/oeuvres/peintures/${peintureId}`)
      .then((res) => res.json())
      .then((data) => {
        setPeintureInfos(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.peintureContainer}>
      {peintureInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>
              Confirmer la suppression de "{peintureInfos.name}" ?
            </div>
            <div className={styles.deleteConfirmationBtn}>
              <button>Confirmer</button>
              <button onClick={() => setDeleteMode(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      <BackBtn typeOfArt="peinture" />
      {peintureInfos && (
        <div className={styles.peinture}>
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
            <h1>{peintureInfos.name}</h1>
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
              <input type="text" id="name" value={peintureInfos.name} />
              <div className={styles.editNameBtn}>
                <button>Modifier</button>
                <button onClick={() => setEditName(false)}>Annuler</button>
              </div>
            </div>
          )}
          {

          peintureInfos.photos &&
          <div className={styles.peintureThumb}>
            <Image
              src={`/assets/peintures/${peintureInfos.photos[0]}`}
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
          <div className={styles.peintureDescription}>
              <p>{peintureInfos.description}</p>
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
