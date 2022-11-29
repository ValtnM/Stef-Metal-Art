import SculptureGrid from "../components/SculptureGrid/SculptureGrid";
import Bio from "../components/Bio/Bio";
import { GetStaticProps } from "next";

type Sculpture = {
  id: number;
  name: string;
  description: string;
  thumb: string;
  photos: string;
};

type IndexProps = {
  sculpturesArray: Sculpture[];
};

export default function Home(props: IndexProps) {
  return (
    <div>
      <SculptureGrid sculptures={props.sculpturesArray} />
      <Bio />
    </div>
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
