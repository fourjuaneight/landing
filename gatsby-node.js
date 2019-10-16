// APIs setup
// https://www.gatsbyjs.org/docs/node-apis/

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const POST_ARCHIVE_SLUG = `
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
            tags
          }
        }
      }
    }
  }
`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(POST_ARCHIVE_SLUG).then(results => {
      const posts = results.data.allMarkdownRemark.edges;
      posts.forEach(({ node }) => {
        // Create single template
        createPage({
          component: path.resolve('./src/templates/single.js'),
          context: {
            slug: node.frontmatter.slug,
          },
          path: `/blog/${node.frontmatter.slug}`,
        });
      });
      // Create list template
      const postsPerPage = 5;
      const numPages = Math.ceil(posts.length / postsPerPage);
      const list = Array.from({ length: numPages });
      list.forEach(i => {
        createPage({
          component: path.resolve('./src/templates/home.js'),
          context: {
            currentPage: i + 1,
            limit: postsPerPage,
            numPages,
            skip: i * postsPerPage,
          },
          path: i === 0 ? '/' : `/${i + 1}`,
        });
      });
      resolve();
      if (results.errors) {
        console.error(results.errors);
        reject(results.errors);
      }
    });
  });
};

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ getNode, node });
    createNodeField({
      name: 'slug',
      node,
      value,
    });
  }
};
