const expect = require('chai').expect;
import {writeToLogger} from '../logger';
import {string} from '../constants';

describe('logger', () => {
  window[string.NAME_SPACE] = window[string.NAME_SPACE] || {
    logger : {}
  };

  it('writeToLogger', () => {
    const val = 'test';
    const key = writeToLogger(val);
    expect(window[string.NAME_SPACE].logger[key]).to.have.string(val)
  })
});