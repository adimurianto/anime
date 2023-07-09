"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'
import { IconTrash } from '@tabler/icons-react';
import Loader from '@/app/component/loader';
import { Banner, Container, Content, H1, InnerItem, Item, ItemContent, List, RemoveButton } from '@/app/style';

type Params = {
  slug: string
}

type Props = {
  params: Params
}

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


export default function CollectionsDetail({ params }: Props) {
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
      let dataCollection = JSON.parse(storedCollections);
      dataCollection = dataCollection?.filter((dt: any) => dt?.slug == params?.slug);

      if(dataCollection) {
        setAnimeCollections(dataCollection);
      }
    }
  }, [showModal])
  
  const slugify = (title: any) => {
    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    return slug;
  }

  const removeAnime = (id: number) => {
    const storedCollections = localStorage?.getItem('collections');
    if (storedCollections) {
      let dataCollection = JSON.parse(storedCollections);

      const newCollection:any = [];
      dataCollection?.map((row: any) => {
        if(row?.slug == params?.slug){
          const ids = row?.animeIds?.filter((dt: any) => dt !== id);
          const details = row?.animeDetails?.filter((dt: any) => dt?.id !== id);

          newCollection.push({
            name: row?.name,
            slug: row?.slug,
            animeIds: ids,
            animeDetails: details
          });
        }else{
          newCollection.push({
            name: row?.name,
            slug: row?.slug,
            animeIds: row?.animeIds,
            animeDetails: row?.animeDetails
          });
        }
      });
      
      localStorage?.setItem('collections', JSON.stringify(newCollection));

      const data = newCollection?.filter((dt: any) => dt?.slug == params?.slug);

      setAnimeCollections(data);
    }
    
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <Banner />
      <Container>
        <H1>{animeCollections[0]?.name?.toUpperCase()}</H1>

        <Content>
          
          { 
            animeCollections[0]?.animeDetails.length > 0 ?
              animeCollections[0]?.animeDetails?.map?.((row: any, index: number) => {
                return (
                  <List 
                    style={{display: "block"}}
                    key={index}
                  >
                    <div
                      style={{cursor: "pointer"}}
                      onClick={() => {
                        router.push(`/detail/${row?.id}/${slugify(row?.title?.romaji)}`);
                      }}
                    >
                      <Item>
                        <Image src={row.coverImage?.medium} alt="" width={65} height={80} style={{float: 'left', borderRadius: "4px"}} />
                      </Item>

                      <Item>
                        <InnerItem>
                          {row?.title?.romaji?.toUpperCase()}
                        </InnerItem> 
                      </Item>
                    </div>

                    <RemoveButton
                      onClick={() => removeAnime(row?.id)}
                    >
                      <IconTrash/>
                    </RemoveButton>
                  </List>
                )
              })
            : 
              <List key={1}>
                <center><h2 style={{color: 'rgb(81,97,112)'}}>No Anime Collection</h2></center>
              </List>
          }
        </Content>
      </Container>
    </>
  );
}