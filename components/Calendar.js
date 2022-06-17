import { ResponsiveCalendar } from '@nivo/calendar';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import useThemeMode from '../hooks/useThemeMode';

const MyResponsiveCalendar = ({ data, year = dayjs().year() }) => {
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;
  const colors = {
    dark: 'red',
    light: 'gray',
  };
  const isDark = useThemeMode();
  console.log('isDark', isDark);
  const [emptyColor, setEmptyColor] = useState(
    isDark ? colors.dark : colors.light
  );
  useEffect(() => {
    if (isDark) {
      setEmptyColor(colors.dark);
    } else {
      setEmptyColor(colors.light);
    }
  }, [isDark]);
  return (
    <ResponsiveCalendar
      data={data}
      from={start}
      to={end}
      emptyColor={emptyColor}
      colors={['#f47560', '#61cdbb']}
      minValue={0}
      maxValue={100}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      yearSpacing={70}
      yearLegend={() => ''}
      yearLegendOffset={19}
      monthBorderWidth={0}
      monthBorderColor="#ffffff"
      daySpacing={2}
      dayBorderWidth={1}
      dayBorderColor="#ffffff"
      tooltip={(data) => {
        if (data.value === undefined) return null;
        return (
          <div
            style={{
              color: 'white',
              backgroundColor: 'black',
              padding: '10px',
              fontSize: '14px',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{data.day}</div>
            <ul>
              <li>Sleep: {data?.data.sleep} h</li>
              <li>Eat: {data?.data.eat} h</li>
              <li>Sport: {data?.data.sport} min</li>
            </ul>
          </div>
        );
      }}
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
