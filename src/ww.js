onmessage = e => {
  genNoise(e.data);
}

const genNoise = base => {
  const black = new Uint8ClampedArray([0, 0, 0, 255]);
  const white = new Uint8ClampedArray([255, 255, 255, 255]);
  const data = new Uint8ClampedArray(base * base * 4);

  for (let y = 0; y < base; y++) {
    for (let x = 0; x < base; x++) {
      data.set(Math.random() > .5 ? white : black, (y * base + x) * 4);
    }
  }
  postMessage(data);
};
