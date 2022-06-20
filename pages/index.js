import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import dbConnect from '@/lib/dbConnect';
import Record from '@/models/Record';
import User from '@/models/User';
import { Card, Avatar, Badge } from 'flowbite-react';

const Calendar = dynamic(() => import('@/components/Calendar'), {
  ssr: false,
});

// const Line = dynamic(() => import('@/components/Line'), {
//   ssr: false,
// });

const Index = ({ data }) => {
  // const trendData = records.map((record) => {
  //   const sleepDuration = dayjs(record.sleepEnd).diff(
  //     dayjs(record.sleepBegin),
  //     'hour'
  //   );
  //   const eatDuration = dayjs(record.eatEnd).diff(
  //     dayjs(record.eatBegin),
  //     'hour'
  //   );
  //   const sportDuration = record.sport / 60;
  //   return {
  //     date: dayjs(record.sleepEnd).format('MM-DD'),
  //     sleepDuration,
  //     eatDuration,
  //     sportDuration,
  //   };
  // });
  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="uppercase text-xl font-bold leading-none text-gray-900 dark:text-white">
            Year of <i>{dayjs().year()}</i>
          </h5>
        </div>
        {data.map(({ user, records }) => {
          const config = records.map((item) => ({
            ...item,
            day: dayjs(item.day).format('YYYY-MM-DD'),
          }));
          return (
            <Card key={user._id} className="mb-4">
              <div className="flow-root">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <Avatar alt="user avatar" img={user.image} rounded={true} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center space-x-1">
                    <span className="dark:text-white">Goals: </span>
                    <Badge color="green">Sleep {'>='} 7h</Badge>
                    <Badge color="green">Eat {'<='} 10h</Badge>
                    <Badge color="green">Sport {'>='} 20min</Badge>
                  </div>
                </div>
                <div className="mt-4 h-36 md:h-40 w-100">
                  <Calendar data={config} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {/* <div style={{ height: '400px', width: '920px' }}>
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
      </div> */}
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const users = await User.find().sort('name').limit(10).lean();
  let data = [];
  const res = await Promise.all(
    users.map(async (user) => {
      return Record.find({
        author: user._id,
        sleepEnd: {
          $gte: dayjs().startOf('year').toISOString(),
          $lt: dayjs().endOf('year').toISOString(),
        },
      })
        .sort('-sleepEnd')
        .lean();
    })
  );
  // res = [records1, records2, records3]
  users.forEach((user, i) => {
    data.push({
      user,
      records: res[i].map((record) => {
        const sleep = dayjs(record.sleepEnd).diff(
          dayjs(record.sleepBegin),
          'hour',
          true
        );
        const eat = dayjs(record.eatEnd).diff(
          dayjs(record.eatBegin),
          'hour',
          true
        );
        const sport = record.sport;
        const total =
          (sleep >= 7 ? 33.3 : 0) +
          (eat <= 10 ? 33.3 : 0) +
          (sport >= 20 ? 33.3 : 0);
        return {
          _id: record._id.toString(),
          day: record.sleepEnd,
          sleep: Number(sleep.toFixed(1)),
          eat: Number(eat.toFixed(1)),
          sport: sport,
          value: total,
        };
      }),
    });
  });

  console.log('data', data);

  return {
    props: { data: data.map((item) => JSON.parse(JSON.stringify(item))) },
  };
}

export default Index;
