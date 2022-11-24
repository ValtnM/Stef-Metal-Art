import React from 'react'
import Navbar from './Navbar/Navbar'
// import Image from 'next/image'
// import texture from '../public/assets/texture.jpg';
type ContainerProps = {
    children: JSX.Element
}



export default function Container(props: ContainerProps) {
  return (
    <>
        {/* <Image
        style={{position: 'absolute'}}
        // className={styles.logo}
        placeholder="blur"
        src={texture}
        alt="Texture papier"
        width={3247}
        height={4599}
      /> */}
        <Navbar />
        {props.children}
    </>
  )
}
