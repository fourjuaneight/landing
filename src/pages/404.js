import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Err = ({ location }) => (
  <Layout location={location}>
    <section className={base.w100}>
      <h1 className={main.errTitle}>Page doesn&rsquo;t exit.</h1>
      <h3 className={main.errSubtitle}>
        But I guess, neither do we... What is reality, really?
      </h3>
    </section>
  </Layout>
);

Err.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Err;
