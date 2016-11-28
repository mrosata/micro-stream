
function MockStreamUtil() {
  this.state = null;
}
MockStreamUtil.prototype.setState = function (state) {
  this.state = state;
};
MockStreamUtil.prototype.getState = function () {
  return this.state;
};

export {MockStreamUtil}