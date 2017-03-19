"use strict";

import {assert, assertIsGenerator, assertIsNumber, size} from './utils';

/**
 * @class LazyStack
 * @classdesc
 *    A lazy stack has an Array-like API. It only does as much work
 *    as needed to return the values requested by all(), take(), or
 *    toArray, toJSON, toString
 * @static from
 * @static fromArray
 * @constructor constructor
 * @method map
 * @method filter
 * @method fold
 * @method take
 * @method all
 * @method toArray
 * @method toJSON
 * @method toString
 */
export default class LazyStack {

  /**
   * Create a LazyStack from an arbitrary amount of values.
   *
   * @param {*} values
   * @returns {LazyStack}
   */
  static from(...values) {
    assert(size(values) > 0, 'LazyStack.from requires at least 1 value.');

    return new LazyStack(function * (toArray = false) {
      if (toArray) {
        // A way to get the raw array without iterator.
        return values;
      }

      const len = size(values);
      for (let i = 0; i < len; i++) {
        yield values[i];
      }
    })
  }


  /**
   * Create a LazyStack from one or more JavaScript Arrays.
   *
   * @param {Array} array
   * @param {Array} [arrays]
   *     Any additional arrays with values to add into LazyStack
   * @returns {*}
   */
  static fromArray(array, ...arrays) {
    return LazyStack.from([].concat(array, ...arrays));
  }


  /**
   * Create a LazyStream
   * @param {Function} generatorFn (* -> Iterator)
   * @param {LazyStack} [parent]
   *     The LazyStack to pull values from
   */
  constructor(generatorFn, parent) {
    assertIsGenerator(
      generatorFn,
      'First argument to LazyStream constructor must be a generator'
    );
    this.generatorFn = generatorFn;
    this.parent      = parent;
  }


  /**
   * Transform values from the LazyStream Collection one at
   * a time by passing them through a transformer function.
   *
   * @param {Function} transformerFunction (α -> β)
   * @returns {LazyStack}
   */
  map(transformerFunction) {
    return new LazyStack(function * () {

      const iterator = this.parent.generatorFn();
      let value;

      while ((value = iterator.next()) && !value.done) {
        yield transformerFunction(value.value);
      }

    }, this);
  }


  /**
   * Filter the values in the LazyStream Collection
   * by testing them with a predicate function. This is a
   * lazy-op
   *
   * @param {Function} predicateFunction (α -> Bool)
   * @returns {LazyStack}
   */
  filter(predicateFunction) {
    return new LazyStack(function * () {
      let value;
      const iterator = this.parent.generatorFn();

      while ((value = iterator.next()) && !value.done) {
        if (predicateFunction(value.value)) {
          yield value.value;
        }
      }

    }, this);
  }


  fold(foldingFn, defaultValue) {

    return new LazyStack(function * () {
      const iterator = this.parent.generatorFn();
      let accumulation = defaultValue,
            value;

      while ((value = iterator.next()) && !value.done) {
        accumulation = foldingFn(accumulation, value.value);
        yield accumulation;
      }

      return accumulation;
    }, this);
  }


  /**
   * Take `n` values from the Stream, this is a lazy-op so
   * it will only do as much work as is required.
   *
   * @param n
   * @returns {*}
   */
  take(n) {
    assertIsNumber(n, "LazyStream.take expects a number");
    let value, index = 0;
    const taken = [],
        iterator = this.generatorFn();

    value = iterator.next();
    while (!value.done && index < n) {
      taken.push(value.value);
      index = size(taken);
      if (index >= n) {
        break;
      }
      value = iterator.next();
    }

    return LazyStack.from(...taken);
  }


  /**
   * Take from stream until there are no more values.
   * @returns {Lazy}
   */
  all() {
    return this.take(Infinity);
  }


  /**
   * Return a regular JavaScript Array from the current values in the
   * LazyStream.
   *
   */
  toArray() {
    const iterator = this.generatorFn(true);
    return iterator.next().value;
  }


  /**
   * Return a JSON representation of the LazyStack values.
   */
  toJSON() {
    const asArray = this.toArray();
    return JSON.stringify(asArray);
  }


  /**
   * Return a String to identify object in text.
   * @returns {string}
   */
  toString() {
    return `Lazy( ${this.toArray()} )`;
  }
}

