const expect = require('chai').expect;
import {writeToLogger} from '../../src/logger';


describe('logger', () => {
  window.myWidgetNameSpace = window.myWidgetNameSpace || {
    logger : {}
  };
  it('writeToLogger', () => {
    const val = 'test';
    const key = writeToLogger(val);
    expect(window.myWidgetNameSpace.logger[key]).to.have.string(val)
  })
});