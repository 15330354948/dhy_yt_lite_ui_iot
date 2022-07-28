"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

define(["../../Source/Core/defined", "../../Source/Core/DeveloperError", "../../Source/Core/defineProperties", "../../Source/Core/Color", "../../Source/Core/Cartesian2", "../../Source/Core/defaultValue", "../../Source/Core/createGuid", "../../Source/Core/destroyObject", "../../Source/Scene/VerticalOrigin", "../../Source/DataSources/CustomDataSource"], function (e, t, i, l, o, s, r, n, a, h) {
  var c = {
    size: 18,
    pixelRange: 40,
    gradient: {
      1e-4: l.DEEPSKYBLUE,
      .001: l.GREEN,
      .01: l.ORANGE,
      .1: l.RED
    },
    fontSize: 12,
    fontColor: l.BLACK,
    style: "circle"
  };

  function d(e) {
    this._options = _objectSpread({}, c, {}, e), this.id = s(e.id, r()), this._delegate = new h(e.id), this._delegate.clustering.enabled = !0, this._delegate.clustering.clusterEvent.addEventListener(this._clusterEventHandler, this), this._delegate.clustering.pixelRange = this._options.pixelRange, this.type = "cluster", this._state = "initialized", this._cache = {};
  }

  return d.prototype.enableCluster = function (e) {
    return this._delegate.clustering.enabled = e, this;
  }, d.prototype.add = function (e) {
    this._delegate.entities.add(e);
  }, d.prototype._drawCircle = function (e, t) {
    var i = this._options.size * (t + 1),
        l = e.toCssColorString() + "-" + i;

    if (!this._cache[l]) {
      var _t = document.createElement("canvas");

      _t.width = i, _t.height = i;

      var _o = _t.getContext("2d");

      _o.save(), _o.scale(i / 24, i / 24), _o.fillStyle = e.withAlpha(.2).toCssColorString(), _o.beginPath(), _o.arc(12, 12, 9, 0, 2 * Math.PI), _o.closePath(), _o.fill(), _o.beginPath(), _o.arc(12, 12, 6, 0, 2 * Math.PI), _o.fillStyle = e.toCssColorString(), _o.fill(), _o.closePath(), _o.restore(), this._cache[l] = _t.toDataURL();
    }

    return this._cache[l];
  }, d.prototype._drawClustering = function (e, t) {
    var i = this._options.size * (t + 1),
        l = e.toCssColorString() + "-" + i,
        o = -Math.PI / 12,
        s = Math.PI / 2,
        r = Math.PI / 6;

    if (!this._cache[l]) {
      var _t2 = document.createElement("canvas");

      _t2.width = i, _t2.height = i;

      var _n = _t2.getContext("2d");

      _n.save(), _n.scale(i / 24, i / 24), _n.beginPath(), _n.arc(12, 12, 6, 0, 2 * Math.PI), _n.fillStyle = e.toCssColorString(), _n.fill(), _n.closePath(), _n.lineWidth = 2;

      for (var _t3 = 0; _t3 < 3; _t3++) {
        _n.beginPath(), _n.arc(12, 12, 8, o, o + s, !1), _n.strokeStyle = e.withAlpha(.4).toCssColorString(), _n.stroke(), _n.arc(12, 12, 11, o, o + s, !1), _n.strokeStyle = e.withAlpha(.2).toCssColorString(), _n.stroke(), _n.closePath(), o = o + s + r;
      }

      _n.restore(), this._cache[l] = _t2.toDataURL();
    }

    return this._cache[l];
  }, d.prototype._clusterEventHandler = function (e, t) {
    if (this._delegate.clustering.enabled && (t.billboard.show = !0, t.label.font = "bold ".concat(this._options.fontSize, "px sans-serif"), t.label.fillColor = this._options.fontColor, t.label.disableDepthTestDistance = Number.POSITIVE_INFINITY, this._delegate.entities.values.length)) {
      var _i = this._delegate.entities.values.length || 0;

      for (var _l in this._options.gradient) {
        if (e.length >= _i * _l) {
          var _i2 = String(e.length).length;
          "circle" === this._options.style ? t.billboard.image = this._drawCircle(this._options.gradient[_l], _i2) : t.billboard.image = this._drawClustering(this._options.gradient[_l], _i2), t.label.show = !0, t.label.pixelOffset = new o(1 === _i2 ? -3.5 : 2 === _i2 ? -7 : -5 * (_i2 - 1), 5);
        } else e.length <= 1 && (t.label.show = !1);
      }
    }
  }, d.prototype.clear = function () {
    return this._delegate.entities.removeAll(), this._cache = {}, this._state = "", this;
  }, d.prototype.destroy = function () {
    return this._delegate && this._delegate.entities && this._delegate.entities.removeAll(), this._cache = {}, this._state = "", n(this);
  }, d;
});