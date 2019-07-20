const worker = new Worker('ww.js');

const size = getComputedStyle(document.body).getPropertyValue('--base');

const makeNoise = async data => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.putImageData(new ImageData(data, size, size), 0, 0);

  const png = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  const url = URL.createObjectURL(png);
  const div = document.createElement('div');

  div.classList.add('noise');
  div.style = `background-image: url(${url})`;
  document.body.appendChild(div);
};

if (window.Worker) {
  worker.postMessage(size);

  worker.onmessage = e => {
    makeNoise(e.data);
  };
}
