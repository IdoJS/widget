import {getData, setStorage, getStorage} from './services'
import {createGallery} from './layouts/gallery';
import {showErrorMsg, hideOnError} from './layouts/error';
import {writeToLogger} from './logger';

const supportedAPI = ['init', 'sponsored']; // enlist all methods supported by API (e.g. `mw('sponsored', '{...}');`)

/**
 The main entry of the application
 */
function app(window) {
  // set default configurations
  const configurations = {};

  // all methods that were called till now and stored in queue
  // needs to be called now
  let globalObject = window[window['myWidget']];
  const queue = globalObject.q;
  if (queue) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() === 'init') {
        Object.assign(configurations, queue[i][1]);
      }
      else
        apiHandler(queue[i][0], queue[i][1]);
    }
  }

  // override temporary (until the app loaded) handler
  // for widget's API calls
  globalObject = apiHandler;
  globalObject.configurations = configurations;
}

/**
 Method that handles all API calls
 */
function apiHandler(api, params) {
  if (!api) throw Error('API method required');
  api = api.toLowerCase();

  if (supportedAPI.indexOf(api) === -1) throw Error(`Method ${api} is not supported`);

  console.log(`Handling API call ${api}`, params);

  switch (api) {
    // TODO: add API implementation
    case 'sponsored':
      writeToLogger(params);
      getData(Object.assign(params.requestParams, {
        userSession: getStorage(`myWidgetSession-${params.requestParams.appApikey}`) || 'init'
      })).then((response) => {
        setStorage({key: `myWidgetSession-${params.requestParams.appApikey}`, value: response.id});
        writeToLogger(response.id);
        createGallery({
          data: response,
          rootElId: params.rootElId,
          imgSize: {
            adjustSizeToOriginalImg: params.adjustSizeToOriginalImg,
            width: `${params.requestParams.itemWidth}px`,
            height: `${params.requestParams.itemHeight}px`
          }
        });
      }).catch(error => {
        writeToLogger(error);
        params.hideOnNetworkError ?
          hideOnError({rootElId: params.rootElId}) :
          showErrorMsg({
            data: {
              text: 'Network errors.',
              error
            },
            rootElId: params.rootElId
          });
      });
      break;
    default:
      console.warn(`No handler defined for ${api}`);
  }
}

app(window);