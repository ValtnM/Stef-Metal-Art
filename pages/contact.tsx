import React from "react";
import styles from "../styles/Contact.module.scss";

export default function Contact() {
  return (
    <div className={styles.contact}>
      <h2>Me contacter</h2>
      <form action="">
        <div className={styles.name}>
          <div className={styles.firstname}>
            <label htmlFor="firstname">Prénom</label>
            <input type="text" id="firstname" />
          </div>
          <div className={styles.lastname}>
            <label htmlFor="lastname">Nom</label>
            <input type="text" id="lastname" />
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="firstname">Message</label>
        <textarea rows={10} id="firstname" />
        <button>Envoyer</button>
      </form>
    </div>
  );
}
