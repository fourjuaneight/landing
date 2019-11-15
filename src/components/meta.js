import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const Meta = ({ pageDescription, pageTitle, pathname }) => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
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

  const {
    site: {
      siteMetadata: { author, description, image, siteUrl, social, title },
    },
  } = data;
  const dynamicTitle = pageTitle ? `${pageTitle} | ${title}` : title;

  return (
    <Helmet defaultTitle={dynamicTitle}>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
      />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta property="developer" content={author} />
      <meta name="description" content={pageDescription || description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={dynamicTitle} />
      <meta
        property="og:description"
        content={pageDescription || description}
      />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta property="twitter:site" content={social} />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta
        name="twitter:description"
        content={pageDescription || description}
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={dynamicTitle} />
      <link
        rel="mask-icon"
        color="#8f46f6"
        href={`${siteUrl}/icons/safari-pinned-tab.svg`}
      />
    </Helmet>
  );
};

Meta.propTypes = {
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

export default Meta;
