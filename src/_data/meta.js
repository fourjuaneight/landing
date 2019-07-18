const meta = async () => {
  let url;
  switch (process.env.ELEVENTY_ENV) {
    case 'local':
      url = '';
      break;
    case 'development':
      url = 'https://development.juanvillela.dev';
      break;
    case 'staging':
      url = 'https://staging.juanvillela.dev';
      break;
    default:
      url = 'https://www.juanvillela.dev';
  }
  return {
    domain: url,
    title: 'Juan Villela',
    description: 'Freelance Front-End Developer, automation nerd, and astronomy enthusiast.',
    social: 'fourjuaneight',
    image: '/icons/juan.png',
    datefmt: { year: 'numeric', month: 'long', day: 'numeric' }
  };
};

module.exports = meta;