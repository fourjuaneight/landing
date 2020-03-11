const fmtDate = date => {
  const getOrdinal = number => {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const value = number % 100;
    return number + (suffix[(value - 20) % 10] || suffix[value] || suffix[0]);
  };

  const raw = date.replace(/\+00:00/g, '');
  const clean = new Date(raw);
  const offset = clean.getTimezoneOffset() * 60000;
  const localDate = new Date(clean - offset);

  const isoDate = localDate.toISOString().slice(0, -5);
  const md = clean.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
  });
  const microDate = md.replace(/([a-zA-z]{3})\s(\d{1,2})/g, (match, p1, p2) =>
    [p1, getOrdinal(p2), 'at', isoDate.substring(11, 16)].join(' ')
  );

  return microDate;
};

exports.fmtDate = fmtDate;
