import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss";
import { FaHome, FaChevronRight } from "react-icons/fa";

type BreadcrumbProps = {
  page: string[];
  work?: string[];
};

export default function Breadcrumb(props: BreadcrumbProps) {
  const [breadcrumb, setBreadcrumb] = useState<Array<Array<string>>>();

  const createBreadcrumb = () => {
    let newArray: string[][] = [];
    if(props.page.length > 0) {
      newArray.push(props.page)
    }
    if(props.work) {
      if(props.work.length > 0) {
        newArray.push(props.work)
      }
    }
    setBreadcrumb(newArray);
    
  };
  
  useEffect(() => {
    createBreadcrumb()
  }, []);

  return (
    <div className={styles.breadcrumb}>
      <Link href="/">
        <FaHome className={styles.home} />
      </Link>
      {
        breadcrumb?.map((element, index) => (
          <div key={index} className={styles.breadcrumbPath}>
            <FaChevronRight className={styles.chevron} />
            {
              index + 1 === breadcrumb.length ?
              <div>{element[0]}</div>
              :
              <Link href={`/${element[1]}`}>{element[0]}</Link>
            }
          </div>
        ))
      }
    </div>
  );
}
