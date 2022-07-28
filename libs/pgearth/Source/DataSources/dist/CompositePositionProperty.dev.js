"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/ReferenceFrame", "./CompositeProperty", "./Property"], function (t, i, e, o, n, r, s, a) {
  "use strict";

  function f(e) {
    this._referenceFrame = t(e, r.FIXED), this._definitionChanged = new n(), this._composite = new s(), this._composite.definitionChanged.addEventListener(f.prototype._raiseDefinitionChanged, this);
  }

  return e(f.prototype, {
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
        return this._composite.intervals;
      }
    },
    referenceFrame: {
      get: function get() {
        return this._referenceFrame;
      },
      set: function set(e) {
        this._referenceFrame = e;
      }
    }
  }), f.prototype.getValue = function (e, t) {
    return this.getValueInReferenceFrame(e, r.FIXED, t);
  }, f.prototype.getValueInReferenceFrame = function (e, t, n) {
    if (!i(e)) throw new o("time is required.");
    if (!i(t)) throw new o("referenceFrame is required.");

    var r = this._composite._intervals.findDataForIntervalContainingDate(e);

    if (i(r)) return r.getValueInReferenceFrame(e, t, n);
  }, f.prototype.equals = function (e) {
    return this === e || e instanceof f && this._referenceFrame === e._referenceFrame && this._composite.equals(e._composite, a.equals);
  }, f.prototype._raiseDefinitionChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, f;
});