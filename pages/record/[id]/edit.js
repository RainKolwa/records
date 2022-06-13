import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';
import RecordForm from '@/components/RecordForm';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const localize = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');

const EditRecord = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: record, error } = useSWR(
    id ? `/api/records/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!record) return <p>Loading...</p>;

  const recordForm = {
    sleepBegin: localize(record.sleepBegin),
    sleepEnd: localize(record.sleepEnd),
    eatBegin: localize(record.eatBegin),
    eatEnd: localize(record.eatEnd),
    sport: record.sport,
  };

  return (
    <RecordForm
      formId="edit-record-form"
      recordForm={recordForm}
      forNewRecord={false}
    />
  );
};

export default EditRecord;
