"use strict";

define(["../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/Event", "../Core/ReferenceFrame", "./Property"], function (n, e, r, o, i, t, s) {
  "use strict";

  function u(e) {
    this._definitionChanged = new i(), this._value = void 0, this._removeSubscription = void 0, this.setValue(e);
  }

  return e(u.prototype, {
    isConstant: {
      get: function get() {
        return s.isConstant(this._value);
      }
    },
    definitionChanged: {
      get: function get() {
        return this._definitionChanged;
      }
    },
    referenceFrame: {
      get: function get() {
        return n(this._value) ? this._value.referenceFrame : t.FIXED;
      }
    }
  }), u.prototype.getValue = function (e, i) {
    return this.getValueInReferenceFrame(e, t.FIXED, i);
  }, u.prototype.setValue = function (e) {
    this._value !== e && (this._value = e, n(this._removeSubscription) && (this._removeSubscription(), this._removeSubscription = void 0), n(e) && (this._removeSubscription = e.definitionChanged.addEventListener(this._raiseDefinitionChanged, this)), this._definitionChanged.raiseEvent(this));
  }, u.prototype.getValueInReferenceFrame = function (e, i, t) {
    if (!n(e)) throw new r("time is required.");
    if (!n(i)) throw new r("referenceFrame is required.");
    if (n(this._value)) return t = this._value.getValueInReferenceFrame(e, i, t), n(t) ? o.WGS84.scaleToGeodeticSurface(t, t) : void 0;
  }, u.prototype.equals = function (e) {
    return this === e || e instanceof u && this._value === e._value;
  }, u.prototype._raiseDefinitionChanged = function () {
    this._definitionChanged.raiseEvent(this);
  }, u;
});