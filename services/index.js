import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                createdAt
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                id
                slug
                createdAt
              }
            }
          }
        }
      }      
    `;
    const results = await request(graphqlAPI, query);
    return results.postsConnection.edges;
}

export const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails() {
        posts(
            orderBy: createdAt_ASC
            last: 3
        ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
    }
    `;
    const results = await request(graphqlAPI, query);
    return results.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
            where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}},
            last: 3
        ) {
            title
            featuredImage {
                url
            }
            createdAt
            slug
        }
    }
    `;
    const results = await request(graphqlAPI, query, { categories, slug });
    return results.posts;
}


export const getCategories = async () => {
    const query = gql`
        query getCategories {
            categories { 
                name
                slug 
            }
        }
    `;

    const results = await request(graphqlAPI, query);
    return results.categories;
}

export const getPostDetails = async (slug) => {
    const query = gql`
    query GetPostDetails($slug: String!) {
        post(where: { slug: $slug}) {
              author {
                bio
                createdAt
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                id
                slug
                createdAt
              }
              content {
                  raw
              }
        }
      }      
    `;
    const results = await request(graphqlAPI, query, { slug });
    return results.post;
}