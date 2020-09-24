// Site configuration options
// https://www.gatsbyjs.org/docs/gatsby-config/
require('dotenv').config();
const { resolve } = require('path');
const tailwind = require('tailwindcss');

const { fmtDate } = require('./config/datefn');
const config = require('./config/siteConfig');
const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  plugins: [
    'gatsby-plugin-postcss',
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
          '/images/*': ['Cache-Control: public, s-max-age=604800'],
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
        postCssPlugins: [tailwind, tailwindConfig],
      },
      resolve: 'gatsby-plugin-sass',
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
          plugins: [{ cleanupIDs: true }, { removeViewBox: true }],
        },
      },
      resolve: 'gatsby-plugin-svgr',
    },
    {
      options: {
        isTSX: true,
        allExtensions: true,
      },
      resolve: 'gatsby-plugin-typescript',
    },
    {
      options: {
        apiKey: process.env.AIRTABLE_KEY,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: process.env.AIRTABLE_TABLE_NAME,
          },
        ],
      },
      resolve: 'gatsby-source-airtable',
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
        commonmark: true,
        footnotes: true,
        gfm: true,
        pedantic: true,
        plugins: [
          'gatsby-remark-smartypants',
          {
            options: {
              rel: 'noopener noreferrer',
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
                    author: 'Juan Villela',
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
          {
            output: 'microblog/index.xml',
            query: `
              {
                allAirtable(sort: {fields: data___date, order: DESC}) {
                  nodes {
                    data {
                      date
                      tweet
                    }
                    fields {
                      twtId
                    }
                  }
                }
              }
            `,
            serialize: ({
              query: {
                allAirtable: { nodes },
              },
            }) =>
              nodes.map(({ data: { date, tweet }, fields: { twtId } }) => {
                const link = `${config.siteUrl}microblog/${twtId}/`;

                return {
                  title: `${fmtDate(date)}`,
                  author: 'Juan Villela',
                  date,
                  url: link,
                  guid: link,
                  custom_elements: [{ 'content:encoded': `<p>${tweet}</p>` }],
                };
              }),
            title: `Microblog | ${config.title}`,
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
