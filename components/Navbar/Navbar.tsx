import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
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
      <Link className={styles.contactLink} href="/contact">Contact</Link>
    </nav>
  );
}
