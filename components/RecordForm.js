import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import dayjs from 'dayjs';
import request from '@/lib/request';
import toast from '@/lib/toast';

const InputStyle =
  'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
const LabelStyle =
  'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300';
const Label = ({ name, text }) => (
  <label htmlFor={name} className={LabelStyle}>
    {text}
  </label>
);
const localize = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
const unlocalize = (date) => dayjs(date).toISOString();
const formatForm = (form) => {
  return {
    ...form,
    sleepBegin: unlocalize(form.sleepBegin),
    sleepEnd: unlocalize(form.sleepEnd),
    eatBegin: unlocalize(form.eatBegin),
    eatEnd: unlocalize(form.eatEnd),
  };
};

const Form = ({ formId, recordForm, forNewRecord = true }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    sleepBegin: localize(recordForm.sleepBegin),
    sleepEnd: localize(recordForm.sleepEnd),
    eatBegin: localize(recordForm.eatBegin),
    eatEnd: localize(recordForm.eatEnd),
    sport: recordForm.sport,
  });

  const putData = async (form) => {
    const { id } = router.query;
    setLoading(true);
    try {
      const { code, data } = await request.put(
        `/records/${id}`,
        formatForm(form)
      );
      if (code === 0) {
        toast.success('Updated successfully');
        mutate(`/api/records/${id}`, data, false); // Update the local data without a revalidation
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const postData = async (form) => {
    setLoading(true);
    try {
      const { code } = await request.post('/records', formatForm(form));
      if (code === 0) {
        toast.success('Added successfully');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      if (loading) return;
      forNewRecord ? postData(form) : putData(form);
    }
  };

  /* Makes sure record info is filled for record name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    // if (!form.eatBegin) err.eatBegin = 'EatBegin is required';
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit} className="w-full">
        <div className="mb-6">
          <Label name="sleepBegin" text="卧床时间开始" />
          <input
            className={InputStyle}
            name="sleepBegin"
            type="datetime-local"
            value={form.sleepBegin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Label name="sleepEnd" text="卧床时间结束" />
          <input
            className={InputStyle}
            name="sleepEnd"
            type="datetime-local"
            value={form.sleepEnd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Label name="eatBegin" text="进食开始" />
          <input
            className={InputStyle}
            name="eatBegin"
            type="datetime-local"
            value={form.eatBegin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Label name="eatEnd" text="进食结束" />
          <input
            className={InputStyle}
            name="eatEnd"
            type="datetime-local"
            value={form.eatEnd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <Label name="sport" text="运动时长" />
          <input
            className={InputStyle}
            type="number"
            name="sport"
            value={form.sport}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </>
  );
};

export default Form;
