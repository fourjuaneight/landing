const fmtDate = date => {
  const raw = date.replace(/\+00:00/g, '');
  const clean = new Date(raw);
  const offset = clean.getTimezoneOffset() * 60000;
  const localDate = new Date(clean - offset);

  const isoDate = localDate.toISOString().slice(0, -5);
  const standardDate = clean.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const dates = {
    iso: isoDate,
    standard: standardDate,
  };

  return dates;
};

export default fmtDate;
