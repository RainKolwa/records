import { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dbConnect from '../../../lib/dbConnect';
import Record from '../../../models/Record';

/* Allows you to view record card info and delete record card*/
const RecordPage = ({ record }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const handleDelete = async () => {
    const recordID = router.query.id;
    try {
      await fetch(`/api/records/${recordID}`, {
        method: 'Delete',
      });
      router.push('/');
    } catch (error) {
      setMessage('Failed to delete the record.');
    }
  };

  return (
    <div key={record._id}>
      <div className="card">
        <h5 className="record-name">{record._id}</h5>
        <div className="main-content">
          <p className="record-name">{record.sleepBegin}</p>

          <div className="btn-container">
            <Link href={`/record/${record._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const doc = await Record.findById(params.id).lean();
  const format = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
  const record = JSON.parse(
    JSON.stringify({
      ...doc,
      _id: doc._id.toString(),
      sleepBegin: format(doc.sleepBegin),
      sleepEnd: format(doc.sleepEnd),
      eatBegin: format(doc.eatBegin),
      eatEnd: format(doc.eatEnd),
    })
  );

  return { props: { record } };
}

export default RecordPage;
