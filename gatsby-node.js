// Node APIs
// https://www.gatsbyjs.org/docs/node-apis/

const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

// With CSS Modules, ignore class order
exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    );

    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }

    actions.replaceWebpackConfig(config);
  }
};

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions;

  // Create node field for posts only
  if (
    node.internal.type === 'MarkdownRemark' &&
    !node.fileAbsolutePath.match(/about/g) &&
    !node.fileAbsolutePath.match(/uses/g)
  ) {
    const slug = createFilePath({ getNode, node });
    const year = node.frontmatter.date.substring(0, 4);

    // creates post slug
    createNodeField({
      name: 'slug',
      node,
      value: `/posts${slug}`,
    });

    // creates published year field; allows for grouping by year
    createNodeField({
      name: 'year',
      node,
      value: year,
    });
  }

  // Create node field for singles only
  if (
    node.internal.type === 'MarkdownRemark' &&
    (node.fileAbsolutePath.match(/about/g) ||
      node.fileAbsolutePath.match(/uses/g))
  ) {
    const slug = createFilePath({ getNode, node });

    // creates single page slug
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
      posts: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false }, url: { eq: null } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
      singles: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/single/" }
          frontmatter: { draft: { eq: false } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
      tags: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { draft: { eq: false } }
        }
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

  // // Extract query results
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
      component: resolve('./src/templates/status.js'),
      context: {
        id,
      },
      path: `/microblog/${id}/`,
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
