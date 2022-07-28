"use strict";

define(["../Core/Cartesian2", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/Event", "./createPropertyDescriptor", "./Property"], function (e, i, t, n, l, s, o, h) {
  "use strict";

  var r = i.WHITE,
      c = new e(8, 8),
      u = new e(0, 0),
      a = new e(1, 1);

  function f(e) {
    e = t(e, t.EMPTY_OBJECT), this._definitionChanged = new s(), this._color = void 0, this._colorSubscription = void 0, this._cellAlpha = void 0, this._cellAlphaSubscription = void 0, this._lineCount = void 0, this._lineCountSubscription = void 0, this._lineThickness = void 0, this._lineThicknessSubscription = void 0, this._lineOffset = void 0, this._lineOffsetSubscription = void 0, this.color = e.color, this.cellAlpha = e.cellAlpha, this.lineCount = e.lineCount, this.lineThickness = e.lineThickness, this.lineOffset = e.lineOffset;
  }

  return l(f.prototype, {
    isConstant: {
      get: function get() {
        return h.isConstant(this._color) && h.isConstant(this._cellAlpha) && h.isConstant(this._lineCount) && h.isConstant(this._lineThickness) && h.isConstant(this._lineOffset);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    color: o("color"),
    cellAlpha: o("cellAlpha"),
    lineCount: o("lineCount"),
    lineThickness: o("lineThickness"),
    lineOffset: o("lineOffset")
  }), f.prototype.getType = function (e) {
    return "Grid";
  }, f.prototype.getValue = function (e, i) {
    return n(i) || (i = {}), i.color = h.getValueOrClonedDefault(this._color, e, r, i.color), i.cellAlpha = h.getValueOrDefault(this._cellAlpha, e, .1), i.lineCount = h.getValueOrClonedDefault(this._lineCount, e, c, i.lineCount), i.lineThickness = h.getValueOrClonedDefault(this._lineThickness, e, a, i.lineThickness), i.lineOffset = h.getValueOrClonedDefault(this._lineOffset, e, u, i.lineOffset), i;
  }, f.prototype.equals = function (e) {
    return this === e || e instanceof f && h.equals(this._color, e._color) && h.equals(this._cellAlpha, e._cellAlpha) && h.equals(this._lineCount, e._lineCount) && h.equals(this._lineThickness, e._lineThickness) && h.equals(this._lineOffset, e._lineOffset);
  }, f;
});