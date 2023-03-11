import React from "react";
import Link from "next/link";
import styles from "./BackBtn.module.scss";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function BackBtn(props: { typeOfWork: String }) {
  return (
    <Link href={props.typeOfWork === "painting" ? "/peintures" : "/sculptures"} className={styles.backBtn}>
      <FaArrowAltCircleLeft className={styles.icon} />
      {props.typeOfWork === "painting"
        ? "Retourner aux peintures"
        : "Retourner aux sculptures"}
    </Link>
  );
}
