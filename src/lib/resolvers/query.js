import { gql } from '@apollo/client';

export const FETCH_ALL_DISCUSSIONS = gql`
query ($cursor: String) {
    repository(owner: "zkSync-Community-Hub", name: "zkync-developers") {
      discussions(first: 100, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            id
            author {
              login
            }
          }
          cursor
        }
      }
    }
  }
`;

export const FETCH_DISCUSSION_POSTS = gql`
    query ($cursor: String) {
        repository(owner: "zkSync-Community-Hub", name: "zkync-developers") {
        discussions(first: 10, after: $cursor) {
            pageInfo {
            endCursor
            hasNextPage
            }
            edges {
            node {
                id
                title
                author {
                login
                }
                reactionGroups {
                content
                users {
                    totalCount
                }
                }
            }
            cursor
            }
        }
        }
    }
`;

export const FETCH_ANSWERED_USERNAMES = gql`
    query ($cursor: String) {
        repository(owner: "zkSync-Community-Hub", name: "zkync-developers") {
        discussions(first: 100, after: $cursor) {
            pageInfo {
            endCursor
            hasNextPage
            }
            edges {
            node {
                answer {
                author {
                    login
                }
                }
            }
            }
        }
        }
    }
`;

export const FETCH_ALL_USERS_WHO_HAVE_COMMENTED = gql`
    query ($cursor: String) {
        repository(owner: "zkSync-Community-Hub", name: "zkync-developers") {
        discussions(first: 10, after: $cursor) {
            pageInfo {
            endCursor
            hasNextPage
            }
            edges {
            node {
                id
                title
                comments(first: 10) {
                edges {
                    node {
                    author {
                        login
                    }
                    }
                }
                }
            }
            }
        }
        }
    }
`; 