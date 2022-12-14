import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Foot.module.scss";
import { FaRegCopyright } from "react-icons/fa";

export default function Foot() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
      </Head>
      <footer className={styles.footer}>
        <a href="#">
          <img src="/assets/engrenages-small.png" alt="Engrenages" />
        </a>
        <ul className={styles.footerNav}>
          <Link href="/peintures">
            <li>Peintures</li>
          </Link>
          <a href="#">
            <li>Liens</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
        </ul>
        <div className={styles.copyright}>
          <FaRegCopyright className="copyright-icon" />
          <p>2022 Stef Metal Art, Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}
