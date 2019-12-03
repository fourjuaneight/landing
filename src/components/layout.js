import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { Global, css } from '@emotion/core';

import ThemeContext from '../context/themeContext';
import { Main } from './util/styleEl';

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
      <Global
        styles={css`
          article,
          div,
          dl,
          footer,
          header,
          main,
          nav,
          picture,
          section {
            width: 100%;
          }

          article > section,
          dl,
          header > div,
          nav {
            justify-content: space-between;
          }

          article > section,
          dl,
          nav {
            align-items: center;
            display: flex;
          }

          dl a,
          footer,
          header,
          header > div > a,
          #gatsby-focus-wrapper {
            position: relative;
          }

          footer,
          header,
          header > div,
          #gatsby-focus-wrapper {
            display: grid;
          }

          #gatsby-focus-wrapper {
            grid-template-columns: minmax(1.5rem, 1fr) minmax(0.75rem, 56.25rem) minmax(
                1.5rem,
                1fr
              );
            grid-template-rows: repeat(3, auto);
          }
        `}
      />
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
