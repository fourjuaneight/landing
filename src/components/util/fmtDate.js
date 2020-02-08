import { format } from 'date-fns';

const fmtDate = date => {
  const raw = date.replace(/\+00:00/g, '');
  const clean = new Date(raw);
  const offset = clean.getTimezoneOffset() * 60000;
  const estDate = new Date(clean - offset);
  const ISOpattern = 'yyyy-MM-dd HH:mm:ssXXX';
  const STDpattern = 'MMM d, YYY @ hh:mm a zzz';

  const isoDate = format(estDate, ISOpattern).replace(/\s/g, 'T');
  const standardDate = format(estDate, STDpattern);

  const dates = {
    iso: isoDate,
    standard: standardDate,
  };

  return dates;
};

export default fmtDate;
