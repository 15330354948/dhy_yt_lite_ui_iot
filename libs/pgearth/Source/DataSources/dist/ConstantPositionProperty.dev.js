"use strict";

define(["../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/ReferenceFrame", "./PositionProperty"], function (n, t, i, e, o, a, u, f) {
  "use strict";

  function r(e, r) {
    this._definitionChanged = new a(), this._value = n.clone(e), this._referenceFrame = t(r, u.FIXED);
  }

  return e(r.prototype, {
    isConstant: {
      get: function get() {
        return !i(this._value) || this._referenceFrame === u.FIXED;
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    referenceFrame: {
      get: function get() {
        return this._referenceFrame;
      }
    }
  }), r.prototype.getValue = function (e, r) {
    return this.getValueInReferenceFrame(e, u.FIXED, r);
  }, r.prototype.setValue = function (e, r) {
    var t = !1;
    n.equals(this._value, e) || (t = !0, this._value = n.clone(e)), i(r) && this._referenceFrame !== r && (t = !0, this._referenceFrame = r), t && this._definitionChanged.raiseEvent(this);
  }, r.prototype.getValueInReferenceFrame = function (e, r, t) {
    if (!i(e)) throw new o("time is required.");
    if (!i(r)) throw new o("referenceFrame is required.");
    return f.convertToReferenceFrame(e, this._value, this._referenceFrame, r, t);
  }, r.prototype.equals = function (e) {
    return this === e || e instanceof r && n.equals(this._value, e._value) && this._referenceFrame === e._referenceFrame;
  }, r;
});