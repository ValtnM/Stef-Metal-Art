import React, { useState, useRef } from "react";
import styles from "./NewPostForm.module.scss";

export default function NewPostForm() {
  const [type, setType] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<Array<File>>();
  const [instagram, setInstagram] = useState(false);

  const [notification, setNotification] = useState(String);
  const [success, setSuccess] = useState(Boolean);

  const handleThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setThumbnail(target.files[0]);
    }
  };

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

  const sendData = (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
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

    //   for (let pair of formData.entries()) {
    //     console.log(pair[0]+ ' - ' + pair[1]);
    // }

    fetch(`http://localhost:8080/api/oeuvres`, {
      method: "POST",
      body: formData,
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

  const clearForm = () => {
    setType("");
    clearThumbnailInput(thumbnailInputRef);
    setName("");
    setDescription("");
    clearThumbnailInput(photosInputRef);
    setInstagram(false);
  };

  const thumbnailInputRef = useRef<any>(null);
  const photosInputRef = useRef<any>(null);

  const clearThumbnailInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  return (
    <form className={styles.newPostForm}>
      {/* <h2>Ajouter une oeuvre</h2> */}
      <div>
        <h3>Type</h3>
        <div className={styles.type}>
          <div className={styles.sculptureType}>
            <label htmlFor="sculpture">Sculpture</label>
            <input
              onChange={() => setType("sculpture")}
              name="type"
              value="sculpture"
              type="radio"
              id="sculpture"
              checked={type === "sculpture" ? true : false}
            />
          </div>
          <div className={styles.paintType}>
            <label htmlFor="paint">Peinture</label>
            <input
              onChange={() => setType("peinture")}
              name="type"
              value="peinture"
              type="radio"
              id="paint"
              checked={type === "peinture" ? true : false}
            />
          </div>
        </div>
      </div>
      <label htmlFor="thumbnail">Vignette</label>
      <input
        onInput={(e) => handleThumbnail(e.target as HTMLInputElement)}
        type="file"
        id="thumbnail"
        name="thumbnail"
        ref={thumbnailInputRef}
      />
      <label htmlFor="name">Nom</label>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        id="name"
        value={name}
      />
      <label htmlFor="description">Description</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        rows={10}
        id="description"
        value={description}
      />
      <div className={styles.photoContainer}>
        <label htmlFor="photos">Photo(s)</label>
        <input
          onInput={(e) => handlePhotos(e.target as HTMLInputElement)}
          type="file"
          id="photos"
          name="photos"
          multiple
          ref={photosInputRef}
        />
      </div>

      <div className={styles.instagramRadio}>
        <legend>Publier sur instagram ?</legend>
        <input
          onChange={() => setInstagram(true)}
          name="instagram"
          id="yes"
          type="radio"
          checked={instagram ? true : false}
        />
        <label htmlFor="yes">Oui</label>
        <input
          onChange={() => setInstagram(false)}
          name="instagram"
          id="no"
          type="radio"
          checked={!instagram ? true : false}
        />
        <label htmlFor="no">Non</label>
      </div>
      <button onClick={(e) => sendData(e)}>Ajouter</button>
      <div
        style={
          success
            ? {
                background:
                  "linear-gradient(36deg, rgba(2,92,14,1) 0%, rgba(62,159,0,1) 63%)",
              }
            : {
                background:
                  "linear-gradient(35deg, rgba(89,0,0,1) 0%, rgba(235,13,13,1) 80%)",
              }
        }
        className={
          notification
            ? `${styles.notificationContainer} ${styles.visible}`
            : `${styles.notificationContainer}`
        }
      >
        <div className={styles.notificationTxt}>{notification}</div>
      </div>
    </form>
  );
}
