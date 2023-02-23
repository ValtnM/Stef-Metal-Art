import React, {useState} from 'react'

export default function test() {

    const [thumbnail, setThumbnail] = useState()

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
          }
        console.log(formData);
        fetch('http://localhost:8080/api/oeuvres/', {
            method: "POST",
            // headers: {

            //     'Content-Type': 'multipart/form-data',
            // },
            body: formData

        })
    }

  return (
    <form action="/api/oeuvres/" enctype="multipart/form-data" method="POST">
        <input onChange={(e) => setThumbnail(e.target.files[0])} type="file" name="thumbnail" accept="image/*"/>
        <button onClick={(e) => submit(e)}>Soumettre</button>
      </form>
  )
}
