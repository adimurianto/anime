"use client";

import { useQuery } from '@apollo/client';
import client from '@/apolloClient';
import { GET_ANIME_DETAILS } from '@/graphql';
import Image from 'next/image';
import Loader from '@/app/component/loader';
import { useEffect, useState } from 'react';
import ModalAddToCollection from './component/modalAddToCollection';
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/success.css';
import { useRouter } from 'next/navigation';
import { 
  Banner, 
  CoverDetail, 
  DescDetail, 
  InnerDescDetail
} from '@/app/style';

type Params = {
  id: string
}

type Props = {
  params: Params
}

interface Anime {
  id: number;
  title: {
    romaji: string;
  };
  bannerImage: string;
  coverImage: {
    medium: string;
    large: string;
  };
  description: string;
  episodes: number;
  genres: string[];
  averageScore: number;
}

interface AnimeDetailsQueryResult {
  Media: Anime;
}

interface Collection {
  name: string;
  animeIds: number[];
}

export default function DetailAnimePage({ params }: Props) {
  const [animeCollections, setAnimeCollections] = useState<Collection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCollections = localStorage?.getItem('collections');
    if (storedCollections) {
      const dataCollection = JSON.parse(storedCollections);
      if(dataCollection) {
        const listCollection = dataCollection?.filter((dt: any) => {
          if(dt?.animeIds?.includes(parseInt(params?.id)) == true) {
            return true
          }
        })

        setAnimeCollections(listCollection);
      }
    }
  }, [showModal]);

  const { loading, error, data } = useQuery<AnimeDetailsQueryResult>(GET_ANIME_DETAILS, {
    variables: { 
      id: params?.id
    },
    client: client,
  });

  if (loading) return <Loader />;
  if (error) return <center style={{marginTop: "5rem"}}><h3 style={{color: "red"}}>Error: {error.message}</h3></center>;

  const anime = data?.Media;

  const createMarkup = (c: string) => {
    return { __html: c }
  };

  if(successStatus == true) {
    toast('Success add to collection', { theme: 'success', position: 'bottom-right' });
    setSuccessStatus(false);
  }

  return (
    <div>
      {anime && (
        <div>
          <Banner 
            style={{
              backgroundImage: `url(${anime?.bannerImage ?? '/banner_default.jpg'})`
            }}
          />

          <div style={{padding: "0 10vw"}}>
            <CoverDetail>
              <Image 
                src={anime.coverImage.large} 
                alt="Anime Cover" 
                width={1000} 
                height={1000} 
                style={{
                  width: "100%", 
                  height: "auto", 
                  float: "left",
                  marginTop: "-5rem",
                  borderRadius: "3px",
                  boxShadow: "0 0 29px rgba(49,54,68,.25)"
                }} 
              />
              <button
                style={{
                  padding: "0.75rem",
                  backgroundColor: "rgb(123,213,85)",
                  color: "#000",
                  fontSize: "1rem",
                  borderRadius: "4px",
                  float: "left",
                  marginTop: "1.5rem",
                  marginBottom: "1rem",
                  width: "100%",
                  border: "1px solid rgba(49,54,68,.25)",
                  cursor: "pointer"
                }}
                onClick={() => setShowModal(true)}
              >
                + Add to collection
              </button> 

              {animeCollections?.length > 0 && (
                <>
                  <p>This anime collection name :</p>
                  {
                    animeCollections?.map((dt: any, index: number) => {
                      return (
                        <button
                          key={index}
                          style={{
                            padding: "0.25rem 0.5rem",
                            backgroundColor: "rgb(123,213,85)",
                            color: "#000",
                            fontSize: "0.75rem",
                            borderRadius: "1rem",
                            float: "left",
                            marginTop: "0.3rem",
                            marginRight: "0.5rem",
                            border: "1px solid rgb(123,213,85)",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            router.push(`/collections/${dt?.slug}`);
                          }}
                        >
                          {dt?.name?.toUpperCase()}
                        </button>
                      )
                    })
                  }
                </>
              )}
            </CoverDetail>
          
            <DescDetail>
                <InnerDescDetail>
                  <h2>{anime.title.romaji}</h2>
                  <div style={{lineHeight: "1.5rem"}} dangerouslySetInnerHTML={createMarkup(anime.description)}></div>
                  <p>Episodes: {anime.episodes}</p>
                  <p>Genres: {anime.genres.join(', ')}</p>
                  <p>Average Score: {anime.averageScore}</p>
                </InnerDescDetail>
            </DescDetail>
          </div>
         
          {showModal &&
            <ModalAddToCollection setShowModal={setShowModal} anime={anime} setSuccessStatus={setSuccessStatus} />
          }
        </div>
      )}
    </div>
  );
}