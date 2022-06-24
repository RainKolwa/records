import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pagination } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';
import request from '@/lib/request';
import LoginHint from '@/components/LoginHint';

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleEdit = (id) => {
    router.push(`/record/${id}/edit`);
  };
  const onPageChange = (page) => {
    setPage(page);
  };
  const loadRecords = async (page) => {
    try {
      const res = await request('/records', {
        params: {
          page,
        },
      });
      if (res.code === 0) {
        setRecords(res.data);
        setTotal(res.pagination.total);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (session) {
      loadRecords(page);
    }
  }, [page, session]);

  return (
    <div className="pt-2">
      <div className="mb-4 flex justify-between items-center">
        <p>You have recorded {total} Days.</p>
        <Link href="/record/new">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Record
          </button>
        </Link>
      </div>
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
            {records.map((record) => {
              const format = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
              return (
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
                  <td className="px-6 py-4">{format(record.sleepBegin)}</td>
                  <td className="px-6 py-4">{format(record.sleepEnd)}</td>
                  <td className="px-6 py-4">{format(record.eatBegin)}</td>
                  <td className="px-6 py-4">{format(record.eatEnd)}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 mb-4 flex justify-end">
        <Pagination
          currentPage={page}
          totalPages={total}
          onPageChange={onPageChange}
          showIcons={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
