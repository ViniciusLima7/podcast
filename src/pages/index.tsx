//SPA - muito bom , porém não é indexado nos anuncios.
//import { useEffect } from 'react';
// useEffect(() => {
//   fetch('http://localhost:3333/episodes')
//     .then(response => response.json())
//     .then(data => console.log(data))

// }, [])
//SSR - CORRIGE O PROBLEMA DO SPA
//SSG - POSSO MONTAR UMA PAGINA HTML ESTATICA POR EXEMPLO SE
// A PAGINA SO MUDA O CONTEUDO 1 X POR DIA, SO VAI NO SRVIDOR UMA VEZ POR DIA

export default function Home(props) {
  //efeito colateral e quando algo mudar na minha aplicação quero que aconteça tal cosia

  console.log(props.episodes);

  return (
    <div>
      <h1>Index</h1>
      {/* <p>{JSON.stringify(props.episodes)}</p> */}

    </div>

  )
}

//SSR 
//export async function getServerSideProps() {
//SSG
export async function getStaticProps() {

  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json();

  return {
    props: {
      episodes: data,

    },
    //SSG diferença pro SSR
    revalidate: 60 * 60 * 24,
  }

}

