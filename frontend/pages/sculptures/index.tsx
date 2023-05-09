import Head from "next/head";
import styles from "../../styles/Sculptures.module.scss";
import { GetStaticProps } from "next";
import WorkGrid from "../../components/WorkGrid/WorkGrid";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

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
};

export default function Sculptures(props: WorksProps) {
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
      <div className={styles.sculptures}>
        <Breadcrumb page={["Sculptures", "sculptures"]} />
        <WorkGrid worksArray={props.sculpturesArray} title="Sculptures" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let sculpturesArray: Work[][] = [];
  try {
    const sculptureData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture`);
    sculpturesArray = await sculptureData.json();
  } catch (err) {
    console.log("getStaticProps Sculptures = error: ", err);
  } finally {
    return {
      props: {
        sculpturesArray,
      },
    };
  }
};
