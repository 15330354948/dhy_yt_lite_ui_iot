"use strict";

define(["./defined", "./defineProperties"], function (e, t) {
  "use strict";

  function i(t, e, i, n) {
    this._format = t, this._width = e, this._height = i, this._buffer = n;
  }

  return t(i.prototype, {
    internalFormat: {
      get: function get() {
        return this._format;
      }
    },
    width: {
      get: function get() {
        return this._width;
      }
    },
    height: {
      get: function get() {
        return this._height;
      }
    },
    bufferView: {
      get: function get() {
        return this._buffer;
      }
    }
  }), i.clone = function (t) {
    if (e(t)) return new i(t._format, t._width, t._height, t._buffer);
  }, i.prototype.clone = function () {
    return i.clone(this);
  }, i;
});