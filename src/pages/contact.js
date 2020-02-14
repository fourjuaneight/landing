import React from 'react';
import PropTypes from 'prop-types';

import From from '../components/contact';
import Layout from '../components/layout';
import Title from '../components/title';

import base from '../styles/base.module.css';

const Contact = ({ location }) => {
  return (
    <Layout location={location}>
      <section className={base.w100}>
        <Title>Contact</Title>
        <p>
          If you want to get in contact to talk business or need to get a hold
          of me, just shoot me a message and I&apos;ll get back to you within 24
          hours.
        </p>
        <From />
      </section>
    </Layout>
  );
};

Contact.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Contact;
