import { ResponsiveCalendar } from '@nivo/calendar';
import dayjs from 'dayjs';

const MyResponsiveCalendar = ({ data, year = dayjs().year() }) => {
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;
  return (
    <ResponsiveCalendar
      data={data}
      from={start}
      to={end}
      emptyColor="#eeeeee"
      colors={['#f47560', '#61cdbb']}
      minValue={0}
      maxValue={100}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={70}
      yearLegendOffset={19}
      monthBorderWidth={0}
      monthBorderColor="#ffffff"
      daySpacing={2}
      dayBorderWidth={3}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left',
        },
      ]}
    />
  );
};

export default MyResponsiveCalendar;
