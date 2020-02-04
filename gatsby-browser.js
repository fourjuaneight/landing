// Browser APIs
// https://www.gatsbyjs.org/docs/browser-apis/

require('./src/styles/critical.scss');

// Load Service Worker on production only.
exports.registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return true;
};
