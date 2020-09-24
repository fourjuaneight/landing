// Browser APIs
// https://www.gatsbyjs.org/docs/browser-apis/

require('./src/styles/critical.css');
require('./src/styles/tailwind.css');

// Load Service Worker on production only.
exports.registerServiceWorker = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return true;
};

// Skip navigation link for screen reader and keyboard users
exports.onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation !== null) {
    const skipLink = document.querySelector('#reach-skip-nav');

    if (skipLink) {
      skipLink.focus();
    }
  }
};
