import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import cx from 'classnames';

import styles from '../styles/styles.module.scss';

import ThemeContext from '../context/themeContext';
import Footer from './footer';
import Header from './header';
import SEO from './seo';

const Layout = ({
  children,
  location,
  pageDescription,
  pageTitle,
  postPublishDate,
}) => {
  const {
    site: {
      siteMetadata: { description, language, social, title },
    },
  } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          language
          social
          title
        }
      }
    }
  `);

  const theme = useContext(ThemeContext);

  return (
    <>
      <Helmet>
        <html data-theme={theme.dark ? 'dark' : 'light'} lang={language} />
      </Helmet>
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
