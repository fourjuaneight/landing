const dev = async () => {
  if(typeof process.env.LOCAL_DEV === 'string') {
    return true;
  }
  if(process.env.BRANCH === 'development') {
    return true;
  }
  return false;
}

module.exports = dev;