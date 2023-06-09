import React from 'react';
import Table from './components/table';
import { client } from './_app';
import { useTableData } from '../lib/hooks/useTable';
import { fetchData } from './fetchData/fetch';

export async function getStaticProps() {
  const usersData = await fetchData(client);

  return {
    props: {
      usersData,
    },
  };
}

export default function HomePage({ usersData }) {
  const { columns, data } = useTableData(usersData);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center m-4">
      <div className="w-full max-w-4xl bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">zkSync-Community-Hub/zkync-developers Insights</h1>
        <div className="overflow-auto">
          <Table columns={columns} data={data} className="my-4 mx-2"/>
        </div>
        <style jsx>{`
          .overflow-auto {
            max-height: 500px;
          }
        `}</style>
      </div>
    </div>
  );

}