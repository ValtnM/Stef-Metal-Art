import React from "react";
import Link from "next/link";
import styles from "./BackBtn.module.scss";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function BackBtn(props: { typeOfArt: String }) {
  return (
    <Link href={props.typeOfArt === "peinture" ? "/peintures" : "/sculptures"} className={styles.backBtn}>
      <FaArrowAltCircleLeft className={styles.icon} />
      {props.typeOfArt === "peinture"
        ? "Retourner aux peintures"
        : "Retourner aux sculptures"}
    </Link>
  );
}
