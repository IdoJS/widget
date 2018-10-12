import BaseEl from '../../../src/Elements/BaseEl';

const expect = require('chai').expect;

describe('BaseEl', () => {
  describe('UnAttached to DOM', ()=>{
    let instance;
    it('Initialize BaseEl', () => {
      instance = new BaseEl({type: 'div'});
      expect(instance).to.be.an.instanceof(BaseEl);
    });

    it('Check BaseEl context', () => {
      expect(instance.isAttachedToDom).to.be.false;
    });

    it('Check attach children', () => {
      const child = new BaseEl({type: 'span'});
      instance.attachChildren([child]);
      // check a child is been added to the parent
      expect(instance.children).to.have.lengthOf(1);
      // check the child's parent is still null unless its attached to DOM
      expect(child.parent).to.be.null;
    });

  });

  describe('Attach el to DOM', () => {
    let instance;
    instance = new BaseEl({type: 'div'});
    instance.isAttachedToDom = true;
    it('Check attach children', () => {
      const child = new BaseEl({type: 'span'});
      instance.attachChildren([child]);
      // check a child been added to the parent
      expect(instance.children).to.have.lengthOf(1);
      // check the child's parent is our parent
      expect(child.parent).to.eql(instance);
    });
  });


});
