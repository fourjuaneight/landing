const toggle = document.querySelector('#theme');
const root = document.querySelector('html');

toggle.addEventListener('input', () => {
  switch (toggle.checked) {
    case false:
      localStorage.setItem('theme', 'light');
      break;
    case true:
      localStorage.setItem('theme', 'dark');
      break;
  }
  switch (root.getAttribute('data-theme')) {
    case 'dark':
      root.setAttribute('data-theme', 'light');
      break;
    case 'light':
      root.setAttribute('data-theme', 'dark');
      break;
  }
});
