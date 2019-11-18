import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const Meta = ({ pageDescription, pageTitle, pathname }) => {
  const {
    bold,
    fc,
    meta,
    rb,
    regular,
    rr,
    woff,
    woff2,
  } = useStaticQuery(graphql`
    query HelmetQuery {
      meta: site {
        siteMetadata {
          author
          description
          image
          siteUrl
          social
          title
        }
      }
      woff2: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/sub/" }
          extension: { eq: "woff2" }
        }
      ) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }
      woff: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/sub/" }
          extension: { ne: "woff2" }
        }
      ) {
        edges {
          node {
            publicURL
            extension
          }
        }
      }
      bold: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/(?!.*sub)^Rubik-Bold.*$/" }
        }
        sort: { fields: ext, order: DESC }
      ) {
        edges {
          node {
            extension
            publicURL
          }
        }
      }
      regular: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/(?!.*sub)^Rubik-Regular.*$/" }
        }
        sort: { fields: ext, order: DESC }
      ) {
        edges {
          node {
            extension
            publicURL
          }
        }
      }
      rr: allFile(
        filter: {
          dir: { regex: "/fonts/" }
          name: { regex: "/Rubik-Regular-sub/" }
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
          name: { regex: "/Rubik-Bold-sub/" }
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
    siteMetadata: { author, description, image, siteUrl, social, title },
  } = meta;
  const dynamicTitle = pageTitle ? `${pageTitle} | ${title}` : title;
  const dynamicDesc = pageDescription || description;
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
  const fontLoading = `
      if ('fonts' in document) {
        const regular = new FontFace(
          'Rubik',
          "${regular.edges.map(
            ({ node }) => `url(${node.publicURL}) format('${node.extension}')`
          )}",
        );
        const bold = new FontFace(
          'Rubik',
          "${bold.edges.map(
            ({ node }) => `url(${node.publicURL}) format('${node.extension}')`
          )}",
          { weight: '700' }
        );
        Promise.all([bold.load(), regular.load()]).then(fonts => {
          fonts.forEach(font => {
            document.fonts.add(font);
          });
        });
      }
    `;

  return (
    <Helmet defaultTitle={dynamicTitle}>
      <html data-theme="light" lang="en" />
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1.0,initial-scale=1.0,maximum-scale=5.0,viewport-fit=cover"
      />
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
      <meta property="developer" content={author} />
      <meta name="description" content={dynamicDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={dynamicTitle} />
      <meta property="og:description" content={dynamicDesc} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta property="twitter:site" content={social} />
      <meta name="twitter:title" content={dynamicTitle} />
      <meta name="twitter:description" content={dynamicDesc} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content={dynamicTitle} />
      <link
        rel="mask-icon"
        color="#8f46f6"
        href={`${siteUrl}/icons/safari-pinned-tab.svg`}
      />
      {woff2.edges.map(({ node }, i) => (
        <link
          key={i}
          rel="preload"
          href={node.publicURL}
          as="font"
          type="font/woff2"
          crossOrigin
        />
      ))}
      {woff.edges.map(({ node }, i) => (
        <link
          key={i}
          rel="preload"
          href={node.publicURL}
          as="font"
          type="font/woff"
          crossOrigin
        />
      ))}
      <style>{fontFace}</style>
      <script>{fontLoading}</script>
    </Helmet>
  );
};

Meta.propTypes = {
  pageDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

export default Meta;
