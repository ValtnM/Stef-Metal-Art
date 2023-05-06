import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Foot.module.scss";
import Image from "next/image";
import Engrenages from '../../public/assets/engrenages-small.webp';

export default function Foot() {
  return (
    <>
      {/* <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
          rel="stylesheet"
        />
      </Head> */}
      <footer className={styles.footer}>
        <Link href="/admin">
        <Image
            className={styles.engrenages}
            src={Engrenages}
            alt="Engrenages"
            width={279}
            height={246}
            />
        </Link>
        <ul className={styles.footerNav}>
          <Link href="/peintures">
            <li>Peintures</li>
          </Link>
          <Link href="/liens">
            <li>Liens</li>
          </Link>
          <Link href="/contact">
            <li>Contact</li>
          </Link>
        </ul>
      </footer>
    </>
  );
}
