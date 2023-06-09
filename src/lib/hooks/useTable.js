import React from 'react';

export const useTableData = (usersData) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'user',
      },
      {
        Header: 'Discussion Posts',
        accessor: 'postsMade',
      },
      {
        Header: 'Answered Posts',
        accessor: 'answeredPosts',
      },
    ],
    []
  );

  const data = React.useMemo(
    () => Object.entries(usersData).map(([user, { postsMade, answeredPosts }]) => ({ user, postsMade, answeredPosts })),
    [usersData]
  );

  return { columns, data };
};
