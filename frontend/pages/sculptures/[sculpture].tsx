import styles from "../../styles/Sculptures.module.scss";
import WorkDetails from "../../components/WorkDetails/WorkDetails";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

type Work = {
  _id: Object;
  name: string;
  description: string;
  thumbnail: string;
  photos: Array<string>;
  instagram: boolean;
  like: number;
  create_date: Date;
  update_date: Date;
};

export default function Sculpture(props: { sculpture: Work }) {
  return (
    <>
      <Head>
        <title>Stef Metal Art - {props.sculpture.name}</title>
      </Head>
      <div className={styles.sculptureContainer}>
        <Breadcrumb page={["Sculptures", "sculptures"]} work={[props.sculpture.name, props.sculpture._id.toString()]} />
        <WorkDetails typeOfWork="sculpture" workDetails={props.sculpture} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sculptureId = context.params!.sculpture;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture/${sculptureId}`);

  const sculpture = await data.json();

  return {
    props: {
      sculpture,
    },
  };
};
