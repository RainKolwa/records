import { useState } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import dayjs from 'dayjs';

const Form = ({ formId, recordForm, forNewRecord = true }) => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    sleepBegin: recordForm.sleepBegin,
    sleepEnd: recordForm.sleepEnd,
    eatBegin: recordForm.eatBegin,
    eatEnd: recordForm.eatEnd,
    sport: recordForm.sport,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/records/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/records/${id}`, data, false); // Update the local data without a revalidation
      router.push('/');
    } catch (error) {
      setMessage('Failed to update record');
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add record');
    }
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
      forNewRecord ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure record info is filled for record name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.eatBegin) err.eatBegin = 'EatBegin is required';
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="sleepBegin">SleepBegin</label>
        <input
          name="sleepBegin"
          type="datetime-local"
          value={form.sleepBegin}
          onChange={handleChange}
          required
        />

        <label htmlFor="sleepEnd">SleepEnd</label>
        <input
          name="sleepEnd"
          type="datetime-local"
          value={form.sleepEnd}
          onChange={handleChange}
          required
        />

        <label htmlFor="eatBegin">EatBegin</label>
        <input
          name="eatBegin"
          type="datetime-local"
          value={form.eatBegin}
          onChange={handleChange}
          required
        />

        <label htmlFor="eatEnd">EatEnd</label>
        <input
          name="eatEnd"
          type="datetime-local"
          value={form.eatEnd}
          onChange={handleChange}
          required
        />

        <label htmlFor="sport">SportTime</label>
        <input
          type="number"
          name="sport"
          value={form.sport}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default Form;
