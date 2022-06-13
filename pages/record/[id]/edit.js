import { useRouter } from 'next/router';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { Spinner } from 'flowbite-react';
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

  if (error) return <p className="text-center">Failed to load</p>;
  if (!record)
    return (
      <div className="text-center">
        <Spinner color="blue" />
      </div>
    );

  const recordForm = {
    sleepBegin: localize(record.sleepBegin),
    sleepEnd: localize(record.sleepEnd),
    eatBegin: localize(record.eatBegin),
    eatEnd: localize(record.eatEnd),
    sport: record.sport,
  };

  return (
    <div className="mx-auto w-80">
      <RecordForm
        formId="edit-record-form"
        recordForm={recordForm}
        forNewRecord={false}
      />
    </div>
  );
};

export default EditRecord;
