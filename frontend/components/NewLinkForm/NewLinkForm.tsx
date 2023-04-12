import React, {useEffect, useState, useRef} from "react";
import styles from "./NewLinkForm.module.scss";


export default function NewLinkForm(props: {getAllLinks: Function}) {

  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState<File>()
  const [link, setLink] = useState("")

  const thumbnailInputRef = useRef()

  const sendData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`, {
      method: "POST",
      body: createFormData()
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      props.getAllLinks()
      clearForm();
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

  const handleThumbnail = (target: HTMLInputElement) => {
    if(target.files) {
      setThumbnail(target.files[0])
    }
  }

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
      </form>
    </div>
  );
}
