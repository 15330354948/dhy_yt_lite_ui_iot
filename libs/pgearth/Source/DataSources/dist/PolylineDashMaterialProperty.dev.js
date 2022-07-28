"use strict";

define(["../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (t, o, e, n, r, a, s) {
  "use strict";

  var i = t.WHITE,
      h = t.TRANSPARENT;

  function d(t) {
    t = o(t, o.EMPTY_OBJECT), this._definitionChanged = new r(), this._color = void 0, this._colorSubscription = void 0, this._gapColor = void 0, this._gapColorSubscription = void 0, this._dashLength = void 0, this._dashLengthSubscription = void 0, this._dashPattern = void 0, this._dashPatternSubscription = void 0, this.color = t.color, this.gapColor = t.gapColor, this.dashLength = t.dashLength, this.dashPattern = t.dashPattern;
  }

  return n(d.prototype, {
    isConstant: {
      get: function get() {
        return s.isConstant(this._color) && s.isConstant(this._gapColor) && s.isConstant(this._dashLength) && s.isConstant(this._dashPattern);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: a("color"),
    gapColor: a("gapColor"),
    dashLength: a("dashLength"),
    dashPattern: a("dashPattern")
  }), d.prototype.getType = function (t) {
    return "PolylineDash";
  }, d.prototype.getValue = function (t, o) {
    return e(o) || (o = {}), o.color = s.getValueOrClonedDefault(this._color, t, i, o.color), o.gapColor = s.getValueOrClonedDefault(this._gapColor, t, h, o.gapColor), o.dashLength = s.getValueOrDefault(this._dashLength, t, 16, o.dashLength), o.dashPattern = s.getValueOrDefault(this._dashPattern, t, 255, o.dashPattern), o;
  }, d.prototype.equals = function (t) {
    return this === t || t instanceof d && s.equals(this._color, t._color) && s.equals(this._gapColor, t._gapColor) && s.equals(this._dashLength, t._dashLength) && s.equals(this._dashPattern, t._dashPattern);
  }, d;
});