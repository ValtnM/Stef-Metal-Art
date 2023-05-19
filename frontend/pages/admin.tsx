import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Admin.module.scss";
import ConnectionForm from "../components/ConnectionForm/ConnectionForm";
import NewPostForm from "../components/NewWorkForm/NewWorkForm";
import { BsPencilFill } from "react-icons/bs";
import { FaLink } from "react-icons/fa";
import NewLinkForm from "../components/NewLinkForm/NewLinkForm";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

export default function Admin() {
  const [admin, setAdmin] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("work");
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    checkIsAdmin();
  }, []);

  // Vérification du status de l'utilisateur
  const checkIsAdmin = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${stockedToken}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("admin success: ", data);

          if (data.isAdmin) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
          setReadyToRender(true);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("checkAdmin error: ", err);
    } finally {
      setAdmin(false);
      setReadyToRender(true);
    }
  };

  // Suppression du token d'authentification du session storage
  const deleteTokenFromSessionStorage = () => {
    window.sessionStorage.removeItem("token");
    checkIsAdmin();
  };

  return (
    <>
      <Head>
        <title>Stef Metal Art - Admin</title>
      </Head>
      <div className={styles.adminContainer}>
        {readyToRender && (
          <div className={styles.admin}>
            <Breadcrumb page={["Admin", "admin"]} />
            {admin ? (
              <div>
                <div className={styles.adminMenu}>
                  <div onClick={() => setSelectedMenu("work")} className={selectedMenu === "work" ? `${styles.addingWork} ${styles.selectedMenu}` : `${styles.addingWork}`}>
                    <BsPencilFill className={styles.icon} />
                    <h3>Ajouter une œuvre</h3>
                  </div>
                  <div onClick={() => setSelectedMenu("link")} className={selectedMenu === "link" ? `${styles.addingLink} ${styles.selectedMenu}` : `${styles.addingLink}`}>
                    <FaLink className={styles.icon} />
                    <h3>Ajouter un lien</h3>
                  </div>
                </div>
                {selectedMenu === "work" ? <NewPostForm /> : <NewLinkForm />}
                <button className={styles.logoutBtn} onClick={() => deleteTokenFromSessionStorage()}>
                  Déconnexion
                </button>
              </div>
            ) : (
              <ConnectionForm setAdmin={setAdmin} />
            )}
          </div>
        )}
      </div>
    </>
  );
}
