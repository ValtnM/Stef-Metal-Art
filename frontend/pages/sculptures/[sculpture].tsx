import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Sculptures.module.scss";
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

export default function Sculpture(props: {sculpture: Work}) {


  return (
    <div className={styles.sculptureContainer}>
      <Breadcrumb page={["Sculptures", "sculptures"]} work={[props.sculpture.name, props.sculpture._id.toString()]} />
      <WorkDetails  typeOfWork="sculpture" workDetails={props.sculpture} />
      {/* <Slider /> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const sculptureId = context.params!.sculpture;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture/${sculptureId}`);

  const sculpture = await data.json();

  return {
    props: {
      sculpture,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/works/sculpture`);
  
  const sculptures = await data.json();

  const paths = sculptures.map((item: Work) => ({
    params: { sculpture: item._id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}