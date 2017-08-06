const getActions = (wrapper, mapperFn) => {
  // console.log('--test util, actions=',wrapper.vm._actionsNestedObject);
  // const mappedFn = mapperFn(wrapper.vm._actionsNestedObject);
  return wrapper.vm._actionsNestedObject;
};

export {
  getActions
};
