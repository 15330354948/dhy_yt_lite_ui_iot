"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event"], function (e, t, s, n) {
  "use strict";

  function i(t, i) {
    this._callback = void 0, this._isConstant = void 0, this._definitionChanged = new n(), this.setCallback(t, i);
  }

  return t(i.prototype, {
    isConstant: {
      get: function get() {
        return this._isConstant;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    }
  }), i.prototype.getValue = function (t, i) {
    return this._callback(t, i);
  }, i.prototype.setCallback = function (t, i) {
    if (!e(t)) throw new s("callback is required.");
    if (!e(i)) throw new s("isConstant is required.");
    var n = this._callback !== t || this._isConstant !== i;
    this._callback = t, this._isConstant = i, n && this._definitionChanged.raiseEvent(this);
  }, i.prototype.equals = function (t) {
    return this === t || t instanceof i && this._callback === t._callback && this._isConstant === t._isConstant;
  }, i;
});