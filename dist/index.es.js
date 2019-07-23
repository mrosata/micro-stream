import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _typeof from 'babel-runtime/helpers/typeof';

/**
 * Utilities used in through the Stream classes.
 */

var id = function id(x) {
  return x;
};
var isSomething = function isSomething(thing) {
  return typeof thing !== 'undefined' && thing !== null;
};
var isFunction = function isFunction(thing) {
  return typeof thing === 'function';
};
var isObject = function isObject(thing) {
  return !!thing && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === "object";
};
var isArray = Array.isArray;
var inspect$1 = function inspect$1(item) {
  return item && isFunction(item.inspect) ? item.inspect() : item;
};

/**
 *  This is temporary. Originally there were functional compositions with monads
 *  in the original Micro-Stream class handling IO. However, Micro-Stream shouldn't
 *  make assumptions about code. I don't want to import the monads required. So
 *  for now, this will be the way to implement these DOM IO ops.
 */
var docQueryHookEvent = function docQueryHookEvent(eventType, hook, selector) {
  var elem = document.querySelector(selector);
  if (elem) {
    elem.addEventListener(eventType, hook, false);
  } else {
    hook(new Error('Unable to hook event to selector: ' + selector + '; element: ' + (typeof elem === 'undefined' ? 'undefined' : _typeof(elem))));
  }
};

function path$1(pathOfProps) {
  pathOfProps = [].concat(pathOfProps);

  return function (obj) {
    return pathOfProps.reduce(function (accum, propName) {
      return isObject(accum) ? accum[propName] : undefined;
    }, obj);
  };
}

function getCopy(subject) {
  if (isObject(subject)) {
    // Arrays
    if (isArray(subject)) {
      var items = [];
      for (var item in subject) {
        subject[subject.length - 1] = getCopy(item);
      }
      return items;
    }

    // Dates
    if (subject.constructor === Date) {
      return new Date(subject.toISOString());
    }

    // Regular Objects
    return _Object$assign({}, subject);
  }

  // Everything Else
  return subject;
}

/*
 * @package Micro Stream
 */

var STREAM = 0;
var STREAM_OBSERVER = 1;
var STREAM_REDUCER = 2;
var STREAM_TYPE = ['Stream', 'StreamObserver', 'StreamReducer'];

