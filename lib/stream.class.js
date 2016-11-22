"use strict";
/*
 * @package Micro Stream
 */
import {
  docQuery, addEvent, inspect, id, isNot, something, isFunction
} from "./utils.js";


export default class Stream {
  /**
   * @constructor Stream
   */
  constructor(optionalEmmiter) {
    this.__type = 'Stream';
    this.__value = optionalEmmiter || null;
    this.__streamEffectFn = x => x;
    this.observers = [];
  }
  
  static from(emmiter) {
    const stream = new Stream();
    emmiter(stream.emit.bind(stream));
    return stream;
  }
  
  static fromEvent(eventType, selector = 'body') {
    return Stream.from((hook) => {
      docQuery(selector).chain(elem => addEvent(eventType, hook, elem));
    })
  }
  
  /**
   * @param fn
   * @returns {Stream}
   */
  map(fn) {
    const __value = this.__value.bind(this);
    this.__value = (data) => {
      return fn(__value(data))
    };
    return this
  }
  
  /**
   * Run a function as if doing a `map`, but the function has
   * no effect over the return value of the stream.
   *
   * @param fn
   */
  tap(fn) {
    const __value = this.__value.bind(this);
    this.__value = data => {
      fn(__value(data));
      return __value(data);
    };
    return this
  }
  
  /**
   * Map with additional error handling.
   * @param fn
   * @param errorHandler
   * @returns {Stream}
   */
  trap(fn, errorHandler = id) {
    const __value = this.__value.bind(this);
    this.__value = (data) => {
      try {
        return fn(__value(data))
      }
      catch(e) {
        return errorHandler(e);
      }
    };
    return this;
  }
  
  /**
   * @desc because the value of StreamObserver is a function, when it
   * implements other types, they may access .__value to get value of
   * __streamEffectFn
   */
  get __value() {
    return this.__streamEffectFn;
  }
  set __value(value) {
    this.__streamEffectFn = value;
    return value;
  }
  get subscribe() {
    return this.__subscribe();
  }
  set subscribe(fn) {
    return this.__subscribe(StreamObserver, fn);
  }
  
  /**
   * @param data {*}
   * @returns {*}
   */
  emit(data) {
    let {observers} = this;
    observers = [].concat(observers);
    observers.map(observer => observer.push(this.__value(data)));
  }
  
  /**
   * This method removes a cancelled stream from the current streams
   * observers array. It is passed into streams when they are constructed
   * and the child stream is responsible for calling it. As long as all
   * streams extend Stream and don't overwrite `cancel` it's all good.
   * @param observer
   * @private
   */
  __cancelStream(observer) {
    this.observers = this.observers
      .filter(
        obs => obs !== observer
      );
  }
  
  /**
   * Cancels any observers which in turn cancels any of their observers,
   * finally calls any Stream which it may be observing.
   *
   * @returns {Stream}
   */
  cancel() {
    this.observers.map(obs => obs.cancel(obs));
    if (this.__cancelled) {
      throw "Can only cancel an observer 1 time!";
    }
    this.__cancelled = true;
    return this;
  }
  
  /**
   * Subscribe a specific stream type to `this` Stream. Optionally pass in a function to act
   * as the first "listener" in the stream.
   * @param ObserverConstructor
   * @param baseFn {Function|void}
   * @param args optional {*}
   * @return {StreamObserver}
   */
  __subscribe(ObserverConstructor = StreamObserver, baseFn = id, ...args) {
    const obs = new ObserverConstructor(baseFn, this.__cancelStream.bind(this), ...args);
    this.observers.push(obs);
    return obs;
  }
  
