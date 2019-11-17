import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import Header from './header';
import Meta from './meta';
import Footer from './footer';

import '../styles/critical.scss';

const Layout = ({ children, location, pageDescription, pageTitle }) => {
  const {
    site: {
      siteMetadata: { author, description, image, siteUrl, social, title },
    },
  } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          author
          description
          image
          siteUrl
          social
          title
        }
      }
    }
  `);

  return (
    <>
      <Meta
        author={author}
        description={description}
        image={image}
        pageDescription={pageDescription}
        pathname={location.pathname}
        pageTitle={pageTitle}
        siteUrl={siteUrl}
        social={social}
        title={title}
      />
      <Header title={title} />
      <main
        className={cx(styles.mHorizontal, styles.pb2, styles.pt2, styles.w100)}
      >
        {children}
      </main>
      <Footer author={author} description={description} social={social} />
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
};

Layout.defaultProps = {
  location: {
    pathname: '',
  },
};

export default Layout;
