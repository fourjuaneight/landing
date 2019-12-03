export const noise = async base => {
  const canvas = new OffscreenCanvas(base, base);
  const ctx = canvas.getContext('2d');
  const black = new Uint8ClampedArray([0, 0, 0, 255]);
  const white = new Uint8ClampedArray([255, 255, 255, 255]);
  const data = new Uint8ClampedArray(base * base * 4);

  /* eslint-disable id-length */
  for (let y = 0; y < base; y += 1) {
    for (let x = 0; x < base; x += 1) {
      data.set(Math.random() > 0.5 ? white : black, (y * base + x) * 4);
    }
  }
  /* eslint-enable */

  ctx.putImageData(new ImageData(data, base, base), 0, 0);
  const png = await canvas
    .convertToBlob({
      quality: 1.0,
      type: 'image/png',
    })
    .then(blob => URL.createObjectURL(blob));

  return png;
};
