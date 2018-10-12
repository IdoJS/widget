import ImageEl from '../../../src/Elements/ImageEl';

const expect = require('chai').expect;

describe('ImageEl', () => {
  let instance;
  it('Initialize ImageEl', () => {
    instance = new ImageEl({lazyLoadSrcArr: [], width:'200px', height:'200px', adjustSizeToOriginalImg: true});
    expect(instance).to.be.an.instanceof(ImageEl);
  });

  it('Check ImageEl context', () => {
    expect(instance.isAttachedToDom).to.be.false;
  });
});