var Stream = function () {
  /**
   * @constructor Stream
   */
  function Stream() {
    _classCallCheck(this, Stream);

    this.__type = STREAM;
    this.__value = function (x) {
      return x;
    };
    this.__cancelled = false;
    this.observers = [];
  }

  /**
   * Create a new stream
   *
   * @param emitter {Function|void}
   * @returns {Stream}
   */


  _createClass(Stream, [{
    key: "map",


    /**
     * @param fn
     * @returns {Stream}
     */
    value: function map(fn) {
      var __value = this.__value.bind(this);
      // The only time we don't auto subscribe is on a main Stream.
      if (this.__type !== STREAM) {
        var obs = new StreamObserver(this.cancel.bind(this), function (data) {
          return fn(__value(data));
        });
        this.observers.push(obs);
        return obs.subscribe;
      }
      // If this is a root STREAM, then we actually mutate its inner value. Keep the stream mega lazy.
      this.__value = function (data) {
        return fn(__value(data));
      };
      return this;
    }

    /**
     * Run a function as if doing a `map`, but the function has
     * no effect over the return value of the stream.
     *
     * @param fn
     */

  }, {
    key: "tap",
    value: function tap(fn) {
      return this.map(function (val) {
        fn(val);
        return val;
      });
    }
  }, {
    key: "as",
    value: function as(value) {
      return this.map(function () {
        return value;
      });
    }

    /**
     * Map with additional error handling.
     * @param fn
     * @param errorHandler
     * @returns {Stream}
     */

  }, {
    key: "trap",
    value: function trap(fn) {
      var errorHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;

      return this.map(function (val) {
        try {
          return fn(val);
        } catch (err) {
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

  }, {
    key: "path",
    value: function path(arrayResolvingPath) {
      return this.map(path$1(arrayResolvingPath));
    }
  }, {
    key: "push",


    /**
     * The main entry point for data being observed. When the stream
     * emits new data, it pushes it through this method.
     * @param data {*}
     */
    value: function push(data) {
      if (!this.__cancelled && this.observers.length > 0) {
        var _data = this.__value(data);
        this.observers.map(function (obs) {
          return obs.push(_data);
        });
      }
      return this;
    }

    /**
     * Cancels any observers which in turn cancels any of their observers,
     * finally calls any Stream which it may be observing.
     *
     * @returns {Stream}
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.__cancelled) {
        throw "Cancelled " + STREAM_TYPE[this.__type] + " cannot cancel other streams!";
      }
      // Cancel any streams which depend on this stream for data.
      this.observers.map(function (obs) {
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

  }, {
    key: "__subscribe",
    value: function __subscribe() {
      var baseFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : id;

      var obs = new StreamObserver(this.cancel.bind(this), baseFn);
      this.observers.push(obs);
      return obs;
    }

    /**
     * Inspect a Stream
     * @returns {string}
     */

  }, {
    key: "inspect",
    value: function inspect() {
      return STREAM_TYPE[this.__type] + "( " + inspect$1(this.__value) + " )";
    }
  }, {
    key: "subscribe",
    get: function get() {
      return this.__subscribe();
    },
    set: function set(fn) {
      return this.__subscribe(fn);
    }
  }], [{
    key: "of",
    value: function of(emitter) {
      var stream = new Stream();
      if (typeof emitter === "function") {
        emitter(stream.push.bind(stream));
      }
      return stream;
    }
  }, {
    key: "fromEvent",
    value: function fromEvent(eventType) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

      return Stream.of(function (hook) {
        return docQueryHookEvent(eventType, hook, selector);
      });
    }
  }]);

  return Stream;
}();

var StreamObserver = function (_Stream) {
  _inherits(StreamObserver, _Stream);

  _createClass(StreamObserver, null, [{
    key: "of",
    value: function of(stream, baseObservation) {
      if (!isObject(stream) || stream.constructor !== Stream) {
        throw "Argument 1 to StreamObserver.of must be Stream. Received " + stream;
      }
      return new StreamObserver(stream.cancel.bind(stream), baseObservation);
    }
    /**
     * @param cancelStream {Function}
     * @param baseObservation {Function|void}
     */

  }]);

  function StreamObserver(cancelStream, baseObservation) {
    _classCallCheck(this, StreamObserver);

    var _this = _possibleConstructorReturn(this, (StreamObserver.__proto__ || _Object$getPrototypeOf(StreamObserver)).call(this, baseObservation));

    _this.__type = STREAM_OBSERVER;
    _this.observers = [];
    _this.cancelStream = cancelStream;
    _this.__value = baseObservation.bind(_this);
    _this.__cancelled = false;
    return _this;
  }

  /**
   * This method will remove the need for developers to "curry" their own functions.
   *
   * @param baseFn {Function}
   */


  _createClass(StreamObserver, [{
    key: "curry",
    value: function curry(baseFn) {
      var baseCase = function baseCase(test) {
        return !isFunction(test);
      };
      var accumulator = function accumulator(fn, arg) {
        if (fn.length <= 1) {
          return fn(arg);
        }
        return fn.bind(fn, arg);
      };

      var cancelFn = this.cancel.bind(this);
      var streamObserver = new StreamReducer(cancelFn, accumulator, baseCase, baseFn);

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

  }, {
    key: "curried",
    value: function curried(baseFn) {
      var baseCase = function baseCase(test) {
        return !isFunction(test);
      };
      var accumulator = function accumulator(fn, arg) {
        return fn.call(fn, arg);
      };

      var cancelFn = this.cancel.bind(this);
      var streamObserver = new StreamReducer(cancelFn, accumulator, baseCase, baseFn);

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

  }, {
    key: "filter",
    value: function filter() {
      var filterFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isSomething;

      var accumulator = function accumulator(accum, item) {
        return item;
      };
      var baseCase = function baseCase(val) {
        return filterFn(val);
      };
      var streamObserver = new StreamReducer(this.cancel.bind(this), accumulator, baseCase, null);

      this.observers.push(streamObserver);
      return streamObserver;
    }
  }, {
    key: "reduce",
    value: function reduce(accumulator) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var baseCase = arguments[2];

      var observer = void 0,
          _baseCase = void 0,
          reducer = void 0;

      if (!isFunction(baseCase)) {
        // This is going to do infinite folding, which means we will need a way
        // to get the values out from iterator without actually completing it.
        // So we'll create a new observer to receive each value everytime the
        // generator is ran.
        observer = new StreamObserver(this.cancel.bind(this), id);
        _baseCase = function _baseCase(data) {
          observer.push(data);return false;
        };

        reducer = new StreamReducer(this.cancel.bind(this), accumulator, _baseCase, defaultValue);
      } else {
        // The other case (baseCase was defined by developer as a function),
        // The reducer and the observer are the same thing, once the generator
        // completes it will push the reduced value out and start again.
        reducer = observer = new StreamReducer(this.cancel.bind(this), accumulator, baseCase, defaultValue);
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

  }, {
    key: "async",
    value: function async(promiseFactory) {
      var _this2 = this;

      var rejectionHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;

      var observer = new StreamObserver(this.cancel.bind(this), id);

      // Since we "thread the loop" here, we have 2 cancellations.
      // cancel this
      var cancellations = function cancellations() {
        observer.cancel.bind(observer);
        _this2.cancel.bind(_this2);
      };
      var reducer = new StreamReducer(cancellations, function (_, item) {
        var promise = promiseFactory(item);
        promise.catch(rejectionHandler).then(observer.push.bind(observer));
        return promise;
      }, function () {
        return false;
      }); // ()=>false is baseCase (we want infinite loop)

      this.observers.push(reducer);
      return observer;
    }
  }]);

  return StreamObserver;
}(Stream);

var StreamReducer = function (_StreamObserver) {
  _inherits(StreamReducer, _StreamObserver);

  _createClass(StreamReducer, null, [{
    key: "of",
    value: function of(accumulator, baseCase, defaultValue) {
      return new StreamReducer(null, accumulator, baseCase, defaultValue);
    }

    /**
     *
     * @param cancelStream
     * @param accumulator
     * @param baseCase - recursive-case basically, but when true recursion stops
     * @param baseValue
     */

  }]);

  function StreamReducer(cancelStream, accumulator, baseCase) {
    var baseValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    _classCallCheck(this, StreamReducer);

    baseValue = isObject(baseValue) ? getCopy(baseValue) : baseValue;

    var _this3 = _possibleConstructorReturn(this, (StreamReducer.__proto__ || _Object$getPrototypeOf(StreamReducer)).call(this, cancelStream, id));

    _this3.observers = [];
    _this3.__type = STREAM_REDUCER;
    _this3.__accumulator = accumulator;
    _this3.__baseCase = isFunction(baseCase) ? baseCase : function () {
      return true;
    };
    _this3.__baseValue = baseValue;
    _this3.prepareIterator();
    return _this3;
  }

  /**
   * Prepare an iterator which accepts the streams output as the
   * next param to a accumulators input. Once the `accumulator(input)`
   * is able to meet the `baseCase` then the iterator completes
   * and returns the reduction of all accumulated inputs thus far and
   * the process starts over upon the next input value from stream.
   */


  _createClass(StreamReducer, [{
    key: "prepareIterator",
    value: function prepareIterator() {
      var baseCase = this.__baseCase;
      var accumulator = this.__accumulator;

      var generator = /*#__PURE__*/_regeneratorRuntime.mark(function accumulateTilRecursiveCase(baseValue) {
        var value;
        return _regeneratorRuntime.wrap(function accumulateTilRecursiveCase$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = baseValue;

              case 1:
                if (baseCase(value)) {
                  _context.next = 10;
                  break;
                }

                _context.t0 = accumulator;
                _context.t1 = value;
                _context.next = 6;
                return;

              case 6:
                _context.t2 = _context.sent;
                value = (0, _context.t0)(_context.t1, _context.t2);
                _context.next = 1;
                break;

              case 10:
                return _context.abrupt("return", value);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, accumulateTilRecursiveCase, this);
      });

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

  }, {
    key: "push",
    value: function push(data) {
      var __value = this.__value = this.__iterator.next(data);

      if (__value.done && !this.__cancelled) {
        this.observers.map(function (obs) {
          return obs.push(__value.value);
        });
        this.prepareIterator();
      }
      return this;
    }
  }]);

  return StreamReducer;
}(StreamObserver);

/*
 * @package MicroStreamJS (micro-stream)
 */

export { Stream, StreamObserver, StreamReducer };
//# sourceMappingURL=index.es.js.map
