import React from "react";
import Image from "next/image";
import styles from "./Bio.module.scss";
import Portrait from "../../public/assets/portrait.webp";

export default function Bio() {
  return (
    <div className={styles.container}>
      <div className={styles.bio}>
        <Image width={1845} height={2338} src={Portrait} alt="Portrait de Stéphane" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus obcaecati rerum expedita minus perspiciatis, architecto, mollitia accusamus facilis dolore molestias dolorum vitae in nostrum ipsa fugiat sit a consectetur neque fuga dicta culpa ullam, voluptatem iusto! Voluptates repudiandae recusandae vero debitis animi autem iure fuga at laboriosam quisquam eaque libero delectus similique, iste itaque, voluptatem iusto quod aut ut hic maxime inventore dicta? Molestiae ipsum, ullam dolorem voluptatum voluptatem non veniam eius beatae debitis, eaque quasi quaerat doloribus
          harum. Molestiae doloribus reprehenderit vitae facilis amet aliquid, consectetur itaque soluta laborum distinctio iure inventore vel, dolorum ipsum mollitia consequatur officia deleniti!
        </p>
      </div>
    </div>
  );
}
