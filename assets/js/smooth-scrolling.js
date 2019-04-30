const scrollIt = function(
  destination,
  duration = 200,
  easing = `linear`,
  callback
) {
  const easings = {
    easeInCubic(time) {
      return time * time * time;
    },
    easeInOutCubic(time) {
      return time < 0.5
        ? 4 * time * time * time
        : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
    },
    easeInOutQuad(time) {
      return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
    },
    easeInOutQuart(time) {
      return time < 0.5
        ? 8 * time * time * time * time
        : 1 - 8 * (1 - time) * time * time * time;
    },
    easeInOutQuint(time) {
      return time < 0.5
        ? 16 * time * time * time * time * time
        : 1 + 16 * (1 - time) * time * time * time * time;
    },
    easeInQuad(time) {
      return time * time;
    },
    easeInQuart(time) {
      return time * time * time * time;
    },
    easeInQuint(time) {
      return time * time * time * time * time;
    },
    easeOutCubic(time) {
      return (1 - time) * time * time + 1;
    },
    easeOutQuad(time) {
      return time * (2 - time);
    },
    easeOutQuart(time) {
      return 1 - (1 - time) * time * time * time;
    },
    easeOutQuint(time) {
      return 1 + (1 - time) * time * time * time * time;
    },
    linear(time) {
      return time;
    },
  };
  const start = window.pageYOffset;
  const startTime =
    `now` in window.performance ? performance.now() : new Date().getTime();
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName(`body`)[0].clientHeight;
  const destinationOffset =
    typeof destination === `number` ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );
  if (`requestAnimationFrame` in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }
  function scroll() {
    const now =
      `now` in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }
  scroll();
};

export default scrollIt;
