"use strict";

define(["./Check", "./defaultValue", "./defineProperties"], function (r, e, t) {
  "use strict";

  function n(t) {
    t = e(t, 0), this._array = new Array(t), this._length = t;
  }

  return t(n.prototype, {
    length: {
      get: function get() {
        return this._length;
      },
      set: function set(t) {
        (this._length = t) > this._array.length && (this._array.length = t);
      }
    },
    values: {
      get: function get() {
        return this._array;
      }
    }
  }), n.prototype.get = function (t) {
    return r.typeOf.number.lessThan("index", t, this._array.length), this._array[t];
  }, n.prototype.set = function (t, e) {
    r.typeOf.number("index", t), t >= this.length && (this.length = t + 1), this._array[t] = e;
  }, n.prototype.peek = function () {
    return this._array[this._length - 1];
  }, n.prototype.push = function (t) {
    var e = this.length++;
    this._array[e] = t;
  }, n.prototype.pop = function () {
    return this._array[--this.length];
  }, n.prototype.reserve = function (t) {
    r.typeOf.number.greaterThanOrEquals("length", t, 0), t > this._array.length && (this._array.length = t);
  }, n.prototype.resize = function (t) {
    r.typeOf.number.greaterThanOrEquals("length", t, 0), this.length = t;
  }, n.prototype.trim = function (t) {
    t = e(t, this.length), this._array.length = t;
  }, n;
});