"use strict";

define(["../Core/Cartesian3", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/FeatureDetection", "../Core/getMagic", "../Core/getStringFromTypedArray", "../Core/Math", "../Core/Matrix4", "../Core/Rectangle", "../Core/RuntimeError", "../ThirdParty/when", "./PGEarth3DTileBatchTable", "./Vector3DTileGeometry"], function (R, U, N, e, t, r, i, n, s, G, o, F, a, x, f, V, Y) {
  "use strict";

  if (!n.supportsTypedArrays()) return {};

  function h(e, t, r, i, n) {
    this._tileset = e, this._tile = t, this._resource = r, this._geometries = void 0, this._contentReadyPromise = void 0, this._readyPromise = f.defer(), this._batchTable = void 0, this._features = void 0, this.featurePropertiesDirty = !1, function (e, t, r) {
      r = U(r, 0);
      var i = new Uint8Array(t),
          n = new DataView(t);
      r += k;
      var s = n.getUint32(r, !0);
      if (1 !== s) throw new x("Only Geometry tile version 1 is supported.  Version " + s + " is not.");
      r += k;
      var o = n.getUint32(r, !0);
      if (r += k, 0 === o) return e._readyPromise.resolve(e);
      var a = n.getUint32(r, !0);
      if (r += k, 0 === a) throw new x("Feature table must have a byte length greater than zero");
      var f = n.getUint32(r, !0);
      r += k;
      var h = n.getUint32(r, !0);
      r += k;

      var u = n.getUint32(r, !0),
          y = G(i, r += k, a),
          _ = JSON.parse(y);

      r += a;
      var g,
          l,
          c = new Uint8Array(t, r, f);
      {
        var b;
        r += f, 0 < h && (b = G(i, r, h), g = JSON.parse(b), r += h, 0 < u && (l = new Uint8Array(t, r, u), l = new Uint8Array(l)));
      }
      var d = U(_.BOXES_LENGTH, 0),
          p = U(_.CYLINDERS_LENGTH, 0),
          m = U(_.ELLIPSOIDS_LENGTH, 0),
          T = U(_.SPHERES_LENGTH, 0),
          E = d + p + m + T,
          L = new V(e, E, g, l, function (r) {
        return function (e, t) {
          N(r._geometries) && r._geometries.updateCommands(e, t);
        };
      }(e));
      if (e._batchTable = L, 0 === E) return;
      var S,
          C = e.tile.computedTransform;
      N(_.RTC_CENTER) && (S = R.unpack(_.RTC_CENTER), F.multiplyByPoint(C, S, S));

      var v,
          w,
          I,
          O,
          A = function (e, t) {
        var r,
            i,
            n,
            s,
            o,
            a = U(e.BOXES_LENGTH, 0),
            f = U(e.CYLINDERS_LENGTH, 0),
            h = U(e.ELLIPSOIDS_LENGTH, 0),
            u = U(e.SPHERES_LENGTH, 0);
        {
          var y;
          0 < a && N(e.BOX_BATCH_IDS) && (y = t.byteOffset + e.BOX_BATCH_IDS.byteOffset, r = new Uint16Array(t.buffer, y, a));
        }
        {
          var _;

          0 < f && N(e.CYLINDER_BATCH_IDS) && (_ = t.byteOffset + e.CYLINDER_BATCH_IDS.byteOffset, i = new Uint16Array(t.buffer, _, f));
        }
        {
          var g;
          0 < h && N(e.ELLIPSOID_BATCH_IDS) && (g = t.byteOffset + e.ELLIPSOID_BATCH_IDS.byteOffset, n = new Uint16Array(t.buffer, g, h));
        }
        {
          var l;
          0 < u && N(e.SPHERE_BATCH_IDS) && (l = t.byteOffset + e.SPHERE_BATCH_IDS.byteOffset, s = new Uint16Array(t.buffer, l, u));
        }
        var c = N(r) || N(i) || N(n) || N(s),
            b = 0 < a && !N(r) || 0 < f && !N(i) || 0 < h && !N(n) || 0 < u && !N(s);
        if (c && b) throw new x("If one group of batch ids is defined, then all batch ids must be defined.");

        if (!(N(r) || N(i) || N(n) || N(s))) {
          var d = 0;
          if (!N(r) && 0 < a) for (r = new Uint16Array(a), o = 0; o < a; ++o) {
            r[o] = d++;
          }
          if (!N(i) && 0 < f) for (i = new Uint16Array(f), o = 0; o < f; ++o) {
            i[o] = d++;
          }
          if (!N(n) && 0 < h) for (n = new Uint16Array(h), o = 0; o < h; ++o) {
            n[o] = d++;
          }
          if (!N(s) && 0 < u) for (s = new Uint16Array(u), o = 0; o < u; ++o) {
            s[o] = d++;
          }
        }

        return {
          boxes: r,
          cylinders: i,
          ellipsoids: n,
          spheres: s
        };
      }(_, c);

      {
        var D, P, B, H;
        (0 < d || 0 < p || 0 < m || 0 < T) && (0 < d && (D = c.byteOffset + _.BOXES.byteOffset, v = new Float32Array(c.buffer, D, Y.packedBoxLength * d)), 0 < p && (P = c.byteOffset + _.CYLINDERS.byteOffset, w = new Float32Array(c.buffer, P, Y.packedCylinderLength * p)), 0 < m && (B = c.byteOffset + _.ELLIPSOIDS.byteOffset, I = new Float32Array(c.buffer, B, Y.packedEllipsoidLength * m)), 0 < T && (H = c.byteOffset + _.SPHERES.byteOffset, O = new Float32Array(c.buffer, H, Y.packedSphereLength * T)), e._geometries = new Y({
          boxes: v,
          boxBatchIds: A.boxes,
          cylinders: w,
          cylinderBatchIds: A.cylinders,
          ellipsoids: I,
          ellipsoidBatchIds: A.ellipsoids,
          spheres: O,
          sphereBatchIds: A.spheres,
          center: S,
          modelMatrix: C,
          batchTable: L,
          boundingVolume: e.tile.boundingVolume.boundingVolume
        }));
      }
    }(this, i, n);
  }

  e(h.prototype, {
    featuresLength: {
      get: function get() {
        return N(this._batchTable) ? this._batchTable.featuresLength : 0;
      }
    },
    pointsLength: {
      get: function get() {
        return 0;
      }
    },
    trianglesLength: {
      get: function get() {
        return N(this._geometries) ? this._geometries.trianglesLength : 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return N(this._geometries) ? this._geometries.geometryByteLength : 0;
      }
    },
    texturesByteLength: {
      get: function get() {
        return 0;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return N(this._batchTable) ? this._batchTable.memorySizeInBytes : 0;
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
  var k = Uint32Array.BYTES_PER_ELEMENT;

  function u(e) {
    var t,
        r = e.featuresLength;
    !N(e._features) && 0 < r && (t = new Array(r), N(e._geometries) && e._geometries.createFeatures(e, t), e._features = t);
  }

  return h.prototype.hasProperty = function (e, t) {
    return this._batchTable.hasProperty(e, t);
  }, h.prototype.getFeature = function (e) {
    var t = this.featuresLength;
    if (!N(e) || e < 0 || t <= e) throw new r("batchId is required and between zero and featuresLength - 1 (" + (t - 1) + ").");
    return u(this), this._features[e];
  }, h.prototype.applyDebugSettings = function (e, t) {
    N(this._geometries) && this._geometries.applyDebugSettings(e, t);
  }, h.prototype.applyStyle = function (e) {
    u(this), N(this._geometries) && this._geometries.applyStyle(e, this._features);
  }, h.prototype.update = function (e, t) {
    var r;
    N(this._geometries) && (this._geometries.classificationType = this._tileset.classificationType, this._geometries.debugWireframe = this._tileset.debugWireframe, this._geometries.update(t)), N(this._batchTable) && this._geometries._ready && this._batchTable.update(e, t), N(this._contentReadyPromise) || ((r = this)._contentReadyPromise = this._geometries.readyPromise.then(function () {
      r._readyPromise.resolve(r);
    }));
  }, h.prototype.isDestroyed = function () {
    return !1;
  }, h.prototype.destroy = function () {
    return this._geometries = this._geometries && this._geometries.destroy(), this._batchTable = this._batchTable && this._batchTable.destroy(), t(this);
  }, h;
});