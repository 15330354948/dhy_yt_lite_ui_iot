"use strict";

define(["./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./IndexDatatype", "./Intersections2D", "./Math", "./OrientedBoundingBox", "./QuantizedMeshTerrainData", "./Rectangle", "./TaskProcessor", "./TerrainEncoding", "./TerrainMesh"], function (m, e, p, v, u, f, t, y, _, C, M, E, T, c, i, l, g) {
  "use strict";

  function n(e) {
    e = u(e, u.EMPTY_OBJECT), v.typeOf.object("options.buffer", e.buffer), v.typeOf.number("options.negativeAltitudeExponentBias", e.negativeAltitudeExponentBias), v.typeOf.number("options.negativeElevationThreshold", e.negativeElevationThreshold), this._buffer = e.buffer, this._credits = e.credits, this._negativeAltitudeExponentBias = e.negativeAltitudeExponentBias, this._negativeElevationThreshold = e.negativeElevationThreshold;
    var t = u(e.childTileMask, 15),
        i = 3 & t;
    i |= 4 & t ? 8 : 0, i |= 8 & t ? 4 : 0, this._childTileMask = i, this._createdByUpsampling = u(e.createdByUpsampling, !1), this._skirtHeight = void 0, this._bufferType = this._buffer.constructor, this._mesh = void 0, this._minimumHeight = void 0, this._maximumHeight = void 0, this._vertexCountWithoutSkirts = void 0, this._skirtIndex = void 0;
  }

  t(n.prototype, {
    credits: {
      get: function get() {
        return this._credits;
      }
    },
    waterMask: {
      get: function get() {}
    }
  });
  var x = new i("createVerticesFromGoogleEarthEnterpriseBuffer"),
      b = new c(),
      w = new c();
  n.prototype.createMesh = function (e, t, i, n, r) {
    v.typeOf.object("tilingScheme", e), v.typeOf.number("x", t), v.typeOf.number("y", i), v.typeOf.number("level", n);
    var o = e.ellipsoid;
    e.tileXYToNativeRectangle(t, i, n, b), e.tileXYToRectangle(t, i, n, w), r = u(r, 1);
    var s = o.cartographicToCartesian(c.center(w)),
        a = 40075.16 / (1 << n);
    this._skirtHeight = Math.min(8 * a, 1e3), this._skirtHeight = 1e-6;
    var h = x.scheduleTask({
      buffer: this._buffer,
      nativeRectangle: b,
      rectangle: w,
      relativeToCenter: s,
      ellipsoid: o,
      skirtHeight: this._skirtHeight,
      exaggeration: r,
      includeWebMercatorT: !0,
      negativeAltitudeExponentBias: this._negativeAltitudeExponentBias,
      negativeElevationThreshold: this._negativeElevationThreshold
    });

    if (f(h)) {
      var d = this;
      return h.then(function (e) {
        return d._mesh = new g(s, new Float32Array(e.vertices), new Uint16Array(e.indices), e.minimumHeight, e.maximumHeight, m.clone(e.boundingSphere3D), p.clone(e.occludeePointInScaledSpace), e.numberOfAttributes, E.clone(e.orientedBoundingBox), l.clone(e.encoding), r, e.westIndicesSouthToNorth, e.southIndicesEastToWest, e.eastIndicesNorthToSouth, e.northIndicesWestToEast), d._vertexCountWithoutSkirts = e.vertexCountWithoutSkirts, d._skirtIndex = e.skirtIndex, d._minimumHeight = e.minimumHeight, d._maximumHeight = e.maximumHeight, d._buffer = void 0, d._mesh;
      });
    }
  }, n.prototype.interpolateHeight = function (e, t, i) {
    var n = M.clamp((t - e.west) / e.width, 0, 1),
        r = M.clamp((i - e.south) / e.height, 0, 1);
    return f(this._mesh) ? function (e, t, i) {
      for (var n = e._mesh, r = n.vertices, o = n.encoding, s = n.indices, a = 0, h = s.length; a < h; a += 3) {
        var d = s[a],
            u = s[a + 1],
            c = s[a + 2],
            l = o.decodeTextureCoordinates(r, d, k),
            g = o.decodeTextureCoordinates(r, u, B),
            m = o.decodeTextureCoordinates(r, c, S),
            p = C.computeBarycentricCoordinates(t, i, l.x, l.y, g.x, g.y, m.x, m.y, U);

        if (-1e-15 <= p.x && -1e-15 <= p.y && -1e-15 <= p.z) {
          var v = o.decodeHeight(r, d),
              f = o.decodeHeight(r, u),
              y = o.decodeHeight(r, c);
          return p.x * v + p.y * f + p.z * y;
        }
      }

      return;
    }(this, n, r) : function (e, t, i, n) {
      var r = e._buffer,
          o = 0,
          s = 0,
          a = 0;
      .5 < i ? (.5 < t ? (o = 2, s = .5) : o = 3, a = .5) : .5 < t && (o = 1, s = .5);

      for (var h = new DataView(r), d = 0, u = 0; u < o; ++u) {
        d += h.getUint32(d, !0), d += Y;
      }

      d += Y, d += 2 * N;
      var c = M.toRadians(180 * h.getFloat64(d, !0));
      d += N;
      var l = M.toRadians(180 * h.getFloat64(d, !0));
      d += N;
      var g = n.width / c / 2,
          m = n.height / l / 2,
          p = h.getInt32(d, !0);
      d += P;
      var v = 3 * h.getInt32(d, !0);
      d += P, d += P;

      var f,
          y = new Array(p),
          _ = new Array(p),
          E = new Array(p);

      for (f = 0; f < p; ++f) {
        y[f] = s + h.getUint8(d++) * g, _[f] = a + h.getUint8(d++) * m, E[f] = 6371010 * h.getFloat32(d, !0), d += z;
      }

      var T = new Array(v);

      for (f = 0; f < v; ++f) {
        T[f] = h.getUint16(d, !0), d += R;
      }

      for (f = 0; f < v; f += 3) {
        var x = T[f],
            b = T[f + 1],
            w = T[f + 2],
            H = y[x],
            k = y[b],
            B = y[w],
            S = _[x],
            I = _[b],
            O = _[w],
            A = C.computeBarycentricCoordinates(t, i, H, S, k, I, B, O, U);
        if (-1e-15 <= A.x && -1e-15 <= A.y && -1e-15 <= A.z) return A.x * E[x] + A.y * E[b] + A.z * E[w];
      }

      return;
    }(this, n, r, e);
  };
  var H = new i("upsampleQuantizedTerrainMesh");
  n.prototype.upsample = function (e, t, i, n, r, o, s) {
    if (v.typeOf.object("tilingScheme", e), v.typeOf.number("thisX", t), v.typeOf.number("thisY", i), v.typeOf.number("thisLevel", n), v.typeOf.number("descendantX", r), v.typeOf.number("descendantY", o), v.typeOf.number("descendantLevel", s), 1 < s - n) throw new y("Upsampling through more than one level at a time is not currently supported.");
    var a = this._mesh;

    if (f(this._mesh)) {
      var h = 2 * t !== r,
          d = 2 * i === o,
          u = e.ellipsoid,
          c = e.tileXYToRectangle(r, o, s),
          l = H.scheduleTask({
        vertices: a.vertices,
        vertexCountWithoutSkirts: this._vertexCountWithoutSkirts,
        indices: a.indices,
        skirtIndex: this._skirtIndex,
        encoding: a.encoding,
        minimumHeight: this._minimumHeight,
        maximumHeight: this._maximumHeight,
        isEastChild: h,
        isNorthChild: d,
        childRectangle: c,
        ellipsoid: u,
        exaggeration: a.exaggeration
      });

      if (f(l)) {
        var g = this;
        return l.then(function (e) {
          var t = new Uint16Array(e.vertices),
              i = _.createTypedArray(t.length / 3, e.indices),
              n = g._skirtHeight;

          return new T({
            quantizedVertices: t,
            indices: i,
            minimumHeight: e.minimumHeight,
            maximumHeight: e.maximumHeight,
            boundingSphere: m.clone(e.boundingSphere),
            orientedBoundingBox: E.clone(e.orientedBoundingBox),
            horizonOcclusionPoint: p.clone(e.horizonOcclusionPoint),
            westIndices: e.westIndices,
            southIndices: e.southIndices,
            eastIndices: e.eastIndices,
            northIndices: e.northIndices,
            westSkirtHeight: n,
            southSkirtHeight: n,
            eastSkirtHeight: n,
            northSkirtHeight: n,
            childTileMask: 0,
            createdByUpsampling: !0,
            credits: g._credits
          });
        });
      }
    }
  }, n.prototype.isChildAvailable = function (e, t, i, n) {
    v.typeOf.number("thisX", e), v.typeOf.number("thisY", t), v.typeOf.number("childX", i), v.typeOf.number("childY", n);
    var r = 2;
    return i !== 2 * e && ++r, n !== 2 * t && (r -= 2), 0 != (this._childTileMask & 1 << r);
  }, n.prototype.wasCreatedByUpsampling = function () {
    return this._createdByUpsampling;
  };
  var k = new e(),
      B = new e(),
      S = new e(),
      U = new p();
  var R = Uint16Array.BYTES_PER_ELEMENT,
      Y = Uint32Array.BYTES_PER_ELEMENT,
      P = Int32Array.BYTES_PER_ELEMENT,
      z = Float32Array.BYTES_PER_ELEMENT,
      N = Float64Array.BYTES_PER_ELEMENT;
  return n;
});