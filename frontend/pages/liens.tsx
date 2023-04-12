import React, { useState, useEffect } from "react";
import styles from "../styles/Liens.module.scss";
import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import NewLinkForm from "../components/NewLinkForm/NewLinkForm";
import { BsTrash } from "react-icons/bs";

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

  const [adminMode, setAdminMode] = useState(false)
  const [token, setToken] = useState("")
  
  const [links, setLinks] = useState(props.linksArray)

  useEffect(() => {
    checkIsAdmin();
  }, [])

    const checkIsAdmin = () => {
    const newToken = getTokenFromSessionStorage();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${newToken}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAdmin) {
          setAdminMode(true);
        } else {
          setAdminMode(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const getTokenFromSessionStorage = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    if (stockedToken) {
      setToken(stockedToken);
    }
    return stockedToken;
  };

  const getAllLinks = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`, {
      method: "GET"
    })
    .then(res => res.json())
    .then(data => setLinks(data))
    .catch(err => console.log(err))
  }

  const deleteLink = (e: React.MouseEvent<SVGElement, MouseEvent>, linkId: Object) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/link/${linkId}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      getAllLinks();      
    })
    .catch(err => console.log(err))
  }


  return (
    <div className={styles.linksContainer}>
      <h2>Liens</h2>
      <div className={styles.links}>
        {links.map((element, index) => (
          <a href={element.link} className={styles.link} target="blank" style={{ animationDelay: `${index * 100}ms` }}>
            {
              adminMode &&
              <BsTrash onClick={(e) => deleteLink(e, element._id)} className={styles.icon} />
            }
            <h3>{element.name}</h3>
            <hr />
            <div className={styles.linkImg}>
              <Image fill src={`${process.env.NEXT_PUBLIC_IMAGES_SRC}/${element.thumbnail}`}  loader={() => `${process.env.NEXT_PUBLIC_IMAGES_SRC}/${element.thumbnail}`} alt="" />
            </div>
            <div className={styles.filter}></div>
          </a>
        ))}
      </div>
      {
        adminMode &&
        <NewLinkForm getAllLinks={getAllLinks} />
      }
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/link`);
  const linksArray = await data.json();

  console.log(linksArray);
  

  return {
    props: {
      linksArray,
    },
  };
};
