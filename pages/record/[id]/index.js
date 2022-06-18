import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import dbConnect from '@/lib/dbConnect';
import request from '@/lib/request';
import toast from '@/lib/toast';
import Record from '@/models/Record';

const RecordPage = ({ record }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const recordID = router.query.id;
    try {
      const res = await request.delete(`/records/${recordID}`);
      if (res.code === 0) {
        toast.success('Deleted successfully');
      }
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to delete');
    }
  };

  return (
    <div className="mx-auto w-96">
      <div className="main-content">
        <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="float-right">{record.sleepDuration}h</span>
            卧床时间
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            开始：{record.sleepBegin}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            结束：{record.sleepEnd}
          </p>
        </div>
        <div className="mt-4 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="float-right">{record.eatDuration}h</span>
            进食时间
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            开始：{record.eatBegin}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            结束：{record.eatEnd}
          </p>
        </div>
        <div className="mt-4 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="float-right">{record.sport}min</span>
            运动时间
          </h5>
        </div>

        <div className="mt-4">
          <Link href={`/record/${record._id}/edit`}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const doc = await Record.findById(params.id).lean();
  const format = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
  const eatDuration = dayjs(doc.eatEnd).diff(dayjs(doc.eatBegin), 'hour', true);
  const sleepDuration = dayjs(doc.sleepEnd).diff(
    dayjs(doc.sleepBegin),
    'hour',
    true
  );
  const record = JSON.parse(
    JSON.stringify({
      ...doc,
      _id: doc._id.toString(),
      sleepBegin: format(doc.sleepBegin),
      sleepEnd: format(doc.sleepEnd),
      sleepDuration: sleepDuration.toFixed(1),
      eatBegin: format(doc.eatBegin),
      eatEnd: format(doc.eatEnd),
      eatDuration: eatDuration.toFixed(1),
    })
  );

  return { props: { record } };
}

export default RecordPage;
