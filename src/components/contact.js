import React, { useState } from 'react';
import { post } from 'axios';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Form = () => {
  const [sent, setSent] = useState(false);
  const { handleSubmit, register } = useForm({
    nativeValidation: true,
    submitFocusError: true,
  });

  const toggleSent = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  const onSubmit = (data, evt) => {
    evt.target.reset();

    post('https://usebasin.com/f/56c75ba2ecb0', data)
      .then(toggleSent())
      .catch(error => console.error(error));
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
      onSubmit={handleSubmit(onSubmit)}
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
          ref={register({ required: true })}
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
          ref={register({ required: true })}
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
          ref={register({ required: true })}
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
