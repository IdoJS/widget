import BaseEl from '../Elements/BaseEl';

const showErrorMsg = ({data, rootElId}) => {
  const {text} = data;

  const errorEl = new BaseEl({type: 'div'})
    .setAttr({
      name: 'style',
      value: 'width: 100%; padding:5px; border:1px solid #000; font-weight:bold; font-size:18px; text-align:center;'
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