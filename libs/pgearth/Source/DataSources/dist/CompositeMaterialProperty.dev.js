"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "./CompositeProperty", "./Property"], function (n, e, o, t, i, r) {
  "use strict";

  function s() {
    this._definitionChanged = new t(), this._composite = new i(), this._composite.definitionChanged.addEventListener(s.prototype._raiseDefinitionChanged, this);
  }

  return e(s.prototype, {
    isConstant: {
      get: function get() {
        return this._composite.isConstant;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    intervals: {
      get: function get() {
        return this._composite._intervals;
      }
    }
  }), s.prototype.getType = function (e) {
    if (!n(e)) throw new o("time is required");

    var t = this._composite._intervals.findDataForIntervalContainingDate(e);

    if (n(t)) return t.getType(e);
  }, s.prototype.getValue = function (e, t) {
    if (!n(e)) throw new o("time is required");

    var i = this._composite._intervals.findDataForIntervalContainingDate(e);

    if (n(i)) return i.getValue(e, t);
  }, s.prototype.equals = function (e) {
    return this === e || e instanceof s && this._composite.equals(e._composite, r.equals);
  }, s.prototype._raiseDefinitionChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, s;
});