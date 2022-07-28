"use strict";

define(["../Core/arraySlice", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Color", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DistanceDisplayCondition", "../Core/Ellipsoid", "../Core/NearFarScalar", "../Core/Rectangle", "../Core/TaskProcessor", "../ThirdParty/when", "./BillboardCollection", "./PGEarth3DTilePointFeature", "./HorizontalOrigin", "./LabelCollection", "./LabelStyle", "./PolylineCollection", "./VerticalOrigin"], function (k, c, P, d, E, e, i, l, I, t, x, o, a, B, b, h, H, u, z, C) {
  "use strict";

  function n(e) {
    this._positions = e.positions, this._batchTable = e.batchTable, this._batchIds = e.batchIds, this._rectangle = e.rectangle, this._minHeight = e.minimumHeight, this._maxHeight = e.maximumHeight, this._billboardCollection = void 0, this._labelCollection = void 0, this._polylineCollection = void 0, this._verticesPromise = void 0, this._packedBuffer = void 0, this._ready = !1, this._readyPromise = a.defer(), this._resolvedPromise = !1;
  }

  e(n.prototype, {
    pointsLength: {
      get: function get() {
        return this._billboardCollection.length;
      }
    },
    texturesByteLength: {
      get: function get() {
        return this._billboardCollection.textureAtlas.texture.sizeInBytes + this._labelCollection._textureAtlas.texture.sizeInBytes;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  });
  var L = new o("createVectorTilePoints"),
      S = new P();

  function r(i, e) {
    if (!E(i._billboardCollection)) {
      var l, t, o, a, n, r, s, c, d;

      if (!E(i._verticesPromise)) {
        l = i._positions;
        var h = i._packedBuffer;
        E(h) || (l = i._positions = k(l), i._batchIds = k(i._batchIds), h = i._packedBuffer = (o = e, a = (t = i)._rectangle, n = t._minHeight, r = t._maxHeight, s = 2 + x.packedLength + I.packedLength, c = new Float64Array(s), d = 0, c[d++] = n, c[d++] = r, x.pack(a, c, d), d += x.packedLength, I.pack(o, c, d), c));
        var b = [l.buffer, h.buffer],
            u = {
          positions: l.buffer,
          packedBuffer: h.buffer
        },
            C = i._verticesPromise = L.scheduleTask(u, b);
        if (!E(C)) return;
        C.then(function (e) {
          i._positions = new Float64Array(e.positions), i._ready = !0;
        });
      }

      if (i._ready && !E(i._billboardCollection)) {
        l = i._positions;

        var g = i._batchTable,
            p = i._batchIds,
            _ = i._billboardCollection = new B({
          batchTable: g
        }),
            y = i._labelCollection = new H({
          batchTable: g
        }),
            v = i._polylineCollection = new z();

        v._useHighlightColor = !0;

        for (var f = l.length / 3, O = 0; O < f; ++O) {
          var D = p[O],
              T = P.unpack(l, 3 * O, S),
              m = _.add();

          m.position = T, m._batchIndex = D;
          var w = y.add();
          w.text = " ", w.position = T, w._batchIndex = D, v.add().positions = [P.clone(T), P.clone(T)];
        }

        i._positions = void 0, i._packedBuffer = void 0;
      }
    }
  }

  n.prototype.createFeatures = function (e, i) {
    for (var l = this._billboardCollection, t = this._labelCollection, o = this._polylineCollection, a = this._batchIds, n = a.length, r = 0; r < n; ++r) {
      var s = a[r],
          c = l.get(r),
          d = t.get(r),
          h = o.get(r);
      i[s] = new b(e, s, c, d, h);
    }
  }, n.prototype.applyDebugSettings = function (e, i) {
    e ? (d.clone(i, this._billboardCollection._highlightColor), d.clone(i, this._labelCollection._highlightColor), d.clone(i, this._polylineCollection._highlightColor)) : (d.clone(d.WHITE, this._billboardCollection._highlightColor), d.clone(d.WHITE, this._labelCollection._highlightColor), d.clone(d.WHITE, this._polylineCollection._highlightColor));
  };

  var g = new d(),
      p = new d(),
      _ = new d(),
      y = new d(),
      v = new d(),
      f = new d(),
      O = new t(),
      D = new t(),
      T = new l();

  return n.prototype.applyStyle = function (e, i) {
    if (E(e)) for (var l = this._batchIds, t = l.length, o = 0; o < t; ++o) {
      var a,
          n,
          r,
          s = i[l[o]];
      E(e.show) && (s.show = e.show.evaluate(s)), E(e.pointSize) && (s.pointSize = e.pointSize.evaluate(s)), E(e.color) && (s.color = e.color.evaluateColor(s, g)), E(e.pointOutlineColor) && (s.pointOutlineColor = e.pointOutlineColor.evaluateColor(s, p)), E(e.pointOutlineWidth) && (s.pointOutlineWidth = e.pointOutlineWidth.evaluate(s)), E(e.labelColor) && (s.labelColor = e.labelColor.evaluateColor(s, _)), E(e.labelOutlineColor) && (s.labelOutlineColor = e.labelOutlineColor.evaluateColor(s, y)), E(e.labelOutlineWidth) && (s.labelOutlineWidth = e.labelOutlineWidth.evaluate(s)), E(e.font) && (s.font = e.font.evaluate(s)), E(e.labelStyle) && (s.labelStyle = e.labelStyle.evaluate(s)), E(e.labelText) ? s.labelText = e.labelText.evaluate(s) : s.labelText = void 0, E(e.backgroundColor) && (s.backgroundColor = e.backgroundColor.evaluateColor(s, v)), E(e.backgroundPadding) && (s.backgroundPadding = e.backgroundPadding.evaluate(s)), E(e.backgroundEnabled) && (s.backgroundEnabled = e.backgroundEnabled.evaluate(s)), E(e.scaleByDistance) ? (a = e.scaleByDistance.evaluate(s), O.near = a.x, O.nearValue = a.y, O.far = a.z, O.farValue = a.w, s.scaleByDistance = O) : s.scaleByDistance = void 0, E(e.translucencyByDistance) ? (n = e.translucencyByDistance.evaluate(s), D.near = n.x, D.nearValue = n.y, D.far = n.z, D.farValue = n.w, s.translucencyByDistance = D) : s.translucencyByDistance = void 0, E(e.distanceDisplayCondition) ? (r = e.distanceDisplayCondition.evaluate(s), T.near = r.x, T.far = r.y, s.distanceDisplayCondition = T) : s.distanceDisplayCondition = void 0, E(e.heightOffset) && (s.heightOffset = e.heightOffset.evaluate(s)), E(e.anchorLineEnabled) && (s.anchorLineEnabled = e.anchorLineEnabled.evaluate(s)), E(e.anchorLineColor) && (s.anchorLineColor = e.anchorLineColor.evaluateColor(s, f)), E(e.image) ? s.image = e.image.evaluate(s) : s.image = void 0, E(e.disableDepthTestDistance) && (s.disableDepthTestDistance = e.disableDepthTestDistance.evaluate(s)), E(e.horizontalOrigin) && (s.horizontalOrigin = e.horizontalOrigin.evaluate(s)), E(e.verticalOrigin) && (s.verticalOrigin = e.verticalOrigin.evaluate(s)), E(e.labelHorizontalOrigin) && (s.labelHorizontalOrigin = e.labelHorizontalOrigin.evaluate(s)), E(e.labelVerticalOrigin) && (s.labelVerticalOrigin = e.labelVerticalOrigin.evaluate(s));
    } else !function (e, i) {
      for (var l = e._batchIds, t = l.length, o = 0; o < t; ++o) {
        var a = i[l[o]];
        a.show = !0, a.pointSize = b.defaultPointSize, a.color = b.defaultColor, a.pointOutlineColor = b.defaultPointOutlineColor, a.pointOutlineWidth = b.defaultPointOutlineWidth, a.labelColor = d.WHITE, a.labelOutlineColor = d.WHITE, a.labelOutlineWidth = 1, a.font = "30px sans-serif", a.labelStyle = u.FILL, a.labelText = void 0, a.backgroundColor = new d(.165, .165, .165, .8), a.backgroundPadding = new c(7, 5), a.backgroundEnabled = !1, a.scaleByDistance = void 0, a.translucencyByDistance = void 0, a.distanceDisplayCondition = void 0, a.heightOffset = 0, a.anchorLineEnabled = !1, a.anchorLineColor = d.WHITE, a.image = void 0, a.disableDepthTestDistance = 0, a.horizontalOrigin = h.CENTER, a.verticalOrigin = C.CENTER, a.labelHorizontalOrigin = h.RIGHT, a.labelVerticalOrigin = C.BASELINE;
      }
    }(this, i);
  }, n.prototype.update = function (e) {
    r(this, e.mapProjection.ellipsoid), this._ready && (this._polylineCollection.update(e), this._billboardCollection.update(e), this._labelCollection.update(e), this._resolvedPromise || (this._readyPromise.resolve(), this._resolvedPromise = !0));
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._billboardCollection = this._billboardCollection && this._billboardCollection.destroy(), this._labelCollection = this._labelCollection && this._labelCollection.destroy(), this._polylineCollection = this._polylineCollection && this._polylineCollection.destroy(), i(this);
  }, n;
});