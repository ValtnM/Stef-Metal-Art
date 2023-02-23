import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Sculptures.module.scss";
import Slider from "../../components/Slider/Slider";
import BackBtn from "../../components/BackBtn/BackBtn";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import { IoMdCloseCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { BsTrash } from "react-icons/bs";

type Sculpture = {
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

export default function Sculpture(props: { sculpture: Sculpture }) {
  const [sculptureInfos, setSculptureInfos] = useState<Sculpture>();
  const [zoomMode, setZoomMode] = useState(false);
  const [zoomedImage, setZoomedImage] = useState("");

  const [adminMode, setAdminMode] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editThumb, setEditThumb] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);

  const [deleteMode, setDeleteMode] = useState(false);

  const router = useRouter();
  const sculptureId = router.query.sculpture;

  useEffect(() => {
    if (router.isReady) {
      getSculptureInfos();
    }
  }, [router.isReady]);

  const getSculptureInfos = () => {
    console.log(sculptureId);

    fetch(`http://localhost:8080/api/oeuvres/sculptures/${sculptureId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setSculptureInfos(data);
      })
      .catch((err) => console.log(err));
  };

  // const closeEditName = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   setEditName(false);
  // };

  return (
    <div className={styles.sculptureContainer}>
      {sculptureInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>
              Confirmer la suppression de "{sculptureInfos.name}" ?
            </div>
            <div className={styles.deleteConfirmationBtn}>
              <button>Confirmer</button>
              <button onClick={() => setDeleteMode(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      <BackBtn typeOfArt="sculpture" />

      {sculptureInfos && (
        <div className={styles.sculpture}>
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
            <h1>{sculptureInfos.name}</h1>
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
              <input type="text" id="name" value={sculptureInfos.name} />
              <div className={styles.editNameBtn}>
                <button>Modifier</button>
                <button onClick={() => setEditName(false)}>Annuler</button>
              </div>
            </div>
          )}
          <div className={styles.sculptureDetails}>
            <div className={styles.sculptureThumb}>
              <Image
                loader={() =>
                  `${process.env.NEXT_PUBLIC_IMAGES_SRC + sculptureInfos.thumbnail}`
                }
                src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + sculptureInfos.thumbnail}`}
                alt="sculpture"
                width={400}
                height={400}
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
                      <button onClick={() => setEditThumb(false)}>
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.sculptureDescription}>
              <p>{sculptureInfos.description}</p>
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
          {/* {
            adminMode &&
            <div className={styles.editContainer}>
            </div>
          } */}
          {
            sculptureInfos.photos &&
            <Slider
            setZoomedImage={setZoomedImage}
            setZoomMode={setZoomMode}
            dataSlider={sculptureInfos.photos}
            />
          }
          {adminMode && (
            <div className={styles.addPhotoContainer}>
              <div
                onClick={() => setAddPhoto(true)}
                className={styles.iconContainer}
              >
                <MdAddCircleOutline className={styles.icon} />
                <div>Ajouter une photo</div>
              </div>
              <div
                className={
                  addPhoto
                    ? `${styles.addPhotoForm} ${styles.editBlock} ${styles.showForm}`
                    : `${styles.addPhotoForm} ${styles.editBlock}`
                }
              >
                <input type="file" />
                <div>
                  <button>Ajouter</button>
                  <button onClick={() => setAddPhoto(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {zoomMode && (
        <div className={styles.zoom}>
          <IoMdCloseCircle
            onClick={() => setZoomMode(false)}
            className={styles.icon}
          />
          <div className={styles.zoomImg}>
            <Image fill src={`/assets/sculptures/${zoomedImage}`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
