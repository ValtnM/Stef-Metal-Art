import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./WorkDetails.module.scss";
import Slider from "../Slider/Slider";
import WorkCard from "../WorkCard/WorkCard";
import PhotoViewer from "../PhotoViewer/PhotoViewer";

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

export default function WorkDetails({ typeOfWork, workDetails }: WorkDetailsProps) {
  const [workId, setWorkId] = useState<String>();
  const [workInfos, setWorkInfos] = useState<Work>(workDetails);
  const [token, setToken] = useState("");

  const [zoomMode, setZoomMode] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState("");

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
    checkIsAdmin();
  }, []);

  useEffect(() => {
    const getWorkId = (typeOfWork: string) => {
      if (typeOfWork === "painting") {
        return router.query.peinture as string;
      } else if (typeOfWork === "sculpture") {
        return router.query.sculpture as string;
      }
    };
    
    if (router.isReady) {
      if (typeOfWork) {
        setWorkId(getWorkId(typeOfWork));
      }
    }
  }, [router.isReady]);


  const getTokenFromSessionStorage = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    if (stockedToken) {
      setToken(stockedToken);
    }
    return stockedToken;
  };


  const getWorkInfos = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${typeOfWork}/${workId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkInfos(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteWork = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${typeOfWork}/${workId}`, {
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}`, {
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
    setZoomedPhoto(image);
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/${workId}/${photoName}`, {
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
      <WorkCard workInfos={workInfos} modifyWorkInfo={modifyWorkInfo} adminMode={adminMode} handleEditForms={handleEditForms} editThumbnail={editThumbnail} setEditThumbnail={setEditThumbnail} editName={editName} setEditName={setEditName} editDescription={editDescription} setEditDescription={setEditDescription} thumbnailInputRef={thumbnailInputRef} handleNewThumbnail={handleNewThumbnail} updateWork={updateWork} setDeleteMode={setDeleteMode} />

      {workInfos && deleteMode && (
        <div className={styles.deleteConfirmationContainer}>
          <div className={styles.deleteConfirmationBlock}>
            <div className={styles.deleteConfirmationTxt}>{`Confirmer la suppression de "${workInfos.name}" ?`}</div>
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
          {workInfos.photos && (
            <div className={styles.sliderBlock}>
              <Slider adminMode={adminMode} deletePhoto={deletePhoto} handleEditForms={handleEditForms} setZoomedPhoto={setZoomedPhoto} setZoomMode={setZoomMode} dataSlider={workInfos.photos} addPhoto={addPhoto} setAddPhoto={setAddPhoto} handleNewPhoto={handleNewPhoto} updateWork={updateWork} photosInputRef={photosInputRef} />
            </div>
          )}
        </div>
      )}

      {zoomMode && <PhotoViewer setZoomMode={setZoomMode} zoomedPhoto={zoomedPhoto} />}
    </div>
  );
}
