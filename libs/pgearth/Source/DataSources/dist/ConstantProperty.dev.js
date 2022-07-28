"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/Event"], function (o, t, e) {
  "use strict";

  function i(t) {
    this._value = void 0, this._hasClone = !1, this._hasEquals = !1, this._definitionChanged = new e(), this.setValue(t);
  }

  return t(i.prototype, {
    isConstant: {
      value: !0
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    }
  }), i.prototype.getValue = function (t, e) {
    return this._hasClone ? this._value.clone(e) : this._value;
  }, i.prototype.setValue = function (t) {
    var e,
        i,
        n,
        s = this._value;
    s !== t && (i = (e = o(t)) && "function" == typeof t.clone, (n = e && "function" == typeof t.equals) && t.equals(s) || (this._hasClone = i, this._hasEquals = n, this._value = i ? t.clone(this._value) : t, this._definitionChanged.raiseEvent(this)));
  }, i.prototype.equals = function (t) {
    return this === t || t instanceof i && (!this._hasEquals && this._value === t._value || this._hasEquals && this._value.equals(t._value));
  }, i.prototype.valueOf = function () {
    return this._value;
  }, i.prototype.toString = function () {
    return String(this._value);
  }, i;
});