import React, { useEffect, useState, useRef } from "react";
import styles from '../../styles/Peintures.module.scss'
import WorkDetails from "../../components/WorkDetails/WorkDetails";
import { GetStaticProps, GetStaticPaths } from "next";
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

export default function Peinture(props: {peinture: Work}) {
  return (
    <div className={styles.paintingContainer}>
      <Breadcrumb page={["Peintures", "peintures"]} work={[props.peinture.name, props.peinture._id.toString()]} />
      <WorkDetails typeOfWork="painting" workDetails={props.peinture}/>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const peintureId = context.params!.peinture;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/painting/${peintureId}`);

  const peinture = await data.json();

  return {
    props: {
      peinture,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/painting`);
  
  const peintures = await data.json();

  const paths = peintures.map((item: Work) => ({
    params: { peinture: item._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}
