import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import Footer from './footer';
import Header from './header';
import SEO from './seo';

import base from '../styles/base.module.css';
import main from '../styles/main.module.css';

const Layout = ({
  children,
  code,
  location,
  pageDescription,
  pageTitle,
  postPublishDate,
}) => {
  const {
    site: {
      siteMetadata: { description, social, title },
    },
  } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          social
          title
        }
      }
    }
  `);

  return (
    <>
      <SEO
        code={code}
        pageDescription={pageDescription}
        pageTitle={pageTitle}
        location={location}
        postPublishDate={postPublishDate}
      />
      <Header title={title} />
      <main className={cx(base.w100, main.main)}>{children}</main>
      <Footer description={description} social={social} />
      <div className={cx(base.absolute, base.w100, main.noise)} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  code: PropTypes.bool,
  location: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  postPublishDate: PropTypes.string,
};

Layout.defaultProps = {
  code: false,
  pageDescription: null,
  pageTitle: null,
  postPublishDate: null,
};

export default Layout;
