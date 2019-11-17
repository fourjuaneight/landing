// APIs setup
// https://www.gatsbyjs.org/docs/node-apis/

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    /* eslint-disable sort-keys, quotes */
    const slug = createFilePath({ node, getNode, basePath: `posts/` });
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
        group(field: frontmatter___tag) {
          fieldValue
        }
      }
    }
  `);
  const posts = result.data.allMarkdownRemark.edges;
  const taxonomies = result.data.allMarkdownRemark.group;

  // Create single template
  posts.forEach(({ node }) => {
    createPage({
      component: path.resolve('./src/templates/single.js'),
      context: {
        slug: node.fields.slug,
      },
      path: `/posts${node.fields.slug}`,
    });
  });

  // Create taxonomies template
  taxonomies.forEach(({ fieldValue }) => {
    createPage({
      component: path.resolve('./src/templates/taxonomies.js'),
      context: {
        tag: fieldValue,
      },
      path: `/tags/${fieldValue}/`,
    });
  });
};
