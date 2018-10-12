import data from '../../__mock__/mockResponse';
import {createGallery} from '../../layouts/gallery';

const expect = require('chai').expect;

describe('gallery', () => {
  it('Generate simple gallery', () => {
    const ul = createGallery({data, rootElId: '', imgSize: {}});
    expect(ul.children).to.have.lengthOf(4);
  });
});