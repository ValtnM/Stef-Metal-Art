import HomeGrid from "../components/HomeGrid/HomeGrid";
import Bio from "../components/Bio/Bio";

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
      <HomeGrid />
      <Bio />
    </div>
  );
}
