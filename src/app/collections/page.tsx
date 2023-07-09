"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'
import { IconTrash } from '@tabler/icons-react';
import ModalAddCollection from './component/modalAddCollection';
import Loader from '../component/loader';
import { Banner, Container, Content, H1, List, RemoveButton } from '../style';

type Anime = {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    medium: string;
  };
  genres: string[];
};

interface Collection {
  name: string;
  slug: string;
  animeIds: number[];
  animeDetails: Anime[];
}


export default function Collections() {
  const router = useRouter()
  const [animeCollections, setAnimeCollections] = useState<Collection[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 2000);

  useEffect(() => {
    const storedCollections = localStorage?.getItem('collections');
    if (storedCollections) {
      const dataCollection = JSON.parse(storedCollections);

      if(dataCollection) {
        setAnimeCollections(dataCollection);
      }
    }
  }, [showModal])

  const removeCollection = (slug: string) => {
    const updatedCollections = animeCollections.filter((dt: any) => dt?.slug !== slug);
    localStorage?.setItem('collections', JSON.stringify(updatedCollections));
    setAnimeCollections(updatedCollections);
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Banner />
      <Container>
        <H1>COLLECTION LIST</H1>

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
            width: "auto",
            border: "1px solid rgba(49,54,68,.25)",
            cursor: "pointer",
            marginLeft: "10px"
          }}
          onClick={() => setShowModal(true)}
        >
          Add a collection
        </button> 
        <Content>
          { 
            animeCollections?.length > 0 ?
              animeCollections?.map?.((row: any, index: number) => {
                return (
                  <List 
                    key={index}
                    style={{display: "block"}}
                  >
                    <div
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        router.push(`/collections/${row?.slug}`);
                      }}
                    >
                      <Image src={row?.animeDetails[0] ? row?.animeDetails[0]?.coverImage?.medium : '/cover_default.jpg'} alt="" width={65} height={80} style={{float: 'left', borderRadius: "4px"}} />
                      <div
                        style={{ 
                          cursor: 'pointer',
                          width: 'auto',
                          float: 'left',
                          padding: '0.55rem 1rem',
                          alignItems: 'center',
                          color: 'rgb(81,97,112)'
                        }}
                      >
                        {row?.name?.toUpperCase()}
                      </div> 
                    </div>
                    
                    <RemoveButton
                      onClick={() => removeCollection(row?.slug)}
                    >
                      <IconTrash/>
                    </RemoveButton> 
                  </List>
                )
              })
            : 
              <List key={1}>
                <center><h2 style={{color: 'rgb(81,97,112)'}}>No Collection</h2></center>
              </List>
          }
        </Content>
      </Container>

         
      {showModal &&
        <ModalAddCollection setShowModal={setShowModal} />
      }
    </>
  );
}