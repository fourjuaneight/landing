// APIs setup
// https://www.gatsbyjs.org/docs/node-apis/

const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

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
  if (node.internal.type === 'Mdx') {
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
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
    {
      posts: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { appearance: { eq: false }, draft: { eq: false } }
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
      }
      tags: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        group(field: frontmatter___tag) {
          fieldValue
        }
      }
      erebor {
        tweets {
          id
        }
      }
    }
  `);
  const { edges } = result.data.posts;
  const { group } = result.data.tags;
  const { tweets } = result.data.erebor;

  // Create single template
  edges.forEach(({ node }) => {
    createPage({
      component: resolve('./src/templates/single.js'),
      context: {
        slug: node.fields.slug,
      },
      path: `/posts${node.fields.slug}`,
    });
  });

  // Create taxonomies template
  group.forEach(({ fieldValue }) => {
    createPage({
      component: resolve('./src/templates/taxonomies.js'),
      context: {
        tag: fieldValue,
      },
      path: `/${fieldValue}/`,
    });
  });

  // Create taxonomies template
  tweets.forEach(({ id }) => {
    createPage({
      component: resolve('./src/templates/tweets.js'),
      context: {
        id,
      },
      path: `/status/${id}/`,
    });
  });

  // Netlify redirects
  createRedirect({
    fromPath: '/tags/yearly-theme',
    toPath: '/yearly-theme/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/tags/life',
    toPath: '/life/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/tags/development',
    toPath: '/development/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/tags/productivity',
    toPath: '/productivity/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/tags/procrastination',
    toPath: '/procrastination/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/posts/success/',
    toPath: '/posts/',
    isPermanent: true,
    force: true,
  });

  createRedirect({
    fromPath: '/spreadsheets/',
    toPath: '/posts/spreadsheets/',
    isPermanent: true,
    force: true,
  });
};
