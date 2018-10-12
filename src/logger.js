const writeToLogger = (data) => {
  const key = Date.now();
  window.myWidgetNameSpace = window.myWidgetNameSpace || {
    logger : {}
  };

  window.myWidgetNameSpace.logger[key] = data;

  return key;
};

export {
  writeToLogger
}