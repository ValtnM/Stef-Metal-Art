import React from 'react'
import styles from '../styles/Admin.module.scss'

export default function admin() {
  return (
    <div className={styles.admin}>
        <form action="">
        <h2>Connexion</h2>
            <label htmlFor="user">Utilisateur</label>
            <input type="text" id='user' />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id='password' />
            <button>Se connecter</button>
        </form>
    </div>
  )
}
