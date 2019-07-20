const compStyles = window.getComputedStyle(document.querySelector('html'));
const theme = compStyles.getPropertyValue('--theme').replace(' ', '');
const color = localStorage.getItem('theme');

window.addEventListener('DOMContentLoaded', () => {
  switch (color || theme) {
    case 'dark':
      document.querySelector('html').setAttribute('data-theme', 'dark');
      document.querySelector('#theme').checked = true;
      break;
    case 'light':
      document.querySelector('html').setAttribute('data-theme', 'light');
      document.querySelector('#theme').checked = false;
      break;
    default:
      document.querySelector('html').setAttribute('data-theme', 'dark');
      document.querySelector('#theme').checked = true;
  }
});

if ('fonts' in document) {
  const regular = new FontFace(
    'Rubik',
    "url(/fonts/Rubik-Regular.woff2) format('woff2'), url(/fonts/Rubik-Regular.woff) format('woff')"
  );
  const bold = new FontFace(
    'Rubik',
    "url(/fonts/Rubik-Bold.woff2) format('woff2'), url(/fonts/Rubik-Bold.woff) format('woff')",
    { weight: '700' }
  );

  Promise.all([bold.load(), regular.load()]).then(fonts => {
    fonts.forEach(font => {
      document.fonts.add(font);
    });
  });
}
