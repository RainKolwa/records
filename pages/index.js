import Link from 'next/link';
import dbConnect from '../lib/dbConnect';
import Record from '../models/Record';
import dayjs from 'dayjs';

const Index = ({ records }) => (
  <table className="record-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Sleep Begin</th>
        <th>Sleep End</th>
        <th>Eat Begin</th>
        <th>Eat End</th>
        <th>Sport</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record._id}>
          <td>{record._id}</td>
          <td>{record.sleepBegin}</td>
          <td>{record.sleepEnd}</td>
          <td>{record.eatBegin}</td>
          <td>{record.eatEnd}</td>
          <td>{record.sport} min</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

/* Retrieves record(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const result = await Record.find({}).lean();
  const format = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');
  const records = result.map((doc) => {
    return JSON.parse(
      JSON.stringify({
        _id: doc._id.toString(),
        sleepBegin: format(doc.sleepBegin),
        sleepEnd: format(doc.sleepEnd),
        eatBegin: format(doc.eatBegin),
        eatEnd: format(doc.eatEnd),
        sport: doc.sport,
      })
    );
  });

  return { props: { records: records } };
}

export default Index;
