import BaseEl from '../Elements/BaseEl';
import {style} from '../constants';

const showErrorMsg = ({data, rootElId}) => {
  const {text} = data;

  const errorEl = new BaseEl({type: 'div'})
    .setAttr({
      name: 'style',
      value: style.ERROR.CONTAINER
    })
    .setText(text);

  errorEl.attachToDOM(rootElId);

  return errorEl;
};

const hideOnError = ({rootElId}) => {
  const root = document.getElementById(rootElId);
  if (root) root.style.display = 'none';

  return root;
};

export {
  showErrorMsg,
  hideOnError
};