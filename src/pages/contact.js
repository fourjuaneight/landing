import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Layout from '../components/layout';
import Title from '../components/title';
import { Form } from '../components/util/styleEl';

const encode = data =>
  Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const Contact = ({ location }) => {
  const [sending, setSending] = useState(false);
  const { handleSubmit, register } = useForm({
    nativeValidation: true,
    submitFocusError: true,
  });

  const sendForm = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
    }, 3000);
  };

  const onSubmit = (data, evt) => {
    evt.target.reset();

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    })
      .then(sendForm())
      .catch(error => console.error(error));
  };
  return (
    <Layout location={location}>
      <section>
        <Title text="Contact" />
        <p>
          If you want to get in contact to talk business or need to get a hold
          of me, just shoot me a message and I&apos;ll get back to you within 24
          hours.
        </p>
        <Form
          name="Contact"
          method="POST"
          netlify-honeypot="bot-field"
          netlify
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="bot-field" />
          <input
            type="hidden"
            name="form-name"
            value="contact"
            ref={register}
          />
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              inputMode="text"
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              inputMode="email"
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
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
        </Form>
      </section>
    </Layout>
  );
};

Contact.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Contact;
