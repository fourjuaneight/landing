import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const SEO = ({
  code,
  pageDescription,
  pageTitle,
  postPublishDate,
  location,
}) => {
  const { icon, meta, spt } = useStaticQuery(graphql`
    query HelmetQuery {
      meta: site {
        siteMetadata {
          author
          description
          language
          social
          theme
          title
        }
      }
      icon: imageSharp(fixed: { originalName: { regex: "/icon/" } }) {
        fixed {
          src
        }
      }
      spt: file(dir: { regex: "/images/" }, name: { regex: "/safari/" }) {
        publicURL
      }
    }
  `);

  const {
    siteMetadata: { author, description, language, social, theme, title },
  } = meta;
  const dynamicTitle = pageTitle ? `${pageTitle} | ${title}` : title;
  const dynamicDesc = pageDescription || description;
  const baseURL = typeof location.origin !== 'undefined' ? location.origin : '';
  let schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: dynamicTitle,
    url: `${typeof location.origin !== 'undefined' ? location.origin : '/'}`,
  };
  /* eslint-disable sort-keys */
  if (location.pathname.match(/posts\/.*\//)) {
    schemaOrgJSONLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseURL}${location.pathname}`,
      },
      headline: pageTitle,
      image: `${baseURL}${icon.fixed.src}`,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${baseURL}${icon.fixed.src}`,
        },
      },
      datePublished: postPublishDate,
      dateModified: postPublishDate,
    };
  }
  /* eslint-enable */

  const fontFace = `
    if ('fonts' in document) {
      const regular = new FontFace(
        'Nunito',
        "url(/fonts/Nunito-Regular.woff2) format('woff2'), url(/fonts/Nunito-Regular.woff) format('woff')"
      );
      const bold = new FontFace(
        'Nunito',
        "url(/fonts/Nunito-Bold.woff2) format('woff2'), url(/fonts/Nunito-Bold.woff) format('woff')",
        { weight: '700' }
      );
      Promise.all([bold.load(), regular.load()]).then(fonts => {
        for (const font of fonts) {
          document.fonts.add(font);
        }
      });
    }
  `;

  return (
    <Helmet defaultTitle={dynamicTitle}>
      <html lang={language} />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
      />
      <link rel="canonical" href={`${baseURL}${location.pathname}`} />
      <meta property="author" content={author} />
      <meta name="description" content={dynamicDesc} />
      <meta name="image" content={`${baseURL}${icon.fixed.src}`} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:description" content={dynamicDesc} />
      <meta property="og:image" content={`${baseURL}${icon.fixed.src}`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={dynamicTitle} />
      <meta
        property="og:type"
        content={location.pathname.match(/posts\/.*\//) ? 'article' : 'website'}
      />
      <meta property="og:url" content={`${baseURL}${location.pathname}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={dynamicDesc} />
      <meta name="twitter:image" content={`${baseURL}${icon.fixed.src}`} />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta property="twitter:site" content={social} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={dynamicTitle} />
      <link rel="mask-icon" color={theme} href={`${baseURL}${spt.publicURL}`} />
      <script type="text/javascript">{fontFace}</script>
      {code && (
        <link rel="stylesheet" href={`${baseURL}/css/syntax.css`} media="all" />
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  code: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  postPublishDate: PropTypes.string,
};

SEO.defaultProps = {
  pageDescription: null,
  pageTitle: null,
  postPublishDate: null,
};

export default SEO;
