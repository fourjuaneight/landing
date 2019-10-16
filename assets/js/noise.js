const worker = new Worker('/js/ww.js');

const fragment = document.createDocumentFragment();
const bodyStyle = getComputedStyle(document.body);
const size = bodyStyle.getPropertyValue('--base');

const makeNoise = async data => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(new ImageData(data, size, size), 0, 0);

  const png = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  const url = URL.createObjectURL(png);
  const div = document.createElement('div');

  div.classList.add(
    'absolute',
    'bottom-0',
    'left-0',
    'right-0',
    'top-0',
    'z20',
    'noise'
  );
  div.style = `background-image: url(${url})`;
  fragment.appendChild(div);
  document.body.appendChild(fragment);
};

if (window.Worker) {
  worker.postMessage(size);

  worker.onmessage = e => {
    makeNoise(e.data);
  };
}
