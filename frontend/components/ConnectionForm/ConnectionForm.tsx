import React from 'react'
import styles from "./ConnectionForm.module.scss"

export default function ConnectionForm() {
  return (
    <form className={styles.connectionForm} action="">
        <h2>Connexion</h2>
            <label htmlFor="user">Utilisateur</label>
            <input type="text" id='user' />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id='password' />
            <button>Se connecter</button>
        </form>
  )
}
