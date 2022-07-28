"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/TimeIntervalCollection", "./Property"], function (i, e, r, t, n, o) {
  "use strict";

  function s() {
    this._definitionChanged = new t(), this._intervals = new n(), this._intervals.changedEvent.addEventListener(s.prototype._intervalsChanged, this);
  }

  return e(s.prototype, {
    isConstant: {
      get: function get() {
        return this._intervals.isEmpty;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    intervals: {
      get: function get() {
        return this._intervals;
      }
    }
  }), s.prototype.getValue = function (e, t) {
    if (!i(e)) throw new r("time is required");

    var n = this._intervals.findDataForIntervalContainingDate(e);

    return i(n) && "function" == typeof n.clone ? n.clone(t) : n;
  }, s.prototype.equals = function (e) {
    return this === e || e instanceof s && this._intervals.equals(e._intervals, o.equals);
  }, s.prototype._intervalsChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, s;
});