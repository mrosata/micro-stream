/**
 * This is a mock util for storing/tracking state
 * through streams.
 * @param baseState
 * @constructor
 */
function MockStreamUtil(baseState = null) {
  this.state = baseState;
}

/**
 * Set the state to new value, overwrites old state.
 * @param state
 */
MockStreamUtil.prototype.setState = function (state) {
  this.state = state;
};

/**
 * Get the current value of state.
 * @returns {*}
 */
MockStreamUtil.prototype.getState = function () {
  return this.state;
};

/**
 * Push an item to state (state must be an array).
 * @param data
 */
MockStreamUtil.prototype.pushState = function (data) {
  if (!Array.isArray(this.state)) {
    throw "Can't push to state that isn't an array!";
  }
  this.state.push(data);
};


export {MockStreamUtil}