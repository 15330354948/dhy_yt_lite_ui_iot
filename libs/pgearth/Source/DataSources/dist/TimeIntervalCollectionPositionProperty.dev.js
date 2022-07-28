"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/ReferenceFrame", "../Core/TimeIntervalCollection", "./PositionProperty", "./Property"], function (t, i, e, o, r, n, a, s, f) {
  "use strict";

  function u(e) {
    this._definitionChanged = new r(), this._intervals = new a(), this._intervals.changedEvent.addEventListener(u.prototype._intervalsChanged, this), this._referenceFrame = t(e, n.FIXED);
  }

  return e(u.prototype, {
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
    },
    referenceFrame: {
      get: function get() {
        return this._referenceFrame;
      }
    }
  }), u.prototype.getValue = function (e, t) {
    return this.getValueInReferenceFrame(e, n.FIXED, t);
  }, u.prototype.getValueInReferenceFrame = function (e, t, r) {
    if (!i(e)) throw new o("time is required.");
    if (!i(t)) throw new o("referenceFrame is required.");

    var n = this._intervals.findDataForIntervalContainingDate(e);

    if (i(n)) return s.convertToReferenceFrame(e, n, this._referenceFrame, t, r);
  }, u.prototype.equals = function (e) {
    return this === e || e instanceof u && this._intervals.equals(e._intervals, f.equals) && this._referenceFrame === e._referenceFrame;
  }, u.prototype._intervalsChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, u;
});