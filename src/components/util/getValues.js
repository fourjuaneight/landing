const getValues = formNode => {
  return Object.getOwnPropertyNames(formNode.elements).reduce((obj, key) => {
    const formControl = formNode.elements[key];
    const name = formControl.getAttribute('name');

    if (name && name !== 'bots' && name !== 'resume' && !obj[name]) {
      // eslint-disable-next-line no-param-reassign
      obj[name] = formControl.value;
    }

    return obj;
  }, {});
};

export default getValues;
