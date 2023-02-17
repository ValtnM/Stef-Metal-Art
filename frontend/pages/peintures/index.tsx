import Head from "next/head";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Peintures.module.scss";
import { GetStaticProps } from "next";

type Peinture = {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  photo: string;
  instagram: boolean,
  like: number
};

type PeinturesProps = {
  peinturesArray: Peinture[];
}

export default function Peintures(props: PeinturesProps) {  

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
      <div className={styles.peintures}>
        <h1>Peintures</h1>
        <div className={styles.grid}>
          {props.peinturesArray.map((element, index) => (
            <Link
            href={`/peintures/${element._id}`}
              key={uuidv4()}
              style={{ animationDelay: `${index * 100}ms` }}
              className={styles.block}
            >
              <img src={`/assets/peintures/${element.thumbnail}`} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:8080/api/oeuvres/peintures");
  const peinturesArray = await data.json();
  // const peinturesArray = await peinturesObject.peintures;

  return {
    props: {
      peinturesArray,
    },
  };
};
