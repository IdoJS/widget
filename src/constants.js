const string = {
  WIDGET : 'com.company.myWidget',
  NAME_SPACE : 'com.company.myWidget.data'
};

const api = {
  INIT : 'init',
  SPONSORED : 'sponsored'
};

const style = {
  ERROR : {
    CONTAINER : 'width: 100%; padding:5px; border:1px solid #000; font-weight:bold; font-size:18px; text-align:center;'
  },
  GALLERY : {
    UL : 'display:flex; flex-flow: row wrap; justify-content:space-around; width: 100%; padding:5px; list-style: none;',
    HREF : 'display:flex; flex-direction:column; justify-content:space-between; margin:5px; text-decoration: none; color:#000; font-size:18px;'
  }
};

export {
  string,
  api,
  style
}