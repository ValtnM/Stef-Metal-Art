import React, { useState, useRef, useEffect } from "react";
import styles from "./WorkCard.module.scss";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

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

type WorkCardProps = {
  workInfos: Work;
  modifyWorkInfo: Function;
  adminMode: boolean;
  handleEditForms: Function;
  editThumbnail: boolean;
  editName: boolean;
  editDescription: boolean;
  setEditThumbnail: Function;
  setEditName: Function;
  setEditDescription: Function;
  thumbnailInputRef: any;
  handleNewThumbnail: Function;
  updateWork: Function;
};

export default function WorkCard(props: WorkCardProps) {
  const [imgPreview, setImagePreview] = useState<File>();

  const handleThumbnailInput = (target: HTMLInputElement) => {
    setImagePreview(target.files![0]);
    props.handleNewThumbnail(target);
  };

  return (
    <div className={styles.workCard}>
      <div className={styles.thumbnail}>
        <Image className={styles.thumbnailImg} loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${props.workInfos.thumbnail}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${props.workInfos.thumbnail}`} alt={`${props.workInfos.name}`} width={400} height={400} placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=" />
          {props.adminMode && (
            <div className={styles.thumbnailEditing}>
              <div onClick={() => props.handleEditForms("thumbnail")} className={styles.thumbnailEditingBtn}>
                <FaEdit className={styles.icon} />
                <div>Modifier la vignette</div>
              </div>
              {props.editThumbnail && (
                <div className={props.editThumbnail ? `${styles.editFormContainer} ${styles.visibleForm}` : ` ${styles.editFormContainer}`}>
                  <div className={styles.editForm}>
                    <h3>Changer de vignette</h3>
                    <label className={styles.thumbnailLabel} htmlFor="file">
                      Choisir une image
                    </label>
                    <input className={styles.thumbnailInput} id="file" onChange={(e) => handleThumbnailInput(e.target)} type="file" ref={props.thumbnailInputRef} />
                    <div className={styles.tumbnailImgPreview}>{imgPreview && <img src={URL.createObjectURL(imgPreview)} alt="Aperçu image" />}</div>
                    <div className={styles.editingFormBtns}>
                      <button onClick={() => props.updateWork("thumbnail")}>Modifier</button>
                      <button onClick={() => props.setEditThumbnail(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
      <div className={styles.infos}>
        <div className={styles.nameContainer}>
          <h2>{props.workInfos.name}</h2>
          {props.adminMode && (
            <div className={styles.nameEditing}>
              <FaEdit onClick={() => props.handleEditForms("name")} className={styles.icon} />
              {props.editName && (
                <div className={props.editName ? `${styles.editFormContainer} ${styles.visibleForm}` : ` ${styles.editFormContainer}`}>
                  <div className={styles.editForm}>
                    <h3>Modifier le nom</h3>
                    <input onChange={(e) => props.modifyWorkInfo("name", e.target.value)} className={styles.textInput} type="text" placeholder="Nouveau nom" value={props.workInfos.name} />
                    <div className={styles.editingFormBtns}>
                      <button onClick={() => props.updateWork("name")}>Modifier</button>
                      <button onClick={() => props.setEditName(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit nihil, numquam ipsum hic aperiam, corporis aliquam, dignissimos exercitationem enim vitae accusamus ratione eligendi quos nostrum expedita accusantium distinctio officiis. Animi ducimus fugiat ratione necessitatibus aliquam fuga nisi nesciunt error velit vitae, magnam repellat itaque eius est numquam earum accusantium eos.</p>
          {props.adminMode && (
            <div className={styles.descriptionEditing}>
              <FaEdit onClick={() => props.handleEditForms("description")} className={styles.icon} />
              {props.editDescription && (
                <div className={props.editName ? `${styles.editFormContainer} ${styles.visibleForm}` : ` ${styles.editFormContainer}`}>
                  <div className={styles.editForm}>
                    <h3>Modifier la description</h3>
                    <textarea onChange={(e) => props.modifyWorkInfo("description", e.target.value)} className={styles.textAreaInput} rows={10} cols={50} placeholder="Nouvelle description" value={props.workInfos.description} />
                    <div className={styles.editingFormBtns}>
                      <button onClick={() => props.updateWork("description")}>Modifier</button>
                      <button onClick={() => props.setEditDescription(false)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
