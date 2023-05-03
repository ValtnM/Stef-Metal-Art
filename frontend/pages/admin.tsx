import React, { useEffect, useState } from "react";
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

    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '{your-app-id}',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : '{api-version}'
    //   });

    //   FB.AppEvents.logPageView();

    // };

    // (function(d, s, id){
    //    var js, fjs = d.getElementsByTagName(s)[0];
    //    if (d.getElementById(id)) {return;}
    //    js = d.createElement(s); js.id = id;
    //    js.src = "https://connect.facebook.net/en_US/sdk.js";
    //    fjs.parentNode.insertBefore(js, fjs);
    //  }(document, 'script', 'facebook-jssdk'));
  }, []);

  const checkIsAdmin = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${stockedToken}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
        setReadyToRender(true);
      })
      .catch((err) => console.log(err));
  };

  const deleteTokenFromSessionStorage = () => {
    window.sessionStorage.removeItem("token");
    checkIsAdmin();
  };

  return (
    <>
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
              {
                selectedMenu === "work" ?
                <NewPostForm />
                :
                <NewLinkForm />
              }
                <button className={styles.logoutBtn} onClick={() => deleteTokenFromSessionStorage()}>Déconnexion</button>
            </div>
          ) : (
            <ConnectionForm setAdmin={setAdmin} />
          )}
        </div>
      )}
    </>
  );
}
