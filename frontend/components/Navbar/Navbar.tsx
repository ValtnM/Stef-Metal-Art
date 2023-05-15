import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.scss";
import Engrenages from "../../public/assets/engrenages-small.webp";
import Logo from "../../public/assets/logo.webp";

export default function Navbar() {
  return (
    <div className={styles.container}>
      
      <nav className={styles.navbar}>
        <div className={styles.engrenages}>

        <Image
          className={styles.engrenagesImg}
          src={Engrenages}
          alt="Engrenages"
          width={200}
          height={180}
          />
        </div>
        <div className={styles.logo}>

        <Link href="/">
          <Image
            className={styles.logoImg}
            src={Logo}
            alt="Logo Stef Metal Art"
            width={500}
            height={185}
            />
        </Link>
            </div>
            <div className={styles.links}>

        <Link className={styles.link} href="/sculptures">
          Sculptures
        </Link>
        <Link className={styles.link} href="/contact">
          Contact
        </Link>
        </div>
      </nav>
    </div>
  );
}
