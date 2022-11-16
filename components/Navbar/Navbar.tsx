import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import logo from "../../public/assets/logo.png";
import engrenagesSmall from "../../public/assets/engrenages-small.png";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Image
        className={styles.engrenages}
        placeholder="blur"
        src={engrenagesSmall}
        alt="Engrenages"
        width={200}
        height={180}
      />
      <Image
        className={styles.logo}
        placeholder="blur"
        src={logo}
        alt="Logo Stef Metal Art"
        width={500}
        height={185}
      />
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
