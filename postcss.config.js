module.exports = () => {
  return {
    plugins: {
      'postcss-preset-env': {
        stage: 3,
        features: {
          'custom-properties': {
            preserve: true,
            fallback: true,
          },
        },
        autoprefixer: {
          flexbox: true,
          grid: false
        },
      },
      'cssnano': {}
    }
  };
};
