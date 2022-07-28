"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (o, e, r, t, i, n, l) {
  "use strict";

  var s = o.WHITE;

  function w(o) {
    o = e(o, e.EMPTY_OBJECT), this._definitionChanged = new i(), this._color = void 0, this._colorSubscription = void 0, this._glowPower = void 0, this._glowPowerSubscription = void 0, this._taperPower = void 0, this._taperPowerSubscription = void 0, this.color = o.color, this.glowPower = o.glowPower, this.taperPower = o.taperPower;
  }

  return t(w.prototype, {
    isConstant: {
      get: function get() {
        return l.isConstant(this._color) && l.isConstant(this._glow);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: n("color"),
    glowPower: n("glowPower"),
    taperPower: n("taperPower")
  }), w.prototype.getType = function (o) {
    return "PolylineGlow";
  }, w.prototype.getValue = function (o, e) {
    return r(e) || (e = {}), e.color = l.getValueOrClonedDefault(this._color, o, s, e.color), e.glowPower = l.getValueOrDefault(this._glowPower, o, .25, e.glowPower), e.taperPower = l.getValueOrDefault(this._taperPower, o, 1, e.taperPower), e;
  }, w.prototype.equals = function (o) {
    return this === o || o instanceof w && l.equals(this._color, o._color) && l.equals(this._glowPower, o._glowPower) && l.equals(this._taperPower, o._taperPower);
  }, w;
});