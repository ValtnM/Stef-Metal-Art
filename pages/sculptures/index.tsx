import Head from "next/head";
import { v4 as uuidv4 } from "uuid";
import styles from "../../styles/Sculptures.module.scss";
import { GetStaticProps } from "next";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string;
};

type SculpturesProps = {
  sculpturesArray: Sculpture[];
}

export default function Sculptures(props: SculpturesProps) {  

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
      <div className={styles.sculptures}>
        <h1>Sculptures</h1>
        <div className={styles.grid}>
          {props.sculpturesArray.map((element, index) => (
            <div
              key={uuidv4()}
              style={{ animationDelay: `${index * 100}ms` }}
              className={styles.block}
            >
              <img src={`/assets/sculpture/${element.thumb}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/sculpturesapi");
  const sculpturesObject = await data.json();
  const sculpturesArray = await sculpturesObject.sculptures;

  return {
    props: {
      sculpturesArray,
    },
  };
};
