const toggle = document.querySelector('#theme');

toggle.addEventListener('input', () => {
  const root = document.querySelector('html');

  switch (toggle.checked) {
    case false:
      localStorage.setItem('theme', 'light');
      break;
    case true:
      localStorage.setItem('theme', 'dark');
      break;
    default:
      localStorage.setItem('theme', 'dark');
  }
  switch (root.getAttribute('data-theme')) {
    case 'dark':
      root.setAttribute('data-theme', 'light');
      break;
    case 'light':
      root.setAttribute('data-theme', 'dark');
      break;
    default:
      root.setAttribute('data-theme', 'dark');
  }
});
