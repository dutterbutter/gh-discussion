import {
  fetchAllDiscussions,
  fetchDiscussionsWithAnsweredAuthor,
} from "../../lib/resolvers/query";

export const fetchData = async (client) => {
  const [answeredUsernamesData, allDiscussionsData] = await Promise.all([
    client.query({ query: fetchDiscussionsWithAnsweredAuthor }),
    client.query({ query: fetchAllDiscussions }),
  ]);

  let userPostsCount =
    allDiscussionsData.data.repository.discussions.edges.reduce((acc, edge) => {
      let login = edge.node.author.login;
      if (!acc[login]) {
        acc[login] = { answeredPosts: 0, postsMade: 1 };
      } else {
        acc[login].postsMade++;
      }
      return acc;
    }, {});

  let userAnswersCount =
    answeredUsernamesData.data.repository.discussions.edges.reduce(
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
