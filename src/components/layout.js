import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

import ThemeContext from '../context/themeContext';
import { BgNoise, Main } from './util/styleEl';

import Footer from './footer';
import Header from './header';
import SEO from './seo';

// Noise
import Noise from './noise.worker';
const worker = typeof window === 'object' && new Noise();

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
  const [noise, setNoise] = useState(null);

  useEffect(() => {
    if (window.Worker) {
      worker.noise(64);

      worker.onmessage = evt => {
        setNoise(evt.data.result);
      };
    }
  }, []);

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
      <Main>{children}</Main>
      <Footer description={description} social={social} />
      <BgNoise bg={noise} />
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
