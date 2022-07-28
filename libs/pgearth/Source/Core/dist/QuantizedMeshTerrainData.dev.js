"use strict";

define(["../ThirdParty/when", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./IndexDatatype", "./Intersections2D", "./Math", "./OrientedBoundingBox", "./TaskProcessor", "./TerrainEncoding", "./TerrainMesh"], function (f, k, e, v, l, S, i, I, x, q, y, T, t, w, _) {
  "use strict";

  function z(e) {
    if (!S(e) || !S(e.quantizedVertices)) throw new I("options.quantizedVertices is required.");
    if (!S(e.indices)) throw new I("options.indices is required.");
    if (!S(e.minimumHeight)) throw new I("options.minimumHeight is required.");
    if (!S(e.maximumHeight)) throw new I("options.maximumHeight is required.");
    if (!S(e.maximumHeight)) throw new I("options.maximumHeight is required.");
    if (!S(e.boundingSphere)) throw new I("options.boundingSphere is required.");
    if (!S(e.horizonOcclusionPoint)) throw new I("options.horizonOcclusionPoint is required.");
    if (!S(e.westIndices)) throw new I("options.westIndices is required.");
    if (!S(e.southIndices)) throw new I("options.southIndices is required.");
    if (!S(e.eastIndices)) throw new I("options.eastIndices is required.");
    if (!S(e.northIndices)) throw new I("options.northIndices is required.");
    if (!S(e.westSkirtHeight)) throw new I("options.westSkirtHeight is required.");
    if (!S(e.southSkirtHeight)) throw new I("options.southSkirtHeight is required.");
    if (!S(e.eastSkirtHeight)) throw new I("options.eastSkirtHeight is required.");
    if (!S(e.northSkirtHeight)) throw new I("options.northSkirtHeight is required.");
    this._quantizedVertices = e.quantizedVertices, this._encodedNormals = e.encodedNormals, this._indices = e.indices, this._minimumHeight = e.minimumHeight, this._maximumHeight = e.maximumHeight, this._boundingSphere = e.boundingSphere, this._orientedBoundingBox = e.orientedBoundingBox, this._horizonOcclusionPoint = e.horizonOcclusionPoint, this._credits = e.credits;

    var i = this._quantizedVertices.length / 3,
        t = this._uValues = this._quantizedVertices.subarray(0, i),
        n = this._vValues = this._quantizedVertices.subarray(i, 2 * i);

    function r(e, i) {
      return n[e] - n[i];
    }

    function s(e, i) {
      return t[e] - t[i];
    }

    this._heightValues = this._quantizedVertices.subarray(2 * i, 3 * i), this._westIndices = o(e.westIndices, r, i), this._southIndices = o(e.southIndices, s, i), this._eastIndices = o(e.eastIndices, r, i), this._northIndices = o(e.northIndices, s, i), this._westSkirtHeight = e.westSkirtHeight, this._southSkirtHeight = e.southSkirtHeight, this._eastSkirtHeight = e.eastSkirtHeight, this._northSkirtHeight = e.northSkirtHeight, this._childTileMask = l(e.childTileMask, 15), this._createdByUpsampling = l(e.createdByUpsampling, !1), this._waterMask = e.waterMask, this._mesh = void 0;
  }

  i(z.prototype, {
    credits: {
      get: function get() {
        return this._credits;
      }
    },
    waterMask: {
      get: function get() {
        return this._waterMask;
      }
    },
    childTileMask: {
      get: function get() {
        return this._childTileMask;
      }
    },
    canUpsample: {
      get: function get() {
        return S(this._mesh);
      }
    }
  });
  var h = [];

  function o(e, i, t) {
    h.length = e.length;

    for (var n = !1, r = 0, s = e.length; r < s; ++r) {
      h[r] = e[r], n = n || 0 < r && 0 < i(e[r - 1], e[r]);
    }

    return n ? (h.sort(i), x.createTypedArray(t, h)) : e;
  }

  var d = new t("createVerticesFromQuantizedTerrainMesh");

  z.prototype.createMesh = function (e, i, t, n, g) {
    if (!S(e)) throw new I("tilingScheme is required.");
    if (!S(i)) throw new I("x is required.");
    if (!S(t)) throw new I("y is required.");
    if (!S(n)) throw new I("level is required.");
    var r = e.ellipsoid,
        s = e.tileXYToRectangle(i, t, n);
    g = l(g, 1), this._westSkirtHeight = 1e-6, this._southSkirtHeight = 1e-6, this._eastSkirtHeight = 1e-6, this._northSkirtHeight = 1e-6;
    var h = d.scheduleTask({
      minimumHeight: this._minimumHeight,
      maximumHeight: this._maximumHeight,
      quantizedVertices: this._quantizedVertices,
      octEncodedNormals: this._encodedNormals,
      includeWebMercatorT: !0,
      indices: this._indices,
      westIndices: this._westIndices,
      southIndices: this._southIndices,
      eastIndices: this._eastIndices,
      northIndices: this._northIndices,
      westSkirtHeight: this._westSkirtHeight,
      southSkirtHeight: this._southSkirtHeight,
      eastSkirtHeight: this._eastSkirtHeight,
      northSkirtHeight: this._northSkirtHeight,
      rectangle: s,
      relativeToCenter: this._boundingSphere.center,
      ellipsoid: r,
      exaggeration: g
    });

    if (S(h)) {
      var m = this;
      return f(h, function (e) {
        var i = m._quantizedVertices.length / 3;
        i += m._westIndices.length + m._southIndices.length + m._eastIndices.length + m._northIndices.length;
        var t = x.createTypedArray(i, e.indices),
            n = new Float32Array(e.vertices),
            r = e.center,
            s = e.minimumHeight,
            h = e.maximumHeight,
            o = l(k.clone(e.boundingSphere), m._boundingSphere),
            d = l(T.clone(e.orientedBoundingBox), m._orientedBoundingBox),
            a = v.clone(m._horizonOcclusionPoint),
            u = e.vertexStride,
            c = w.clone(e.encoding);
        return m._skirtIndex = e.skirtIndex, m._vertexCountWithoutSkirts = m._quantizedVertices.length / 3, m._mesh = new _(r, n, t, s, h, o, a, u, d, c, g, e.westIndicesSouthToNorth, e.southIndicesEastToWest, e.eastIndicesNorthToSouth, e.northIndicesWestToEast), m._quantizedVertices = void 0, m._encodedNormals = void 0, m._indices = void 0, m._uValues = void 0, m._vValues = void 0, m._heightValues = void 0, m._westIndices = void 0, m._southIndices = void 0, m._eastIndices = void 0, m._northIndices = void 0, m._mesh;
      });
    }
  };

  var V = new t("upsampleQuantizedTerrainMesh");

  z.prototype.upsample = function (e, i, t, n, r, s, h) {
    if (!S(e)) throw new I("tilingScheme is required.");
    if (!S(i)) throw new I("thisX is required.");
    if (!S(t)) throw new I("thisY is required.");
    if (!S(n)) throw new I("thisLevel is required.");
    if (!S(r)) throw new I("descendantX is required.");
    if (!S(s)) throw new I("descendantY is required.");
    if (!S(h)) throw new I("descendantLevel is required.");
    if (1 < h - n) throw new I("Upsampling through more than one level at a time is not currently supported.");
    var o = this._mesh;

    if (S(this._mesh)) {
      var d = 2 * i !== r,
          a = 2 * t === s,
          u = e.ellipsoid,
          c = e.tileXYToRectangle(r, s, h),
          g = V.scheduleTask({
        vertices: o.vertices,
        vertexCountWithoutSkirts: this._vertexCountWithoutSkirts,
        indices: o.indices,
        skirtIndex: this._skirtIndex,
        encoding: o.encoding,
        minimumHeight: this._minimumHeight,
        maximumHeight: this._maximumHeight,
        isEastChild: d,
        isNorthChild: a,
        childRectangle: c,
        ellipsoid: u,
        exaggeration: o.exaggeration
      });

      if (S(g)) {
        var m = Math.min(this._westSkirtHeight, this._eastSkirtHeight),
            m = Math.min(m, this._southSkirtHeight);
        m = Math.min(m, this._northSkirtHeight);

        var l = d ? .5 * m : this._westSkirtHeight,
            w = a ? .5 * m : this._southSkirtHeight,
            _ = d ? this._eastSkirtHeight : .5 * m,
            p = a ? this._northSkirtHeight : .5 * m,
            H = this._credits;

        return f(g).then(function (e) {
          var i,
              t = new Uint16Array(e.vertices),
              n = x.createTypedArray(t.length / 3, e.indices);
          return S(e.encodedNormals) && (i = new Uint8Array(e.encodedNormals)), new z({
            quantizedVertices: t,
            indices: n,
            encodedNormals: i,
            minimumHeight: e.minimumHeight,
            maximumHeight: e.maximumHeight,
            boundingSphere: k.clone(e.boundingSphere),
            orientedBoundingBox: T.clone(e.orientedBoundingBox),
            horizonOcclusionPoint: v.clone(e.horizonOcclusionPoint),
            westIndices: e.westIndices,
            southIndices: e.southIndices,
            eastIndices: e.eastIndices,
            northIndices: e.northIndices,
            westSkirtHeight: l,
            southSkirtHeight: w,
            eastSkirtHeight: _,
            northSkirtHeight: p,
            childTileMask: 0,
            credits: H,
            createdByUpsampling: !0
          });
        });
      }
    }
  };

  var M = 32767,
      B = new v();

  function C(e, i, t, n, r, s, h, o) {
    var d = Math.min(t, r, h),
        a = Math.max(t, r, h),
        u = Math.min(n, s, o),
        c = Math.max(n, s, o);
    return d <= e && e <= a && u <= i && i <= c;
  }

  z.prototype.interpolateHeight = function (e, i, t) {
    var n = y.clamp((i - e.west) / e.width, 0, 1);
    n *= M;
    var r = y.clamp((t - e.south) / e.height, 0, 1);
    return r *= M, (S(this._mesh) ? function (e, i, t) {
      for (var n = e._mesh, r = n.vertices, s = n.encoding, h = n.indices, o = 0, d = h.length; o < d; o += 3) {
        var a = h[o],
            u = h[o + 1],
            c = h[o + 2],
            g = s.decodeTextureCoordinates(r, a, b),
            m = s.decodeTextureCoordinates(r, u, N),
            l = s.decodeTextureCoordinates(r, c, P);

        if (C(i, t, g.x, g.y, m.x, m.y, l.x, l.y)) {
          var w = q.computeBarycentricCoordinates(i, t, g.x, g.y, m.x, m.y, l.x, l.y, B);

          if (-1e-15 <= w.x && -1e-15 <= w.y && -1e-15 <= w.z) {
            var _ = s.decodeHeight(r, a),
                p = s.decodeHeight(r, u),
                H = s.decodeHeight(r, c);

            return w.x * _ + w.y * p + w.z * H;
          }
        }
      }

      return;
    } : function (e, i, t) {
      for (var n = e._uValues, r = e._vValues, s = e._heightValues, h = e._indices, o = 0, d = h.length; o < d; o += 3) {
        var a = h[o],
            u = h[o + 1],
            c = h[o + 2],
            g = n[a],
            m = n[u],
            l = n[c],
            w = r[a],
            _ = r[u],
            p = r[c];

        if (C(i, t, g, w, m, _, l, p)) {
          var H = q.computeBarycentricCoordinates(i, t, g, w, m, _, l, p, B);

          if (-1e-15 <= H.x && -1e-15 <= H.y && -1e-15 <= H.z) {
            var f = H.x * s[a] + H.y * s[u] + H.z * s[c];
            return y.lerp(e._minimumHeight, e._maximumHeight, f / M);
          }
        }
      }

      return;
    })(this, n, r);
  };

  var b = new e(),
      N = new e(),
      P = new e();
  return z.prototype.isChildAvailable = function (e, i, t, n) {
    if (!S(e)) throw new I("thisX is required.");
    if (!S(i)) throw new I("thisY is required.");
    if (!S(t)) throw new I("childX is required.");
    if (!S(n)) throw new I("childY is required.");
    var r = 2;
    return t !== 2 * e && ++r, n !== 2 * i && (r -= 2), 0 != (this._childTileMask & 1 << r);
  }, z.prototype.wasCreatedByUpsampling = function () {
    return this._createdByUpsampling;
  }, z;
});