import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./NewLinkForm.module.scss";

export default function NewLinkForm() {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [link, setLink] = useState("");
  const [notificationMessage, setNotificationMessage] = useState<string>();
  const [success, setSuccess] = useState(false);

  const thumbnailInputRef = useRef<any>();

  // Récupération de l'image ajoutée par l'utilisateur en tant que vignette
  const handleThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setThumbnail(target.files[0]);
    }
  };


  // Envoi des données du formulaire au backend
  const sendData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`, {
      method: "POST",
      body: createFormData(),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setNotificationMessage(data.error);
          setSuccess(false);
        } else if (data.message) {
          clearForm();
          setNotificationMessage(data.message);
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  // Création d'un formData
  const createFormData = () => {
    let formData = new FormData();
    formData.append("name", name);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }
    formData.append("link", link);
    return formData;
  };

  // Remise à zéro des différents champs du formulaire
  const clearForm = () => {
    setName("");
    clearThumbnailInput(thumbnailInputRef);
    setLink("");
  };

  // Remise à zéro du champs "Vignette"
  const clearThumbnailInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
    setThumbnail(undefined)
  };

  return (
    <div className={styles.newLinkForm}>
      <h2>Ajouter un lien</h2>
      <form>
        <div className={styles.newLinkName}>
          <label htmlFor="name">Nom</label>
          <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Entrer un nom" value={name} />
        </div>
        <div className={styles.newLinkThumbnail}>
          <label htmlFor="thumbnail">Vignette</label>
          <label className={styles.thumbnailLabel} htmlFor="thumbnail">
            Choisir une image
          </label>
          <input onInput={(e) => handleThumbnail(e.target as HTMLInputElement)} className={styles.thumbnailInput} type="file" id="thumbnail" ref={thumbnailInputRef} />
          <div className={styles.thumbnailPreview}>{thumbnail && <Image src={URL.createObjectURL(thumbnail)} alt="Aperçu image" />}</div>
        </div>
        <div className={styles.newLinkURL}>
          <label htmlFor="link">Lien</label>
          <input onChange={(e) => setLink(e.target.value)} type="text" id="link" placeholder="Entrer un URL" value={link}/>
        </div>
        <button onClick={(e) => sendData(e)}>Ajouter</button>
        {notificationMessage && <div className={success ? `${styles.notificationMessage} ${styles.success}` : `${styles.notificationMessage}`}>{notificationMessage}</div>}
      </form>
    </div>
  );
}
