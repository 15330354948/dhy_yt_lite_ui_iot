"use strict";

define(["../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (e, r, o, t, n, i) {
  "use strict";

  function c(o) {
    this._definitionChanged = new t(), this._color = void 0, this._colorSubscription = void 0, this.color = o;
  }

  return o(c.prototype, {
    isConstant: {
      get: function get() {
        return i.isConstant(this._color);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: n("color")
  }), c.prototype.getType = function (o) {
    return "PolylineArrow";
  }, c.prototype.getValue = function (o, t) {
    return r(t) || (t = {}), t.color = i.getValueOrClonedDefault(this._color, o, e.WHITE, t.color), t;
  }, c.prototype.equals = function (o) {
    return this === o || o instanceof c && i.equals(this._color, o._color);
  }, c;
});