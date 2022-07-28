"use strict";

define(["../Core/Cartesian2", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (e, o, t, r, i, n, C, d) {
  "use strict";

  var l = o.WHITE,
      s = o.BLACK,
      a = new e(2, 2);

  function u(e) {
    e = t(e, t.EMPTY_OBJECT), this._definitionChanged = new n(), this._evenColor = void 0, this._evenColorSubscription = void 0, this._oddColor = void 0, this._oddColorSubscription = void 0, this._repeat = void 0, this._repeatSubscription = void 0, this.evenColor = e.evenColor, this.oddColor = e.oddColor, this.repeat = e.repeat;
  }

  return i(u.prototype, {
    isConstant: {
      get: function get() {
        return d.isConstant(this._evenColor) && d.isConstant(this._oddColor) && d.isConstant(this._repeat);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    evenColor: C("evenColor"),
    oddColor: C("oddColor"),
    repeat: C("repeat")
  }), u.prototype.getType = function (e) {
    return "Checkerboard";
  }, u.prototype.getValue = function (e, o) {
    return r(o) || (o = {}), o.lightColor = d.getValueOrClonedDefault(this._evenColor, e, l, o.lightColor), o.darkColor = d.getValueOrClonedDefault(this._oddColor, e, s, o.darkColor), o.repeat = d.getValueOrDefault(this._repeat, e, a), o;
  }, u.prototype.equals = function (e) {
    return this === e || e instanceof u && d.equals(this._evenColor, e._evenColor) && d.equals(this._oddColor, e._oddColor) && d.equals(this._repeat, e._repeat);
  }, u;
});