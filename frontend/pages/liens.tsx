import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Liens.module.scss";
import { GetServerSideProps } from "next";
import LinkCard from "../components/LinkCard/LinkCard";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

type Link = {
  _id: Object;
  name: string;
  thumbnail: string;
  link: string;
};

type LinksProps = {
  linksArray: Link[];
};

export default function Liens(props: LinksProps) {
  const [adminMode, setAdminMode] = useState(false);
  const [token, setToken] = useState("");

  const [links, setLinks] = useState(props.linksArray);

  useEffect(() => {
    // Vérification du status de l'utilisateur
    const checkIsAdmin = () => {
      const newToken = getTokenFromSessionStorage();
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${newToken}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isAdmin) {
            setAdminMode(true);
          } else {
            setAdminMode(false);
          }
        })
        .catch((err) => console.log(err));
    };
    checkIsAdmin();
  }, []);

  // Récupération du token d'authentification dans le session storage
  const getTokenFromSessionStorage = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    if (stockedToken) {
      setToken(stockedToken);
    }
    return stockedToken;
  };

  // Récupération des liens dans la base de données
  const getAllLinks = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch((err) => console.log(err));
  };

  // Suppression d'un lien
  const deleteLink = (e: React.MouseEvent<SVGElement, MouseEvent>, linkId: Object) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link/${linkId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getAllLinks();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head>
        <title>Stef Metal Art - Liens</title>
      </Head>
      <div className={styles.linksContainer}>
        <Breadcrumb page={["Liens", "liens"]} />
        <h2>Liens</h2>
        {links.length > 0 ? (
          <div className={styles.links}>
            {links.map((element, index) => (
              <LinkCard key={index} linkInfos={element} adminMode={adminMode} deleteLink={deleteLink} index={index} />
            ))}
          </div>
        ) : (
          <div className={styles.noLinkMessage}>Aucun lien disponible</div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let linksArray: Link[] = [];
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`);
    linksArray = await data.json();
  } catch (err) {
    console.log("getStaticProps Links = error: ", err);
  } finally {
    return {
      props: {
        linksArray,
      },
    };
  }
};
