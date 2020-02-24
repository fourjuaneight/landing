import React, { useEffect, useState } from 'react';
import cx from 'classnames';

import getValues from './util/getValues';
import usePost from './util/usePost';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Form = () => {
  const [data, setData] = useState(null);
  const [sent, setSent] = useState(false);
  const { fetching, success, error } = usePost({
    url: 'https://usebasin.com/f/56c75ba2ecb0',
    data,
  });
  const toggleSent = curr => {
    setSent(curr);
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

    setData(getValues(evt.target));
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
          className={cx(base.w100)}
          id="name"
          name="name"
          type="text"
          inputMode="text"
          data-testid="name"
          required
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
          className={cx(base.w100)}
          id="email"
          name="email"
          type="text"
          inputMode="email"
          data-testid="email"
          required
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
          className={cx(base.w100)}
          id="message"
          name="message"
          type="text"
          inputMode="text"
          data-testid="message"
          required
        />
      </div>
      <button type="submit" data-testid="submit" disabled={sent}>
        <strong>{sent ? 'Sent' : 'Send'}</strong>
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
