"use strict";

define(["../Core/arraySlice", "../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Matrix4", "../Core/TaskProcessor", "../ThirdParty/when", "./ClassificationType", "./Vector3DTileBatch", "./Vector3DTilePrimitive"], function (B, I, x, k, C, T, e, i, L, t, s, r, w, V) {
  "use strict";

  function o(e) {
    this._boxes = e.boxes, this._boxBatchIds = e.boxBatchIds, this._cylinders = e.cylinders, this._cylinderBatchIds = e.cylinderBatchIds, this._ellipsoids = e.ellipsoids, this._ellipsoidBatchIds = e.ellipsoidBatchIds, this._spheres = e.spheres, this._sphereBatchIds = e.sphereBatchIds, this._modelMatrix = e.modelMatrix, this._batchTable = e.batchTable, this._boundingVolume = e.boundingVolume, this._center = e.center, T(this._center) || (T(this._boundingVolume) ? this._center = x.clone(this._boundingVolume.center) : this._center = x.clone(x.ZERO)), this._boundingVolumes = void 0, this._batchedIndices = void 0, this._indices = void 0, this._indexOffsets = void 0, this._indexCounts = void 0, this._positions = void 0, this._vertexBatchIds = void 0, this._batchIds = void 0, this._batchTableColors = void 0, this._packedBuffer = void 0, this._ready = !1, this._readyPromise = s.defer(), this._verticesPromise = void 0, this._primitive = void 0, this.debugWireframe = !1, this.forceRebatch = !1, this.classificationType = r.BOTH;
  }

  e(o.prototype, {
    trianglesLength: {
      get: function get() {
        return T(this._primitive) ? this._primitive.trianglesLength : 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return T(this._primitive) ? this._primitive.geometryByteLength : 0;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  }), o.packedBoxLength = L.packedLength + x.packedLength, o.packedCylinderLength = L.packedLength + 2, o.packedEllipsoidLength = L.packedLength + x.packedLength, o.packedSphereLength = x.packedLength + 1;
  var A = new t("createVectorTileGeometries"),
      P = new k();

  function d(s) {
    if (!T(s._primitive)) {
      if (!T(s._verticesPromise)) {
        var e = s._boxes,
            i = s._boxBatchIds,
            t = s._cylinders,
            r = s._cylinderBatchIds,
            o = s._ellipsoids,
            d = s._ellipsoidBatchIds,
            n = s._spheres,
            a = s._sphereBatchIds,
            c = s._batchTableColors,
            h = s._packedBuffer;

        if (!T(c)) {
          var _ = 0;
          T(s._boxes) && (e = s._boxes = B(e), _ += (i = s._boxBatchIds = B(i)).length), T(s._cylinders) && (t = s._cylinders = B(t), _ += (r = s._cylinderBatchIds = B(r)).length), T(s._ellipsoids) && (o = s._ellipsoids = B(o), _ += (d = s._ellipsoidBatchIds = B(d)).length), T(s._spheres) && (n = s._sphere = B(n), _ += (a = s._sphereBatchIds = B(a)).length), c = s._batchTableColors = new Uint32Array(_);

          for (var p = s._batchTable, l = 0; l < _; ++l) {
            var f = p.getColor(l, P);
            c[l] = f.toRgba();
          }

          h = s._packedBuffer = (y = s, m = new Float64Array(L.packedLength + x.packedLength), g = 0, x.pack(y._center, m, g), g += x.packedLength, L.pack(y._modelMatrix, m, g), m);
        }

        var u = [];
        T(e) && u.push(e.buffer, i.buffer), T(t) && u.push(t.buffer, r.buffer), T(o) && u.push(o.buffer, d.buffer), T(n) && u.push(n.buffer, a.buffer), u.push(c.buffer, h.buffer);
        var b = {
          boxes: T(e) ? e.buffer : void 0,
          boxBatchIds: T(e) ? i.buffer : void 0,
          cylinders: T(t) ? t.buffer : void 0,
          cylinderBatchIds: T(t) ? r.buffer : void 0,
          ellipsoids: T(o) ? o.buffer : void 0,
          ellipsoidBatchIds: T(o) ? d.buffer : void 0,
          spheres: T(n) ? n.buffer : void 0,
          sphereBatchIds: T(n) ? a.buffer : void 0,
          batchTableColors: c.buffer,
          packedBuffer: h.buffer
        },
            v = s._verticesPromise = A.scheduleTask(b, u);
        if (!T(v)) return;
        v.then(function (e) {
          var i = new Float64Array(e.packedBuffer),
              t = function (e, i) {
            for (var t = 0, s = i[t++], r = i[t++], o = e._boundingVolumes = new Array(r), d = 0; d < r; ++d) {
              o[d] = I.unpack(i, t), t += I.packedLength;
            }

            for (var n = i[t++], a = e._batchedIndices = new Array(n), c = 0; c < n; ++c) {
              var h = k.unpack(i, t);
              t += k.packedLength;

              for (var _ = i[t++], p = i[t++], l = i[t++], f = new Array(l), u = 0; u < l; ++u) {
                f[u] = i[t++];
              }

              a[c] = new w({
                color: h,
                offset: _,
                count: p,
                batchIds: f
              });
            }

            return s;
          }(s, i);

          s._indices = new (2 === t ? Uint16Array : Uint32Array)(e.indices), s._indexOffsets = new Uint32Array(e.indexOffsets), s._indexCounts = new Uint32Array(e.indexCounts), s._positions = new Float32Array(e.positions), s._vertexBatchIds = new Uint16Array(e.vertexBatchIds), s._batchIds = new Uint16Array(e.batchIds), s._ready = !0;
        });
      }

      var y, m, g;
      s._ready && !T(s._primitive) && (s._primitive = new V({
        batchTable: s._batchTable,
        positions: s._positions,
        batchIds: s._batchIds,
        vertexBatchIds: s._vertexBatchIds,
        indices: s._indices,
        indexOffsets: s._indexOffsets,
        indexCounts: s._indexCounts,
        batchedIndices: s._batchedIndices,
        boundingVolume: s._boundingVolume,
        boundingVolumes: s._boundingVolumes,
        center: s._center,
        pickObject: C(s._pickObject, s)
      }), s._boxes = void 0, s._boxBatchIds = void 0, s._cylinders = void 0, s._cylinderBatchIds = void 0, s._ellipsoids = void 0, s._ellipsoidBatchIds = void 0, s._spheres = void 0, s._sphereBatchIds = void 0, s._center = void 0, s._modelMatrix = void 0, s._batchTable = void 0, s._boundingVolume = void 0, s._boundingVolumes = void 0, s._batchedIndices = void 0, s._indices = void 0, s._indexOffsets = void 0, s._indexCounts = void 0, s._positions = void 0, s._vertexBatchIds = void 0, s._batchIds = void 0, s._batchTableColors = void 0, s._packedBuffer = void 0, s._verticesPromise = void 0, s._readyPromise.resolve());
    }
  }

  return o.prototype.createFeatures = function (e, i) {
    this._primitive.createFeatures(e, i);
  }, o.prototype.applyDebugSettings = function (e, i) {
    this._primitive.applyDebugSettings(e, i);
  }, o.prototype.applyStyle = function (e, i) {
    this._primitive.applyStyle(e, i);
  }, o.prototype.updateCommands = function (e, i) {
    this._primitive.updateCommands(e, i);
  }, o.prototype.update = function (e) {
    d(this), this._ready && (this._primitive.debugWireframe = this.debugWireframe, this._primitive.forceRebatch = this.forceRebatch, this._primitive.classificationType = this.classificationType, this._primitive.update(e));
  }, o.prototype.isDestroyed = function () {
    return !1;
  }, o.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), i(this);
  }, o;
});