// Site configuration options
// https://www.gatsbyjs.org/docs/gatsby-config/
require('dotenv').config();
const { resolve } = require('path');
const config = require('./config/siteConfig');

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-sitemap',
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
        defaultLayouts: {
          default: resolve(__dirname, 'src/templates', 'single.js'),
        },
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
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
              classPrefix: 'language-',
              noInlineHighlight: false,
              showLineNumbers: false,
            },
            resolve: 'gatsby-remark-prismjs',
          },
        ],
      },
      resolve: 'gatsby-plugin-mdx',
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
        path: `${__dirname}/src/posts/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        name: 'single',
        path: `${__dirname}/src/single/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        typeName: 'Erebor',
        fieldName: 'erebor',
        url: process.env.EREBOR_ENDPOINT,
        headers: {
          'Content-Type': 'application/json',
          'X-Hasura-Admin-Secret': process.env.EREBOR_KEY,
        },
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
                allMdx(
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
                      }
                      html
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map(
                ({
                  node: {
                    excerpt,
                    fields: { slug },
                    frontmatter,
                    html,
                  },
                }) => ({
                  ...frontmatter,
                  description: excerpt,
                  date: frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/posts${slug}`,
                  guid: `${site.siteMetadata.siteUrl}/posts${slug}`,
                  custom_elements: [{ 'content:encoded': html }],
                })
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
      resolve: 'gatsby-plugin-feed-mdx',
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
