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
          Je suis né la même année que Fantômas. Autodidacte, je peins autant que je bricole, bricole autant que je sculpte, sculpte un peu moins que je récupère... Ma devise prise à Lavoisier (et non à Fantômas): &quot;Rien ne se perd, rien ne se crée, tout se transforme.&quot; Ou comme le disait si bien Boby Lapointe : &quot;On peut presque tout changer excepté ce qu&apos;on n&apos;peut pas&quot;. J&apos;aime bien la magie de créer quelque chose à partir de pas grand chose . Des pièces de moto, de vieux phares de vélo, une boîte à biscuits jaunie, un moulin à légumes, une montre cassée... Des morceaux du quotidien que vous ne
          verrez plus de la même manière.
        </p>
      </div>
    </div>
  );
}
