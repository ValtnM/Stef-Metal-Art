import React from "react";
import Image from "next/image";
import styles from "./PhotoViewer.module.scss";
import { IoMdCloseCircle } from "react-icons/io";

type PhotoViewerProps = {
  setZoomMode: React.Dispatch<React.SetStateAction<boolean>>;
  zoomedPhoto: string;
};

export default function PhotoViewer(props: PhotoViewerProps) {
  return (
    <div className={styles.photoViewer}>
      <IoMdCloseCircle onClick={() => props.setZoomMode(false)} className={styles.closeBtn} />
      <div className={styles.photoViewerImg}>
        <Image fill loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${props.zoomedPhoto}`} src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${props.zoomedPhoto}`} alt="" />
      </div>
    </div>
  );
}
