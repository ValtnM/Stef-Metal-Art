import Head from "next/head";
import styles from "../../styles/Peintures.module.scss";
import { GetStaticProps } from "next";
import WorkGrid from "../../components/WorkGrid/WorkGrid";

type Work = {
  _id: string;
  type: string;
  name: string;
  description: string;
  thumbnail: string;
  photos: string[];
  instagram: boolean;
  like: number;
};

type WorksProps = {
  sculpturesArray: Work[];
  paintingsArray: Work[];
};

export default function Peintures(props: WorksProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.paintings}>
        <WorkGrid worksArray={props.paintingsArray} title="Peintures" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sculptureData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture`);
  const sculpturesArray = await sculptureData.json();

  const paintingData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/painting`);
  const paintingsArray = await paintingData.json();

  return {
    props: {
      sculpturesArray,
      paintingsArray,
    },
  };
};
