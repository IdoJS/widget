import BaseEl from '../Elements/BaseEl';
import ImageEl from '../Elements/ImageEl';
import {style} from '../constants';

/**
 * Li inner layout :
 * <li>
 *   <a>
 *    <image />
 *    <spam />
 *   </a>
 * </li>
 * @param item
 * @returns {BaseEl}
 */
const innerLiStructure = ({item, imgSize}) => {
  const li = new BaseEl({type: 'li'})
    .setAttr({name: 'style', value: 'cursor:pointer;'});

  const href = new BaseEl({type: 'a'}).setAttr({
    name: 'style',
    value: style.GALLERY.HREF
  })
    .setAttr({name: 'href', value: item.url})
    .setAttr({name: 'target', value: '_blank'});

  const image = new ImageEl(Object.assign({
    type: 'img',
    lazyLoadSrcArr: item.thumbnail && item.thumbnail[0] && item.thumbnail,
    hideOnError: li
  }, imgSize))
    .setAttr({name: 'style', value: `height:${imgSize.height}; width:${imgSize.width}`});

  const title = new BaseEl({type: 'span'})
    .setAttr({name: 'style', value: `width:${imgSize.width}; padding: 0px 5%;`})
    .setText(item.name);


  href.attachChildren([image, title]);

  li.attachChildren([href]);

  return li;
};

const createGallery = ({data, rootElId, imgSize}) => {
  const {list, id} = data;
  let ul;
  if (list.length > 0) {
    ul = new BaseEl({type: 'ul'})
      .setAttr({
        name: 'style',
        value: style.GALLERY.UL
      });

    const children = list.map(item => innerLiStructure({item, imgSize}));

    ul.attachChildren(children);

    ul.attachToDOM(rootElId);
  }

  return ul;
};

export {
  createGallery
}