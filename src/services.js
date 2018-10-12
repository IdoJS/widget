const BASE_URL = 'http://api.taboola.com/1.0/json/taboola-templates/recommendations.get?';

/**
 * ajax request to get data.
 * @param appType
 * @param appApikey
 * @param userSession
 * @param sourceId
 * @param itemsOnPage
 * @param sourceType
 * @param sourceUrl
 * @param itemWidth
 * @param itemHeight
 * @returns {Promise}
 */
const getData = ({appType, appApikey, userSession, sourceId, itemsOnPage, sourceType, sourceUrl, itemWidth, itemHeight}) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}user.session=${userSession}&app.type=${appType}&app.apikey=${appApikey}&count=${itemsOnPage}&source.url=${sourceUrl}&source.type=${sourceType}&source.id=${sourceId}&rec.thumbnail.width=${itemWidth}&rec.thumbnail.height=${itemHeight}`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        resolve(myJson);
      }).catch(error => reject(error));
  });

};

/**
 * set store data.
 * if browser doesn't support localStorage then save the data in cookie
 * @param key
 * @param value
 */
const setStorage = ({key, value}) => {
  if (window.localStorage) {
    return localStorage.setItem(key,value);
  } else {
    //TODO - not sure if i need to set expired date and domain
    document.cookie = `${key}=${value};path=/;`;
  }
};
/**
 * get store data.
 * if browser doesn't support localStorage then get the data from cookie
 * @param key
 * @returns {*}
 */
const getStorage = (key) => {
  if (window.localStorage) {
    return localStorage.getItem(key);
  } else {
    let match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
    if (match) return match[2];
  }
};



export {
  getData,
  setStorage,
  getStorage
}