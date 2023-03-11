import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Sculptures.module.scss";
import WorkDetails from "../../components/WorkDetails/WorkDetails";


export default function Sculpture() {
  return (
    <div className={styles.sculptureContainer}>
      <WorkDetails typeOfWork="sculpture" />
    </div>
  );
}
