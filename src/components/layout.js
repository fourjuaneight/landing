import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { SkipNavLink } from '@reach/skip-nav';
import { graphql, useStaticQuery } from 'gatsby';

import Footer from './footer';
import Header from './header';
import SEO from './seo';

import color from '../styles/color.module.css';
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
      <SkipNavLink className={cx(color.bgBase, 'sr-only')}>
        Skip to main content
      </SkipNavLink>
      <Header title={title} />
      <main
        id="reach-skip-nav"
        className={cx(color.bgBase, main.main, 'w-full')}
      >
        {children}
      </main>
      <Footer description={description} location={location} social={social} />
      <div className={cx(main.board, 'w-full')} />
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
