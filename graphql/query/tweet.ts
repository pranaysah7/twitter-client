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
    `);
    export const getSignedUrlTweetQuery = graphql(`#graphql 
        query GetSignedUrl($imageName: String!, $imageType: String!) {
  getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)
}`)