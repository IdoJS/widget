import BaseEl from '../Elements/BaseEl';
import ImageEl from '../Elements/ImageEl';

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
  const li = new BaseEl({type: 'li'});
  const href = new BaseEl('a').setAttr({
    name: 'style',
    value: 'display:flex; flex-direction:column; justify-content:space-between; margin:5px; text-decoration: none; color:#000; font-size:18px;'
  })
    .setAttr({name: 'href', value: item.url})
    .setAttr({name: 'target', value: '_blank'});

  const image = new ImageEl(Object.assign({
    type: 'img',
    lazyLoadSrcArr: item.thumbnail && item.thumbnail[0] && item.thumbnail
  }, imgSize))
    .setAttr({name: 'style', value: `height:${imgSize.height}; width:${imgSize.width}`});

  const span = new BaseEl({type: 'span'})
    .setAttr({name: 'style', value: `width:${imgSize.width}; padding: 0px 5%;`})
    .setText(item.name);

  href.attachChildren([image, span]);

  li.attachChildren([href]);

  return li;
};

const createGallery = ({data, rootElId, imgSize}) => {
  const {list, id} = data;

  if (list.length > 0) {
    const ul = new BaseEl({type: 'ul'})
      .setAttr({
        name: 'style',
        value: 'display:flex; flex-flow: row wrap; justify-content:space-around; width: 100%; padding:5px; list-style: none;'
      });

    const children = list.map(item => innerLiStructure({item, imgSize}));

    ul.attachChildren(children);

    ul.attachToDOM(rootElId);
  }
};

export {
  createGallery
}