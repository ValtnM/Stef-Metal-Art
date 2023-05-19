import styles from "../../styles/Sculptures.module.scss";
import { GetServerSideProps } from "next";
import WorkGrid from "../../components/WorkGrid/WorkGrid";
import Head from "next/head";
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
      <Head>
        <title>Stef Metal Art - Sculptures</title>
      </Head>
      <div className={styles.sculptures}>
        <Breadcrumb page={["Sculptures", "sculptures"]} />
        <WorkGrid worksArray={props.sculpturesArray} title="Sculptures" />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
