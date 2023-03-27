import React, { useEffect, useState } from "react";
import styles from "../styles/Admin.module.scss";
import ConnectionForm from "../components/ConnectionForm/ConnectionForm";
import NewPostForm from "../components/NewPostForm/NewWorkForm";

export default function Admin() {
  const [admin, setAdmin] = useState(false);
  const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    checkIsAdmin();
  }, []);

  const checkIsAdmin = () => {
    const stockedToken = window.sessionStorage.getItem("token");
    fetch(`http://localhost:8080/api/admin/${stockedToken}`, {
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
          {admin ? (
            <div>
              <h2>Ajouter une oeuvre</h2>
              <NewPostForm />
              <div className={styles.logoutBtn}>
                <button onClick={() => deleteTokenFromSessionStorage()}>Déconnexion</button>
              </div>
            </div>
          ) : (
            <ConnectionForm setAdmin={setAdmin} />
          )}
        </div>
      )}
    </>
  );
}
