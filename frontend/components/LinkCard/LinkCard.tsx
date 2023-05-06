import React from "react";
import Image from "next/image";
import styles from "./LinkCard.module.scss";
import { BsTrash } from "react-icons/bs";

type Link = {
  _id: Object;
  name: string;
  thumbnail: string;
  link: string;
};

type LinkCardProps = {
  linkInfos: Link;
  adminMode: boolean;
  deleteLink: Function;
  index: number;
};

type ImageLoaderProps = {
  src: string
  width: number
  quality?: number
  root?: string
}

const imageLoader = (props: ImageLoaderProps) => {
  return `${props.src}?w=${props.width}`
}

export default function LinkCard(props: LinkCardProps) {
  return (
    <a className={styles.linkCard} href={props.linkInfos.link} style={{animationDelay: `${props.index * 100}ms`}}>
      <div className={styles.linkImgContainer}>
        <Image fill src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${props.linkInfos.thumbnail}`} loader={imageLoader} alt="" />
      </div>
      <h3>{props.linkInfos.name}</h3>
      {props.adminMode && <BsTrash className={styles.deleteBtn} onClick={(e) => props.deleteLink(e, props.linkInfos._id)} />}
    </a>
  );
}
