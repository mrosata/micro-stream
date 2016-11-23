define(function (require) {
  const type = (item) => typeof item;
  const defined = (item) => type(item) !== "undefined";
  const isArray = (item) => Array.isArray(item);
  const isObject = (item) => !!item && type(item) === "object";
  
  return {
    path: function(pathOfProps) {
      pathOfProps = [].concat(pathOfProps);
      
      return function(obj) {
        return pathOfProps.reduce((accum, propName) => {
            return isObject(accum) ? accum[propName] : undefined;
          }, obj);
      }
    },
    
    prop: function(prop) {
      return (obj) => {
        return isObject(obj) ? obj[prop] : undefined;
      }
    }
  }
});