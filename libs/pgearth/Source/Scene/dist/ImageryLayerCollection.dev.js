"use strict";

define(["../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Event", "../Core/Math", "../Core/Rectangle", "../ThirdParty/when", "./ImageryLayer"], function (i, _, e, t, o, r, w, m, x, n) {
  "use strict";

  function a() {
    this._layers = [], this.layerAdded = new r(), this.layerRemoved = new r(), this.layerMoved = new r(), this.layerShownOrHidden = new r();
  }

  function s(e, t) {
    if (!_(t)) throw new o("layer is required.");
    var r = e.indexOf(t);
    if (-1 === r) throw new o("layer is not in this collection.");
    return r;
  }

  function l(e, t, r) {
    var o,
        n = e._layers;
    (t = w.clamp(t, 0, n.length - 1)) !== (r = w.clamp(r, 0, n.length - 1)) && (o = n[t], n[t] = n[r], n[r] = o, e._update(), e.layerMoved.raiseEvent(o, r, t));
  }

  e(a.prototype, {
    length: {
      get: function get() {
        return this._layers.length;
      }
    }
  }), a.prototype.add = function (e, t) {
    var r = _(t);

    if (!_(e)) throw new o("layer is required.");

    if (r) {
      if (t < 0) throw new o("index must be greater than or equal to zero.");
      if (t > this._layers.length) throw new o("index must be less than or equal to the number of layers.");
    }

    r ? this._layers.splice(t, 0, e) : (t = this._layers.length, this._layers.push(e)), this._update(), this.layerAdded.raiseEvent(e, t);
  }, a.prototype.addImageryProvider = function (e, t) {
    if (!_(e)) throw new o("imageryProvider is required.");
    var r = new n(e);
    return this.add(r, t), r;
  }, a.prototype.remove = function (e, t) {
    t = i(t, !0);

    var r = this._layers.indexOf(e);

    return -1 !== r && (this._layers.splice(r, 1), this._update(), this.layerRemoved.raiseEvent(e, r), t && e.destroy(), !0);
  }, a.prototype.removeAll = function (e) {
    e = i(e, !0);

    for (var t = this._layers, r = 0, o = t.length; r < o; r++) {
      var n = t[r];
      this.layerRemoved.raiseEvent(n, r), e && n.destroy();
    }

    this._layers = [];
  }, a.prototype.contains = function (e) {
    return -1 !== this.indexOf(e);
  }, a.prototype.indexOf = function (e) {
    return this._layers.indexOf(e);
  }, a.prototype.get = function (e) {
    if (!_(e)) throw new o("index is required.", "index");
    return this._layers[e];
  }, a.prototype.raise = function (e) {
    var t = s(this._layers, e);
    l(this, t, t + 1);
  }, a.prototype.lower = function (e) {
    var t = s(this._layers, e);
    l(this, t, t - 1);
  }, a.prototype.raiseToTop = function (e) {
    var t = s(this._layers, e);
    t !== this._layers.length - 1 && (this._layers.splice(t, 1), this._layers.push(e), this._update(), this.layerMoved.raiseEvent(e, this._layers.length - 1, t));
  }, a.prototype.lowerToBottom = function (e) {
    var t = s(this._layers, e);
    0 !== t && (this._layers.splice(t, 1), this._layers.splice(0, 0, e), this._update(), this.layerMoved.raiseEvent(e, 0, t));
  };
  var C = new m();
  return a.prototype.pickImageryLayerFeatures = function (e, t) {
    var r = t.globe.pick(e, t);

    if (_(r)) {
      for (var o, s = t.globe.ellipsoid.cartesianToCartographic(r), n = t.globe._surface._tilesToRender, i = 0; !_(o) && i < n.length; ++i) {
        var a = n[i];
        m.contains(a.rectangle, s) && (o = a);
      }

      if (_(o)) {
        for (var l = o.data.imagery, h = [], y = [], u = l.length - 1; 0 <= u; --u) {
          var p,
              d,
              c,
              f,
              g = l[u],
              v = g.readyImagery;
          _(v) && (p = v.imageryLayer.imageryProvider, _(p.pickFeatures) && m.contains(v.rectangle, s) && (c = 1 / 1024, (d = C).west = w.lerp(o.rectangle.west, o.rectangle.east, g.textureCoordinateRectangle.x - c), d.east = w.lerp(o.rectangle.west, o.rectangle.east, g.textureCoordinateRectangle.z + c), d.south = w.lerp(o.rectangle.south, o.rectangle.north, g.textureCoordinateRectangle.y - c), d.north = w.lerp(o.rectangle.south, o.rectangle.north, g.textureCoordinateRectangle.w + c), m.contains(d, s) && (f = p.pickFeatures(v.x, v.y, v.level, s.longitude, s.latitude), _(f) && (h.push(f), y.push(v.imageryLayer)))));
        }

        if (0 !== h.length) return x.all(h, function (e) {
          for (var t = [], r = 0; r < e.length; ++r) {
            var o = e[r],
                n = y[r];
            if (_(o) && 0 < o.length) for (var i = 0; i < o.length; ++i) {
              var a = o[i];
              a.imageryLayer = n, _(a.position) || (a.position = s), t.push(a);
            }
          }

          return t;
        });
      }
    }
  }, a.prototype.queueReprojectionCommands = function (e) {
    for (var t = this._layers, r = 0, o = t.length; r < o; ++r) {
      t[r].queueReprojectionCommands(e);
    }
  }, a.prototype.cancelReprojections = function () {
    for (var e = this._layers, t = 0, r = e.length; t < r; ++t) {
      e[t].cancelReprojections();
    }
  }, a.prototype.isDestroyed = function () {
    return !1;
  }, a.prototype.destroy = function () {
    return this.removeAll(!0), t(this);
  }, a.prototype._update = function () {
    for (var e, t, r = !0, o = this._layers, n = 0, i = o.length; n < i; ++n) {
      (t = o[n])._layerIndex = n, t.show ? (t._isBaseLayer = r, r = !1) : t._isBaseLayer = !1, t.show !== t._show && (_(t._show) && (_(e) || (e = []), e.push(t)), t._show = t.show);
    }

    if (_(e)) for (n = 0, i = e.length; n < i; ++n) {
      t = e[n], this.layerShownOrHidden.raiseEvent(t, t._layerIndex, t.show);
    }
  }, a;
});