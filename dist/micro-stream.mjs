var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var __cov_iXuMDcxlPhi3BQv$SU4RhQ = Function('return this')();
if (!__cov_iXuMDcxlPhi3BQv$SU4RhQ.__coverage__) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.__coverage__ = {};
}
__cov_iXuMDcxlPhi3BQv$SU4RhQ = __cov_iXuMDcxlPhi3BQv$SU4RhQ.__coverage__;
if (!__cov_iXuMDcxlPhi3BQv$SU4RhQ['/home/michael/projects/bin/micro-stream/lib/utils.js']) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ['/home/michael/projects/bin/micro-stream/lib/utils.js'] = { "path": "/home/michael/projects/bin/micro-stream/lib/utils.js", "s": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 1, "24": 0, "25": 0, "26": 0, "27": 0, "28": 1, "29": 0, "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0, "36": 0, "37": 0, "38": 0 }, "b": { "1": [0, 0], "2": [0, 0], "3": [0, 0], "4": [0, 0], "5": [0, 0], "6": [0, 0], "7": [0, 0], "8": [0, 0], "9": [0, 0] }, "f": { "1": 0, "2": 0, "3": 0 }, "fnMap": { "1": { "name": "path", "line": 33, "loc": { "start": { "line": 33, "column": 0 }, "end": { "line": 33, "column": 27 } } }, "2": { "name": "(anonymous_2)", "line": 36, "loc": { "start": { "line": 36, "column": 9 }, "end": { "line": 36, "column": 23 } } }, "3": { "name": "getCopy", "line": 44, "loc": { "start": { "line": 44, "column": 0 }, "end": { "line": 44, "column": 26 } } } }, "statementMap": { "1": { "start": { "line": 5, "column": 0 }, "end": { "line": 5, "column": 18 } }, "2": { "start": { "line": 5, "column": 16 }, "end": { "line": 5, "column": 17 } }, "3": { "start": { "line": 6, "column": 0 }, "end": { "line": 6, "column": 38 } }, "4": { "start": { "line": 6, "column": 17 }, "end": { "line": 6, "column": 37 } }, "5": { "start": { "line": 6, "column": 26 }, "end": { "line": 6, "column": 37 } }, "6": { "start": { "line": 7, "column": 0 }, "end": { "line": 7, "column": 40 } }, "7": { "start": { "line": 7, "column": 20 }, "end": { "line": 7, "column": 39 } }, "8": { "start": { "line": 7, "column": 29 }, "end": { "line": 7, "column": 39 } }, "9": { "start": { "line": 8, "column": 0 }, "end": { "line": 8, "column": 76 } }, "10": { "start": { "line": 8, "column": 29 }, "end": { "line": 8, "column": 75 } }, "11": { "start": { "line": 9, "column": 0 }, "end": { "line": 9, "column": 56 } }, "12": { "start": { "line": 9, "column": 28 }, "end": { "line": 9, "column": 55 } }, "13": { "start": { "line": 10, "column": 0 }, "end": { "line": 10, "column": 63 } }, "14": { "start": { "line": 10, "column": 26 }, "end": { "line": 10, "column": 62 } }, "15": { "start": { "line": 11, "column": 0 }, "end": { "line": 11, "column": 30 } }, "16": { "start": { "line": 12, "column": 0 }, "end": { "line": 12, "column": 83 } }, "17": { "start": { "line": 12, "column": 26 }, "end": { "line": 12, "column": 82 } }, "18": { "start": { "line": 20, "column": 0 }, "end": { "line": 30, "column": 2 } }, "19": { "start": { "line": 21, "column": 2 }, "end": { "line": 21, "column": 48 } }, "20": { "start": { "line": 22, "column": 2 }, "end": { "line": 29, "column": 3 } }, "21": { "start": { "line": 23, "column": 4 }, "end": { "line": 23, "column": 50 } }, "22": { "start": { "line": 26, "column": 4 }, "end": { "line": 28, "column": 82 } }, "23": { "start": { "line": 33, "column": 0 }, "end": { "line": 41, "column": 1 } }, "24": { "start": { "line": 34, "column": 2 }, "end": { "line": 34, "column": 39 } }, "25": { "start": { "line": 36, "column": 2 }, "end": { "line": 40, "column": 3 } }, "26": { "start": { "line": 37, "column": 4 }, "end": { "line": 39, "column": 12 } }, "27": { "start": { "line": 38, "column": 6 }, "end": { "line": 38, "column": 59 } }, "28": { "start": { "line": 44, "column": 0 }, "end": { "line": 66, "column": 1 } }, "29": { "start": { "line": 45, "column": 2 }, "end": { "line": 62, "column": 3 } }, "30": { "start": { "line": 47, "column": 4 }, "end": { "line": 53, "column": 5 } }, "31": { "start": { "line": 48, "column": 6 }, "end": { "line": 48, "column": 21 } }, "32": { "start": { "line": 49, "column": 6 }, "end": { "line": 51, "column": 7 } }, "33": { "start": { "line": 50, "column": 8 }, "end": { "line": 50, "column": 52 } }, "34": { "start": { "line": 52, "column": 6 }, "end": { "line": 52, "column": 19 } }, "35": { "start": { "line": 56, "column": 4 }, "end": { "line": 58, "column": 5 } }, "36": { "start": { "line": 57, "column": 6 }, "end": { "line": 57, "column": 45 } }, "37": { "start": { "line": 61, "column": 4 }, "end": { "line": 61, "column": 38 } }, "38": { "start": { "line": 65, "column": 2 }, "end": { "line": 65, "column": 17 } } }, "branchMap": { "1": { "line": 8, "type": "binary-expr", "locations": [{ "start": { "line": 8, "column": 29 }, "end": { "line": 8, "column": 57 } }, { "start": { "line": 8, "column": 61 }, "end": { "line": 8, "column": 75 } }] }, "2": { "line": 10, "type": "binary-expr", "locations": [{ "start": { "line": 10, "column": 26 }, "end": { "line": 10, "column": 33 } }, { "start": { "line": 10, "column": 37 }, "end": { "line": 10, "column": 62 } }] }, "3": { "line": 12, "type": "cond-expr", "locations": [{ "start": { "line": 12, "column": 61 }, "end": { "line": 12, "column": 75 } }, { "start": { "line": 12, "column": 78 }, "end": { "line": 12, "column": 82 } }] }, "4": { "line": 12, "type": "binary-expr", "locations": [{ "start": { "line": 12, "column": 26 }, "end": { "line": 12, "column": 30 } }, { "start": { "line": 12, "column": 34 }, "end": { "line": 12, "column": 58 } }] }, "5": { "line": 22, "type": "if", "locations": [{ "start": { "line": 22, "column": 2 }, "end": { "line": 22, "column": 2 } }, { "start": { "line": 22, "column": 2 }, "end": { "line": 22, "column": 2 } }] }, "6": { "line": 38, "type": "cond-expr", "locations": [{ "start": { "line": 38, "column": 31 }, "end": { "line": 38, "column": 46 } }, { "start": { "line": 38, "column": 49 }, "end": { "line": 38, "column": 58 } }] }, "7": { "line": 45, "type": "if", "locations": [{ "start": { "line": 45, "column": 2 }, "end": { "line": 45, "column": 2 } }, { "start": { "line": 45, "column": 2 }, "end": { "line": 45, "column": 2 } }] }, "8": { "line": 47, "type": "if", "locations": [{ "start": { "line": 47, "column": 4 }, "end": { "line": 47, "column": 4 } }, { "start": { "line": 47, "column": 4 }, "end": { "line": 47, "column": 4 } }] }, "9": { "line": 56, "type": "if", "locations": [{ "start": { "line": 56, "column": 4 }, "end": { "line": 56, "column": 4 } }, { "start": { "line": 56, "column": 4 }, "end": { "line": 56, "column": 4 } }] } } };
}
__cov_iXuMDcxlPhi3BQv$SU4RhQ = __cov_iXuMDcxlPhi3BQv$SU4RhQ['/home/michael/projects/bin/micro-stream/lib/utils.js'];
__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['1']++;var id = function id(x) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['2']++;return x;
};__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['3']++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['6']++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['9']++;var isSomething = function isSomething(thing) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['10']++;return (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['1'][0]++, typeof thing !== 'undefined') && (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['1'][1]++, thing !== null);
};__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['11']++;var isFunction = function isFunction(thing) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['12']++;return typeof thing === 'function';
};__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['13']++;var isObject = function isObject(thing) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['14']++;return (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['2'][0]++, !!thing) && (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['2'][1]++, (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object');
};__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['15']++;var isArray = Array.isArray;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['16']++;var inspect = function inspect(item) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['17']++;return (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['4'][0]++, item) && (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['4'][1]++, isFunction(item.inspect)) ? (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['3'][0]++, item.inspect()) : (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['3'][1]++, item);
};__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['18']++;var docQueryHookEvent = function docQueryHookEvent(eventType, hook, selector) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['19']++;var elem = document.querySelector(selector);__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['20']++;if (elem) {
      __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['5'][0]++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['21']++;elem.addEventListener(eventType, hook, false);
   } else {
      __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['5'][1]++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['22']++;hook(new Error('Unable to hook event to selector: ' + selector + '; element: ' + (typeof elem === 'undefined' ? 'undefined' : _typeof(elem))));
   }
};function path(pathOfProps) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.f['1']++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['24']++;pathOfProps = [].concat(pathOfProps);__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['25']++;return function (obj) {
      __cov_iXuMDcxlPhi3BQv$SU4RhQ.f['2']++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['26']++;return pathOfProps.reduce(function (accum, propName) {
         __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['27']++;return isObject(accum) ? (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['6'][0]++, accum[propName]) : (__cov_iXuMDcxlPhi3BQv$SU4RhQ.b['6'][1]++, undefined);
      }, obj);
   };
}function getCopy(subject) {
   __cov_iXuMDcxlPhi3BQv$SU4RhQ.f['3']++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['29']++;if (isObject(subject)) {
      __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['7'][0]++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['30']++;if (isArray(subject)) {
         __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['8'][0]++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['31']++;var items = [];__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['32']++;for (var item in subject) {
            __cov_iXuMDcxlPhi3BQv$SU4RhQ.s['33']++;subject[subject.length - 1] = getCopy(item);
         }__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['34']++;return items;
      } else {
         __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['8'][1]++;
      }__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['35']++;if (subject.constructor === Date) {
         __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['9'][0]++;__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['36']++;return new Date(subject.toISOString());
      } else {
         __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['9'][1]++;
      }__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['37']++;return Object.assign({}, subject);
   } else {
      __cov_iXuMDcxlPhi3BQv$SU4RhQ.b['7'][1]++;
   }__cov_iXuMDcxlPhi3BQv$SU4RhQ.s['38']++;return subject;
}

