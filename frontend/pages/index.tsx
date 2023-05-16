import { useEffect, useState } from "react";
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
  // const [sculpturesArray, setSculpturesArray] = useState(props.sculpturesArray);

  // useEffect(() => {
  //   getUpdatedSculpturesArray();
  // }, []);


  // const getUpdatedSculpturesArray = () => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture`)
  //     .then((res) => res.json())
  //     .then((data) => setSculpturesArray(data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div>
      <Head>
        <title>Stef Metal Art</title>
        <meta name="description" content="Stef Metal Art est un artiste de Mazé-Milon qui créé des œuvres originales à partir d'objets de récupération"></meta>
      </Head>
      <HomeGrid sculpturesArray={props.sculpturesArray} nbOfSculpturesToDisplay={props.nbOfSculpturesToDisplay} />
      <Bio />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const nbOfSculpturesToDisplay = 6;
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
