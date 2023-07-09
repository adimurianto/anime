"use client";

import { useQuery } from '@apollo/client';
import client from '@/apolloClient';
import { GET_ANIME_LIST } from '@/graphql';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { ColumnDef, PaginationState, flexRender, getCoreRowModel, getFacetedMinMaxValues, getFacetedRowModel, getFacetedUniqueValues, useReactTable } from '@tanstack/react-table';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'
import Loader from './component/loader';
import { 
  Container,
  H1,
  Content,
  List,
  Item,
  Pagination,
  FirstPage,
  NextPage,
  PrevPage,
  LastPage,
  NumOfPage,
  Banner,
  ItemContent
} from '@/app/style';

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

type AnimeListQueryResult = {
  Page: {
    pageInfo: {
      total: number;
      perPage: number;
      currentPage: number;
      lastPage: number;
      hasNextPage: boolean;
    };
    media: Anime[];
  };
};

export default function Home() {
  const router = useRouter();
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )

  const { loading, error, data: listAnime, fetchMore } = useQuery<AnimeListQueryResult>(
    GET_ANIME_LIST,
    {
      variables: { page: pageIndex, perPage: pageSize },
      client: client,
    }
  );

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row: any) => (
          <Image src={row?.coverImage?.medium} alt="" width={65} height={80} style={{float: 'left', borderRadius: "4px"}} />
        ),
        id: 'coverImage',
        cell: (info: any) => info.getValue(),
      },
      {
        accessorFn: (row: any) => (
          <ItemContent>
            {row?.title?.romaji}

            <br/>
            {
              row?.genres?.map((genre: string, index: number) => {
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
                      border: "1px solid rgb(123,213,85)"
                    }}
                  >
                    {genre}
                  </button>
                )
              })
            }
          </ItemContent>
        ),
        id: 'title',
        cell: (info: any) => info.getValue(),
      }
    ],
    [],
  )

  const list = useReactTable({
    data: listAnime ? listAnime?.Page?.media : [],
    columns,
    pageCount: (listAnime?.Page?.pageInfo && listAnime?.Page?.pageInfo?.lastPage) ?? -1,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  if (loading) return <Loader />;
  if (error) return <center style={{marginTop: "5rem"}}><h3 style={{color: "red"}}>Error: {error.message}</h3></center>;

  console.log("Current Page Index :", pageIndex );

  const slugify = (title: any) => {
    const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    
    return slug;
  }

  return (
    <>
      <Banner />
      <Container>
        <H1>ANIME LIST</H1>

        <Content>
          {list.getRowModel().rows && list.getRowModel().rows.length > 0 ? (
              list.getRowModel().rows.map((row, index) => {
                const slug = slugify(row?.original?.title?.romaji);

                return (
                  <List 
                    key={index} 
                    onClick={() => {
                      router.push(`/detail/${row?.original?.id}/${slug}`);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Item key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Item>
                      )
                    })}
                  </List>
                )
              })
            ) : (
              <List key={1}>
                <center>No Data Found</center>
              </List>
            )
          }
        </Content>

        <Pagination>
          <FirstPage
            className="border rounded p-1"
            onClick={() => list.setPageIndex(1)}
            disabled={pageIndex == 1}
          >
            {'<<'}
          </FirstPage>
          <PrevPage
            className="border rounded p-1"
            onClick={() => list.previousPage()}
            disabled={pageIndex == 1}
          >
            {'<'}
          </PrevPage>
          
          <NumOfPage>
            {pageIndex} / {(listAnime?.Page?.pageInfo?.lastPage ?? 1)-1}
          </NumOfPage>
          
          <NextPage
            className="border rounded p-1"
            onClick={() => list.nextPage()}
            disabled={pageIndex+1 == (listAnime?.Page?.pageInfo && listAnime?.Page?.pageInfo?.lastPage) ?? 1}
          >
            {'>'}
          </NextPage>
          <LastPage
            className="border rounded p-1"
            onClick={() => list.setPageIndex(list.getPageCount())}
            disabled={pageIndex+1 == (listAnime?.Page?.pageInfo && listAnime?.Page?.pageInfo?.lastPage) ?? 1}
          >
            {'>>'}
          </LastPage>
        </Pagination>
      </Container>
    </>
  );
}