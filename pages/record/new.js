import Form from '@/components/RecordForm';
import dayjs from 'dayjs';

const NewRecord = () => {
  const now = dayjs().startOf('hour');
  const recordForm = {
    sleepBegin: now,
    sleepEnd: now,
    eatBegin: now,
    eatEnd: now,
    sport: 0,
  };

  return (
    <div className="mx-auto w-80">
      <Form formId="add-record-form" recordForm={recordForm} />
    </div>
  );
};

export default NewRecord;
