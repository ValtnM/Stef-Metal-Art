import styles from "../../styles/Peintures.module.scss";
import { GetServerSideProps } from "next";
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
  paintingsArray: Work[];
};

export default function Peintures(props: WorksProps) {
  return (
    <div className={styles.paintings}>
      <Breadcrumb page={["Peintures", "peintures"]} />
      <WorkGrid worksArray={props.paintingsArray} title="Peintures" />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  let paintingsArray: Work[][] = [];

  try {
    const paintingData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/painting`);
    paintingsArray = await paintingData.json();
  } catch (err) {
    console.log("getStaticProps Paintings = error: ", err);
  } finally {
    return {
      props: {
        paintingsArray,
      },
    };
  }
};
