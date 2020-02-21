// Site configuration options
// https://www.gatsbyjs.org/docs/gatsby-config/
require('dotenv').config();
const { resolve } = require('path');
const config = require('./config/siteConfig');

module.exports = {
  plugins: [
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    {
      options: {
        background_color: config.background,
        display: 'standalone',
        icon: 'src/images/icon.png',
        name: config.title,
        short_name: config.shortName,
        start_url: '/',
        theme_color: config.theme,
      },
      resolve: 'gatsby-plugin-manifest',
    },
    {
      options: {
        headers: {
          "/images/*": [
            "Cache-Control: public, s-max-age=604800",
          ],
        },
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
      resolve: 'gatsby-plugin-netlify',
    },
    {
      options: {
        host: config.siteUrl,
        policy: [
          {
            allow: '/',
            disallow: ['/microblog/*', '/microblog/'],
            userAgent: '*',
          },
        ],
        sitemap: `${config.siteUrl}sitemap.xml`,
      },
      resolve: 'gatsby-plugin-robots-txt',
    },
    {
      options: {
        defaultQuality: 100,
        stripMetadata: true,
      },
      resolve: 'gatsby-plugin-sharp',
    },
    {
      options: {
        prettier: true,
        svgo: true,
        svgoConfig: {
          plugins: {
            cleanupIDs: true,
            removeViewBox: true,
          },
        },
      },
      resolve: 'gatsby-plugin-svgr',
    },
    {
      options: {
        name: 'posts',
        path: resolve(__dirname, 'src/posts/'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'images',
        path: resolve(__dirname, 'src/images'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'single',
        path: resolve(__dirname, 'src/single'),
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        fieldName: 'erebor',
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-Admin-Secret': process.env.EREBOR_KEY,
        },
        refetchInterval: 60,
        typeName: 'Erebor',
        url: process.env.EREBOR_ENDPOINT,
      },
      resolve: 'gatsby-source-graphql',
    },
    {
      options: {
        commonmark: true,
        footnotes: true,
        gfm: true,
        pedantic: true,
        plugins: [
          'gatsby-remark-smartypants',
          {
            options: {
              rel: 'nofollow noreferrer',
              target: '_blank',
            },
            resolve: 'gatsby-remark-external-links',
          },
          {
            options: {
              footnoteBackRefDisplay: 'inline',
              footnoteBackRefInnerText: '^',
              footnoteBackRefPreviousElementDisplay: 'inline',
              useFootnoteMarkerText: false,
            },
            resolve: 'gatsby-remark-footnotes',
          },
          {
            options: {
              maxWidth: 512,
            },
            resolve: 'gatsby-remark-images',
          },
          {
            options: {
              classPrefix: 'language-',
              noInlineHighlight: false,
              showLineNumbers: false,
            },
            resolve: 'gatsby-remark-prismjs',
          },
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
    {
      options: {
        feeds: [
          {
            output: '/index.xml',
            query: `
              {
                allMarkdownRemark(
                  limit: 2000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {
                    fileAbsolutePath: { regex: "/posts/" }
                    frontmatter: { draft: { eq: false } }
                  }
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 272)
                      fields {
                        slug
                      }
                      frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        title
                        url
                      }
                      html
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(
                ({ node: { excerpt, fields, frontmatter, html } }) => {
                  const link = frontmatter.url
                    ? frontmatter.url
                    : `${config.siteUrl}${fields.slug}`;

                  return {
                    ...frontmatter,
                    description: excerpt,
                    date: frontmatter.date,
                    url: link,
                    guid: link,
                    custom_elements: [{ 'content:encoded': html }],
                  };
                }
              ),
            title: config.title,
          },
        ],
        query: `
          {
            site {
              siteMetadata {
                description
                siteUrl
                site_url: siteUrl
                title
              }
            }
          }
        `,
      },
      resolve: 'gatsby-plugin-feed',
    },
    {
      options: {
        exclude: ['/microblog/*'],
      },
      resolve: 'gatsby-plugin-sitemap',
    },
  ],
  siteMetadata: {
    author: config.author,
    description: config.description,
    language: config.language,
    siteUrl: config.siteUrl,
    social: config.social,
    theme: config.theme,
    title: config.title,
  },
};
