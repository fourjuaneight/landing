const label = document.querySelectorAll('button.clip');

label.forEach(copy => {
  copy.addEventListener('click', () => {
    const selection = window.getSelection();
    const range = document.createRange();
    const pre = copy.nextSibling;
    const code = pre.querySelector('code');
    const original = copy.innerHTML;

    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      selection.removeAllRanges();
      copy.classList.toggle('f7');
      copy.innerHTML = 'Copied!';

      setTimeout(() => {
        copy.classList.toggle('f7');
        copy.innerHTML = original;
      }, 1000);
    } catch {
      copy.innerHTML = "Can't copy, hit Ctrl+C!";

      setTimeout(() => {
        copy.innerHTML = original;
      }, 1000);
    }
  });
});