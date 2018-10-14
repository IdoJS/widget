import {string} from './constants';

const writeToLogger = (data) => {
  const key = Date.now();
  window[string.NAME_SPACE] = window[string.NAME_SPACE] || {
    logger : {}
  };

  window[string.NAME_SPACE].logger[key] = data;

  return key;
};

export {
  writeToLogger
}