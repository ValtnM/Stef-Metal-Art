import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./WorkDetails.module.scss";
import BackBtn from "../../components/BackBtn/BackBtn";
import { FaEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { type } from "os";
import Slider from "../Slider/Slider";
import WorkCard from "../WorkCard/WorkCard";

type Work = {
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

type WorkDetailsProps = {
  typeOfWork: string;
  workDetails: Work;
};

export default function WorkDetails({typeOfWork, workDetails}: WorkDetailsProps) {
  const [workId, setWorkId] = useState<String>();
  const [workInfos, setWorkInfos] = useState<Work>(workDetails);
  const [token, setToken] = useState("");

  const [zoomMode, setZoomMode] = useState(false);
  const [zoomedImage, setZoomedImage] = useState("");

  const [adminMode, setAdminMode] = useState(false);
  const [editThumbnail, setEditThumbnail] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [newPhotoArray, setNewPhotoArray] = useState<Array<File>>();
  const [newThumbnail, setNewThumbnail] = useState<File>();

  const [deleteMode, setDeleteMode] = useState(false);

  const photosInputRef = useRef<any>(null);
  const thumbnailInputRef = useRef<any>(null);

  const router = useRouter();

  useEffect(() => {
    checkIsAdmin();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      if (typeOfWork) {
        setWorkId(getWorkId(typeOfWork));
      }
    }
  }, [router.isReady]);
 

  const checkIsAdmin = () => {
    const newToken = getTokenFromSessionStorage();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${newToken}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAdmin) {
          setAdminMode(true);
        } else {
          setAdminMode(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const getTokenFromSessionStorage = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    if (stockedToken) {
      setToken(stockedToken);
    }
    return stockedToken;
  };

  const getWorkId = (typeOfWork: string) => {
    if (typeOfWork === "painting") {
      return router.query.peinture as string;
    } else if (typeOfWork === "sculpture") {
      return router.query.sculpture as string;
    }
  };

  const getWorkInfos = () => {
    fetch(`http://localhost:8080/api/works/${typeOfWork}/${workId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkInfos(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteWork = () => {
    fetch(`http://localhost:8080/api/works/${typeOfWork}/${workId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        if (workInfos) {
          window.localStorage.setItem("delete-notification", `"${workInfos.name}" a bien été supprimé`);
        }
        redirectToParentComponent(typeOfWork);
      })
      .catch((err) => console.log(err));
  };

  const redirectToParentComponent = (typeOfWork: string) => {
    if (typeOfWork === "sculpture") {
      router.push("/sculptures");
    } else if (typeOfWork === "painting") {
      router.push("/peintures");
    }
  };

  // Modification d'une information sur la sculpture'
  const modifyWorkInfo = (info: string, value: any) => {
    if (workInfos) {
      setWorkInfos({
        ...workInfos,
        [info]: value,
      });
    }
  };

  // Envoi de la requête pour modifier la vignette
  const updateWork = async (typeOfData: string) => {
    if (workId) {
      fetch(`http://localhost:8080/api/works/${workId}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: createFormData(typeOfData),
      })
        .then(() => {
          closeEditor(typeOfData);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Pas de WorkId");
    }
  };

  // Création d'un formData avec les nouvelles données
  const createFormData = (type: string) => {
    let formData = new FormData();
    if (newThumbnail) {
      formData.append("thumbnail", newThumbnail);
    }
    if (workInfos) {
      formData.append("name", workInfos.name);
      formData.append("description", workInfos.description);
    }
    if (newPhotoArray) {
      for (let i = 0; i < newPhotoArray.length; i++) {
        formData.append("photos", newPhotoArray[i]);
      }
    }
    formData.append("typeOfData", type);
    formData.append("typeOfWork", typeOfWork);
    return formData;
  };

  // Récupération du fichier thumbnail
  const handleNewThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setNewThumbnail(target.files[0]);
    }
  };

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
      case "thumbnail":
        setEditThumbnail(false);
        setNewThumbnail(undefined);
        clearInput(thumbnailInputRef);
        break;
      case "name":
        setEditName(false);
        break;
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
    getWorkInfos();
  };

  // Remise à zéro du formulaire de modification de la vignette
  const clearInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  const zoomPhoto = (image: string) => {
    setZoomMode(true);
    setZoomedImage(image);
  };

  const handleEditForms = (formName: string) => {
    if (formName === "thumbnail") {
      if (editThumbnail) {
        setEditThumbnail(false);
      } else {
        setEditThumbnail(true);
        setEditName(false);
        setEditDescription(false);
        setEditPhoto(false);
        setAddPhoto(false);
      }
    }
    if (formName === "name") {
      if (editName) {
        setEditName(false);
      } else {
        setEditThumbnail(false);
        setEditName(true);
        setEditDescription(false);
        setEditPhoto(false);
        setAddPhoto(false);
      }
    } else if (formName === "description") {
      if (editDescription) {
        setEditDescription(false);
      } else {
        setEditThumbnail(false);
        setEditDescription(true);
        setEditName(false);
        setEditPhoto(false);
        setAddPhoto(false);
      }
    } else if (formName === "photo") {
      if (editPhoto) {
        setEditPhoto(false);
      } else {
        setEditThumbnail(false);
        setEditPhoto(true);
        setEditName(false);
        setEditDescription(false);
        setAddPhoto(false);
      }
    } else if (formName === "photos") {
      if (addPhoto) {
        setAddPhoto(false);
      } else {
        setEditThumbnail(false);
        setAddPhoto(true);
        setEditName(false);
        setEditDescription(false);
        setEditPhoto(false);
      }
    }
  };

  const deletePhoto = (photoName: string) => {
    if (photoName && workId) {
      fetch(`http://localhost:8080/api/works/${workId}/${photoName}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ typeOfWork: typeOfWork }),
      })
        .then((res) => {
          getWorkInfos();
        })
        .catch((err) => console.log(err));
      
    }
  };

  return (
    <div className={styles.workContainer}>
      <WorkCard workInfos={workInfos} modifyWorkInfo={modifyWorkInfo} adminMode={adminMode} handleEditForms={handleEditForms} editThumbnail={editThumbnail} setEditThumbnail={setEditThumbnail} editName={editName} setEditName={setEditName} editDescription={editDescription} setEditDescription={setEditDescription} thumbnailInputRef={thumbnailInputRef} handleNewThumbnail={handleNewThumbnail} updateWork={updateWork}/>


      {workInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>Confirmer la suppression de "{workInfos.name}" ?</div>
            <div className={styles.deleteConfirmationBtn}>
              <button onClick={() => deleteWork()}>Confirmer</button>
              <button onClick={() => setDeleteMode(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
      {/* {typeOfWork && <BackBtn typeOfWork={typeOfWork} />} */}
      {workInfos && (
        <div className={styles.work}>
          {/* {adminMode && (
            <div onClick={() => setDeleteMode(true)} className={styles.deleteElement}>
              <BsTrash className={styles.icon} />
              <div>Supprimer</div>
            </div>
          )} */}

          {/* {adminMode && (
            <div className={styles.thumbnail}>
              <div className={styles.thumbnailEditionBtn}>
                <FaEdit className={styles.icon} />
                <div onClick={() => handleEditForms("thumbnail")}>Modifier la vignette</div>
              </div>
              <div className={editThumbnail ? `${styles.editThumbnail} ${styles.editContainer} ${styles.visibleForm}` : `${styles.editThumbnail} ${styles.editContainer}`}>
                <div className={styles.editBlock}>
                  <h2>Changer de vignette</h2>
                  <input onChange={(e) => handleNewThumbnail(e.target)} type="file" ref={thumbnailInputRef} />
                  <div>
                    <button onClick={() => updateWork("thumbnail")}>Modifier</button>
                    <button onClick={() => setEditThumbnail(false)}>Annuler</button>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* // Nom de la peinture // */}
          {/* <div className={styles.name}>
            <h1>{workInfos.name}</h1>
            {adminMode && (
              <div className={styles.iconContainer}>
                <FaEdit onClick={() => handleEditForms("name")} className={styles.icon} />
              </div>
            )}
          </div> */}
          {/* {adminMode && (
            <div className={editName ? `${styles.editName} ${styles.editContainer} ${styles.visibleForm}` : `${styles.editName} ${styles.editContainer}`}>
              <div className={styles.editBlock}>
                <input onChange={(e) => modifyWorkInfo("name", e.target.value)} type="text" id="name" value={workInfos.name} />
                <div className={styles.editNameBtn}>
                  <button onClick={() => updateWork("name")}>Modifier</button>
                  <button onClick={() => setEditName(false)}>Annuler</button>
                </div>
              </div>
            </div>
          )} */}

          {/* // Photo de la peinture // */}
          {workInfos.photos && workInfos.photos.length === 1 && (
            <div className={styles.workPhoto}>
              <Image onClick={() => zoomPhoto(workInfos.photos[0])} loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${workInfos.photos[0]}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${workInfos.photos[0]}`} alt="peinture" width={1000} height={400} style={{ objectFit: "contain" }} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
              {adminMode && (
                <div>
                  <div onClick={() => handleEditForms("photo")} className={styles.iconContainer}>
                    <FaEdit className={styles.icon} />
                  </div>

                  <div className={editPhoto ? `${styles.editPhoto} ${styles.editContainer} ${styles.visibleForm}` : `${styles.editPhoto} ${styles.editContainer}`}>
                    <div className={styles.editBlock}>
                      {typeOfWork === "sculpture" ? <h2>Ajouter une photo</h2> : <h2>Changer de photo</h2>}
                      <input onChange={(e) => handleNewPhoto(e.target)} type="file" ref={photosInputRef} />
                      <div>
                        <button onClick={() => updateWork("photos")}>Modifier</button>
                        <button onClick={() => setEditPhoto(false)}>Annuler</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* {workInfos.photos && workInfos.photos.length > 1 && (
            <div className={styles.sliderBlock}>
              <Slider adminMode={adminMode} deletePhoto={deletePhoto} handleEditForms={handleEditForms} setZoomedImage={setZoomedImage} setZoomMode={setZoomMode} dataSlider={workInfos.photos} />
              {adminMode && (
                <div className={addPhoto ? `${styles.editPhoto} ${styles.editContainer} ${styles.visibleForm}` : `${styles.editPhoto} ${styles.editContainer}`}>
                  <div className={styles.editBlock}>
                    {typeOfWork === "sculpture" ? <h2>Ajouter une photo</h2> : <h2>Changer de photo</h2>}
                    <input onChange={(e) => handleNewPhoto(e.target)} type="file" ref={photosInputRef} />
                    <div>
                      <button onClick={() => updateWork("photos")}>Ajouter</button>
                      <button onClick={() => setAddPhoto(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )} */}

          {/* // Description de la peinture // */}
          {/* <div className={styles.workDescription}>
            <p>{workInfos.description}</p>
            {adminMode && (
              <div>
                <div onClick={() => handleEditForms("description")} className={styles.iconContainer}>
                  <FaEdit className={styles.icon} />
                </div>

                <div className={editDescription ? `${styles.editDescription} ${styles.editContainer} ${styles.visibleForm}` : `${styles.editDescription} ${styles.editContainer}`}>
                  <div className={styles.editBlock}>
                    <textarea onChange={(e) => modifyWorkInfo("description", e.target.value)} rows={10} value={workInfos.description} />
                    <div>
                      <button onClick={() => updateWork("description")}>Modifier</button>
                      <button onClick={() => setEditDescription(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              </div>
              // <div>
              //   <div onClick={() => setEditDescription(!editDescription)} className={styles.iconContainer}>
              //     <FaEdit className={styles.icon} />
              //   </div>
              //   <div className={editDescription ? `${styles.editDescription} ${styles.editBlock} ${styles.showForm}` : `${styles.editDescription} ${styles.editBlock}`}>
              //     <textarea onChange={(e) => modifyWorkInfo("description", e.target.value)} rows={10} value={workInfos.description} />

              //     <div>
              //       <button onClick={() => updateWork("description")}>Modifier</button>
              //       <button onClick={() => setEditDescription(false)}>Annuler</button>
              //     </div>
              //   </div>
              // </div>
            )}
          </div> */}
        </div>
      )}

      {zoomMode && (
        <div className={styles.zoom}>
          <IoMdCloseCircle onClick={() => setZoomMode(false)} className={styles.icon} />
          <div className={styles.zoomImg}>
            <Image fill loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${zoomedImage}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${zoomedImage}`} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
