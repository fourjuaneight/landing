const toggle = document.querySelector('#theme');
const root = document.querySelector('html');

toggle.addEventListener('input', () => {
  if (toggle.checked === false) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  if (root.getAttribute('data-theme') === 'dark') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.setAttribute('data-theme', 'dark');
  }
});
