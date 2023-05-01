import React, {useEffect, useState, useRef} from "react";
import styles from "./NewLinkForm.module.scss";


export default function NewLinkForm() {

  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState<File>()
  const [link, setLink] = useState("")
  const [notificationMessage, setNotificationMessage] = useState<string>()
  const [success, setSuccess] = useState(false);

  const thumbnailInputRef = useRef<any>()

  const [thumbnailPreview, setThumbnailPreview] = useState<File>();

  const handleThumbnail = (target: HTMLInputElement) => {
    if (target.files) {
      setThumbnailPreview(target.files[0]);
      setThumbnail(target.files[0]);
    }
  };

  const sendData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`, {
      method: "POST",
      body: createFormData()
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.error) {
        setNotificationMessage(data.error)
        setSuccess(false)
      } else if (data.message) {
        // props.getAllLinks()
        clearForm();
        setNotificationMessage(data.message)
        setSuccess(true)
      }
    })
    .catch(err => console.log(err))
  }

  const createFormData = () => {
    let formData = new FormData();
    formData.append("name", name);
    if(thumbnail) {
      formData.append("thumbnail", thumbnail)
    }
    formData.append("link", link)
    return formData;
  }

  // const handleThumbnail = (target: HTMLInputElement) => {
  //   if(target.files) {
  //     setThumbnail(target.files[0])
  //   }
  // }

  const clearForm = () => {
    setName("");
    clearThumbnailInput(thumbnailInputRef)
    setLink("");
  }

  const clearThumbnailInput = (input: any) => {
    if (input.current) {
      input.current.value = null;
    }
  };

  return (
    <div className={styles.newLinkForm}>

      <h2>Ajouter un lien</h2>
      <form>
        <div className={styles.newLinkName}>
          <label htmlFor="name">Nom</label>
          <input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder="Entrer un nom"/>
        </div>
        <div className={styles.newLinkThumbnail}>
          <label htmlFor="thumbnail">Vignette</label>
          <label className={styles.thumbnailLabel} htmlFor="thumbnail">Choisir une image</label>
          <input onInput={(e) => handleThumbnail(e.target as HTMLInputElement)} className={styles.thumbnailInput} type="file" id="thumbnail" ref={thumbnailInputRef} />
          <div className={styles.thumbnailPreview}>{thumbnailPreview && <img src={URL.createObjectURL(thumbnailPreview)} alt="Aperçu image" />}</div>
        </div>
        <div className={styles.newLinkURL}>
          <label htmlFor="link">Lien</label>
          <input onChange={(e) => setLink(e.target.value)} type="text" id="link" placeholder="Entrer un URL"/>
        </div>
        <button onClick={(e) => sendData(e)}>Ajouter</button>
        {
          notificationMessage &&
          <div className={success ? `${styles.notificationMessage} ${styles.success}` : `${styles.notificationMessage}`}>
            {notificationMessage}
          </div>
        }
      </form>


      {/* <h2>Ajouter un lien</h2>
      <form action="">
        <div className={`${styles.inputContainer} ${styles.name}`}>
          <label className={styles.nameLabel} htmlFor="name">
            Nom
          </label>
          <input onChange={(e) => setName(e.target.value)} className={styles.nameInput} type="text" id="name" placeholder="Nom" autoComplete="off" value={name} />
        </div>
        <div className={`${styles.inputContainer} ${styles.thumbnail}`}>
          <label htmlFor="thumbnail">Vignette</label>
          <input onInput={(e) => handleThumbnail(e.target as HTMLInputElement)} type="file" id="thumbnail" className={styles.linkThumbnail} ref={thumbnailInputRef} />
        </div>
        <div className={`${styles.inputContainer} ${styles.link}`}>
          <label htmlFor="link">Lien</label>
          <input onChange={(e) => setLink(e.target.value)} type="text" id="link" placeholder="Lien" value={link} />
        </div>
        <div className={styles.btnsContainer}>
          <button onClick={(e) => sendData(e)}>Ajouter</button>
          <button>Annuler</button>
        </div>
        {
          notificationMessage &&
          <div className={success ? `${styles.notificationMessage} ${styles.success}` : `${styles.notificationMessage}`}>
            {notificationMessage}
          </div>
        }
      </form> */}
    </div>
  );
}