var __cov_lFn$m2kSbptJc9ez14ym4w = Function('return this')();
if (!__cov_lFn$m2kSbptJc9ez14ym4w.__coverage__) {
   __cov_lFn$m2kSbptJc9ez14ym4w.__coverage__ = {};
}
__cov_lFn$m2kSbptJc9ez14ym4w = __cov_lFn$m2kSbptJc9ez14ym4w.__coverage__;
if (!__cov_lFn$m2kSbptJc9ez14ym4w['/home/michael/projects/bin/micro-stream/lib/stream.class.js']) {
   __cov_lFn$m2kSbptJc9ez14ym4w['/home/michael/projects/bin/micro-stream/lib/stream.class.js'] = { "path": "/home/michael/projects/bin/micro-stream/lib/stream.class.js", "s": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0, "27": 0, "28": 0, "29": 0, "30": 0, "31": 0, "32": 0, "33": 0, "34": 0, "35": 0, "36": 0, "37": 0, "38": 0, "39": 0, "40": 0, "41": 0, "42": 0, "43": 0, "44": 0, "45": 0, "46": 0, "47": 0, "48": 0, "49": 0, "50": 0, "51": 0, "52": 0, "53": 0, "54": 0, "55": 0, "56": 0, "57": 0, "58": 0, "59": 0, "60": 0, "61": 0, "62": 0, "63": 0, "64": 0, "65": 0, "66": 0, "67": 0, "68": 0, "69": 0, "70": 0, "71": 0, "72": 0, "73": 0, "74": 0, "75": 0, "76": 0, "77": 0, "78": 0, "79": 0, "80": 0, "81": 0, "82": 0, "83": 0, "84": 0, "85": 0, "86": 0, "87": 0, "88": 0, "89": 0, "90": 0, "91": 0, "92": 0, "93": 0, "94": 0, "95": 0, "96": 0, "97": 0, "98": 0, "99": 0, "100": 0, "101": 0, "102": 0, "103": 0, "104": 0, "105": 0, "106": 0, "107": 0, "108": 0, "109": 0, "110": 0, "111": 0, "112": 0, "113": 0, "114": 0, "115": 0, "116": 0, "117": 0, "118": 0, "119": 0, "120": 0, "121": 0, "122": 0, "123": 0, "124": 0, "125": 0, "126": 0, "127": 0, "128": 0 }, "b": { "1": [0, 0], "2": [0, 0], "3": [0, 0], "4": [0, 0], "5": [0, 0], "6": [0, 0], "7": [0, 0], "8": [0, 0], "9": [0, 0], "10": [0, 0], "11": [0, 0], "12": [0, 0], "13": [0, 0] }, "f": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0, "12": 0, "13": 0, "14": 0, "15": 0, "16": 0, "17": 0, "18": 0, "19": 0, "20": 0, "21": 0, "22": 0, "23": 0, "24": 0, "25": 0, "26": 0 }, "fnMap": { "1": { "name": "(anonymous_1)", "line": 19, "loc": { "start": { "line": 19, "column": 13 }, "end": { "line": 19, "column": 16 } } }, "2": { "name": "(anonymous_2)", "line": 32, "loc": { "start": { "line": 32, "column": 11 }, "end": { "line": 32, "column": 21 } } }, "3": { "name": "(anonymous_3)", "line": 40, "loc": { "start": { "line": 40, "column": 18 }, "end": { "line": 40, "column": 49 } } }, "4": { "name": "(anonymous_4)", "line": 51, "loc": { "start": { "line": 51, "column": 5 }, "end": { "line": 51, "column": 10 } } }, "5": { "name": "(anonymous_5)", "line": 70, "loc": { "start": { "line": 70, "column": 5 }, "end": { "line": 70, "column": 10 } } }, "6": { "name": "(anonymous_6)", "line": 77, "loc": { "start": { "line": 77, "column": 4 }, "end": { "line": 77, "column": 12 } } }, "7": { "name": "(anonymous_7)", "line": 87, "loc": { "start": { "line": 87, "column": 6 }, "end": { "line": 87, "column": 30 } } }, "8": { "name": "(anonymous_8)", "line": 105, "loc": { "start": { "line": 105, "column": 6 }, "end": { "line": 105, "column": 27 } } }, "9": { "name": "(anonymous_9)", "line": 109, "loc": { "start": { "line": 109, "column": 15 }, "end": { "line": 109, "column": 18 } } }, "10": { "name": "(anonymous_10)", "line": 112, "loc": { "start": { "line": 112, "column": 15 }, "end": { "line": 112, "column": 20 } } }, "11": { "name": "(anonymous_11)", "line": 122, "loc": { "start": { "line": 122, "column": 6 }, "end": { "line": 122, "column": 13 } } }, "12": { "name": "(anonymous_12)", "line": 137, "loc": { "start": { "line": 137, "column": 8 }, "end": { "line": 137, "column": 11 } } }, "13": { "name": "(anonymous_13)", "line": 159, "loc": { "start": { "line": 159, "column": 13 }, "end": { "line": 159, "column": 28 } } }, "14": { "name": "(anonymous_14)", "line": 169, "loc": { "start": { "line": 169, "column": 9 }, "end": { "line": 169, "column": 12 } } }, "15": { "name": "(anonymous_15)", "line": 179, "loc": { "start": { "line": 179, "column": 11 }, "end": { "line": 179, "column": 37 } } }, "16": { "name": "(anonymous_16)", "line": 189, "loc": { "start": { "line": 189, "column": 13 }, "end": { "line": 189, "column": 45 } } }, "17": { "name": "(anonymous_17)", "line": 204, "loc": { "start": { "line": 204, "column": 7 }, "end": { "line": 204, "column": 16 } } }, "18": { "name": "(anonymous_18)", "line": 230, "loc": { "start": { "line": 230, "column": 9 }, "end": { "line": 230, "column": 18 } } }, "19": { "name": "(anonymous_19)", "line": 252, "loc": { "start": { "line": 252, "column": 8 }, "end": { "line": 252, "column": 33 } } }, "20": { "name": "(anonymous_20)", "line": 263, "loc": { "start": { "line": 263, "column": 8 }, "end": { "line": 263, "column": 58 } } }, "21": { "name": "(anonymous_21)", "line": 302, "loc": { "start": { "line": 302, "column": 7 }, "end": { "line": 302, "column": 47 } } }, "22": { "name": "(anonymous_22)", "line": 331, "loc": { "start": { "line": 331, "column": 11 }, "end": { "line": 331, "column": 54 } } }, "23": { "name": "(anonymous_23)", "line": 336, "loc": { "start": { "line": 336, "column": 13 }, "end": { "line": 336, "column": 72 } } }, "24": { "name": "(anonymous_24)", "line": 355, "loc": { "start": { "line": 355, "column": 17 }, "end": { "line": 355, "column": 20 } } }, "25": { "name": "accumulateTilRecursiveCase", "line": 359, "loc": { "start": { "line": 359, "column": 22 }, "end": { "line": 359, "column": 71 } } }, "26": { "name": "(anonymous_26)", "line": 380, "loc": { "start": { "line": 380, "column": 6 }, "end": { "line": 380, "column": 13 } } } }, "statementMap": { "1": { "start": { "line": 10, "column": 0 }, "end": { "line": 10, "column": 17 } }, "2": { "start": { "line": 11, "column": 0 }, "end": { "line": 11, "column": 26 } }, "3": { "start": { "line": 12, "column": 0 }, "end": { "line": 12, "column": 25 } }, "4": { "start": { "line": 13, "column": 0 }, "end": { "line": 13, "column": 66 } }, "5": { "start": { "line": 20, "column": 4 }, "end": { "line": 20, "column": 25 } }, "6": { "start": { "line": 21, "column": 4 }, "end": { "line": 21, "column": 26 } }, "7": { "start": { "line": 21, "column": 24 }, "end": { "line": 21, "column": 25 } }, "8": { "start": { "line": 22, "column": 4 }, "end": { "line": 22, "column": 29 } }, "9": { "start": { "line": 23, "column": 4 }, "end": { "line": 23, "column": 24 } }, "10": { "start": { "line": 33, "column": 4 }, "end": { "line": 33, "column": 32 } }, "11": { "start": { "line": 34, "column": 4 }, "end": { "line": 36, "column": 5 } }, "12": { "start": { "line": 35, "column": 6 }, "end": { "line": 35, "column": 40 } }, "13": { "start": { "line": 37, "column": 4 }, "end": { "line": 37, "column": 18 } }, "14": { "start": { "line": 41, "column": 4 }, "end": { "line": 43, "column": 6 } }, "15": { "start": { "line": 42, "column": 6 }, "end": { "line": 42, "column": 57 } }, "16": { "start": { "line": 52, "column": 4 }, "end": { "line": 52, "column": 44 } }, "17": { "start": { "line": 54, "column": 4 }, "end": { "line": 58, "column": 5 } }, "18": { "start": { "line": 55, "column": 6 }, "end": { "line": 55, "column": 88 } }, "19": { "start": { "line": 55, "column": 69 }, "end": { "line": 55, "column": 86 } }, "20": { "start": { "line": 56, "column": 6 }, "end": { "line": 56, "column": 31 } }, "21": { "start": { "line": 57, "column": 6 }, "end": { "line": 57, "column": 27 } }, "22": { "start": { "line": 60, "column": 4 }, "end": { "line": 60, "column": 47 } }, "23": { "start": { "line": 60, "column": 29 }, "end": { "line": 60, "column": 46 } }, "24": { "start": { "line": 61, "column": 4 }, "end": { "line": 61, "column": 16 } }, "25": { "start": { "line": 71, "column": 4 }, "end": { "line": 74, "column": 7 } }, "26": { "start": { "line": 72, "column": 6 }, "end": { "line": 72, "column": 14 } }, "27": { "start": { "line": 73, "column": 6 }, "end": { "line": 73, "column": 17 } }, "28": { "start": { "line": 78, "column": 4 }, "end": { "line": 78, "column": 33 } }, "29": { "start": { "line": 78, "column": 26 }, "end": { "line": 78, "column": 31 } }, "30": { "start": { "line": 88, "column": 4 }, "end": { "line": 95, "column": 7 } }, "31": { "start": { "line": 89, "column": 6 }, "end": { "line": 94, "column": 7 } }, "32": { "start": { "line": 90, "column": 8 }, "end": { "line": 90, "column": 23 } }, "33": { "start": { "line": 93, "column": 8 }, "end": { "line": 93, "column": 33 } }, "34": { "start": { "line": 106, "column": 4 }, "end": { "line": 106, "column": 45 } }, "35": { "start": { "line": 110, "column": 4 }, "end": { "line": 110, "column": 30 } }, "36": { "start": { "line": 113, "column": 4 }, "end": { "line": 113, "column": 32 } }, "37": { "start": { "line": 123, "column": 4 }, "end": { "line": 126, "column": 5 } }, "38": { "start": { "line": 124, "column": 6 }, "end": { "line": 124, "column": 39 } }, "39": { "start": { "line": 125, "column": 6 }, "end": { "line": 125, "column": 49 } }, "40": { "start": { "line": 125, "column": 32 }, "end": { "line": 125, "column": 47 } }, "41": { "start": { "line": 127, "column": 4 }, "end": { "line": 127, "column": 16 } }, "42": { "start": { "line": 138, "column": 4 }, "end": { "line": 140, "column": 5 } }, "43": { "start": { "line": 139, "column": 6 }, "end": { "line": 139, "column": 81 } }, "44": { "start": { "line": 142, "column": 4 }, "end": { "line": 144, "column": 7 } }, "45": { "start": { "line": 143, "column": 6 }, "end": { "line": 143, "column": 27 } }, "46": { "start": { "line": 146, "column": 4 }, "end": { "line": 146, "column": 28 } }, "47": { "start": { "line": 147, "column": 4 }, "end": { "line": 147, "column": 16 } }, "48": { "start": { "line": 160, "column": 4 }, "end": { "line": 160, "column": 67 } }, "49": { "start": { "line": 161, "column": 4 }, "end": { "line": 161, "column": 29 } }, "50": { "start": { "line": 162, "column": 4 }, "end": { "line": 162, "column": 15 } }, "51": { "start": { "line": 170, "column": 4 }, "end": { "line": 170, "column": 71 } }, "52": { "start": { "line": 180, "column": 4 }, "end": { "line": 182, "column": 5 } }, "53": { "start": { "line": 181, "column": 6 }, "end": { "line": 181, "column": 81 } }, "54": { "start": { "line": 183, "column": 4 }, "end": { "line": 183, "column": 75 } }, "55": { "start": { "line": 190, "column": 4 }, "end": { "line": 190, "column": 27 } }, "56": { "start": { "line": 191, "column": 4 }, "end": { "line": 191, "column": 34 } }, "57": { "start": { "line": 192, "column": 4 }, "end": { "line": 192, "column": 24 } }, "58": { "start": { "line": 193, "column": 4 }, "end": { "line": 193, "column": 37 } }, "59": { "start": { "line": 194, "column": 4 }, "end": { "line": 194, "column": 46 } }, "60": { "start": { "line": 195, "column": 4 }, "end": { "line": 195, "column": 29 } }, "61": { "start": { "line": 205, "column": 4 }, "end": { "line": 205, "column": 37 } }, "62": { "start": { "line": 206, "column": 4 }, "end": { "line": 211, "column": 6 } }, "63": { "start": { "line": 207, "column": 6 }, "end": { "line": 209, "column": 7 } }, "64": { "start": { "line": 208, "column": 8 }, "end": { "line": 208, "column": 23 } }, "65": { "start": { "line": 210, "column": 6 }, "end": { "line": 210, "column": 30 } }, "66": { "start": { "line": 214, "column": 4 }, "end": { "line": 214, "column": 45 } }, "67": { "start": { "line": 215, "column": 4 }, "end": { "line": 216, "column": 52 } }, "68": { "start": { "line": 218, "column": 4 }, "end": { "line": 218, "column": 40 } }, "69": { "start": { "line": 219, "column": 4 }, "end": { "line": 219, "column": 26 } }, "70": { "start": { "line": 231, "column": 4 }, "end": { "line": 231, "column": 37 } }, "71": { "start": { "line": 232, "column": 4 }, "end": { "line": 232, "column": 54 } }, "72": { "start": { "line": 232, "column": 37 }, "end": { "line": 232, "column": 53 } }, "73": { "start": { "line": 234, "column": 4 }, "end": { "line": 234, "column": 45 } }, "74": { "start": { "line": 235, "column": 4 }, "end": { "line": 236, "column": 52 } }, "75": { "start": { "line": 238, "column": 4 }, "end": { "line": 238, "column": 40 } }, "76": { "start": { "line": 239, "column": 4 }, "end": { "line": 239, "column": 26 } }, "77": { "start": { "line": 253, "column": 4 }, "end": { "line": 253, "column": 46 } }, "78": { "start": { "line": 253, "column": 41 }, "end": { "line": 253, "column": 45 } }, "79": { "start": { "line": 254, "column": 4 }, "end": { "line": 254, "column": 50 } }, "80": { "start": { "line": 254, "column": 35 }, "end": { "line": 254, "column": 49 } }, "81": { "start": { "line": 255, "column": 4 }, "end": { "line": 256, "column": 64 } }, "82": { "start": { "line": 258, "column": 4 }, "end": { "line": 258, "column": 40 } }, "83": { "start": { "line": 259, "column": 4 }, "end": { "line": 259, "column": 26 } }, "84": { "start": { "line": 264, "column": 4 }, "end": { "line": 264, "column": 42 } }, "85": { "start": { "line": 266, "column": 4 }, "end": { "line": 283, "column": 5 } }, "86": { "start": { "line": 271, "column": 6 }, "end": { "line": 271, "column": 64 } }, "87": { "start": { "line": 272, "column": 6 }, "end": { "line": 272, "column": 69 } }, "88": { "start": { "line": 272, "column": 34 }, "end": { "line": 272, "column": 54 } }, "89": { "start": { "line": 272, "column": 55 }, "end": { "line": 272, "column": 67 } }, "90": { "start": { "line": 274, "column": 6 }, "end": { "line": 275, "column": 75 } }, "91": { "start": { "line": 281, "column": 6 }, "end": { "line": 282, "column": 74 } }, "92": { "start": { "line": 285, "column": 4 }, "end": { "line": 285, "column": 33 } }, "93": { "start": { "line": 286, "column": 4 }, "end": { "line": 286, "column": 20 } }, "94": { "start": { "line": 303, "column": 4 }, "end": { "line": 303, "column": 68 } }, "95": { "start": { "line": 304, "column": 4 }, "end": { "line": 318, "column": 21 } }, "96": { "start": { "line": 307, "column": 8 }, "end": { "line": 307, "column": 39 } }, "97": { "start": { "line": 309, "column": 8 }, "end": { "line": 309, "column": 31 } }, "98": { "start": { "line": 312, "column": 8 }, "end": { "line": 312, "column": 45 } }, "99": { "start": { "line": 313, "column": 8 }, "end": { "line": 316, "column": 46 } }, "100": { "start": { "line": 317, "column": 8 }, "end": { "line": 317, "column": 23 } }, "101": { "start": { "line": 318, "column": 15 }, "end": { "line": 318, "column": 19 } }, "102": { "start": { "line": 320, "column": 4 }, "end": { "line": 320, "column": 33 } }, "103": { "start": { "line": 321, "column": 4 }, "end": { "line": 321, "column": 20 } }, "104": { "start": { "line": 332, "column": 4 }, "end": { "line": 332, "column": 77 } }, "105": { "start": { "line": 337, "column": 4 }, "end": { "line": 337, "column": 69 } }, "106": { "start": { "line": 338, "column": 4 }, "end": { "line": 338, "column": 28 } }, "107": { "start": { "line": 339, "column": 4 }, "end": { "line": 339, "column": 24 } }, "108": { "start": { "line": 340, "column": 4 }, "end": { "line": 340, "column": 33 } }, "109": { "start": { "line": 341, "column": 4 }, "end": { "line": 341, "column": 37 } }, "110": { "start": { "line": 342, "column": 4 }, "end": { "line": 342, "column": 41 } }, "111": { "start": { "line": 343, "column": 4 }, "end": { "line": 343, "column": 33 } }, "112": { "start": { "line": 344, "column": 4 }, "end": { "line": 344, "column": 27 } }, "113": { "start": { "line": 356, "column": 4 }, "end": { "line": 356, "column": 93 } }, "114": { "start": { "line": 356, "column": 87 }, "end": { "line": 356, "column": 92 } }, "115": { "start": { "line": 357, "column": 4 }, "end": { "line": 357, "column": 41 } }, "116": { "start": { "line": 359, "column": 4 }, "end": { "line": 366, "column": 6 } }, "117": { "start": { "line": 360, "column": 6 }, "end": { "line": 360, "column": 28 } }, "118": { "start": { "line": 361, "column": 6 }, "end": { "line": 363, "column": 7 } }, "119": { "start": { "line": 362, "column": 8 }, "end": { "line": 362, "column": 42 } }, "120": { "start": { "line": 365, "column": 6 }, "end": { "line": 365, "column": 19 } }, "121": { "start": { "line": 369, "column": 4 }, "end": { "line": 369, "column": 59 } }, "122": { "start": { "line": 370, "column": 4 }, "end": { "line": 370, "column": 27 } }, "123": { "start": { "line": 381, "column": 4 }, "end": { "line": 381, "column": 60 } }, "124": { "start": { "line": 383, "column": 4 }, "end": { "line": 386, "column": 5 } }, "125": { "start": { "line": 384, "column": 6 }, "end": { "line": 384, "column": 57 } }, "126": { "start": { "line": 384, "column": 32 }, "end": { "line": 384, "column": 55 } }, "127": { "start": { "line": 385, "column": 6 }, "end": { "line": 385, "column": 29 } }, "128": { "start": { "line": 387, "column": 4 }, "end": { "line": 387, "column": 16 } } }, "branchMap": { "1": { "line": 34, "type": "if", "locations": [{ "start": { "line": 34, "column": 4 }, "end": { "line": 34, "column": 4 } }, { "start": { "line": 34, "column": 4 }, "end": { "line": 34, "column": 4 } }] }, "2": { "line": 54, "type": "if", "locations": [{ "start": { "line": 54, "column": 4 }, "end": { "line": 54, "column": 4 } }, { "start": { "line": 54, "column": 4 }, "end": { "line": 54, "column": 4 } }] }, "3": { "line": 123, "type": "if", "locations": [{ "start": { "line": 123, "column": 4 }, "end": { "line": 123, "column": 4 } }, { "start": { "line": 123, "column": 4 }, "end": { "line": 123, "column": 4 } }] }, "4": { "line": 123, "type": "binary-expr", "locations": [{ "start": { "line": 123, "column": 8 }, "end": { "line": 123, "column": 25 } }, { "start": { "line": 123, "column": 29 }, "end": { "line": 123, "column": 54 } }] }, "5": { "line": 138, "type": "if", "locations": [{ "start": { "line": 138, "column": 4 }, "end": { "line": 138, "column": 4 } }, { "start": { "line": 138, "column": 4 }, "end": { "line": 138, "column": 4 } }] }, "6": { "line": 180, "type": "if", "locations": [{ "start": { "line": 180, "column": 4 }, "end": { "line": 180, "column": 4 } }, { "start": { "line": 180, "column": 4 }, "end": { "line": 180, "column": 4 } }] }, "7": { "line": 180, "type": "binary-expr", "locations": [{ "start": { "line": 180, "column": 8 }, "end": { "line": 180, "column": 25 } }, { "start": { "line": 180, "column": 29 }, "end": { "line": 180, "column": 58 } }] }, "8": { "line": 207, "type": "if", "locations": [{ "start": { "line": 207, "column": 6 }, "end": { "line": 207, "column": 6 } }, { "start": { "line": 207, "column": 6 }, "end": { "line": 207, "column": 6 } }] }, "9": { "line": 266, "type": "if", "locations": [{ "start": { "line": 266, "column": 4 }, "end": { "line": 266, "column": 4 } }, { "start": { "line": 266, "column": 4 }, "end": { "line": 266, "column": 4 } }] }, "10": { "line": 337, "type": "cond-expr", "locations": [{ "start": { "line": 337, "column": 38 }, "end": { "line": 337, "column": 56 } }, { "start": { "line": 337, "column": 59 }, "end": { "line": 337, "column": 68 } }] }, "11": { "line": 356, "type": "cond-expr", "locations": [{ "start": { "line": 356, "column": 60 }, "end": { "line": 356, "column": 80 } }, { "start": { "line": 356, "column": 83 }, "end": { "line": 356, "column": 92 } }] }, "12": { "line": 383, "type": "if", "locations": [{ "start": { "line": 383, "column": 4 }, "end": { "line": 383, "column": 4 } }, { "start": { "line": 383, "column": 4 }, "end": { "line": 383, "column": 4 } }] }, "13": { "line": 383, "type": "binary-expr", "locations": [{ "start": { "line": 383, "column": 8 }, "end": { "line": 383, "column": 20 } }, { "start": { "line": 383, "column": 24 }, "end": { "line": 383, "column": 41 } }] } } };
}
__cov_lFn$m2kSbptJc9ez14ym4w = __cov_lFn$m2kSbptJc9ez14ym4w['/home/michael/projects/bin/micro-stream/lib/stream.class.js'];
__cov_lFn$m2kSbptJc9ez14ym4w.s['1']++;var STREAM = 0;__cov_lFn$m2kSbptJc9ez14ym4w.s['2']++;var STREAM_OBSERVER = 1;__cov_lFn$m2kSbptJc9ez14ym4w.s['3']++;var STREAM_REDUCER = 2;__cov_lFn$m2kSbptJc9ez14ym4w.s['4']++;var STREAM_TYPE = ['Stream', 'StreamObserver', 'StreamReducer'];
var Stream = function () {
   function Stream() {
      classCallCheck(this, Stream);
      __cov_lFn$m2kSbptJc9ez14ym4w.f['1']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['5']++;this.__type = STREAM;__cov_lFn$m2kSbptJc9ez14ym4w.s['6']++;this.__value = function (x) {
         __cov_lFn$m2kSbptJc9ez14ym4w.s['7']++;return x;
      };__cov_lFn$m2kSbptJc9ez14ym4w.s['8']++;this.__cancelled = false;__cov_lFn$m2kSbptJc9ez14ym4w.s['9']++;this.observers = [];
   }

   createClass(Stream, [{
      key: 'map',
      value: function map(fn) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['4']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['16']++;var __value = this.__value.bind(this);__cov_lFn$m2kSbptJc9ez14ym4w.s['17']++;if (this.__type !== STREAM) {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['2'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['18']++;var obs = new StreamObserver(this.cancel.bind(this), function (data) {
               __cov_lFn$m2kSbptJc9ez14ym4w.s['19']++;return fn(__value(data));
            });__cov_lFn$m2kSbptJc9ez14ym4w.s['20']++;this.observers.push(obs);__cov_lFn$m2kSbptJc9ez14ym4w.s['21']++;return obs.subscribe;
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['2'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['22']++;this.__value = function (data) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['23']++;return fn(__value(data));
         };__cov_lFn$m2kSbptJc9ez14ym4w.s['24']++;return this;
      }
   }, {
      key: 'tap',
      value: function tap(fn) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['5']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['25']++;return this.map(function (val) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['26']++;fn(val);__cov_lFn$m2kSbptJc9ez14ym4w.s['27']++;return val;
         });
      }
   }, {
      key: 'as',
      value: function as(value) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['6']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['28']++;return this.map(function () {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['29']++;return value;
         });
      }
   }, {
      key: 'trap',
      value: function trap(fn) {
         var errorHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;
         __cov_lFn$m2kSbptJc9ez14ym4w.f['7']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['30']++;return this.map(function (val) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['31']++;try {
               __cov_lFn$m2kSbptJc9ez14ym4w.s['32']++;return fn(val);
            } catch (err) {
               __cov_lFn$m2kSbptJc9ez14ym4w.s['33']++;return errorHandler(err);
            }
         });
      }
   }, {
      key: 'path',
      value: function path$$(arrayResolvingPath) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['8']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['34']++;return this.map(path(arrayResolvingPath));
      }
   }, {
      key: 'push',
      value: function push(data) {
         var _this = this;

         __cov_lFn$m2kSbptJc9ez14ym4w.f['11']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['37']++;if ((__cov_lFn$m2kSbptJc9ez14ym4w.b['4'][0]++, !this.__cancelled) && (__cov_lFn$m2kSbptJc9ez14ym4w.b['4'][1]++, this.observers.length > 0)) {
            (function () {
               __cov_lFn$m2kSbptJc9ez14ym4w.b['3'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['38']++;var _data = _this.__value(data);__cov_lFn$m2kSbptJc9ez14ym4w.s['39']++;_this.observers.map(function (obs) {
                  __cov_lFn$m2kSbptJc9ez14ym4w.s['40']++;return obs.push(_data);
               });
            })();
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['3'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['41']++;return this;
      }
   }, {
      key: 'cancel',
      value: function cancel() {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['12']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['42']++;if (this.__cancelled) {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['5'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['43']++;throw 'Cancelled ' + STREAM_TYPE[this.__type] + ' cannot cancel other streams!';
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['5'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['44']++;this.observers.map(function (obs) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['45']++;obs.cancel.call(obs);
         });__cov_lFn$m2kSbptJc9ez14ym4w.s['46']++;this.__cancelled = true;__cov_lFn$m2kSbptJc9ez14ym4w.s['47']++;return this;
      }
   }, {
      key: '__subscribe',
      value: function __subscribe() {
         var baseFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : id;
         __cov_lFn$m2kSbptJc9ez14ym4w.f['13']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['48']++;var obs = new StreamObserver(this.cancel.bind(this), baseFn);__cov_lFn$m2kSbptJc9ez14ym4w.s['49']++;this.observers.push(obs);__cov_lFn$m2kSbptJc9ez14ym4w.s['50']++;return obs;
      }
   }, {
      key: 'inspect',
      value: function inspect$$() {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['14']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['51']++;return STREAM_TYPE[this.__type] + '( ' + inspect(this.__value) + ' )';
      }
   }, {
      key: 'subscribe',
      get: function get() {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['9']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['35']++;return this.__subscribe();
      },
      set: function set(fn) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['10']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['36']++;return this.__subscribe(fn);
      }
   }], [{
      key: 'of',
      value: function of(emitter) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['2']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['10']++;var stream = new Stream();__cov_lFn$m2kSbptJc9ez14ym4w.s['11']++;if (typeof emitter === 'function') {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['1'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['12']++;emitter(stream.push.bind(stream));
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['1'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['13']++;return stream;
      }
   }, {
      key: 'fromEvent',
      value: function fromEvent(eventType) {
         var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
         __cov_lFn$m2kSbptJc9ez14ym4w.f['3']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['14']++;return Stream.of(function (hook) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['15']++;return docQueryHookEvent(eventType, hook, selector);
         });
      }
   }]);
   return Stream;
}();

var StreamObserver = function (_Stream) {
   inherits(StreamObserver, _Stream);
   createClass(StreamObserver, null, [{
      key: 'of',
      value: function of(stream, baseObservation) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['15']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['52']++;if ((__cov_lFn$m2kSbptJc9ez14ym4w.b['7'][0]++, !isObject(stream)) || (__cov_lFn$m2kSbptJc9ez14ym4w.b['7'][1]++, stream.constructor !== Stream)) {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['6'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['53']++;throw 'Argument 1 to StreamObserver.of must be Stream. Received ' + stream;
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['6'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['54']++;return new StreamObserver(stream.cancel.bind(stream), baseObservation);
      }
   }]);

   function StreamObserver(cancelStream, baseObservation) {
      classCallCheck(this, StreamObserver);
      __cov_lFn$m2kSbptJc9ez14ym4w.f['16']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['55']++;
      var _this2 = possibleConstructorReturn(this, (StreamObserver.__proto__ || Object.getPrototypeOf(StreamObserver)).call(this, baseObservation));

      __cov_lFn$m2kSbptJc9ez14ym4w.s['56']++;_this2.__type = STREAM_OBSERVER;__cov_lFn$m2kSbptJc9ez14ym4w.s['57']++;_this2.observers = [];__cov_lFn$m2kSbptJc9ez14ym4w.s['58']++;_this2.cancelStream = cancelStream;__cov_lFn$m2kSbptJc9ez14ym4w.s['59']++;_this2.__value = baseObservation.bind(_this2);__cov_lFn$m2kSbptJc9ez14ym4w.s['60']++;_this2.__cancelled = false;return _this2;
   }

   createClass(StreamObserver, [{
      key: 'curry',
      value: function curry(baseFn) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['17']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['61']++;var recursiveCase = isFunction;__cov_lFn$m2kSbptJc9ez14ym4w.s['62']++;var accumulator = function accumulator(fn, arg) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['63']++;if (fn.length <= 1) {
               __cov_lFn$m2kSbptJc9ez14ym4w.b['8'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['64']++;return fn(arg);
            } else {
               __cov_lFn$m2kSbptJc9ez14ym4w.b['8'][1]++;
            }__cov_lFn$m2kSbptJc9ez14ym4w.s['65']++;return fn.bind(fn, arg);
         };__cov_lFn$m2kSbptJc9ez14ym4w.s['66']++;var cancelFn = this.cancel.bind(this);__cov_lFn$m2kSbptJc9ez14ym4w.s['67']++;var streamObserver = new StreamReducer(cancelFn, accumulator, recursiveCase, baseFn);__cov_lFn$m2kSbptJc9ez14ym4w.s['68']++;this.observers.push(streamObserver);__cov_lFn$m2kSbptJc9ez14ym4w.s['69']++;return streamObserver;
      }
   }, {
      key: 'curried',
      value: function curried(baseFn) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['18']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['70']++;var recursiveCase = isFunction;__cov_lFn$m2kSbptJc9ez14ym4w.s['71']++;var accumulator = function accumulator(fn, arg) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['72']++;return fn.call(fn, arg);
         };__cov_lFn$m2kSbptJc9ez14ym4w.s['73']++;var cancelFn = this.cancel.bind(this);__cov_lFn$m2kSbptJc9ez14ym4w.s['74']++;var streamObserver = new StreamReducer(cancelFn, accumulator, recursiveCase, baseFn);__cov_lFn$m2kSbptJc9ez14ym4w.s['75']++;this.observers.push(streamObserver);__cov_lFn$m2kSbptJc9ez14ym4w.s['76']++;return streamObserver;
      }
   }, {
      key: 'filter',
      value: function filter() {
         var filterFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : isSomething;
         __cov_lFn$m2kSbptJc9ez14ym4w.f['19']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['77']++;var accumulator = function accumulator(accum, item) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['78']++;return item;
         };__cov_lFn$m2kSbptJc9ez14ym4w.s['79']++;var recursiveCase = function recursiveCase(val) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['80']++;return !filterFn(val);
         };__cov_lFn$m2kSbptJc9ez14ym4w.s['81']++;var streamObserver = new StreamReducer(this.cancel.bind(this), accumulator, recursiveCase, null);__cov_lFn$m2kSbptJc9ez14ym4w.s['82']++;this.observers.push(streamObserver);__cov_lFn$m2kSbptJc9ez14ym4w.s['83']++;return streamObserver;
      }
   }, {
      key: 'reduce',
      value: function reduce(accumulator) {
         var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
         var recursiveCase = arguments[2];
         __cov_lFn$m2kSbptJc9ez14ym4w.f['20']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['84']++;var observer = void 0,
             _recursiveCase = void 0,
             reducer = void 0;__cov_lFn$m2kSbptJc9ez14ym4w.s['85']++;if (!isFunction(recursiveCase)) {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['9'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['86']++;observer = new StreamObserver(this.cancel.bind(this), id);__cov_lFn$m2kSbptJc9ez14ym4w.s['87']++;_recursiveCase = function _recursiveCase(data) {
               __cov_lFn$m2kSbptJc9ez14ym4w.s['88']++;observer.push(data);__cov_lFn$m2kSbptJc9ez14ym4w.s['89']++;return true;
            };__cov_lFn$m2kSbptJc9ez14ym4w.s['90']++;reducer = new StreamReducer(this.cancel.bind(this), accumulator, _recursiveCase, defaultValue);
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['9'][1]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['91']++;reducer = observer = new StreamReducer(this.cancel.bind(this), accumulator, recursiveCase, defaultValue);
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['92']++;this.observers.push(reducer);__cov_lFn$m2kSbptJc9ez14ym4w.s['93']++;return observer;
      }
   }, {
      key: 'async',
      value: function async(promiseFactory) {
         var _this3 = this;

         var rejectionHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : id;
         __cov_lFn$m2kSbptJc9ez14ym4w.f['21']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['94']++;var observer = new StreamObserver(this.cancel.bind(this), id);__cov_lFn$m2kSbptJc9ez14ym4w.s['95']++;var reducer = new StreamReducer(function () {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['96']++;observer.cancel.bind(observer);__cov_lFn$m2kSbptJc9ez14ym4w.s['97']++;_this3.cancel.bind(_this3);
         }, function (_, item) {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['98']++;var promise = promiseFactory(item);__cov_lFn$m2kSbptJc9ez14ym4w.s['99']++;promise.then(id).catch(rejectionHandler).then(observer.push.bind(observer));__cov_lFn$m2kSbptJc9ez14ym4w.s['100']++;return promise;
         }, function () {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['101']++;return true;
         });__cov_lFn$m2kSbptJc9ez14ym4w.s['102']++;this.observers.push(reducer);__cov_lFn$m2kSbptJc9ez14ym4w.s['103']++;return observer;
      }
   }]);
   return StreamObserver;
}(Stream);

var StreamReducer = function (_StreamObserver) {
   inherits(StreamReducer, _StreamObserver);
   createClass(StreamReducer, null, [{
      key: 'of',
      value: function of(accumulator, recursiveCase, defaultValue) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['22']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['104']++;return new StreamReducer(null, accumulator, recursiveCase, defaultValue);
      }
   }]);

   function StreamReducer(cancelStream, accumulator, recursiveCase) {
      var baseValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      classCallCheck(this, StreamReducer);
      __cov_lFn$m2kSbptJc9ez14ym4w.f['23']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['105']++;baseValue = isObject(baseValue) ? (__cov_lFn$m2kSbptJc9ez14ym4w.b['10'][0]++, getCopy(baseValue)) : (__cov_lFn$m2kSbptJc9ez14ym4w.b['10'][1]++, baseValue);__cov_lFn$m2kSbptJc9ez14ym4w.s['106']++;
      var _this4 = possibleConstructorReturn(this, (StreamReducer.__proto__ || Object.getPrototypeOf(StreamReducer)).call(this, cancelStream, id));

      __cov_lFn$m2kSbptJc9ez14ym4w.s['107']++;_this4.observers = [];__cov_lFn$m2kSbptJc9ez14ym4w.s['108']++;_this4.__type = STREAM_REDUCER;__cov_lFn$m2kSbptJc9ez14ym4w.s['109']++;_this4.__accumulator = accumulator;__cov_lFn$m2kSbptJc9ez14ym4w.s['110']++;_this4.__recursiveCase = recursiveCase;__cov_lFn$m2kSbptJc9ez14ym4w.s['111']++;_this4.__baseValue = baseValue;__cov_lFn$m2kSbptJc9ez14ym4w.s['112']++;_this4.prepareIterator();return _this4;
   }

   createClass(StreamReducer, [{
      key: 'prepareIterator',
      value: function prepareIterator() {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['24']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['113']++;var recursiveCase = isFunction(this.__recursiveCase) ? (__cov_lFn$m2kSbptJc9ez14ym4w.b['11'][0]++, this.__recursiveCase) : (__cov_lFn$m2kSbptJc9ez14ym4w.b['11'][1]++, function () {
            __cov_lFn$m2kSbptJc9ez14ym4w.s['114']++;return false;
         });__cov_lFn$m2kSbptJc9ez14ym4w.s['115']++;var accumulator = this.__accumulator;__cov_lFn$m2kSbptJc9ez14ym4w.s['116']++;var generator = regeneratorRuntime.mark(function accumulateTilRecursiveCase(baseValue) {
            var value;
            return regeneratorRuntime.wrap(function accumulateTilRecursiveCase$(_context) {
               while (1) {
                  switch (_context.prev = _context.next) {
                     case 0:
                        __cov_lFn$m2kSbptJc9ez14ym4w.f['25']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['117']++;value = baseValue;
                        __cov_lFn$m2kSbptJc9ez14ym4w.s['118']++;

                     case 4:
                        if (!recursiveCase(value)) {
                           _context.next = 13;
                           break;
                        }

                        __cov_lFn$m2kSbptJc9ez14ym4w.s['119']++;_context.t0 = value;
                        _context.next = 9;
                        return;

                     case 9:
                        _context.t1 = _context.sent;
                        value = accumulator(_context.t0, _context.t1);
                        _context.next = 4;
                        break;

                     case 13:
                        __cov_lFn$m2kSbptJc9ez14ym4w.s['120']++;return _context.abrupt('return', value);

                     case 15:
                     case 'end':
                        return _context.stop();
                  }
               }
            }, accumulateTilRecursiveCase, this);
         });__cov_lFn$m2kSbptJc9ez14ym4w.s['121']++;this.__iterator = generator(getCopy(this.__baseValue));__cov_lFn$m2kSbptJc9ez14ym4w.s['122']++;this.__iterator.next();
      }
   }, {
      key: 'push',
      value: function push(data) {
         __cov_lFn$m2kSbptJc9ez14ym4w.f['26']++;__cov_lFn$m2kSbptJc9ez14ym4w.s['123']++;var __value = this.__value = this.__iterator.next(data);__cov_lFn$m2kSbptJc9ez14ym4w.s['124']++;if ((__cov_lFn$m2kSbptJc9ez14ym4w.b['13'][0]++, __value.done) && (__cov_lFn$m2kSbptJc9ez14ym4w.b['13'][1]++, !this.__cancelled)) {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['12'][0]++;__cov_lFn$m2kSbptJc9ez14ym4w.s['125']++;this.observers.map(function (obs) {
               __cov_lFn$m2kSbptJc9ez14ym4w.s['126']++;return obs.push(__value.value);
            });__cov_lFn$m2kSbptJc9ez14ym4w.s['127']++;this.prepareIterator();
         } else {
            __cov_lFn$m2kSbptJc9ez14ym4w.b['12'][1]++;
         }__cov_lFn$m2kSbptJc9ez14ym4w.s['128']++;return this;
      }
   }]);
   return StreamReducer;
}(StreamObserver);

var __cov_FyQeXu2t2z1yJ5HdXuoxmg = Function('return this')();
if (!__cov_FyQeXu2t2z1yJ5HdXuoxmg.__coverage__) {
   __cov_FyQeXu2t2z1yJ5HdXuoxmg.__coverage__ = {};
}
__cov_FyQeXu2t2z1yJ5HdXuoxmg = __cov_FyQeXu2t2z1yJ5HdXuoxmg.__coverage__;
if (!__cov_FyQeXu2t2z1yJ5HdXuoxmg['/home/michael/projects/bin/micro-stream/lib/index.js']) {
   __cov_FyQeXu2t2z1yJ5HdXuoxmg['/home/michael/projects/bin/micro-stream/lib/index.js'] = { "path": "/home/michael/projects/bin/micro-stream/lib/index.js", "s": {}, "b": {}, "f": {}, "fnMap": {}, "statementMap": {}, "branchMap": {} };
}
__cov_FyQeXu2t2z1yJ5HdXuoxmg = __cov_FyQeXu2t2z1yJ5HdXuoxmg['/home/michael/projects/bin/micro-stream/lib/index.js'];

export { Stream, StreamObserver, StreamReducer };