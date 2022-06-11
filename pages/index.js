import Link from 'next/link';
import { useRouter } from 'next/router';

import dbConnect from '../lib/dbConnect';
import Record from '../models/Record';
import dayjs from 'dayjs';

const Index = ({ records }) => {
  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/record/${id}/edit`);
  };
  return (
    <>
      <Link href="/record/new">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Record
        </button>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-4">
                ID
              </th>
              <th scope="col" className="px-6 py-4">
                Sleep Begin
              </th>
              <th scope="col" className="px-6 py-4">
                Sleep End
              </th>
              <th scope="col" className="px-6 py-4">
                Eat Begin
              </th>
              <th scope="col" className="px-6 py-4">
                Eat End
              </th>
              <th scope="col" className="px-6 py-4">
                Sport
              </th>
              <th scope="col" className="px-6 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  <Link href={`/record/${record._id}`}>
                    <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      {record._id}
                    </a>
                  </Link>
                </td>
                <td className="px-6 py-4">{record.sleepBegin}</td>
                <td className="px-6 py-4">{record.sleepEnd}</td>
                <td className="px-6 py-4">{record.eatBegin}</td>
                <td className="px-6 py-4">{record.eatEnd}</td>
                <td className="px-6 py-4">{record.sport} min</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(record._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const result = await Record.find({}).lean();
  const format = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
  const records = result.map((doc) => {
    return JSON.parse(
      JSON.stringify({
        ...doc,
        _id: doc._id.toString(),
        sleepBegin: format(doc.sleepBegin),
        sleepEnd: format(doc.sleepEnd),
        eatBegin: format(doc.eatBegin),
        eatEnd: format(doc.eatEnd),
      })
    );
  });

  return { props: { records: records } };
}

export default Index;
