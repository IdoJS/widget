const expect = require('chai').expect;
import {showErrorMsg, hideOnError} from '../../layouts/error';

describe('error', () => {
  it('showErrorMsg', () => {
    const text = 'test';
    const error = showErrorMsg({data: {text}, rootElId: ''});

    expect(error.getElAsHTML().innerText).to.have.string(text);
  });

  it('hideOnError', () => {
    const root = hideOnError({rootElId: 'root'});
    expect(root.style.display).to.have.string('none');
  });
});

