import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Peintures.module.scss";
import { GetStaticProps } from "next";

type Peinture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string;
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
            <div
              key={uuidv4()}
              style={{ animationDelay: `${index * 100}ms` }}
              className={styles.block}
            >
              <img src={`/assets/peintures/${element.thumb}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/peinturesapi");
  const peinturesObject = await data.json();
  const peinturesArray = await peinturesObject.peintures;

  return {
    props: {
      peinturesArray,
    },
  };
};
