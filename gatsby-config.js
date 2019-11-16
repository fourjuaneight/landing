// Site configuration options
// https://www.gatsbyjs.org/docs/gatsby-config/

module.exports = {
  plugins: [
    // 'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-transformer-sharp',
    {
      options: {
        background_color: '#8f46f6',
        display: 'standalone',
        icon: 'src/images/icon.png',
        name: 'Juan Villela',
        short_name: 'JCV',
        start_url: '/',
        theme_color: '#8f46f6',
      },
      resolve: 'gatsby-plugin-manifest',
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
        output: '/sitemap.xml',
      },
      resolve: 'gatsby-plugin-sitemap',
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
        name: 'fonts',
        path: `${__dirname}/src/fonts/`,
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
        commonmark: true,
        footnotes: true,
        gfm: true,
        pedantic: true,
        plugins: [
          {
            options: {
              rel: 'nofollow noreferrer',
              target: '_blank',
            },
            resolve: 'gatsby-remark-external-links',
          },
          {
            options: {
              classPrefix: 'language-',
              noInlineHighlight: false,
              showLineNumbers: false,
            },
            resolve: 'gatsby-remark-prismjs',
          },
          'gatsby-remark-smartypants',
        ],
      },
      resolve: 'gatsby-transformer-remark',
    },
    {
      options: {
        feeds: [
          {
            output: '/rss.xml',
            query: `
              {
                allMarkdownRemark(
                  limit: 2000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { draft: { ne: true } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        date
                        slug
                        title
                      }
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge => ({
                ...edge.node.frontmatter,
                custom_elements: [{ 'content:encoded': edge.node.html }],
                date: edge.node.frontmatter.date,
                description: edge.node.excerpt,
                guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
              })),
            title: 'Juan Villela',
          },
        ],
        query: `
          {
            site {
              siteMetadata {
                description
                siteUrl
                title
              }
            }
          }
        `,
      },
      resolve: 'gatsby-plugin-feed',
    },
  ],
  siteMetadata: {
    author: 'Juan C Villela',
    description:
      'Freelance Front-End Developer, automation nerd, and astronomy enthusiast.',
    image: '/icons/icon.png',
    siteUrl: '/',
    social: 'fourjuaneight',
    title: 'Juan Villela',
  },
};
