import { gql } from "@apollo/client";

export const fetchAllDiscussions = gql`
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

export const fetchAllDiscussionsWithReactions = gql`
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

export const fetchDiscussionsWithAnsweredAuthor = gql`
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

export const fetchAllDiscussionCommentsWithAuthor = gql`
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
