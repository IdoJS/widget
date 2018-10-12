const writeToLogger = (data) => {
  window.myWidgetNameSpace = window.myWidgetNameSpace || {
    logger : {}
  };

  window.myWidgetNameSpace.logger[Date.now()] = data;

};

export {
  writeToLogger
}