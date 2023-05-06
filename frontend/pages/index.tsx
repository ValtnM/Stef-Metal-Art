import { useEffect } from "react";
import HomeGrid from "../components/HomeGrid/HomeGrid";
import Bio from "../components/Bio/Bio";
import { GetStaticProps } from "next";
import Head from "next/head";
import { log } from "console";

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
  // const logout = () => {
  //     window.FB.logout((res) => {
  //       console.log(res);
  //     });
  // };

  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "https://connect.facebook.net/en_US/sdk.js";
  //   script.async = true;
  //   script.defer = true;
  //   script.crossOrigin = "anonymous";

  //   document.body.appendChild(script);
  //   window.fbAsyncInit = () => {
  //     window.FB.init({
  //       appId: "250399667333736",
  //       autoLogAppEvents: true,
  //       xfbml: true,
  //       version: "v16.0",
  //     });
  //     window.FB.getLoginStatus((res) => {
  //       console.log(res);
  //       if (res.status !== "connected") {
  //         window.FB.login(
  //           (res) => {
  //             console.log(res);
  //             window.FB.getLoginStatus((res) => {
  //               console.log(res);

  //             })
  //           },
  //           { scope: "public_profile" }
  //         );
  //       }
  //     });
  //   };

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  // const createCarousel = async () => {
  //   const img1 = await fetch("https://graph.facebook.com/v16.0/17841408113641537/media?image_url=https://cdn.pixabay.com/photo/2015/03/05/01/46/sailing-ship-659758_960_720.jpg&is_carousel_item=true&caption=TEST_Caption&access_token=EAADjvLc5KmgBAA10GPR5To3Rru4LH5f1mY0kz5WSjKcRMZAKaaRZAFnFbAxJxYetqvtguflNluf2K0sTbu6O0QjnTAMDh1kKAQ3HXfdGZCoChsn5d60uqpuxgXZAOVMaotnN4p0ZBZALr10f21EI4fhoiZBnEsVQu18tMGZBXVCvl8wUDHBZAkc9g", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data.id;
  //     })
  //     .catch((err) => console.log(err));

  //   const img2 = await fetch("https://graph.facebook.com/v16.0/17841408113641537/media?image_url=https://cdn.pixabay.com/photo/2015/03/16/10/59/sunset-675847_1280.jpg&is_carousel_item=true&access_token=EAADjvLc5KmgBAA10GPR5To3Rru4LH5f1mY0kz5WSjKcRMZAKaaRZAFnFbAxJxYetqvtguflNluf2K0sTbu6O0QjnTAMDh1kKAQ3HXfdGZCoChsn5d60uqpuxgXZAOVMaotnN4p0ZBZALr10f21EI4fhoiZBnEsVQu18tMGZBXVCvl8wUDHBZAkc9g", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {

  //       return data.id;
  //     })
  //     .catch((err) => console.log(err));

  //   const containerId = await fetch(`https://graph.facebook.com/v16.0/17841408113641537/media?media_type=CAROUSEL&children=${img1}%2C${img2}&access_token=EAADjvLc5KmgBAA10GPR5To3Rru4LH5f1mY0kz5WSjKcRMZAKaaRZAFnFbAxJxYetqvtguflNluf2K0sTbu6O0QjnTAMDh1kKAQ3HXfdGZCoChsn5d60uqpuxgXZAOVMaotnN4p0ZBZALr10f21EI4fhoiZBnEsVQu18tMGZBXVCvl8wUDHBZAkc9g`, {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       return data.id;
  //     })
  //     .catch((err) => console.log(err));

  //   fetch(`https://graph.facebook.com/v16.0/17841408113641537/media_publish?creation_id=${containerId}&access_token=EAADjvLc5KmgBAA10GPR5To3Rru4LH5f1mY0kz5WSjKcRMZAKaaRZAFnFbAxJxYetqvtguflNluf2K0sTbu6O0QjnTAMDh1kKAQ3HXfdGZCoChsn5d60uqpuxgXZAOVMaotnN4p0ZBZALr10f21EI4fhoiZBnEsVQu18tMGZBXVCvl8wUDHBZAkc9g`, {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };

  // const testAPI = () => {
  //   fetch("https://graph.facebook.com/v16.0/17841408113641537/media?image_url=https://cdn.pixabay.com/photo/2015/03/05/01/46/sailing-ship-659758_960_720.jpg&access_token=EAADjvLc5KmgBAGWs90EeJGZBqvqUsrmjHepWPLh8ZAp0VnZAHPvFA75ATqBCyZCTVnQAwV5MZCVbgm5zF0pHP3DPBIbQ8YqtxiNA4rCLW4hN7vCPIcCfD09ZCNsrHCkwYqsZBqpOxK0JnwROK0AoKMAwNZCnNZC16iLIS3yN18r2n92QU2ZA3q6wciqBbKB8oZCuTSlKyCZCmnKvcgZDZD", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const id = data.id;
  //       fetch(`https://graph.facebook.com/v16.0/17841408113641537/media_publish?creation_id=${id}&access_token=EAADjvLc5KmgBAGWs90EeJGZBqvqUsrmjHepWPLh8ZAp0VnZAHPvFA75ATqBCyZCTVnQAwV5MZCVbgm5zF0pHP3DPBIbQ8YqtxiNA4rCLW4hN7vCPIcCfD09ZCNsrHCkwYqsZBqpOxK0JnwROK0AoKMAwNZCnNZC16iLIS3yN18r2n92QU2ZA3q6wciqBbKB8oZCuTSlKyCZCmnKvcgZDZD`, {
  //         method: "POST",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => console.log(data))
  //         .catch((err) => console.log(err));
  //     })
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

export const getStaticProps: GetStaticProps = async () => {
  const nbOfSculpturesToDisplay = 6;
  let sculpturesArray: Work[][] = [];

  // try {

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/random/${nbOfSculpturesToDisplay}`);
    let response = await data.json();

    const formatSculpturesArray = (array: Work[]) => {
    let newSculpturesArray: Work[][] = [];
    for (let i = 0; i < array.length; i++) {
      newSculpturesArray.push([array[i]]);
    }
    return newSculpturesArray;
  };
  
  sculpturesArray = formatSculpturesArray(response);
// }
// catch(error) {
  // console.log("getStaticProps : error = ", error);
  
// }
// finally {  
  
  return {
    props: {
      sculpturesArray,
      nbOfSculpturesToDisplay,
    },
  // };
}
};
