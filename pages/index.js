import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';

import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const Calendar = dynamic(() => import('@/components/Calendar'), {
  ssr: false,
});

const Line = dynamic(() => import('@/components/Line'), {
  ssr: false,
});

const Index = ({ records }) => {
  console.log(records);
  const heatData = Array(30)
    .fill(null)
    .map((m, i) => {
      return {
        value: i,
        day: dayjs('2022-01-01')
          .add(dayjs.duration({ days: i }))
          .format('YYYY-MM-DD'),
      };
    });
  const trendData = records.map((record) => {
    const sleepDuration = dayjs(record.sleepEnd).diff(
      dayjs(record.sleepBegin),
      'hour'
    );
    const eatDuration = dayjs(record.eatEnd).diff(
      dayjs(record.eatBegin),
      'hour'
    );
    const sportDuration = record.sport / 60;
    return {
      date: dayjs(record.sleepEnd).format('MM-DD'),
      sleepDuration,
      eatDuration,
      sportDuration,
    };
  });
  return (
    <>
      <div style={{ height: '400px', width: '920px' }}>
        <Calendar data={heatData} />
      </div>
      <div style={{ height: '400px', width: '920px' }}>
        <Line
          data={[
            {
              id: 'sleep',
              color: 'hsl(83, 70%, 50%)',
              data: trendData.map((item) => ({
                x: item.date,
                y: item.sleepDuration,
              })),
            },
            {
              id: 'eat',
              color: 'hsl(331, 70%, 50%)',
              data: trendData.map((item) => ({
                x: item.date,
                y: item.eatDuration,
              })),
            },
            {
              id: 'sport',
              color: 'hsl(105, 70%, 50%)',
              data: trendData.map((item) => ({
                x: item.date,
                y: item.sportDuration,
              })),
            },
          ]}
        />
      </div>
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const result = await Record.find({}).sort('sleepBegin').lean();
  const records = result.map((doc) => {
    return JSON.parse(
      JSON.stringify({
        ...doc,
        _id: doc._id.toString(),
        sleepBegin: doc.sleepBegin,
        sleepEnd: doc.sleepEnd,
        eatBegin: doc.eatBegin,
        eatEnd: doc.eatEnd,
      })
    );
  });

  return { props: { records: records } };
}

export default Index;
