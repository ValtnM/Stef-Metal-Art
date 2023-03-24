import React, { useEffect, useState, useRef, FormEvent } from "react";
import styles from "../styles/Contact.module.scss";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sendedMessage, setSendedMessage] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(false);

  const captchaRef = useRef<ReCAPTCHA>(null);

  const sendEmail = (e: FormEvent) => {
    const emailContent = {
      firstname,
      lastname,
      email,
      subject,
      message,
    };

    const token = captchaRef.current?.getValue();

    e.preventDefault();
    setSendedMessage(false);
    setNotificationMessage("");

    fetch("http://localhost:8080/api/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...emailContent, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setSuccessfulSending(true);
          setNotificationMessage(data.message);
          clearForm();
          captchaRef.current?.reset();
        }
        if (data.error) {
          setSuccessfulSending(false);
          setNotificationMessage(data.error);
        }
        setSendedMessage(true);
      })
      .catch((err) => console.log(err));
  };

  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className={styles.contact}>
      <h2>Me contacter</h2>
      <form onSubmit={(e) => sendEmail(e)}>
        <div className={styles.name}>
          <div className={styles.firstname}>
            <label htmlFor="firstname">Prénom</label>
            <input onChange={(e) => setFirstname(e.target.value)} type="text" id="firstname" value={firstname} />
          </div>
          <div className={styles.lastname}>
            <label htmlFor="lastname">Nom</label>
            <input onChange={(e) => setLastname(e.target.value)} type="text" id="lastname" value={lastname} />
          </div>
        </div>
        <label htmlFor="email">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" value={email} />
        <label htmlFor="email">Objet</label>
        <input onChange={(e) => setSubject(e.target.value)} type="subject" id="subject" value={subject} />
        <label htmlFor="message">Message</label>
        <textarea onChange={(e) => setMessage(e.target.value)} rows={10} id="message" value={message} />
        <ReCAPTCHA className={styles.recaptcha} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} ref={captchaRef} />
        <button>Envoyer</button>
        {notificationMessage && <div className={successfulSending ? `${styles.notificationMessage} ${styles.success}` : `${styles.notificationMessage} ${styles.fail}`}>{notificationMessage}</div>}
        {!sendedMessage && <div className={sendedMessage ? styles.loader : `${styles.loader} ${styles.visible}`}></div>}
      </form>
    </div>
  );
}
