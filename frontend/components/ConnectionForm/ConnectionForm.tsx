import React, {FormEvent, useState} from 'react'
import styles from "./ConnectionForm.module.scss"

export default function ConnectionForm(props: {setAdmin: Function}) {

  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [showingPassword, setShowingPassword] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")

  const sendConnectionData = (e: FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user, password})
    })
    .then(res => res.json())
    .then(data => {
      if(data.isAdmin) {
        saveTokenToSessionStorage(data.token)
        props.setAdmin(true)
      } else {
        setNotificationMessage(data.error)
      }
      
    })
    .catch(err => console.log(err))
  }

  const saveTokenToSessionStorage = (token: string) => {
    window.sessionStorage.setItem('token', token);
  }


  return (
    <form onSubmit={(e) => sendConnectionData(e)} className={styles.connectionForm}>
        <h2>Connexion</h2>
            <label htmlFor="user">Utilisateur</label>
            <input onChange={(e) => setUser(e.target.value)} type="text" id='user' />
            <label htmlFor="password">Mot de passe</label>
            <input onChange={(e) => setPassword(e.target.value)} type={showingPassword ? "text" : "password"} id='password' />
            <div className={styles.showingPasswordInput}>
              <input onChange={(e) => setShowingPassword(e.target.checked)} id='showing-password' type="checkbox" />
              <label htmlFor="showing-password">Afficher le mot de passe</label>
            </div>
            <button>Se connecter</button>
            {
              notificationMessage && 
              <div className={styles.notificationMessage}>{notificationMessage}</div>
            }
        </form>
  )
}
