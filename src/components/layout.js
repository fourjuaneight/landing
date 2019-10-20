import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';

import Meta from './meta';

const Layout = ({ children, location, pageDescription, pageTitle }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          description
        }
      }
    }
  `);

  const {
    site: {
      siteMetadata: { description },
    },
  } = data;

  return (
    <>
      <Meta
        pageDescription={pageDescription || description}
        pathname={location.pathname}
        pageTitle={pageTitle}
      />
      <main>{children}</main>
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
