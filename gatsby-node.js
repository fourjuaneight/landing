// APIs setup
// https://www.gatsbyjs.org/docs/node-apis/

const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({
  actions: { replaceWebpackConfig },
  getConfig,
  stage,
}) => {
  const config = getConfig();

  let options = {};

  if (stage === 'build-javascript') {
    config.optimization.moduleIds = 'total-size';
    options = { name: 'ww-[1]', regExp: '(\\w+).worker.js' };
  }

  config.module.rules.push({
    test: /\.worker\.js$/,
    use: [{ loader: 'workerize-loader', options }],
  });

  config.output.globalObject = 'this';

  replaceWebpackConfig(config);
};

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
    /* eslint-enable */
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
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
      path: `/${fieldValue}/`,
    });
  });
};
