import SculptureGrid from "../components/SculptureGrid/SculptureGrid";
import HomeGrid from "../components/HomeGrid/HomeGrid";
import Bio from "../components/Bio/Bio";
import { GetStaticProps } from "next";
import {useState, useEffect} from 'react'

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string[];
};

type IndexProps = {
  sculpturesArray: Sculpture[];
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
      {/* <SculptureGrid sculptures={props.sculpturesArray} /> */}
      
        <HomeGrid />
      {/* <SculptureGrid sculptures={props.sculpturesArray} /> */}
      <Bio />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetch("http://localhost:3000/api/sculpturesapi");
  const sculpturesArray = await data.json();
  // const sculpturesArray = await sculpturesObject.sculptures;

  return {
    props: {
      sculpturesArray,
    },
  };
};
