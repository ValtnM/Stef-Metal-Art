import React, { FormEvent, useState } from "react";
import styles from "./ConnectionForm.module.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function ConnectionForm(props: { setAdmin: Function }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showingPassword, setShowingPassword] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const sendConnectionData = (e: FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isAdmin) {
          saveTokenToSessionStorage(data.token);
          props.setAdmin(true);
        } else {
          setNotificationMessage(data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const saveTokenToSessionStorage = (token: string) => {
    window.sessionStorage.setItem("token", token);
  };

  return (
    <div className={styles.connectionFormContainer}>
      <h2>Connexion administrateur</h2>

      <form onSubmit={(e) => sendConnectionData(e)} className={styles.connectionForm}>
        <div className={styles.userField}>
          <label htmlFor="user">Identifiant</label>
          <div className={styles.inputBlock}>
            <FaUser className={styles.icon} />
            <input onChange={(e) => setUser(e.target.value)} type="text" id="user" />
          </div>
        </div>
        <div className={styles.passwordField}>
          <label htmlFor="password">Mot de passe</label>
          <div className={styles.inputBlock}>
            <FaLock className={styles.icon} />
            <input onChange={(e) => setPassword(e.target.value)} type={showingPassword ? "text" : "password"} id="password" />
          </div>
          <div className={styles.showingPasswordInput}>
            <input onChange={(e) => setShowingPassword(e.target.checked)} id="showing-password" type="checkbox" />
            <label htmlFor="showing-password">Afficher le mot de passe</label>
          </div>
        </div>
        <button className={styles.connectionBtn}>Se connecter</button>
        {notificationMessage && <div className={styles.notificationMessage}>{notificationMessage}</div>}
      </form>
    </div>
  );
}
