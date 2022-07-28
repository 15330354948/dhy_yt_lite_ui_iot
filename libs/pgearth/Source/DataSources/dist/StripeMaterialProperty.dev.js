"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property", "./StripeOrientation"], function (o, t, e, i, r, n, s, a) {
  "use strict";

  var d = a.HORIZONTAL,
      l = o.WHITE,
      C = o.BLACK;

  function f(o) {
    o = t(o, t.EMPTY_OBJECT), this._definitionChanged = new r(), this._orientation = void 0, this._orientationSubscription = void 0, this._evenColor = void 0, this._evenColorSubscription = void 0, this._oddColor = void 0, this._oddColorSubscription = void 0, this._offset = void 0, this._offsetSubscription = void 0, this._repeat = void 0, this._repeatSubscription = void 0, this.orientation = o.orientation, this.evenColor = o.evenColor, this.oddColor = o.oddColor, this.offset = o.offset, this.repeat = o.repeat;
  }

  return i(f.prototype, {
    isConstant: {
      get: function get() {
        return s.isConstant(this._orientation) && s.isConstant(this._evenColor) && s.isConstant(this._oddColor) && s.isConstant(this._offset) && s.isConstant(this._repeat);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    orientation: n("orientation"),
    evenColor: n("evenColor"),
    oddColor: n("oddColor"),
    offset: n("offset"),
    repeat: n("repeat")
  }), f.prototype.getType = function (o) {
    return "Stripe";
  }, f.prototype.getValue = function (o, t) {
    return e(t) || (t = {}), t.horizontal = s.getValueOrDefault(this._orientation, o, d) === a.HORIZONTAL, t.evenColor = s.getValueOrClonedDefault(this._evenColor, o, l, t.evenColor), t.oddColor = s.getValueOrClonedDefault(this._oddColor, o, C, t.oddColor), t.offset = s.getValueOrDefault(this._offset, o, 0), t.repeat = s.getValueOrDefault(this._repeat, o, 1), t;
  }, f.prototype.equals = function (o) {
    return this === o || o instanceof f && s.equals(this._orientation, o._orientation) && s.equals(this._evenColor, o._evenColor) && s.equals(this._oddColor, o._oddColor) && s.equals(this._offset, o._offset) && s.equals(this._repeat, o._repeat);
  }, f;
});