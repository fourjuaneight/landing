const webpSupport = callback => {
  // If the browser doesn't has the method createImageBitmap, you can't display webp format
  if (!window.createImageBitmap) {
    callback(false);
    return;
  }

  // Base64 representation of a white point image
  const webpdata = `data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=`;

  // Retrieve the Image in Blob Format
  fetch(webpdata)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      // If the createImageBitmap method succeeds, return true, otherwise false
      createImageBitmap(blob).then(
        () => {
          callback(true);
        },
        () => {
          callback(false);
        }
      );
    });
};

// Added class to supported
const avatarWebp = document.getElementById(`hero__avatar--webp`);
const avatarPng = document.getElementById(`hero__avatar--png`);

webpSupport(isSupported => {
  if (isSupported) {
    avatarPng.classList.add(`hidden`);
    avatarWebp.classList.remove(`hidden`);
  }
});
