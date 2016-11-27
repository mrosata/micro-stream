"use strict";
/*
 * @package Micro Stream
 */
import {
  docQueryHookEvent, inspect, id, isSomething, isObject, isFunction, getCopy, path
} from "./utils.js";


const STREAM = 0;
const STREAM_OBSERVER = 1;
const STREAM_REDUCER = 2;
const STREAM_TYPE = ['Stream', 'StreamObserver', 'StreamReducer'];

export default class Stream {
  /**
   * @constructor Stream
   */
  constructor() {
    this.__type = STREAM;
    this.__value = (x)=>x;
    this.observers = [];
  }
  
  /**
   * Create a new stream
   *
   * @param emitter {Function|void}
   * @returns {Stream}
   */
  static of(emitter) {
    const stream = new Stream();
    if (typeof emitter === "function") {
      stream.bindTo(emitter)
    }
    return stream;
  }
  
  static fromEvent(eventType, selector = 'body') {
    return Stream.of((hook) => {
      return docQueryHookEvent(eventType, hook, selector)
    })
  }
  
  /**
   *
   * @param emmiterFunction {Function}
   */
  bindTo(emmiterFunction = id) {
    emmiterFunction(this.push.bind(this));
    return this;
  }
  
  /**
   * @param fn
   * @returns {Stream}
   */
  map(fn) {
    const __value = this.__value.bind(this);
    // The only time we don't auto subscribe is on a main Stream.
    if (this.__type !== STREAM) {
      let obs = new StreamObserver(this.cancel.bind(this), (data) => fn(__value(data)));
      this.observers.push(obs);
      return obs.subscribe;
    }
    // If this is a root STREAM, then we actually mutate its inner value. Keep the stream mega lazy.
    this.__value = (data) => fn(__value(data));
    return this;
  }
  
  /**
   * Run a function as if doing a `map`, but the function has
   * no effect over the return value of the stream.
   *
   * @param fn
   */
  tap(fn) {
    return this.map((val) => {
      fn(val);
      return val;
    });
  }
  
  /**
   * Map with additional error handling.
   * @param fn
   * @param errorHandler
   * @returns {Stream}
   */
  trap(fn, errorHandler = id) {
    return this.map((val) => {
      try {
        return fn(val);
      }
      catch (err) {
        return errorHandler(err);
      }
    });
  }
  
  /**
   * Safely resolve path values on an object. Returns those values to the
   * next function downstream or undefined, but it won't throw if the
   * properties don't exist on the object.
   * @param arrayResolvingPath
   * @returns {*}
   */
  path(arrayResolvingPath) {
    return this.map(path(arrayResolvingPath))
  }
  
  get subscribe() {
    return this.__subscribe();
  }
  set subscribe(fn) {
    return this.__subscribe(fn);
  }
  
  
  /**
   * The main entry point for data being observed. When the stream
   * emits new data, it pushes it through this method.
   * @param data {*}
   */
  push(data) {
    if (!this.__cancelled) {
      const _data = this.__value(data);
      this.observers.map(obs => obs.push(_data));
    }
    return this;
  }
  
  
  /**
   * Cancels any observers which in turn cancels any of their observers,
   * finally calls any Stream which it may be observing.
   *
   * @returns {Stream}
   */
  cancel() {
    if (this.__cancelled) {
      throw `Cancelled ${STREAM_TYPE[this.__type]} cannot cancel other streams!`;
    }
    // Cancel any streams which depend on this stream for data.
    this.observers.map(obs => {
      obs.cancel.call(obs);
    });
    // Cancel this stream as well.
    this.__cancelled = true;
    return this;
  }
  
  
  /**
   * Subscribe a specific stream type to `this` Stream. Optionally pass in a function to act
   * as the first "listener" in the stream.
   *
   * @param baseFn
   * @returns {StreamObserver}
   * @private
   */
  __subscribe( baseFn = id) {
    const obs = new StreamObserver(this.cancel.bind(this), baseFn);
    this.observers.push(obs);
    return obs;
  }
  
  
  /**
   * Inspect a Stream
   * @returns {string}
   */
  inspect() {
    return `${STREAM_TYPE[this.__type]}( ${ inspect(this.__value) } )`;
  }
  
}



class StreamObserver extends Stream {
  
