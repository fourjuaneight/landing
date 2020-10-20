const heights = {
  1: '1rem',
  '1-25': '1.25rem',
  '1-5': '1.5rem',
  2: '2rem',
  '2-5': '2.5rem',
  3: '3rem',
  '3-5': '3.5rem',
  4: '4rem',
  '4-5': '4.5rem',
  5: '5rem',
  6: '6rem',
  8: '8rem',
  10: '10rem',
  12: '12rem',
  14: '14rem',
  16: '16rem',
  18: '18rem',
  auto: 'auto',
  full: '100%',
  screen: '100vh',
};
const widths = {
  0: '0',
  '0-25': '0.25rem',
  '0-5': '0.5rem',
  '0-75': '0.75rem',
  1: '1rem',
  '1-25': '1.25rem',
  '1-5': '1.5rem',
  '1-75': '1.75rem',
  2: '2rem',
  3: '3rem',
  4: '4rem',
  5: '5rem',
  6: '6rem',
  8: '8rem',
  10: '10rem',
  12: '12rem',
  14: '14rem',
  16: '16rem',
  18: '18rem',
  20: '20rem',
  22: '22rem',
  24: '24rem',
  26: '26rem',
  28: '28rem',
  30: '30rem',
  32: '32rem',
  34: '34rem',
  36: '36rem',
  38: '38rem',
  40: '40rem',
  42: '42rem',
  48: '48rem',
  56: '56rem',
  60: '60rem',
  64: '64rem',
  72: '72rem',
  80: '80rem',
  auto: 'auto',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  full: '100%',
  screen: '100vw',
};

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    fontFamily: {
      nunito: ['Nunito', 'sans-serif'],
      fira: ['Fira Code', 'sans-serif'],
    },
    fontSize: {
      '0-75': '.75rem',
      '0-875': '.875rem',
      1: '1rem',
      '1-125': '1.125rem',
      '1-25': '1.25rem',
      '1-5': '1.5rem',
      2: '2rem',
      '2-25': '2.25rem',
      '2-5': '2.5rem',
      3: '3rem',
      4: '4rem',
      5: '5rem',
      6: '6rem',
      7: '7rem',
      8: '8rem',
    },
    height: {
      ...heights,
    },
    maxHeight: {
      ...heights,
    },
    maxWidth: {
      ...widths,
    },
    minHeight: {
      ...heights,
    },
    minWidth: {
      ...widths,
    },
    screens: {
      dark: { raw: '(prefers-color-scheme: dark)' },
      light: { raw: '(prefers-color-scheme: light)' },
      phoneSm: '420px',
      phoneLg: '640px',
      tabletSm: '768px',
      tabletLg: '940px',
      laptop: '1024px',
      desktop: '1280px',
    },
    width: {
      ...widths,
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        dark: 'var(--dark)',
        darker: 'var(--darker)',
        font: 'var(--font)',
        meta: 'var(--meta)',
        primary: 'var(--primary)',
        'primary-transparent': 'var(--primary-transparent)',
        secondary: 'var(--secondary)',
      },
    },
  },
  variants: {},
  plugins: [],
};