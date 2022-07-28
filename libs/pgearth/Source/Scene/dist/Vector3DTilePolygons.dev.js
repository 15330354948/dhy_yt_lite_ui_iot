"use strict";

define(["../Core/arraySlice", "../Core/Cartesian3", "../Core/Color", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/Ellipsoid", "../Core/IndexDatatype", "../Core/OrientedBoundingBox", "../Core/Rectangle", "../Core/TaskProcessor", "../ThirdParty/when", "./ClassificationType", "./Vector3DTileBatch", "./Vector3DTilePrimitive"], function (y, C, x, i, I, e, t, T, B, H, k, o, P, s, w, V) {
  "use strict";

  function n(e) {
    this._batchTable = e.batchTable, this._batchIds = e.batchIds, this._positions = e.positions, this._counts = e.counts, this._indices = e.indices, this._indexCounts = e.indexCounts, this._indexOffsets = void 0, this._batchTableColors = void 0, this._packedBuffer = void 0, this._batchedPositions = void 0, this._transferrableBatchIds = void 0, this._vertexBatchIds = void 0, this._ellipsoid = i(e.ellipsoid, T.WGS84), this._minimumHeight = e.minimumHeight, this._maximumHeight = e.maximumHeight, this._polygonMinimumHeights = e.polygonMinimumHeights, this._polygonMaximumHeights = e.polygonMaximumHeights, this._center = i(e.center, C.ZERO), this._rectangle = e.rectangle, this._center = void 0, this._boundingVolume = e.boundingVolume, this._boundingVolumes = void 0, this._batchedIndices = void 0, this._ready = !1, this._readyPromise = P.defer(), this._verticesPromise = void 0, this._primitive = void 0, this.debugWireframe = !1, this.forceRebatch = !1, this.classificationType = s.BOTH;
  }

  e(n.prototype, {
    trianglesLength: {
      get: function get() {
        return I(this._primitive) ? this._primitive.trianglesLength : 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return I(this._primitive) ? this._primitive.geometryByteLength : 0;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    }
  });
  var A = new o("createVectorTilePolygons"),
      L = new x();

  function r(o) {
    if (!I(o._primitive)) {
      if (!I(o._verticesPromise)) {
        var e = o._positions,
            i = o._counts,
            t = o._indexCounts,
            s = o._indices,
            n = o._transferrableBatchIds,
            r = o._batchTableColors,
            a = o._packedBuffer;

        if (!I(r)) {
          e = o._positions = y(o._positions), i = o._counts = y(o._counts), t = o._indexCounts = y(o._indexCounts), s = o._indices = y(o._indices), o._center = o._ellipsoid.cartographicToCartesian(k.center(o._rectangle)), n = o._transferrableBatchIds = new Uint32Array(o._batchIds), r = o._batchTableColors = new Uint32Array(n.length);

          for (var d = o._batchTable, c = r.length, h = 0; h < c; ++h) {
            var _ = d.getColor(h, L);

            r[h] = _.toRgba();
          }

          a = o._packedBuffer = (b = o, v = new Float64Array(3 + C.packedLength + T.packedLength + k.packedLength), g = 0, v[g++] = b._indices.BYTES_PER_ELEMENT, v[g++] = b._minimumHeight, v[g++] = b._maximumHeight, C.pack(b._center, v, g), g += C.packedLength, T.pack(b._ellipsoid, v, g), g += T.packedLength, k.pack(b._rectangle, v, g), v);
        }

        var u = [e.buffer, i.buffer, t.buffer, s.buffer, n.buffer, r.buffer, a.buffer],
            f = {
          packedBuffer: a.buffer,
          positions: e.buffer,
          counts: i.buffer,
          indexCounts: t.buffer,
          indices: s.buffer,
          batchIds: n.buffer,
          batchTableColors: r.buffer
        },
            p = o._polygonMinimumHeights,
            m = o._polygonMaximumHeights;
        I(p) && I(m) && (p = y(p), m = y(m), u.push(p.buffer, m.buffer), f.minimumHeights = p, f.maximumHeights = m);
        var l = o._verticesPromise = A.scheduleTask(f, u);
        if (!I(l)) return;
        P(l, function (e) {
          o._positions = void 0, o._counts = void 0, o._polygonMinimumHeights = void 0, o._polygonMaximumHeights = void 0;
          var i = new Float64Array(e.packedBuffer),
              t = i[0];
          !function (e, i) {
            for (var t = 1, o = i[t++], s = e._boundingVolumes = new Array(o), n = 0; n < o; ++n) {
              s[n] = H.unpack(i, t), t += H.packedLength;
            }

            for (var r = i[t++], a = e._batchedIndices = new Array(r), d = 0; d < r; ++d) {
              var c = x.unpack(i, t);
              t += x.packedLength;

              for (var h = i[t++], _ = i[t++], u = i[t++], f = new Array(u), p = 0; p < u; ++p) {
                f[p] = i[t++];
              }

              a[d] = new w({
                color: c,
                offset: h,
                count: _,
                batchIds: f
              });
            }
          }(o, i), o._indices = new (2 === B.getSizeInBytes(t) ? Uint16Array : Uint32Array)(e.indices), o._indexOffsets = new Uint32Array(e.indexOffsets), o._indexCounts = new Uint32Array(e.indexCounts), o._batchedPositions = new Float32Array(e.positions), o._vertexBatchIds = new Uint16Array(e.batchIds), o._ready = !0;
        });
      }

      var b, v, g;
      o._ready && !I(o._primitive) && (o._primitive = new V({
        batchTable: o._batchTable,
        positions: o._batchedPositions,
        batchIds: o._batchIds,
        vertexBatchIds: o._vertexBatchIds,
        indices: o._indices,
        indexOffsets: o._indexOffsets,
        indexCounts: o._indexCounts,
        batchedIndices: o._batchedIndices,
        boundingVolume: o._boundingVolume,
        boundingVolumes: o._boundingVolumes,
        center: o._center
      }), o._batchTable = void 0, o._batchIds = void 0, o._positions = void 0, o._counts = void 0, o._indices = void 0, o._indexCounts = void 0, o._indexOffsets = void 0, o._batchTableColors = void 0, o._packedBuffer = void 0, o._batchedPositions = void 0, o._transferrableBatchIds = void 0, o._vertexBatchIds = void 0, o._ellipsoid = void 0, o._minimumHeight = void 0, o._maximumHeight = void 0, o._polygonMinimumHeights = void 0, o._polygonMaximumHeights = void 0, o._center = void 0, o._rectangle = void 0, o._boundingVolume = void 0, o._boundingVolumes = void 0, o._batchedIndices = void 0, o._verticesPromise = void 0, o._readyPromise.resolve());
    }
  }

  return n.prototype.createFeatures = function (e, i) {
    this._primitive.createFeatures(e, i);
  }, n.prototype.applyDebugSettings = function (e, i) {
    this._primitive.applyDebugSettings(e, i);
  }, n.prototype.applyStyle = function (e, i) {
    this._primitive.applyStyle(e, i);
  }, n.prototype.updateCommands = function (e, i) {
    this._primitive.updateCommands(e, i);
  }, n.prototype.update = function (e) {
    r(this), this._ready && (this._primitive.debugWireframe = this.debugWireframe, this._primitive.forceRebatch = this.forceRebatch, this._primitive.classificationType = this.classificationType, this._primitive.update(e));
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    return this._primitive = this._primitive && this._primitive.destroy(), t(this);
  }, n;
});