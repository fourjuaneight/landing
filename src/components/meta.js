import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const Meta = ({ description, pageDescription, pageTitle, pathname }) => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          author
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
      siteMetadata: { author, image, siteUrl, social, title },
    },
  } = data;

  return (
    <Helmet defaultTitle={title} titleTemplate={`${pageTitle} | ${title}`}>
      <html lang="en" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
      />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta property="author" content={author} />
      <meta itemProp="description" content={pageDescription || description} />
      <meta itemProp="name" content={title} />
      <meta
        property="og:description"
        content={pageDescription || description}
      />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta
        property="twitter:description"
        content={pageDescription || description}
      />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />
      <meta property="twitter:site" content={social} />
      <meta property="twitter:title" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <link
        rel="mask-icon"
        color="#8f46f6"
        href={`${siteUrl}/icons/safari-pinned-tab.svg`}
      />
    </Helmet>
  );
};

Meta.propTypes = {
  description: PropTypes.string.isRequired,
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

export default Meta;
