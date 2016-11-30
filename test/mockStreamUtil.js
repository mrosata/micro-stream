/**
 * This is a mock util for storing/tracking state
 * through streams.
 * @param baseState
 * @constructor
 */
function MockStreamUtil(baseState = {}) {
  this.state = JSON.stringify(baseState);
}

/**
 * Set the state to new value, overwrites old state.
 * @param key
 * @param value
 */
MockStreamUtil.prototype.setState = function (key, value) {
  const tmp = JSON.parse(this.state);
  tmp[key] = value;
  this.state = JSON.stringify(tmp);
  return true;
};

/**
 * Get the current value of state.
 * @returns {*}
 */
MockStreamUtil.prototype.getState = function (key = null) {
  const tmp = JSON.parse(this.state);
  if (!key) {
    return tmp;
  }
  return tmp[key];
};

/**
 * Adds 1 to the passed in key.
 * @param key
 * @returns {Number}
 */
MockStreamUtil.prototype.increment = function (key) {
  this.setState(key, this.getState(key) + 1);
  return this.getState(key);
};

/**
 * Subtracts 1 from the passed in key.
 * @param key
 * @returns {Number}
 */
MockStreamUtil.prototype.decrement = function (key) {
  this.setState(key, this.getState(key) - 1);
  return this.getState(key);
};

/**
 * Reset the value of state to {}.
 * @returns {*}
 */
MockStreamUtil.prototype.reset = function () {
  this.state = JSON.stringify({});
  return true;
};

/**
 * Push an item to state (state must be an array).
 * @param key
 * @param data
 */
MockStreamUtil.prototype.pushState = function (key, data) {
  const tmp = JSON.parse(this.state);
  if (!Array.isArray(tmp[key])) {
    throw "Can't push to state that isn't an array!";
  }
  tmp[key].push(data);
  this.state = JSON.stringify(tmp);
  return true;
};


export {MockStreamUtil}
