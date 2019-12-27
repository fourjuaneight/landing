// eslint-disable-next-line import/prefer-default-export
export const noise = base => {
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

  return data;
};
