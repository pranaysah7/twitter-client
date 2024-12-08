import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery=graphql(`#graphql
    query VerifyUserGoogleToken($token:String!){
        verifyGoogleToken(token: $token)
    }
`);

export const getCurrentUserQuery=graphql(`#graphql
    query GetCurrentUser {
  getCurrentUser {
    id
    profileImageURL
    lastName
    firstName
    email
    tweets{
      id
      content
      author {
          profileImageURL
          firstName
          lastName
        }
    }
  }
}
    `);
  export const getUserById=graphql(`#graphql
    query GetUserById($id: ID!) {
  getUserById(id: $id) {
    id
    firstName
    lastName
    profileImageURL
    tweets {
      author {
        firstName
        lastName
        profileImageURL
      }
      content
      id
    }
  }
}

    
    `)