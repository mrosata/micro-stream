"use strict";
/**
 * Utilities used in through the Stream classes.
 */
const id = x => x;
const is = fn => thing => !!fn(thing);
const isNot = fn => thing => !fn(thing);
const something = thing => typeof thing !== 'undefined' && thing !== null;
const isFunction = thing => typeof thing === 'function';
const isObject = thing => !!thing && typeof thing === "object";
const inspect = (item) => item && isFunction(item.inspect) ? item.inspect() : item;

/**
 *  This is temporary. Originally there were functional compositions with monads
 *  in the original Micro-Stream class handling IO. However, Micro-Stream shouldn't
 *  make assumptions about code. I don't want to import the monads required. So
 *  for now, this will be the way to implement these DOM IO ops.
 */
const docQueryHookEvent = (eventType, hook, selector ) => {
  const elem = document.querySelector(selector);
  if (elem) {
    elem.addEventListener(eventType, hook, false);
  }
  else {
    hook(
      new Error(
        `Unable to hook event to selector: ${selector}; element: ${typeof elem}`))
  }
};

function path(pathOfProps) {
  pathOfProps = [].concat(pathOfProps);
  
  return function(obj) {
    return pathOfProps.reduce((accum, propName) => {
      return isObject(accum) ? accum[propName] : undefined;
    }, obj);
  }
}

export {
  path, id, is, isNot, something, isFunction, isObject, inspect, docQueryHookEvent
}