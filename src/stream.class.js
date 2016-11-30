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
    this.__cancelled = false;
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
      emitter(stream.push.bind(stream));
    }
    return stream;
  }
  
  static fromEvent(eventType, selector = 'body') {
    return Stream.of((hook) => {
      return docQueryHookEvent(eventType, hook, selector)
    })
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
  
  as(value) {
    return this.map(() => value);
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
    if (!this.__cancelled && this.observers.length > 0) {
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
    const baseCase = test => !isFunction(test);
    const accumulator = (fn, arg) => {
      if (fn.length <= 1) {
        return fn(arg);
      }
      return fn.bind(fn, arg);
    };
    
    
    const  cancelFn = this.cancel.bind(this);
    const streamObserver = new StreamReducer(
      cancelFn, accumulator, baseCase, baseFn);
    
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
    const baseCase = test => !isFunction(test);
    const accumulator = (fn, arg) => fn.call(fn, arg);
    
    const  cancelFn = this.cancel.bind(this);
    const streamObserver = new StreamReducer(
      cancelFn, accumulator, baseCase, baseFn);
    
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
    const baseCase = (val) => filterFn(val);
    const streamObserver = new StreamReducer(
      this.cancel.bind(this), accumulator, baseCase, null);
    
    this.observers.push(streamObserver);
    return streamObserver;
  }
  
  
  reduce(accumulator, defaultValue = null, baseCase) {
    let observer, _baseCase, reducer;
    
    if (!isFunction(baseCase)) {
      // This is going to do infinite folding, which means we will need a way
      // to get the values out from iterator without actually completing it.
      // So we'll create a new observer to receive each value everytime the
      // generator is ran.
      observer = new StreamObserver(this.cancel.bind(this), id);
      _baseCase = (data) => {observer.push(data); return false;};
      
      reducer = new StreamReducer(
        this.cancel.bind(this), accumulator, _baseCase, defaultValue);
    }
    else {
      // The other case (baseCase was defined by developer as a function),
      // The reducer and the observer are the same thing, once the generator
      // completes it will push the reduced value out and start again.
      reducer = observer = new StreamReducer(
        this.cancel.bind(this), accumulator, baseCase, defaultValue);
    }
    
    this.observers.push(reducer);
    return observer;
  }
  
  
  
  /**
   * Pass a function that returns a promise into the StreamObserver and also
   * an optional error handler. The rejectionHandler allows the developer to fix
   * a bad value just like with trap. So if the promise is rejected then it will
   * be passed to rejectionHandler and the value returned from there will be
   * the value passed down the stream.
   *
   * @param promiseFactory {Function}
   * @param rejectionHandler {Function|void}
   * @returns {StreamObserver}
   */
  async(promiseFactory, rejectionHandler = id) {
    const observer = new StreamObserver(this.cancel.bind(this), id);
  
    // Since we "thread the loop" here, we have 2 cancellations.
    // cancel this
    const cancellations = () => {
      observer.cancel.bind(observer);
      this.cancel.bind(this);
    };
    const reducer = new StreamReducer(
      cancellations,
      (_, item) => {
        const promise = promiseFactory(item);
        promise
          .catch(rejectionHandler)
          .then(observer.push.bind(observer));
        return promise;
      }, () => false); // ()=>false is baseCase (we want infinite loop)
    
    this.observers.push(reducer);
    return observer;
  }
  
}



class StreamReducer extends StreamObserver {
  
  
  static of(accumulator, baseCase, defaultValue) {
    return new StreamReducer(null, accumulator, baseCase, defaultValue);
  }
  
  
  /**
   *
   * @param cancelStream
   * @param accumulator
   * @param baseCase - recursive-case basically, but when true recursion stops
   * @param baseValue
   */
  constructor(cancelStream, accumulator, baseCase, baseValue = []) {
    baseValue = isObject(baseValue) ? getCopy(baseValue) : baseValue;
    super(cancelStream, id);
    this.observers = [];
    this.__type = STREAM_REDUCER;
    this.__accumulator = accumulator;
    this.__baseCase = isFunction(baseCase) ? baseCase : ()=>true;
    this.__baseValue = baseValue;
    this.prepareIterator();
  }
  
  
  /**
   * Prepare an iterator which accepts the streams output as the
   * next param to a accumulators input. Once the `accumulator(input)`
   * is able to meet the `baseCase` then the iterator completes
   * and returns the reduction of all accumulated inputs thus far and
   * the process starts over upon the next input value from stream.
   */
  prepareIterator() {
    let baseCase = this.__baseCase;
    let accumulator = this.__accumulator;
    
    const generator = function * accumulateTilRecursiveCase(baseValue) {
      let value = baseValue;
      while (!baseCase(value)) {
        value = accumulator(value, yield);
      }
      
      return value;
    };
    
    // Get the generator setup for first streamed event
    this.__iterator = generator(getCopy(this.__baseValue));
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
    
    if (__value.done && !this.__cancelled) {
      this.observers.map(obs => obs.push(__value.value));
      this.prepareIterator();
    }
    return this;
  }
  
}


export {
  Stream, StreamObserver, StreamReducer
}
