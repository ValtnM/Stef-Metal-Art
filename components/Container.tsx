import React from 'react'
import Navbar from './Navbar/Navbar'
type ContainerProps = {
    children: JSX.Element
}



export default function Container(props: ContainerProps) {
  return (
    <>
        <Navbar />
        {props.children}
    </>
  )
}
