import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/Sculptures.module.scss";
import Slider from "../../components/Slider/Slider";
import BackBtn from "../../components/BackBtn/BackBtn";
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

  const [adminMode, setAdminMode] = useState(true);
  const [editName, setEditName] = useState(false);
  const [editThumb, setEditThumb] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);

  const [updatedThumbnail, setUpdatedThumbnail] = useState<File>();
  const [newPhotoArray, setNewPhotoArray] = useState<Array<File>>();

  const [deleteMode, setDeleteMode] = useState(false);

  const thumbnailInputRef = useRef<any>(null);
  const photosInputRef = useRef<any>(null);

  const router = useRouter();
  const sculptureId = router.query.sculpture;

  useEffect(() => {
    if (router.isReady) {
      getSculptureInfos();
    }
  }, [router.isReady]);



  // Envoi de la requête pour supprimer les infos de la sculpture
  const getSculptureInfos = () => {
    fetch(`http://localhost:8080/api/works/sculptures/${sculptureId}`)
      .then((res) => res.json())
      .then((data) => {
        setSculptureInfos(data);
      })
      .catch((err) => console.log(err));
  };

  // Envoi de la requête pour supprimer la sculpture
  const deleteSculpture = () => {
    fetch(`http://localhost:8080/api/works/sculpture/${sculptureId}`, {
      method: "DELETE",
    })
      .then(() => {
        if (sculptureInfos) {
          window.localStorage.setItem("delete-notification", `"${sculptureInfos.name}" a bien été supprimé`);
        } else {
          window.localStorage.setItem("delete-notification", `La sculpture a bien été supprimée`);
        }
        router.push("/sculptures");
      })
      .catch((err) => console.log(err));
  };

  // Modification d'une information sur la sculpture'
  const modifySculptureInfo = (info: string, value: any) => {
    if (sculptureInfos) {
      setSculptureInfos({
        ...sculptureInfos,
        [info]: value,
      });
    }
  };

  // Envoi de la requête pour modifier la vignette
  const updateSculpture = (typeOfData: string) => {
    fetch(`http://localhost:8080/api/works/${sculptureId}`, {
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
    if (updatedThumbnail) {
      formData.append("thumbnail", updatedThumbnail);
    }
    if (sculptureInfos) {
      formData.append("name", sculptureInfos.name);
      formData.append("description", sculptureInfos.description);
    }
    if (newPhotoArray) {
      for (let i = 0; i < newPhotoArray.length; i++) {
        formData.append("photos", newPhotoArray[i]);
      }
    }
    formData.append("typeOfData", type);
    formData.append("typeOfWork", "sculpture")
    return formData;
  };

  // Récupération du fichier thumbnail
  const handleUpdatedThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setUpdatedThumbnail(target.files[0]);
    }
  };

  // Récupération du fichier photo
  const handleNewPhoto = (target: HTMLInputElement) => {
    if(target.files) {
      console.log(target.files[0]);
      setNewPhotoArray([target.files[0]])
    }
  }

  // Fermeture et remise à zéro des formulaires de modifications
  const closeEditor = (field: string) => {
    switch (field) {
      case "name":
        setEditName(false);
        break;
      case "thumbnail":
        setEditThumb(false);
        setUpdatedThumbnail(undefined);
        clearInput(thumbnailInputRef);
        break;
      case "description":
        setEditDescription(false);
        break;
      case "photos":
        setAddPhoto(false);
        setNewPhotoArray(undefined);
        clearInput(photosInputRef)
      default:
        console.log("Erreur");        
    }
    getSculptureInfos();
  };

  // Remise à zéro du formulaire de modification de la vignette
  const clearInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  return (
    <div className={styles.sculptureContainer}>
      {sculptureInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>Confirmer la suppression de "{sculptureInfos.name}" ?</div>
            <div className={styles.deleteConfirmationBtn}>
              <button onClick={() => deleteSculpture()}>Confirmer</button>
              <button onClick={() => setDeleteMode(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      <BackBtn typeOfArt="sculpture" />

      {sculptureInfos && (
        <div className={styles.sculpture}>
          {adminMode && (
            <div onClick={() => setDeleteMode(true)} className={styles.deleteElement}>
              <BsTrash className={styles.icon} />
              <div>Supprimer</div>
            </div>
          )}

          {/* // Nom de la sculpture // */}
          <div className={styles.name}>
            <h1>{sculptureInfos.name}</h1>
            {adminMode && (
              <div className={styles.iconContainer}>
                <FaEdit onClick={() => setEditName(!editName)} className={styles.icon} />
              </div>
            )}
          </div>
          {adminMode && (
            <div className={editName ? `${styles.editName} ${styles.editBlock} ${styles.showForm}` : `${styles.editName} ${styles.editBlock}`}>
              <input onChange={(e) => modifySculptureInfo("name", e.target.value)} type="text" id="name" value={sculptureInfos.name} />
              <div className={styles.editNameBtn}>
                <button onClick={() => updateSculpture("name")}>Modifier</button>
                <button onClick={() => closeEditor("name")}>Annuler</button>
              </div>
            </div>
          )}

          <div className={styles.sculptureDetails}>
            {/* // Vignette de la sculpture // */}
            <div className={styles.sculptureThumb}>
              <Image loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC + sculptureInfos.thumbnail}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + sculptureInfos.thumbnail}`} alt="sculpture" width={400} height={400} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
              {adminMode && (
                <div>
                  <div onClick={() => setEditThumb(!editThumb)} className={styles.iconContainer}>
                    <FaEdit className={styles.icon} />
                  </div>
                  <div className={editThumb ? `${styles.editThumb} ${styles.editBlock} ${styles.showForm}` : `${styles.editThumb} ${styles.editBlock}`}>
                    <input onChange={(e) => handleUpdatedThumbnail(e.target)} type="file" ref={thumbnailInputRef} />

                    <div>
                      <button onClick={() => updateSculpture("thumbnail")}>Modifier</button>
                      <button onClick={() => closeEditor("thumbnail")}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* // Description de la sculpture //  */}
            <div className={styles.sculptureDescription}>
              <p>{sculptureInfos.description}</p>
              {adminMode && (
                <div>
                  <div onClick={() => setEditDescription(!editDescription)} className={styles.iconContainer}>
                    <FaEdit className={styles.icon} />
                  </div>
                  <div className={editDescription ? `${styles.editDescription} ${styles.editBlock} ${styles.showForm}` : `${styles.editDescription} ${styles.editBlock}`}>
                    <textarea onChange={(e) => modifySculptureInfo("description", e.target.value)} rows={10} value={sculptureInfos.description} />

                    <div>
                      <button onClick={() => updateSculpture("description")}>Modifier</button>
                      <button onClick={() => closeEditor("description")}>Annuler</button>
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

          {/* // Slider // */}
          {sculptureInfos.photos && <Slider setZoomedImage={setZoomedImage} setZoomMode={setZoomMode} dataSlider={sculptureInfos.photos} />}
          {adminMode && (
            <div className={styles.addPhotoContainer}>
              <div onClick={() => setAddPhoto(true)} className={styles.iconContainer}>
                <MdAddCircleOutline className={styles.icon} />
                <div>Ajouter une photo</div>
              </div>
              <div className={addPhoto ? `${styles.addPhotoForm} ${styles.editBlock} ${styles.showForm}` : `${styles.addPhotoForm} ${styles.editBlock}`}>
                <input onChange={(e) => handleNewPhoto(e.target)} type="file" ref={photosInputRef} />
                <div>
                  <button onClick={() => updateSculpture("photos")}>Ajouter</button>
                  <button onClick={() => setAddPhoto(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {zoomMode && (
        <div className={styles.zoom}>
          <IoMdCloseCircle onClick={() => setZoomMode(false)} className={styles.icon} />
          <div className={styles.zoomImg}>
            <Image fill loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC + zoomedImage}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC + zoomedImage}`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
