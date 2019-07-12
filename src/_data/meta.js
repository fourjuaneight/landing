const meta = async () => {
  const isStaging = await require('./development')();
  return {
    domain: isStaging ? 'https://development.juanvillela.dev' : 'https://www.juanvillela.dev',
    title: 'Juan Villela',
    description: 'Front-End Developer, automation nerd, and astronomy enthusiast.',
    social: 'fourjuaneight',
    image: '/icons/juan.png',
    datefmt: { year: 'numeric', month: 'long', day: 'numeric' }
  };
};

module.exports = meta;