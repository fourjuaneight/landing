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
            tag
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
          path: `/posts/${node.frontmatter.slug}`,
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
