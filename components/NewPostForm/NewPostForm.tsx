import React, { useState } from "react";
import styles from "./NewPostForm.module.scss";

export default function NewPostForm() {
  const [type, setType] = useState("sculpture");

  return (
    <form className={styles.newPostForm} action="">
      <h2>Ajouter une oeuvre</h2>
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
      <label htmlFor="thumb">Vignette</label>
      <input type="file" id="thumb" />
      <label htmlFor="name">Nom</label>
      <input type="text" id="name" />
      <label htmlFor="description">Description</label>
      <textarea rows={10} id="description" />
      {type === "sculpture" ? (
        <div className={styles.photoContainer}>
          <label htmlFor="photos">Photo(s)</label>
          <input type="file" id="photos" multiple />
        </div>
      ) : (
        <div className={styles.photoContainer}>
          <label htmlFor="photos">Photo</label>
          <input type="file" id="photos" />
        </div>
      )}
      <button>Ajouter</button>
    </form>
  );
}
