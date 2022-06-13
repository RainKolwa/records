import dayjs from 'dayjs';
import Form from '@/components/RecordForm';

const localize = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const NewRecord = () => {
  const now = localize(new Date().valueOf());
  const recordForm = {
    sleepBegin: now,
    sleepEnd: now,
    eatBegin: now,
    eatEnd: now,
    sport: 0,
  };

  return <Form formId="add-record-form" recordForm={recordForm} />;
};

export default NewRecord;
