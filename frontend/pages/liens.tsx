import React from "react";
import styles from "../styles/Liens.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";

type Link = {
  id: number;
  name: string;
  image: string;
  link: string;
};

type LinksProps = {
  linksArray: Link[];
};

export default function Liens(props: LinksProps) {
  return (
    <div className={styles.liensContainer}>
      <h2>Liens</h2>
      <div className={styles.liens}>
        {props.linksArray.map((element, index) => (
          <a href={element.link} className={styles.lien} target="blank" style={{ animationDelay: `${index * 100}ms` }}>
            <h3>{element.name}</h3>
            <hr />
            <div className={styles.lienImg}>
              <Image fill src={`/assets/liens/${element.image}`} alt="" />
            </div>
            <div className={styles.filter}></div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/liensapi");
  const linksArray = await data.json();

  return {
    props: {
      linksArray,
    },
  };
};
