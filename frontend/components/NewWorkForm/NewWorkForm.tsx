import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./NewWorkForm.module.scss";

export default function NewPostForm() {
  const [type, setType] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<Array<File>>();
  const [instagram, setInstagram] = useState(false);

  const [notification, setNotification] = useState(String);
  const [success, setSuccess] = useState(Boolean);

  // Récupération de l'image ajoutée par l'utilisateur en tant que vignette
  const handleThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setThumbnail(target.files[0]);
    }
  };

  // Récupération des images ajoutées par l'utilisateur en tant que photos
  const handlePhotos = (target: HTMLInputElement) => {
    if (target.files) {
      let filesArray = [];
      for (let i = 0; i < target.files.length; i++) {
        filesArray.push(target.files[i]);
      }
      setPhotos(filesArray);

      console.log(filesArray);
    }
  };

  // Envoi des données du formulaire au backend
  const sendData = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const token = getTokenFromSessionStorage();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/works`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: createFormData(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setNotification(data.message);
          setSuccess(true);
          clearForm();
        } else if (data.erreur) {
          setNotification(data.erreur);
          setSuccess(false);
        }
      })
      .catch((err) => console.log(err));
  };

  // Création d'un formData
  const createFormData = () => {
    let formData = new FormData();
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    formData.append("name", name);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("instagram", instagram.toString());
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        formData.append(`photos`, photos[i]);
      }
    }
    return formData;
  };

  // Remise à zéro des différents champs du formulaire
  const clearForm = () => {
    setType("");
    clearFileInput(thumbnailInputRef);
    setName("");
    setDescription("");
    clearFileInput(photosInputRef);
    setInstagram(false);
    setPhotos(undefined);
    setThumbnail(undefined);
  };

  const thumbnailInputRef = useRef<any>(null);
  const photosInputRef = useRef<any>(null);

  // Remise à zéro des champs d'ajout de fichier
  const clearFileInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  // Récupération du token d'authentification dans le session storage
  const getTokenFromSessionStorage = () => {
    return window.sessionStorage.getItem("token");
  };

  return (
    <div className={styles.newWorkForm}>
      <h2>Ajouter une œuvre</h2>
      <form>
        <div className={styles.newWorkType}>
          <label htmlFor="type">{"Type d'œuvre"}</label>
          <div className={styles.newWorkTypeChoices}>
            <div className={type === "sculpture" ? `${styles.selectedType}` : ``} onClick={() => setType("sculpture")}>
              Sculpture
            </div>
            <div className={type === "painting" ? `${styles.selectedType}` : ``} onClick={() => setType("painting")}>
              Peinture
            </div>
          </div>
        </div>
        <div className={styles.newWorkThumbnail}>
          <label htmlFor="thumbnail">Vignette</label>
          <label className={styles.thumbnailLabel} htmlFor="thumbnail">
            Choisir un image
          </label>
          <input onInput={(e) => handleThumbnail(e.target as HTMLInputElement)} className={styles.thumbnailInput} id="thumbnail" type="file" ref={thumbnailInputRef} />
          {thumbnail && <div className={styles.imgPreview}><Image src={URL.createObjectURL(thumbnail)} alt="Aperçu image" fill /></div>}
        </div>
        <div className={styles.newWorkName}>
          <label htmlFor="name">Nom</label>
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Entrer un nom" value={name} />
        </div>
        <div className={styles.newWorkDescription}>
          <label htmlFor="name">Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} rows={20} placeholder="Entrer une description" value={description} />
        </div>
        <div className={styles.newWorkPhotos}>
          <label htmlFor="photos">Photo(s)</label>
          <label className={styles.photosLabel} htmlFor="photos">
            Choisir une ou plusieurs photo(s)
          </label>
          <input onInput={(e) => handlePhotos(e.target as HTMLInputElement)} className={styles.photosInput} id="photos" type="file" ref={photosInputRef} multiple />
          {photos && (
            <div>
              {photos.map((photo, index) => (
                <div key={index} className={styles.imgPreview}>
                  {photo && <Image src={URL.createObjectURL(photo)} alt="Aperçu image" fill />}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.newWorkInstagram}>
          <label htmlFor="type">Publier sur instagram ?</label>
          <div className={styles.newWorkTypeChoices}>
            <div className={instagram ? `${styles.selectedType}` : ``} onClick={() => setInstagram(true)}>
              Oui
            </div>
            <div className={!instagram ? `${styles.selectedType}` : ``} onClick={() => setInstagram(false)}>
              Non
            </div>
          </div>
        </div>
        <button onClick={(e) => sendData(e)}>Ajouter</button>
        <div
          style={
            success
              ? {
                  background: "linear-gradient(36deg, rgba(2,92,14,1) 0%, rgba(62,159,0,1) 63%)",
                }
              : {
                  background: "linear-gradient(35deg, rgba(89,0,0,1) 0%, rgba(235,13,13,1) 80%)",
                }
          }
          className={notification ? `${styles.notificationContainer} ${styles.visible}` : `${styles.notificationContainer}`}
        >
          <div className={styles.notificationTxt}>{notification}</div>
        </div>
      </form>
    </div>
  );
}
