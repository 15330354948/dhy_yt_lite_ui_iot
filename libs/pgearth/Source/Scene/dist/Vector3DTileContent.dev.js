"use strict";

define(["../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/FeatureDetection", "../Core/getMagic", "../Core/getStringFromTypedArray", "../Core/Math", "../Core/Matrix4", "../Core/Rectangle", "../Core/RuntimeError", "../ThirdParty/when", "./PGEarth3DTileBatchTable", "./Vector3DTilePoints", "./Vector3DTilePolygons", "./Vector3DTilePolylines"], function (K, Q, Z, t, e, i, $, n, r, tt, et, it, nt, rt, a, st, ot, at, lt) {
  "use strict";

  if (!n.supportsTypedArrays()) return {};

  function s(t, e, i, n, r) {
    this._tileset = t, this._tile = e, this._resource = i, this._polygons = void 0, this._polylines = void 0, this._points = void 0, this._contentReadyPromise = void 0, this._readyPromise = a.defer(), this._batchTable = void 0, this._features = void 0, this.featurePropertiesDirty = !1, function (t, e, i) {
      i = Q(i, 0);
      var n = new Uint8Array(e),
          r = new DataView(e);
      i += ht;
      var s = r.getUint32(i, !0);
      if (1 !== s) throw new rt("Only Vector tile version 1 is supported.  Version " + s + " is not.");
      i += ht;
      var o = r.getUint32(i, !0);
      if (i += ht, 0 === o) return t._readyPromise.resolve(t);
      var a = r.getUint32(i, !0);
      if (i += ht, 0 === a) throw new rt("Feature table must have a byte length greater than zero");
      var l = r.getUint32(i, !0);
      i += ht;
      var y = r.getUint32(i, !0);
      i += ht;
      var h = r.getUint32(i, !0);
      i += ht;

      var _ = r.getUint32(i, !0);

      i += ht;
      var p = r.getUint32(i, !0);
      i += ht;
      var u = r.getUint32(i, !0);
      i += ht;
      var f = r.getUint32(i, !0),
          g = tt(n, i += ht, a),
          b = JSON.parse(g);
      i += a;
      var c,
          d,
          T = new Uint8Array(e, i, l);
      {
        var O;
        i += l, 0 < y && (O = tt(n, i, y), c = JSON.parse(O), i += y, 0 < h && (d = new Uint8Array(e, i, h), d = new Uint8Array(d), i += h));
      }
      var m,
          v,
          L,
          P = Q(b.POLYGONS_LENGTH, 0),
          N = Q(b.POLYLINES_LENGTH, 0),
          w = Q(b.POINTS_LENGTH, 0),
          E = P + N + w,
          I = new st(t, E, c, d, function (i) {
        return function (t, e) {
          Z(i._polygons) && i._polygons.updateCommands(t, e);
        };
      }(t));
      if (t._batchTable = I, 0 === E) return;
      {
        if (!Z(b.REGION)) throw new rt("REGION is required in the feature table.");
        var U = b.REGION;
        m = nt.unpack(U), v = U[4], L = U[5];
      }
      var A,
          C = t._tile.computedTransform;
      Z(b.RTC_CENTER) ? (A = K.unpack(b.RTC_CENTER), it.multiplyByPoint(C, A, A)) : ((A = nt.center(m)).height = et.lerp(v, L, .5), A = $.WGS84.cartographicToCartesian(A));

      var S,
          H,
          G,
          D = function (t, e) {
        var i,
            n,
            r,
            s,
            o = Q(t.POLYGONS_LENGTH, 0),
            a = Q(t.POLYLINES_LENGTH, 0),
            l = Q(t.POINTS_LENGTH, 0);
        {
          var y;
          0 < o && Z(t.POLYGON_BATCH_IDS) && (y = e.byteOffset + t.POLYGON_BATCH_IDS.byteOffset, i = new Uint16Array(e.buffer, y, o));
        }
        {
          var h;
          0 < a && Z(t.POLYLINE_BATCH_IDS) && (h = e.byteOffset + t.POLYLINE_BATCH_IDS.byteOffset, n = new Uint16Array(e.buffer, h, a));
        }
        {
          var _;

          0 < l && Z(t.POINT_BATCH_IDS) && (_ = e.byteOffset + t.POINT_BATCH_IDS.byteOffset, r = new Uint16Array(e.buffer, _, l));
        }
        var p = Z(i) || Z(n) || Z(r),
            u = 0 < o && !Z(i) || 0 < a && !Z(n) || 0 < l && !Z(r);
        if (p && u) throw new rt("If one group of batch ids is defined, then all batch ids must be defined.");

        if (!Z(i) && !Z(n) && !Z(r)) {
          var f = 0;
          if (!Z(i) && 0 < o) for (i = new Uint16Array(o), s = 0; s < o; ++s) {
            i[s] = f++;
          }
          if (!Z(n) && 0 < a) for (n = new Uint16Array(a), s = 0; s < a; ++s) {
            n[s] = f++;
          }
          if (!Z(r) && 0 < l) for (r = new Uint16Array(l), s = 0; s < l; ++s) {
            r[s] = f++;
          }
        }

        return {
          polygons: i,
          polylines: n,
          points: r
        };
      }(b, T);

      {
        var M, Y, B, R, V, x, F, W;
        i += i % 4, 0 < P && (M = new Uint32Array(e, i, _ / ht), i += _, Y = new Uint16Array(e, i, p / yt), i += p, B = T.byteOffset + b.POLYGON_COUNT.byteOffset, R = new Uint32Array(T.buffer, B, P), V = T.byteOffset + b.POLYGON_INDEX_COUNT.byteOffset, x = new Uint32Array(T.buffer, V, P), Z(b.POLYGON_MINIMUM_HEIGHTS) && Z(b.POLYGON_MAXIMUM_HEIGHTS) && (F = T.byteOffset + b.POLYGON_MINIMUM_HEIGHTS.byteOffset, S = new Float32Array(T.buffer, F, P), W = T.byteOffset + b.POLYGON_MAXIMUM_HEIGHTS.byteOffset, H = new Float32Array(T.buffer, W, P)), t._polygons = new at({
          positions: Y,
          counts: R,
          indexCounts: x,
          indices: M,
          minimumHeight: v,
          maximumHeight: L,
          polygonMinimumHeights: S,
          polygonMaximumHeights: H,
          center: A,
          rectangle: m,
          boundingVolume: t.tile.boundingVolume.boundingVolume,
          batchTable: I,
          batchIds: D.polygons,
          modelMatrix: C
        }));
      }

      if (0 < N) {
        var z = new Uint16Array(e, i, u / yt);
        i += u;
        var X = T.byteOffset + b.POLYLINE_COUNT.byteOffset,
            k = new Uint32Array(T.buffer, X, N);

        if (Z(b.POLYLINE_WIDTHS)) {
          var q = T.byteOffset + b.POLYLINE_WIDTHS.byteOffset;
          G = new Uint16Array(T.buffer, q, N);
        } else {
          G = new Uint16Array(N);

          for (var J = 0; J < N; ++J) {
            G[J] = 2;
          }
        }

        t._polylines = new lt({
          positions: z,
          widths: G,
          counts: k,
          batchIds: D.polylines,
          minimumHeight: v,
          maximumHeight: L,
          center: A,
          rectangle: m,
          boundingVolume: t.tile.boundingVolume.boundingVolume,
          batchTable: I
        });
      }

      {
        var j;
        0 < w && (j = new Uint16Array(e, i, f / yt), t._points = new ot({
          positions: j,
          batchIds: D.points,
          minimumHeight: v,
          maximumHeight: L,
          rectangle: m,
          batchTable: I
        }));
      }
    }(this, n, r);
  }

  t(s.prototype, {
    featuresLength: {
      get: function get() {
        return Z(this._batchTable) ? this._batchTable.featuresLength : 0;
      }
    },
    pointsLength: {
      get: function get() {
        return Z(this._points) ? this._points.pointsLength : 0;
      }
    },
    trianglesLength: {
      get: function get() {
        var t = 0;
        return Z(this._polygons) && (t += this._polygons.trianglesLength), Z(this._polylines) && (t += this._polylines.trianglesLength), t;
      }
    },
    geometryByteLength: {
      get: function get() {
        var t = 0;
        return Z(this._polygons) && (t += this._polygons.geometryByteLength), Z(this._polylines) && (t += this._polylines.geometryByteLength), t;
      }
    },
    texturesByteLength: {
      get: function get() {
        return Z(this._points) ? this._points.texturesByteLength : 0;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return Z(this._batchTable) ? this._batchTable.memorySizeInBytes : 0;
      }
    },
    innerContents: {
      get: function get() {}
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    tileset: {
      get: function get() {
        return this._tileset;
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      }
    },
    url: {
      get: function get() {
        return this._resource.getUrlComponent(!0);
      }
    },
    batchTable: {
      get: function get() {
        return this._batchTable;
      }
    }
  });
  var yt = Uint16Array.BYTES_PER_ELEMENT,
      ht = Uint32Array.BYTES_PER_ELEMENT;

  function o(t) {
    var e,
        i = t.featuresLength;
    !Z(t._features) && 0 < i && (e = new Array(i), Z(t._polygons) && t._polygons.createFeatures(t, e), Z(t._polylines) && t._polylines.createFeatures(t, e), Z(t._points) && t._points.createFeatures(t, e), t._features = e);
  }

  return s.prototype.hasProperty = function (t, e) {
    return this._batchTable.hasProperty(t, e);
  }, s.prototype.getFeature = function (t) {
    var e = this.featuresLength;
    if (!Z(t) || t < 0 || e <= t) throw new i("batchId is required and between zero and featuresLength - 1 (" + (e - 1) + ").");
    return o(this), this._features[t];
  }, s.prototype.applyDebugSettings = function (t, e) {
    Z(this._polygons) && this._polygons.applyDebugSettings(t, e), Z(this._polylines) && this._polylines.applyDebugSettings(t, e), Z(this._points) && this._points.applyDebugSettings(t, e);
  }, s.prototype.applyStyle = function (t) {
    o(this), Z(this._polygons) && this._polygons.applyStyle(t, this._features), Z(this._polylines) && this._polylines.applyStyle(t, this._features), Z(this._points) && this._points.applyStyle(t, this._features);
  }, s.prototype.update = function (t, e) {
    var i,
        n,
        r,
        s,
        o = !0;
    Z(this._polygons) && (this._polygons.classificationType = this._tileset.classificationType, this._polygons.debugWireframe = this._tileset.debugWireframe, this._polygons.update(e), o = o && this._polygons._ready), Z(this._polylines) && (this._polylines.update(e), o = o && this._polylines._ready), Z(this._points) && (this._points.update(e), o = o && this._points._ready), Z(this._batchTable) && o && this._batchTable.update(t, e), Z(this._contentReadyPromise) || (i = Z(this._points) ? this._points.readyPromise : void 0, n = Z(this._polygons) ? this._polygons.readyPromise : void 0, r = Z(this._polylines) ? this._polylines.readyPromise : void 0, (s = this)._contentReadyPromise = a.all([i, n, r]).then(function () {
      s._readyPromise.resolve(s);
    }));
  }, s.prototype.isDestroyed = function () {
    return !1;
  }, s.prototype.destroy = function () {
    return this._polygons = this._polygons && this._polygons.destroy(), this._polylines = this._polylines && this._polylines.destroy(), this._points = this._points && this._points.destroy(), this._batchTable = this._batchTable && this._batchTable.destroy(), e(this);
  }, s;
});