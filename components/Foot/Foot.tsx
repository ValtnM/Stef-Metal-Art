import React from "react";
import styles from './Foot.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from "@fortawesome/free-regular-svg-icons";


export default function Foot() {
  return (
    <footer className={styles.footer}>
      <a href="#">
        <img src="/assets/engrenages-small.png" alt="Engrenages" />
      </a>
      <ul className={styles.footerNav}>
        <a href="#">
          <li>Peintures</li>
        </a>
        <a href="#">
          <li>Liens</li>
        </a>
        <a href="#">
          <li>Contact</li>
        </a>
      </ul>
      <div className={styles.copyright}>
        <FontAwesomeIcon
          className="copyright-icon"
          icon={faCopyright}
        ></FontAwesomeIcon>
        <p>2022 Stef Metal Art, Tous droits réservés.</p>
      </div>
    </footer>
  );
}
