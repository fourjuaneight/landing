import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import usePost from './util/usePost';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Form = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [{ fetching, success, error }, doPost] = usePost({
    url: 'https://usebasin.com/f/56c75ba2ecb0',
    data,
  });

  // update data values on input change
  const updateData = event =>
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  const toggleSent = curr => {
    // reset form
    setData({
      ...data,
      name: '',
      email: '',
      message: '',
    });
    // set send to current fetching status
    setSent(curr);
    // reset send after 5 seconds
    setTimeout(() => {
      setSent(false);
    }, 5000);
  };

  useEffect(() => {
    if (fetching) {
      return;
    }
    if (success) {
      toggleSent(success);
    }
    if (error) {
      console.error(error);
      throw error;
    }
  }, [fetching, success, error]);

  const handleSubmit = evt => {
    evt.preventDefault();

    doPost(true);
  };

  return (
    <form
      className={cx(
        base.flex,
        base.flexColumn,
        base.itemsStart,
        base.justifyStart,
        base.w100,
        main.form
      )}
      name="Contact"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="bot-field" />
      <div
        className={cx(
          base.flex,
          base.flexColumn,
          base.itemsStart,
          base.justifyStart,
          base.w100
        )}
      >
        <label htmlFor="name">Name</label>
        <input
          data-testid="name"
          className={cx(base.w100)}
          id="name"
          name="name"
          type="text"
          inputMode="text"
          maxLength="256"
          required
          value={data.name}
          onChange={evt => updateData(evt)}
        />
      </div>
      <div
        className={cx(
          base.flex,
          base.flexColumn,
          base.itemsStart,
          base.justifyStart,
          base.w100
        )}
      >
        <label htmlFor="email">Email</label>
        <input
          data-testid="email"
          className={cx(base.w100)}
          id="email"
          name="email"
          type="email"
          inputMode="email"
          maxLength="256"
          required
          value={data.email}
          onChange={evt => updateData(evt)}
        />
      </div>
      <div
        className={cx(
          base.flex,
          base.flexColumn,
          base.itemsStart,
          base.justifyStart,
          base.w100
        )}
      >
        <label htmlFor="message">Message</label>
        <textarea
          data-testid="message"
          className={cx(base.w100)}
          id="message"
          name="message"
          type="text"
          inputMode="text"
          maxLength="256"
          required
          value={data.message}
          onChange={evt => updateData(evt)}
        />
      </div>
      <button type="submit" data-testid="submit" disabled={fetching || sent}>
        <strong>{fetching ? 'Sending' : sent ? 'Sent' : 'Send'}</strong>
      </button>
      {sent && (
        <p className={main.confirmation} data-testid="confirmation">
          Thanks for reaching out! I&apos;ll be in touch shortly.
        </p>
      )}
    </form>
  );
};

export default Form;
