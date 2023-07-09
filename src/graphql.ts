"use client";
import { gql } from '@apollo/client';

export const GET_ANIME_LIST = gql`
  query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media {
        id
        title {
          romaji
        }
        coverImage {
          medium
        }
        genres
      }
    }
  }
`;

export const GET_ANIME_DETAILS = gql`
  query ($id: Int!) {
    Media (id: $id) {
      id
      title {
        romaji
      }
      bannerImage 
      coverImage {
        medium
        large
      }
      description
      episodes
      genres
      averageScore
    }
  }
`;


