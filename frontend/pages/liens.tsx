import React, { useEffect } from "react";
import styles from "../styles/Liens.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import NewLinkForm from "../components/NewLinkForm/NewLinkForm";

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
    <div className={styles.linksContainer}>
      <h2>Liens</h2>
      <div className={styles.links}>
        {props.linksArray.map((element, index) => (
          <a href={element.link} className={styles.link} target="blank" style={{ animationDelay: `${index * 100}ms` }}>
            <h3>{element.name}</h3>
            <hr />
            <div className={styles.linkImg}>
              <Image fill src={`/assets/liens/${element.image}`} alt="" />
            </div>
            <div className={styles.filter}></div>
          </a>
        ))}
      </div>
      <NewLinkForm />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`);
  const linksArray = await data.json();

  return {
    props: {
      linksArray,
    },
  };
};
