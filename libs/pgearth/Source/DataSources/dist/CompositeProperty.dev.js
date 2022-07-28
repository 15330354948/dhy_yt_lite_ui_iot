"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/EventHelper", "../Core/TimeIntervalCollection", "./Property"], function (h, e, i, t, n, r, a) {
  "use strict";

  function o() {
    this._eventHelper = new n(), this._definitionChanged = new t(), this._intervals = new r(), this._intervals.changedEvent.addEventListener(o.prototype._intervalsChanged, this);
  }

  return e(o.prototype, {
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
  }), o.prototype.getValue = function (e, t) {
    if (!h(e)) throw new i("time is required");

    var n = this._intervals.findDataForIntervalContainingDate(e);

    if (h(n)) return n.getValue(e, t);
  }, o.prototype.equals = function (e) {
    return this === e || e instanceof o && this._intervals.equals(e._intervals, a.equals);
  }, o.prototype._intervalsChanged = function () {
    !function (e, t, n, i) {
      function r() {
        n.raiseEvent(e);
      }

      var a = [];
      t.removeAll();

      for (var o = i.length, s = 0; s < o; s++) {
        var d = i.get(s);
        h(d.data) && -1 === a.indexOf(d.data) && t.add(d.data.definitionChanged, r);
      }
    }(this, this._eventHelper, this._definitionChanged, this._intervals), this._definitionChanged.raiseEvent(this);
  }, o;
});