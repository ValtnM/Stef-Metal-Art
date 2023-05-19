import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>        
        <link href="https://fonts.googleapis.com/css2?family=Indie+Flower&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <meta name="description" content="Stef Metal Art est un artiste de Mazé-Milon qui créé des œuvres originales à partir d'objets de récupération" />
        <meta name='keywords' content='Stef Metal Art, Stef, Metal, Art, Sculptures, Peintures, Mazé, Anjou, Maine-et-Loire, Pays-de-la-Loire' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}