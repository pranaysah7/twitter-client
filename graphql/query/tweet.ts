import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`#graphql
    query GetAllTweets{
        getAllTweets{
            id
       author {
        id
      firstName
      lastName
      profileImageURL
    }
    content
    imageUrl
        }
    }
    `)