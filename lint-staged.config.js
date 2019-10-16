module.exports = {
  '*.+(js|css|ms)': ['prettier --write', 'git add'],
  '*.js': ['eslint --fix'],
};
