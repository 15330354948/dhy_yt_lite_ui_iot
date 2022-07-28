"use strict";

define(["../Core/Cartesian3", "../Core/Check", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/ReferenceFrame", "./PositionProperty", "./Property", "./SampledProperty"], function (o, n, i, a, e, p, s, f, u, t, d) {
  "use strict";

  function r(e, t) {
    var r;

    if (0 < (t = i(t, 0))) {
      r = new Array(t);

      for (var n = 0; n < t; n++) {
        r[n] = o;
      }
    }

    this._numberOfDerivatives = t, this._property = new d(o, r), this._definitionChanged = new s(), this._referenceFrame = i(e, f.FIXED), this._property._definitionChanged.addEventListener(function () {
      this._definitionChanged.raiseEvent(this);
    }, this);
  }

  return e(r.prototype, {
    isConstant: {
      get: function get() {
        return this._property.isConstant;
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
    },
    interpolationDegree: {
      get: function get() {
        return this._property.interpolationDegree;
      }
    },
    interpolationAlgorithm: {
      get: function get() {
        return this._property.interpolationAlgorithm;
      }
    },
    numberOfDerivatives: {
      get: function get() {
        return this._numberOfDerivatives;
      }
    },
    forwardExtrapolationType: {
      get: function get() {
        return this._property.forwardExtrapolationType;
      },
      set: function set(e) {
        this._property.forwardExtrapolationType = e;
      }
    },
    forwardExtrapolationDuration: {
      get: function get() {
        return this._property.forwardExtrapolationDuration;
      },
      set: function set(e) {
        this._property.forwardExtrapolationDuration = e;
      }
    },
    backwardExtrapolationType: {
      get: function get() {
        return this._property.backwardExtrapolationType;
      },
      set: function set(e) {
        this._property.backwardExtrapolationType = e;
      }
    },
    backwardExtrapolationDuration: {
      get: function get() {
        return this._property.backwardExtrapolationDuration;
      },
      set: function set(e) {
        this._property.backwardExtrapolationDuration = e;
      }
    }
  }), r.prototype.getValue = function (e, t) {
    return this.getValueInReferenceFrame(e, f.FIXED, t);
  }, r.prototype.getValueInReferenceFrame = function (e, t, r) {
    if (n.defined("time", e), n.defined("referenceFrame", t), r = this._property.getValue(e, r), a(r)) return u.convertToReferenceFrame(e, r, this._referenceFrame, t, r);
  }, r.prototype.setInterpolationOptions = function (e) {
    this._property.setInterpolationOptions(e);
  }, r.prototype.addSample = function (e, t, r) {
    var n = this._numberOfDerivatives;
    if (0 < n && (!a(r) || r.length !== n)) throw new p("derivatives length must be equal to the number of derivatives.");

    this._property.addSample(e, t, r);
  }, r.prototype.addSamples = function (e, t, r) {
    this._property.addSamples(e, t, r);
  }, r.prototype.addSamplesPackedArray = function (e, t) {
    this._property.addSamplesPackedArray(e, t);
  }, r.prototype.removeSample = function (e) {
    this._property.removeSample(e);
  }, r.prototype.removeSamples = function (e) {
    this._property.removeSamples(e);
  }, r.prototype.equals = function (e) {
    return this === e || e instanceof r && t.equals(this._property, e._property) && this._referenceFrame === e._referenceFrame;
  }, r;
});