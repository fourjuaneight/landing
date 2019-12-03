import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const SEO = ({ pageDescription, pageTitle, postPublishDate, pathname }) => {
  const { fc, icon, meta, rb, rr, spt } = useStaticQuery(graphql`
    query HelmetQuery {
      meta: site {
        siteMetadata {
          author
          description
          siteUrl
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
      rr: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/(?!.*sub)^Rubik-Regular.*$/" }
        }
        sort: { fields: ext, order: DESC }
      ) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }
      rb: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/(?!.*sub)^Rubik-Bold.*$/" }
        }
        sort: { fields: ext, order: DESC }
      ) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }
      fc: allFile(
        filter: { dir: { regex: "/fonts/" }, name: { regex: "/FiraCode/" } }
        sort: { fields: ext, order: DESC }
      ) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }
    }
  `);

  const {
    siteMetadata: { author, description, siteUrl, social, theme, title },
  } = meta;
  const dynamicTitle = pageTitle ? `${pageTitle} | ${title}` : title;
  const dynamicDesc = pageDescription || description;
  let schemaOrgJSONLD = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: dynamicTitle,
    url: `${siteUrl}/`,
  };
  /* eslint-disable sort-keys */
  if (pathname.match(/posts\/.*\//)) {
    schemaOrgJSONLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}${pathname}`,
      },
      headline: pageTitle,
      image: `${siteUrl}${icon.fixed.src}`,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${icon.fixed.src}`,
        },
      },
      datePublished: postPublishDate,
      dateModified: postPublishDate,
    };
  }
  /* eslint-enable */
  const fontFace = `
    @font-face {
      font-family: Rubik;
      src:
        ${rr.edges.map(
          ({ node }) => `url(${node.publicURL}) format('${node.extension}')`
        )};
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: Rubik;
      src:
        ${rb.edges.map(
          ({ node }) => `url(${node.publicURL}) format('${node.extension}')`
        )};
      font-weight: 700;
      font-style: normal;
      font-display: swap;
    }
    
    @font-face {
      font-family: Fira Code;
      src:
        ${fc.edges.map(
          ({ node }) => `url(${node.publicURL}) format('${node.extension}')`
        )};
      font-weight: 400;
      font-style: normal;
      font-display: swap;
    }
  `;

  return (
    <Helmet defaultTitle={dynamicTitle}>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
      />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta property="author" content={author} />
      <meta name="description" content={dynamicDesc} />
      <meta name="image" content={`${siteUrl}${icon.fixed.src}`} />
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
      <meta property="og:description" content={dynamicDesc} />
      <meta property="og:image" content={`${siteUrl}${icon.fixed.src}`} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={dynamicTitle} />
      <meta
        property="og:type"
        content={pathname.match(/posts\/.*\//) ? 'article' : 'website'}
      />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={dynamicDesc} />
      <meta name="twitter:image" content={`${siteUrl}${icon.fixed.src}`} />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta property="twitter:site" content={social} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={dynamicTitle} />
      <link rel="mask-icon" color={theme} href={`${siteUrl}${spt.publicURL}`} />
      <style>{fontFace}</style>
    </Helmet>
  );
};

SEO.propTypes = {
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  postPublishDate: PropTypes.string,
};

export default SEO;
