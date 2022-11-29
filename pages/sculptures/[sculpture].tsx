import React, { useEffect } from 'react'
import {useRouter} from "next/router";

export default function Sculpture() {
    const router = useRouter();
    const sculptureName = router.query.sculpture

    useEffect(() => {
        console.log(router);
        
    }, [])

  return (

    <div>

    </div>
  )
}
