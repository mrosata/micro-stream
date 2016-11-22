"use strict";
/**
 * Utilities used in through the Stream classes.
 */
const id = x => x;
const is = fn => thing => !!fn(thing);
const isNot = fn => thing => !fn(thing);
const something = thing => typeof thing !== 'undefined' && thing !== null;
const isFunction = thing => typeof thing === 'function';
const inspect = (item) => item && isFunction(item.inspect) ? item.inspect() : item;

/**
 *  These are temporary. They were functional implementations in the original
 *  Micro-Stream class, however, since Micro-Stream shouldn't make assumptions
 *  about developers coding styles, I don't want to import the monads required
 *  to make these 2 functions "functional". Will have to think of another
 *  way to implement these IO ops.
 */
const docQuery = (selector) => document.querySelector(selector);
const addEvent = (type, fn, elem) => elem.addEventListener(type, fn, false);

export {
  id, is, isNot, something, isFunction, docQuery, addEvent, inspect
}