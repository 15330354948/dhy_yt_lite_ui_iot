"use strict";

define(["./defineProperties"], function (t) {
  "use strict";

  function e() {
    this._array = [], this._offset = 0, this._length = 0;
  }

  return t(e.prototype, {
    length: {
      get: function get() {
        return this._length;
      }
    }
  }), e.prototype.enqueue = function (t) {
    this._array.push(t), this._length++;
  }, e.prototype.dequeue = function () {
    if (0 !== this._length) {
      var t = this._array,
          e = this._offset,
          i = t[e];
      return t[e] = void 0, 10 < ++e && 2 * e > t.length && (this._array = t.slice(e), e = 0), this._offset = e, this._length--, i;
    }
  }, e.prototype.peek = function () {
    if (0 !== this._length) return this._array[this._offset];
  }, e.prototype.contains = function (t) {
    return -1 !== this._array.indexOf(t);
  }, e.prototype.clear = function () {
    this._array.length = this._offset = this._length = 0;
  }, e.prototype.sort = function (t) {
    0 < this._offset && (this._array = this._array.slice(this._offset), this._offset = 0), this._array.sort(t);
  }, e;
});