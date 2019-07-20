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
    datefmt: { day: 'numeric', month: 'long', year: 'numeric' },
    description:
      'Freelance Front-End Developer, automation nerd, and astronomy enthusiast.',
    domain: url,
    image: '/icons/juan.png',
    social: 'fourjuaneight',
    title: 'Juan Villela',
  };
};

module.exports = meta;
