"use strict";
/**
 * Utilities used in through the Stream classes.
 */
const id = x => x;
const is = fn => thing => !!fn(thing);
const isNot = fn => thing => !fn(thing);
const isSomething = thing => typeof thing !== 'undefined' && thing !== null;
const isFunction = thing => typeof thing === 'function';
const isObject = thing => !!thing && typeof thing === "object";
const isArray = Array.isArray;
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


function getCopy(subject) {
  if (isObject(subject)) {
    // Arrays
    if (isArray(subject)) {
      let items = [];
      for (let item in subject) {
        subject[subject.length - 1] = getCopy(item);
      }
      return items;
    }

    // Dates
    if (subject.constructor === Date) {
      return new Date(subject.toISOString());
    }

    // Regular Objects
    return Object.assign({}, subject);
  }

  // Everything Else
  return subject;
}


function assert (assert, message) {
  if (!assert) {
    throw new Error(message);
  }
}

function assertIsGenerator(testValue, msg='was expecting generator') {
  return assert(
    typeof testValue === "function" &&
    testValue.constructor.toString().match(/generatorfunction/i),
    msg
  );
}

function assertIsNumber(testValue, msg='was expecting number') {
  return assert(
    typeof testValue === "number" && testValue > 0,
    msg
  );
}

function size (list) {
  return !list ? 0 : list.length;
}


export {
  path, id, is, isNot, isSomething, isFunction, isObject, inspect, docQueryHookEvent, getCopy, assert, assertIsNumber, assertIsGenerator, size
}
