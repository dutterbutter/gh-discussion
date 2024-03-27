import {
  fetchAllDiscussions,
  fetchDiscussionsWithAnsweredAuthor,
} from "../../lib/resolvers/query";

export const fetchData = async (client) => {
  let [answeredUsernamesData, allDiscussionsData] = await Promise.all([
    client.query({ query: fetchDiscussionsWithAnsweredAuthor }),
    client.query({ query: fetchAllDiscussions }),
  ]);

  const maxAttempts = 20;
  let hasNextPage = allDiscussionsData.data.repository.discussions.pageInfo.hasNextPage;
  let cursor = allDiscussionsData.data.repository.discussions.pageInfo.endCursor;
  let currentAttempt = 1;
  let edges = [...allDiscussionsData.data.repository.discussions.edges];

  while (hasNextPage && currentAttempt < maxAttempts) {
    const moreDiscussionsData = await client.query({
      query: fetchAllDiscussions,
      variables: { cursor }
    });

    edges = [ ...edges, ...moreDiscussionsData.data.repository.discussions.edges]

    hasNextPage = moreDiscussionsData.data.repository.discussions.pageInfo.hasNextPage;
    cursor = moreDiscussionsData.data.repository.discussions.pageInfo.endCursor;
    currentAttempt += 1;
  }
  
  let userPostsCount =
    edges.reduce((acc, edge) => {
      let login = edge.node.author.login;
      if (!acc[login]) {
        acc[login] = { answeredPosts: 0, postsMade: 1 };
      } else {
        acc[login].postsMade++;
      }
      return acc;
    }, {});

  hasNextPage = answeredUsernamesData.data.repository.discussions.pageInfo.hasNextPage;
  cursor = answeredUsernamesData.data.repository.discussions.pageInfo.endCursor;
  currentAttempt = 1;
  edges = [...answeredUsernamesData.data.repository.discussions.edges];

  while (hasNextPage && currentAttempt < maxAttempts) {
    const moreDiscussionsData = await client.query({
      query: fetchDiscussionsWithAnsweredAuthor,
      variables: { cursor }
    });

    edges = [ ...edges, ...moreDiscussionsData.data.repository.discussions.edges]

    hasNextPage = moreDiscussionsData.data.repository.discussions.pageInfo.hasNextPage;
    cursor = moreDiscussionsData.data.repository.discussions.pageInfo.endCursor;
    currentAttempt += 1;
  }

  let userAnswersCount =
    edges.reduce(
      (acc, edge) => {
        if (edge.node.answer && edge.node.answer.author) {
          let login = edge.node.answer.author.login;
          if (!acc[login]) {
            acc[login] = { answeredPosts: 1, postsMade: 0 };
          } else {
            acc[login].answeredPosts++;
          }
        }
        return acc;
      },
      {}
    );

  let usersData = { ...userPostsCount, ...userAnswersCount };
  Object.keys(usersData).forEach((key) => {
    if (userPostsCount[key] && userAnswersCount[key]) {
      usersData[key] = {
        answeredPosts: userAnswersCount[key].answeredPosts,
        postsMade: userPostsCount[key].postsMade,
      };
    }
  });

  return usersData;
};