  static of(stream, baseObservation) {
    if (!isObject(stream) || stream.constructor !== Stream) {
      throw `Argument 1 to StreamObserver.of must be Stream. Received ${stream}`;
    }
    return new StreamObserver(stream.cancel.bind(stream), baseObservation);
  }
  /**
   * @param cancelStream {Function}
   * @param baseObservation {Function|void}
   */
  constructor(cancelStream, baseObservation) {
    super(baseObservation);
    this.__type = STREAM_OBSERVER;
    this.observers = [];
    this.iterationIndex = 0;
    this.cancelStream = cancelStream;
    this.__value = baseObservation.bind(this);
    this.__cancelled = false;
  }
  
  
  /**
   * This method will remove the need for developers to "curry" their own functions.
   *
   * @param baseFn {Function}
   */
  curry(baseFn) {
    const recursiveCase = isFunction;
    const accumulator = (fn, arg) => {
      if (fn.length <= 1) {
        return fn(arg);
      }
      return fn.bind(fn, arg);
    };
    
    
    const  cancelFn = this.cancel.bind(this);
    const streamObserver = new StreamReducer(
      cancelFn, accumulator, recursiveCase, baseFn);
    
    this.observers.push(streamObserver);
    return streamObserver;
  }
  
  
  /**
   * For yielding til all parameters of a curried function are filled.
   *
   * @desc pipe stream into an already curried function implementation.
   * @param baseFn {Function} An already curried function
   * @returns {StreamObserver}
   */
  curried(baseFn) {
    const recursiveCase = isFunction;
    const accumulator = (fn, arg) => fn.call(fn, arg);
    
    const  cancelFn = this.cancel.bind(this);
    const streamObserver = new StreamReducer(
      cancelFn, accumulator, recursiveCase, baseFn);
    
    this.observers.push(streamObserver);
    return streamObserver;
  }
  
  
  
  /**
   * Filter out values in a stream.
   *
   * The filter method returns a new instance of an StreamReducer. It uses
   * the op passed in as `fiterFn` as an accumulator so that only values which meet
   * that filter test are returned from the reducer and passed down the stream.
   * @param filterFn
   */
  filter(filterFn = isSomething) {
    const accumulator = (accum, item) => item;
    const recursiveCase = (val) => !filterFn(val);
    const streamObserver = new StreamReducer(
      this.cancel.bind(this), accumulator, recursiveCase, null);
    
    this.observers.push(streamObserver);
    return streamObserver;
  }
  
  
  reduce(accumulator, recursiveCase, defaultValue = null) {
    const streamObserver = new StreamReducer(
      this.cancel.bind(this), accumulator, recursiveCase, defaultValue);
    
    this.observers.push(streamObserver);
    return streamObserver;
  }
  
}



class StreamReducer extends StreamObserver {
  
  
  static of(accumulator, recursiveCase, defaultValue) {
    return new StreamReducer(null, accumulator, recursiveCase, defaultValue);
  }
  
  
  constructor(cancelStream, accumulator, recursiveCase, baseValue = []) {
    baseValue = isObject(baseValue) ? getCopy(baseValue) : baseValue;
    super(cancelStream, id);
    this.observers = [];
    this.__type = STREAM_REDUCER;
    this.__accumulator = accumulator;
    this.__recursiveCase = recursiveCase;
    this.__baseValue = baseValue;
    this.prepareIterator();
  }
  
  
  /**
   * Prepare an iterator which accepts the streams output as the
   * next param to a accumulators input. Once the `accumulator(input)`
   * is able to meet the `recursiveCase` then the iterator completes
   * and returns the reduction of all accumulated inputs thus far and
   * the process starts over upon the next input value from stream.
   */
  prepareIterator() {
    let recursiveCase = this.__recursiveCase;
    let accumulator = this.__accumulator;
    let baseValue = getCopy(this.__baseValue);
    this.__value = x => x;
    
    const generator = function * accumulateTilRecursiveCase() {
      let value = baseValue;
      
      while (recursiveCase(value)) {
        value = accumulator(value, yield);
      }
      
      return value;
    };
    
    // Get the generator setup for first streamed event
    this.__iterator = generator();
    this.__iterator.next(); // first call won't set `data`
  }
  
  
  /**
   * StreamReducers override the super method `push` in order
   * to "hold back" the __value until all of its params are full.
   *
   * @param data {*}
   */
  push(data) {
    let __value = this.__value = this.__iterator.next(data);
    
    if (__value.done) {
      this.observers.map(obs => obs.push(__value.value));
      this.prepareIterator();
    }
    return this;
  }
  
}



export {
  Stream, StreamObserver, StreamReducer
};