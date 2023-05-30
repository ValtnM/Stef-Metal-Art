import HomeGrid from "../components/HomeGrid/HomeGrid";
import Bio from "../components/Bio/Bio";
import { GetServerSideProps, GetStaticProps } from "next";
import Head from "next/head";

type IndexProps = {
  sculpturesArray: Work[][];
  nbOfSculpturesToDisplay: number;
};

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

export default function Home(props: IndexProps) {

  return (
    <div>
      <Head>
        <title>Stef Metal Art - Accueil</title>        
      </Head>
      <HomeGrid sculpturesArray={props.sculpturesArray} nbOfSculpturesToDisplay={props.nbOfSculpturesToDisplay} />
      <Bio />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nbOfSculpturesToDisplay = 3;
  let sculpturesArray: Work[][] = [];

  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/random/${nbOfSculpturesToDisplay}`);
    let response = await data.json();
    console.log("Response: ", response);

    const formatSculpturesArray = (array: Work[]) => {
      let newSculpturesArray: Work[][] = [];
      for (let i = 0; i < array.length; i++) {
        newSculpturesArray.push([array[i]]);
      }
      return newSculpturesArray;
    };

    sculpturesArray = formatSculpturesArray(response);
  } catch (error) {
    console.log("getStaticProps : error = ", error);
  } finally {
    return {
      props: {
        sculpturesArray,
        nbOfSculpturesToDisplay,
      },
    };
  }
};
