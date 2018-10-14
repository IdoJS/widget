import ImageEl from '../../Elements/ImageEl';
import {string} from '../../constants';
const expect = require('chai').expect;

describe('ImageEl', () => {
  const instance = new ImageEl({
    lazyLoadSrcArr: [{url: 'test'}],
    width: '200px',
    height: '200px',
    adjustSizeToOriginalImg: true
  });

  it('Initialize ImageEl', () => {
    expect(instance).to.be.an.instanceof(ImageEl);
  });

  it('Check ImageEl context', () => {
    expect(instance.isAttachedToDom).to.be.false;
  });

  it('loadAllContent()', () => {
    expect(instance.hasBeenLoaded).to.be.false;
    instance.loadAllContent();
    expect(instance.hasBeenLoaded).to.be.true;
  });

  it('handleOnSrcError', () => {
    const ev = {srcElement: {currentSrc: 'fake_src'}};
    const key = instance.handleOnSrcError(ev);
    expect(window[string.NAME_SPACE].logger[key].msg).to.have.string(ev.srcElement.currentSrc);
  });
});
