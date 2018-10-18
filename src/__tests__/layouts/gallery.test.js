import data from '../../__mock__/mockResponse';
import {createGallery} from '../../layouts/gallery';

const expect = require('chai').expect;

describe('gallery', () => {
  it('Generate simple gallery', () => {
    const ul = createGallery({data, rootElId: '', imgSize: {}});
    expect(ul.children).to.have.lengthOf(4);
    const li = ul.children[0];
    expect(li.getElAsHTML().tagName).to.have.string('LI');
    const href = li.children[0];
    expect(href.getElAsHTML().tagName).to.have.string('A');
    expect(href.getElAsHTML().getAttribute('href')).to.not.be.empty;
    expect(href.getElAsHTML().getAttribute('target')).to.have.string('_blank');
    expect(href.children).to.have.lengthOf(2);
    const img = href.children[0];
    const span = href.children[1];
    expect(img.getElAsHTML().tagName).to.have.string('IMG');
    expect(span.getElAsHTML().tagName).to.have.string('SPAN');
  });
});