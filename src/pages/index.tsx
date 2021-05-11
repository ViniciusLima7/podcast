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

import { format, parseISO } from 'date-fns';
import { GetStaticProps } from 'next';

import Image from 'next/image';
import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';

import { PlayerContext, usePlayer } from '../contexts/PlayerContext';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

import styles from './home.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: number;
  url: string;
  publishedAt: string;

}

type HomeProps = {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];

}
export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  //efeito colateral e quando algo mudar na minha aplicação quero que aconteça tal cosia

  const {playList} = usePlayer();
  const episodeList = [...latestEpisodes,...allEpisodes];


  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos </h2>

        <ul>
          {latestEpisodes.map((episode,index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={192}
                  height={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit='cover'
                />

                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a >{episode.title}</a>
                  </Link>

                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>

                </div>

                <button type='button' onClick={() => playList(episodeList,index)}>
                  <img src="/play-green.svg" alt="Tocar Episódio"></img>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
        <h2>Todos Episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {allEpisodes.map((episode,index) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a >{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members} </td>
                  <td style={{ width: 100 }}> {episode.publishedAt}</td>
                  <td> {episode.durationAsString}</td>
                  <td>
                    <button type='button' onClick={() => playList(episodeList,index + latestEpisodes.length)}>
                      <img src="/play-green.svg" alt="Tocar Episódio"></img>
                    </button>
                  </td>
                  <td></td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

    </div>

  )
}

//SSR 
//export async function getServerSideProps() {
//SSG
export const getStaticProps: GetStaticProps = async () => {

  const { data } = await
    api.get('/episodes', {
      params: {
        _limit: 12,
        sort: 'published_at',
        order: 'desc'
      }
    });


  const episodes = data.map(episode => {

    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      //Formatar e Converter Data
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,

    };
  })


  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);


  return {
    props: {
      latestEpisodes,
      allEpisodes,

    },
    //SSG diferença pro SSR
    revalidate: 60 * 60 * 8,
  }

}

