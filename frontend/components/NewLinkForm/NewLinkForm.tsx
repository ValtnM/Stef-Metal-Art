import React from "react";
import styles from "./NewLinkForm.module.scss";

export default function NewLinkForm() {
  return (
    <div className={styles.newLinkForm}>
      <h2>Ajouter un lien</h2>
      <form action="">
        <div className={`${styles.inputContainer} ${styles.name}`}>
          <label className={styles.nameLabel} htmlFor="name">
            Nom
          </label>
          <input className={styles.nameInput} type="text" id="name" placeholder=" " autoComplete="off" />
        </div>
        <div className={`${styles.inputContainer} ${styles.thumbnail}`}>
          <label htmlFor="thumbnail">Vignette</label>
          <input type="file" id="thumbnail" className={styles.linkThumbnail} />
        </div>
        <div className={`${styles.inputContainer} ${styles.link}`}>
          <label htmlFor="link">Lien</label>
          <input type="text" id="link" placeholder="Lien" />
        </div>
        <div className={styles.btnsContainer}>
          <button>Ajouter</button>
          <button>Annuler</button>
        </div>
      </form>
    </div>
  );
}
