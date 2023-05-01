import React, { useState, useRef } from "react";
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

  const [thumbnailPreview, setThumbnailPreview] = useState<File>();

  const handleThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setThumbnailPreview(target.files[0]);
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

  const sendData = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    const token = getTokenFromSessionStorage();

    fetch(`http://localhost:8080/api/works`, {
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

  const getTokenFromSessionStorage = () => {
    return window.sessionStorage.getItem("token");
  };

  return (
    <div className={styles.newWorkForm}>
      <h2>Ajouter une œuvre</h2>
      <form>
        <div className={styles.newWorkType}>
          <label htmlFor="type">Type d'œuvre</label>
          <div className={styles.newWorkTypeChoices}>
            <div className={type === "sculpture" ? `${styles.selectedType}` : ``} onClick={() => setType("sculpture")}>
              Sculpture
            </div>
            <div className={type === "peinture" ? `${styles.selectedType}` : ``} onClick={() => setType("peinture")}>
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
          <div className={styles.tumbnailImgPreview}>{thumbnailPreview && <img src={URL.createObjectURL(thumbnailPreview)} alt="Aperçu image" />}</div>
        </div>
        <div className={styles.newWorkName}>
          <label htmlFor="name">Nom</label>
          <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Entrer un nom" />
        </div>
        <div className={styles.newWorkDescription}>
          <label htmlFor="name">Description</label>
          <textarea onChange={(e) => setDescription(e.target.value)} rows={20} placeholder="Entrer une description" />
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
                <div className={styles.tumbnailImgPreview}>{photo && <img src={URL.createObjectURL(photo)} alt="Aperçu image" />}</div>
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

    // <form className={styles.newPostForm}>
    //   {/* <h2>Ajouter une oeuvre</h2> */}
    //   <div>
    //     <h3>Type</h3>
    //     <div className={styles.type}>
    //       <div className={styles.sculptureType}>
    //         <label htmlFor="sculpture">Sculpture</label>
    //         <input onChange={() => setType("sculpture")} name="type" value="sculpture" type="radio" id="sculpture" checked={type === "sculpture" ? true : false} />
    //       </div>
    //       <div className={styles.paintType}>
    //         <label htmlFor="paint">Peinture</label>
    //         <input onChange={() => setType("painting")} name="type" value="painting" type="radio" id="paint" checked={type === "painting" ? true : false} />
    //       </div>
    //     </div>
    //   </div>
    //   <label htmlFor="thumbnail">Vignette</label>
    //   <input onInput={(e) => handleThumbnail(e.target as HTMLInputElement)} type="file" id="thumbnail" name="thumbnail" ref={thumbnailInputRef} />
    //   <label htmlFor="name">Nom</label>
    //   <input onChange={(e) => setName(e.target.value)} type="text" id="name" value={name} />
    //   <label htmlFor="description">Description</label>
    //   <textarea onChange={(e) => setDescription(e.target.value)} rows={10} id="description" value={description} />
    //   <div className={styles.photoContainer}>
    //     <label htmlFor="photos">Photo(s)</label>
    //     <input onInput={(e) => handlePhotos(e.target as HTMLInputElement)} type="file" id="photos" name="photos" multiple ref={photosInputRef} />
    //   </div>

    //   <div className={styles.instagramRadio}>
    //     <legend>Publier sur instagram ?</legend>
    //     <input onChange={() => setInstagram(true)} name="instagram" id="yes" type="radio" checked={instagram ? true : false} />
    //     <label htmlFor="yes">Oui</label>
    //     <input onChange={() => setInstagram(false)} name="instagram" id="no" type="radio" checked={!instagram ? true : false} />
    //     <label htmlFor="no">Non</label>
    //   </div>
    //   <button onClick={(e) => sendData(e)}>Ajouter</button>
    //   <div
    //     style={
    //       success
    //         ? {
    //             background: "linear-gradient(36deg, rgba(2,92,14,1) 0%, rgba(62,159,0,1) 63%)",
    //           }
    //         : {
    //             background: "linear-gradient(35deg, rgba(89,0,0,1) 0%, rgba(235,13,13,1) 80%)",
    //           }
    //     }
    //     className={notification ? `${styles.notificationContainer} ${styles.visible}` : `${styles.notificationContainer}`}
    //   >
    //     <div className={styles.notificationTxt}>{notification}</div>
    //   </div>
    // </form>
  );
}
