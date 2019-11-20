import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Header from './header';
import SEO from './seo';
import Footer from './footer';

const Layout = ({
  children,
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
        pageDescription={pageDescription}
        pageTitle={pageTitle}
        pathname={location.pathname}
        postPublishDate={postPublishDate}
      />
      <Header title={title} />
      <main
        className={cx(
          styles.main,
          styles.mHorizontal,
          styles.pb2,
          styles.pt2,
          styles.w100
        )}
      >
        {children}
      </main>
      <Footer description={description} social={social} />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  postPublishDate: PropTypes.string,
};

Layout.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Layout;
