import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
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
      <nav className={styles.navbar}>
        <img
          className={styles.engrenages}
          src="/assets/engrenages-small.png"
          alt="Engrenages"
          width={200}
          height={180}
        />
        <Link href="/">
          <img
            className={styles.logo}
            src="/assets/logo.png"
            alt="Logo Stef Metal Art"
            width={500}
            height={185}
          />
        </Link>
        <Link className={styles.contactLink} href="/contact">
          Contact
        </Link>
      </nav>
    </>
  );
}
