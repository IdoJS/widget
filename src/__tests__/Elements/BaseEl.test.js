import BaseEl from '../../Elements/BaseEl';

const expect = require('chai').expect;

describe('BaseEl', () => {
  describe('UnAttached to DOM', ()=>{
    const instance = new BaseEl({type: 'div'});
    it('Initialize BaseEl', () => {
      expect(instance).to.be.an.instanceof(BaseEl);
    });

    it('Check BaseEl context', () => {
      expect(instance.isAttachedToDom).to.be.false;
    });

    it('attachChildren()', () => {
      const child = new BaseEl({type: 'span'});
      instance.attachChildren([child]);
      // check a child is been added to the parent
      expect(instance.children).to.have.lengthOf(1);
      // check the child's parent is still null unless its attached to DOM
      expect(child.parent).to.be.null;
    });

  });

  describe('Attach el to DOM', () => {
    const instance = new BaseEl({type: 'div'});
    let childAddedBeforeAttachToDOM;
    let childAddedAfterAttachToDOM;

    // instance.isAttachedToDom = true;
    it('attachChildren()', () => {
      childAddedBeforeAttachToDOM = new BaseEl({type: 'span'});
      instance.attachChildren([childAddedBeforeAttachToDOM]);
      // check a child been added to the parent
      expect(instance.children).to.have.lengthOf(1);
      // check the child's parent is still null unless its attached to DOM
      expect(childAddedBeforeAttachToDOM.parent).to.be.null;
    });

    it('attachToDOM(parentId)', ()=>{
      instance.attachToDOM('root');
      // check the child's parent is our parent
      expect(childAddedBeforeAttachToDOM.parent).to.eql(instance);

      childAddedAfterAttachToDOM = new BaseEl({type: 'span'});
      instance.attachChildren([childAddedAfterAttachToDOM]);
      // check a child been added to the parent
      expect(instance.children).to.have.lengthOf(2);
      // check the child's parent is still null unless its attached to DOM
      expect(childAddedAfterAttachToDOM.parent).to.eql(instance);
    });
  });

  describe('All methods that are not effected by attached to DOM', ()=>{
    const instance = new BaseEl({});
    it('Initialize BaseEl', () => {
      expect(instance).to.be.an.instanceof(BaseEl);
    });
    it('setAttr({name, value})', ()=>{
      instance.setAttr({name:'style',value:'display:none'});
      expect(instance.getElAsHTML().style.display).to.have.string('none');
    });
    it('setText(text)', ()=>{
      const text = 'my div';
      instance.setText(text);
      expect(instance.getElAsHTML().innerText).to.have.string(text);
    });
    it('event(callback)', ()=>{
      let eventData = '';
      const sendData = 'test';
      const callback = (data) => {
        eventData = data;
      };
      instance.event(callback);
      instance.on(sendData);
      expect(eventData).to.have.string(sendData);
    });
  });
});
