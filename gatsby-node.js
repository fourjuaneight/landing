// Node APIs
// https://www.gatsbyjs.org/docs/node-apis/

const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

// Add Web Workers support and file name hashing
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

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  // Create node field for posts only
  if (
    node.internal.type === 'Mdx' &&
    !node.fileAbsolutePath.match(/about/g) &&
    !node.fileAbsolutePath.match(/uses/g)
  ) {
    const slug = createFilePath({ getNode, node });

    createNodeField({
      name: 'slug',
      node,
      value: `posts${slug}`,
    });
  }

  // Create node field for singles only
  if (
    node.internal.type === 'Mdx' &&
    (node.fileAbsolutePath.match(/about/g) ||
      node.fileAbsolutePath.match(/uses/g))
  ) {
    const slug = createFilePath({ getNode, node });

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    });
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
            id
            fields {
              slug
            }
          }
        }
      }
      singles: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/single/" }
          frontmatter: { draft: { eq: false } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
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

  // Extract query results
  const { posts } = result.data;
  const { singles } = result.data;
  const { group } = result.data.tags;
  const { tweets } = result.data.erebor;

  // Create blog posts
  posts.edges.forEach(({ node }) => {
    createPage({
      component: resolve('./src/templates/post.js'),
      context: {
        id: node.id,
      },
      path: node.fields.slug,
    });
  });

  // Create single pages
  singles.edges.forEach(({ node }) => {
    createPage({
      component: resolve('./src/templates/single.js'),
      context: {
        id: node.id,
      },
      path: node.fields.slug,
    });
  });

  // Create taxonomies template
  group.forEach(({ fieldValue }) => {
    createPage({
      component: resolve('./src/templates/taxonomy.js'),
      context: {
        tag: fieldValue,
      },
      path: `/${fieldValue}/`,
    });
  });

  // Create taxonomies template
  tweets.forEach(({ id }) => {
    createPage({
      component: resolve('./src/templates/tweet.js'),
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
