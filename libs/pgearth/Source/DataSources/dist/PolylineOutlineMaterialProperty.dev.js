"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (o, t, i, e, n, l, r) {
  "use strict";

  var u = o.WHITE,
      s = o.BLACK;

  function h(o) {
    o = t(o, t.EMPTY_OBJECT), this._definitionChanged = new n(), this._color = void 0, this._colorSubscription = void 0, this._outlineColor = void 0, this._outlineColorSubscription = void 0, this._outlineWidth = void 0, this._outlineWidthSubscription = void 0, this.color = o.color, this.outlineColor = o.outlineColor, this.outlineWidth = o.outlineWidth;
  }

  return e(h.prototype, {
    isConstant: {
      get: function get() {
        return r.isConstant(this._color) && r.isConstant(this._outlineColor) && r.isConstant(this._outlineWidth);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: l("color"),
    outlineColor: l("outlineColor"),
    outlineWidth: l("outlineWidth")
  }), h.prototype.getType = function (o) {
    return "PolylineOutline";
  }, h.prototype.getValue = function (o, t) {
    return i(t) || (t = {}), t.color = r.getValueOrClonedDefault(this._color, o, u, t.color), t.outlineColor = r.getValueOrClonedDefault(this._outlineColor, o, s, t.outlineColor), t.outlineWidth = r.getValueOrDefault(this._outlineWidth, o, 1), t;
  }, h.prototype.equals = function (o) {
    return this === o || o instanceof h && r.equals(this._color, o._color) && r.equals(this._outlineColor, o._outlineColor) && r.equals(this._outlineWidth, o._outlineWidth);
  }, h;
});