  yieldTil (reducerFn, returnCondition) {
    return this.__subscribe(IteratorStreamObserver, reducerFn, returnCondition);
  }
  
  
  /**
   * This method will remove the need for developers to "curry" their own functions.
   *
   * @param argCount {Integer|Function}
   * @param baseFn {Function|void}
   */
  curry(argCount, baseFn) {
    // If no number is passed in, try to figure it out.
    if (isFunction(argCount)) {
      baseFn = argCount;
      argCount = argCount.length;
    }
    // `curry` uses collector beneath the sheet, write baseFn to apply collection to baseFn.
    const supplyCompleteParamsToBaseFn = (collection) => baseFn.apply(baseFn, collection);
    // `collectorBaseCaseFn` when iterator satisfies this condition then it streams value.
    const collectorBaseCaseFn = args => args.length >= argCount;
    return this.__subscribe(
      CollectorStreamObserver, supplyCompleteParamsToBaseFn, collectorBaseCaseFn);
  }
  
  
  /**
   * For yielding til all parameters of a curried function are filled.
   *
   * @desc pipe stream into an already curried function implementation.
   * @param baseFn {Function} An already curried function
   * @returns {StreamObserver}
   */
  curried(baseFn) {
    return this.__subscribe(IteratorStreamObserver, baseFn, isNot(isFunction));
  }
  
  
  /**
   * Inspect a Stream
   * @returns {string}
   */
  inspect() {
    return `${this.__type}( ${ inspect(this.__value()) } )`;
  }
  
}



class StreamObserver extends Stream {
  
  /**
   * @param baseObservation {Function|void}
   * @param cancelStream {Function}
   */
  constructor(baseObservation, cancelStream) {
    super(...arguments);
    this.__type = 'StreamObserver';
    this.observers = [];
    this.cancelStream = cancelStream;
    this.__value = baseObservation.bind(this);
    this.__filter = () => true;
    this.__cancelled = false;
  }
  
  /**
   * StreamObservers have to cancel both their observers and those
   * streams which they observe. The former they can accomplish
   * through super().
   */
  cancel() {
    super.cancel();
    this.cancelStream && this.cancelStream(this);
  }
  
  /**
   * The main entry point for data being observed. When the stream
   * emits new data, it pushes it through this method.
   * @param data
   */
  push(data) {
    if (this.__cancelled) {
      throw "Unable to push data down cancelled StreamObserver";
    }
    if (this.__filter(data)) {
      const _data = this.__value(data);
      this.observers.map(obs => obs.push(_data));
    }
    return this;
  }
  
  /**
   * //TODO: I think a better solution is running all push(data) through an es6 gen/iter
   * @param filterFn
   */
  filter(filterFn = something) {
    this.__filter = filterFn;
    return this;
  }
  
}



class IteratorStreamObserver extends StreamObserver {
  
  constructor(baseObservation, cancelStream, returnCondition = ()=>true) {
    super(...arguments);
    this.__type = 'IteratorStreamObserver';
  
    this.__baseObservation = baseObservation;
    this.__returnCondition = returnCondition;
    this.prepareIterator();
  }
  
  /**
   * Prepare an iterator which accepts the streams output as the
   * next param to a curried function. All Streams go to the curried
   * function until it is able to totally apply and then the stream
   * pushes that value out and starts over with a new iterator.
   */
  prepareIterator() {
    let currentValue = this.__baseObservation.bind(this);
    let returnCondition = this.__returnCondition();
  
    const generator = function * yieldParamsToCurried() {
      while (!returnCondition(currentValue)) {
        let data;
        data = yield;
        currentValue = currentValue(data);
      }
      return currentValue; // Should be fully resolved now.
    };
    
    // Get the generator setup for first streamed event
    this.__iterator = generator();
    this.__iterator.next(); // first call won't set `data`
  }
  
  /**
   * IteratorStreamObservers override the super method `push` in order
   * to "hold back" the __streamEffectFn until all of its params are full.
   *
   * @param data
   */
  push(data) {
    let val = this.__iterator.next(data);
    if (val.done) {
      this.observers.map(obs => obs.push(val.value));
      this.prepareIterator();
    }
    return this;
  }
  
}



class CollectorStreamObserver extends IteratorStreamObserver {
  
  constructor(baseObservation, cancelStream, returnCondition = ()=>true) {
    super(baseObservation, cancelStream, returnCondition);
    this.__type = 'CollectorStreamObserver';
  }
  
  
  prepareIterator() {
    let baseFn = this.__baseObservation.bind(this);
    let returnCondition = this.__returnCondition();
    let collection = this.__collection = [];
  
    const generator = function * yieldParamsToCollection() {
      while (!returnCondition(collection)) {
        collection.push(yield);
      }
      // Should be fully resolved now.
      return baseFn(collection);
    };
    
    // Get the generator setup for first streamed event
    this.__iterator = generator();
    // first call won't set `data`
    this.__iterator.next();
  }
  
}


export {
  Stream, StreamObserver, IteratorStreamObserver, CollectorStreamObserver
};