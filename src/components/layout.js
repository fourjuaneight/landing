import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ThemeContext from '../context/themeContext';
import { mHorizontal, pb2, pt2, w100 } from './util/styleUtils';

import Footer from './footer';
import Header from './header';
import SEO from './seo';

const Main = styled.main`
  ${mHorizontal};
  ${pb2};
  ${pt2};
  ${w100};
  grid-column: 2/3;
  grid-row: 2/3;
  min-height: calc(100vh - 22rem);
`;

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
