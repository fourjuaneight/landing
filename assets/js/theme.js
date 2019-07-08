const toggle = document.querySelector('#theme');
const root = document.querySelector('html');

toggle.addEventListener('input', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', 'dark');
  if (toggle.checked === false) {
    localStorage.removeItem('theme');
  }
});
