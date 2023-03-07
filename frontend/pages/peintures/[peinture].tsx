import React, { useEffect, useState, useRef } from "react";
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
  const [editPhoto, setEditPhoto] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [newPhotoArray, setNewPhotoArray] = useState<Array<File>>();

  const [deleteMode, setDeleteMode] = useState(false);

  const photosInputRef = useRef<any>(null);

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
          window.localStorage.setItem("delete-notification", `"${paintingInfos.name}" a bien été supprimé`);
        } else {
          window.localStorage.setItem("delete-notification", `La peinture a bien été supprimée`);
        }
        router.push("/peintures");
      })
      .catch((err) => console.log(err));
  };

  // Modification d'une information sur la sculpture'
  const modifyPaintingInfo = (info: string, value: any) => {
    if (paintingInfos) {
      setPaintingInfos({
        ...paintingInfos,
        [info]: value,
      });
    }
  };

  // Envoi de la requête pour modifier la vignette
  const updatePainting = (typeOfData: string) => {
    fetch(`http://localhost:8080/api/works/${paintingId}`, {
      method: "PUT",
      body: createFormData(typeOfData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        closeEditor(typeOfData);
      })
      .catch((err) => console.log(err));
  };

  // Création d'un formData avec les nouvelles données
  const createFormData = (type: string) => {
    let formData = new FormData();
    // if (updatedThumbnail) {
    //   formData.append("thumbnail", updatedThumbnail);
    // }
    if (paintingInfos) {
      formData.append("name", paintingInfos.name);
      formData.append("description", paintingInfos.description);
    }
    if (newPhotoArray) {
      for (let i = 0; i < newPhotoArray.length; i++) {
        formData.append("photos", newPhotoArray[i]);
      }
    }
    formData.append("typeOfData", type);
    formData.append("typeOfWork", "painting");
    return formData;
  };

  // Récupération du fichier thumbnail
  // const handleUpdatedThumbnail = (target: HTMLInputElement) => {
  //   if (target.files) {
  //     setUpdatedThumbnail(target.files[0]);
  //   }
  // };

  // Récupération du fichier photo
  const handleNewPhoto = (target: HTMLInputElement) => {
    if (target.files) {
      console.log(target.files[0]);
      setNewPhotoArray([target.files[0]]);
    }
  };

  // Fermeture et remise à zéro des formulaires de modifications
  const closeEditor = (field: string) => {
    switch (field) {
      case "name":
        setEditName(false);
        break;
      // case "thumbnail":
      //   setEditThumb(false);
      //   setUpdatedThumbnail(undefined);
      //   clearInput(thumbnailInputRef);
      //   break;
      case "description":
        setEditDescription(false);
        break;
      case "photos":
        // setAddPhoto(false);
        setEditPhoto(false);
        setNewPhotoArray(undefined);
        clearInput(photosInputRef);
        break;
      default:
        console.log("Erreur");
    }
    getPaintingInfos();
  };

  // Remise à zéro du formulaire de modification de la vignette
  const clearInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  return (
    <div className={styles.paintingContainer}>
      {paintingInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>Confirmer la suppression de "{paintingInfos.name}" ?</div>
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
            <div onClick={() => setDeleteMode(true)} className={styles.deleteElement}>
              <BsTrash className={styles.icon} />
              <div>Supprimer</div>
            </div>
          )}

          {/* // Nom de la peinture // */}
          <div className={styles.name}>
            <h1>{paintingInfos.name}</h1>
            {adminMode && (
              <div className={styles.iconContainer}>
                <FaEdit onClick={() => setEditName(!editName)} className={styles.icon} />
              </div>
            )}
          </div>
          {adminMode && (
            <div className={editName ? `${styles.editName} ${styles.editBlock} ${styles.showForm}` : `${styles.editName} ${styles.editBlock}`}>
              <input onChange={(e) => modifyPaintingInfo("name", e.target.value)} type="text" id="name" value={paintingInfos.name} />
              <div className={styles.editNameBtn}>
                <button onClick={() => updatePainting("name")}>Modifier</button>
                <button onClick={() => setEditName(false)}>Annuler</button>
              </div>
            </div>
          )}

          {/* // Photo de la peinture // */}
          {paintingInfos.photos && (
            <div className={styles.paintingThumb}>
              <Image loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC + paintingInfos.photos[0]}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + paintingInfos.photos[0]}`} alt="peinture" width={1000} height={400} style={{ objectFit: "contain" }} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
              {adminMode && (
                <div>
                  <div onClick={() => setEditPhoto(!editPhoto)} className={styles.iconContainer}>
                    <FaEdit className={styles.icon} />
                  </div>
                  <div className={editPhoto ? `${styles.editPhoto} ${styles.editBlock} ${styles.showForm}` : `${styles.editPhoto} ${styles.editBlock}`}>
                    <input onChange={(e) => handleNewPhoto(e.target)} type="file" ref={photosInputRef} />

                    <div>
                      <button onClick={() => updatePainting("photos")}>Modifier</button>
                      <button onClick={() => setEditPhoto(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* // Description de la peinture // */}
          <div className={styles.paintingDescription}>
            <p>{paintingInfos.description}</p>
            {adminMode && (
              <div>
                <div onClick={() => setEditDescription(!editDescription)} className={styles.iconContainer}>
                  <FaEdit className={styles.icon} />
                </div>
                <div className={editDescription ? `${styles.editDescription} ${styles.editBlock} ${styles.showForm}` : `${styles.editDescription} ${styles.editBlock}`}>
                  <textarea onChange={(e) => modifyPaintingInfo("description", e.target.value)} rows={10} value={paintingInfos.description} />

                  <div>
                    <button onClick={() => updatePainting("description")}>Modifier</button>
                    <button onClick={() => setEditDescription(false)}>Annuler</button>
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
