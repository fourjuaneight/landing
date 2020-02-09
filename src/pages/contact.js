import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { post } from 'axios';
import { useForm } from 'react-hook-form';
import cx from 'classnames';

import Layout from '../components/layout';
import Title from '../components/title';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Contact = ({ location }) => {
  const [sending, setSending] = useState(false);
  const { handleSubmit, register } = useForm({
    nativeValidation: true,
    submitFocusError: true,
  });

  const toggleSending = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 3000);
  };

  const onSubmit = (data, evt) => {
    evt.target.reset();

    post('https://usebasin.com/f/56c75ba2ecb0', data)
      .then(toggleSending())
      .catch(error => console.error(error));
  };
  return (
    <Layout location={location}>
      <section className={base.w100}>
        <Title text="Contact" />
        <p>
          If you want to get in contact to talk business or need to get a hold
          of me, just shoot me a message and I&apos;ll get back to you within 24
          hours.
        </p>
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
              ref={register({ required: true })}
            />
          </div>
          <button type="submit" disabled={sending}>
            <strong>{sending ? 'Sent' : 'Send'}</strong>
          </button>
        </form>
      </section>
    </Layout>
  );
};

Contact.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Contact;
