"use strict";

define(["../ThirdParty/when", "./BoundingSphere", "./Cartesian3", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./GeographicProjection", "./HeightmapTessellator", "./OrientedBoundingBox", "./Math", "./Rectangle", "./TaskProcessor", "./TerrainEncoding", "./TerrainMesh", "./TerrainProvider", "../extends/core/ExpendUtil"], function (l, f, w, p, B, e, x, m, _, v, R, T, t, H, k, M, b) {
  "use strict";

  function I(e) {
    if (!B(e) || !B(e.buffer)) throw new x("options.buffer is required.");
    if (!B(e.width)) throw new x("options.width is required.");
    if (!B(e.height)) throw new x("options.height is required.");
    this._buffer = e.buffer, this._width = e.width, this._height = e.height, this._childTileMask = p(e.childTileMask, 15);
    var t = _.DEFAULT_STRUCTURE,
        i = e.structure;
    B(i) ? i !== t && (i.heightScale = p(i.heightScale, t.heightScale), i.heightOffset = p(i.heightOffset, t.heightOffset), i.elementsPerHeight = p(i.elementsPerHeight, t.elementsPerHeight), i.stride = p(i.stride, t.stride), i.elementMultiplier = p(i.elementMultiplier, t.elementMultiplier), i.isBigEndian = p(i.isBigEndian, t.isBigEndian)) : i = t, this._structure = i, this._createdByUpsampling = p(e.createdByUpsampling, !1), this._waterMask = e.waterMask, this._skirtHeight = void 0, this._bufferType = this._buffer.constructor, this._mesh = void 0;
  }

  e(I.prototype, {
    credits: {
      get: function get() {}
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
    }
  });
  var E = new t("createVerticesFromHeightmap");

  function P(e, t, i, r, h, s, n, o, a, d, c) {
    var u = (a - s.west) * (n - 1) / (s.east - s.west),
        g = (d - s.south) * (o - 1) / (s.north - s.south);
    0 < h && (u += 1, g += 1, n += 2, o += 2);
    var l = 0 | u,
        f = l + 1;
    (0 < h ? n - 1 : n) <= f && (f = n - 1, l = n - 2), (0 < h ? o - 1 : o) <= (m = (p = 0 | g) + 1) && (m = o - 1, p = o - 2);
    var w = g - p,
        p = o - 1 - p,
        m = o - 1 - m;
    return S(u - l, w, (t.decodeHeight(e, p * n + l) / c - i) / r, (t.decodeHeight(e, p * n + f) / c - i) / r, (t.decodeHeight(e, m * n + l) / c - i) / r, (t.decodeHeight(e, m * n + f) / c - i) / r);
  }

  function S(e, t, i, r, h, s) {
    return t < e ? i + e * (r - i) + t * (s - r) : i + e * (s - h) + t * (h - i);
  }

  function q(e, t, i, r, h, s) {
    s *= r;
    var n,
        o = 0;
    if (h) for (n = 0; n < t; ++n) {
      o = o * i + e[s + n];
    } else for (n = t - 1; 0 <= n; --n) {
      o = o * i + e[s + n];
    }
    return o;
  }

  return I.prototype.createMesh = function (e, t, i, r, h) {
    if (!B(e)) throw new x("tilingScheme is required.");
    if (!B(t)) throw new x("x is required.");
    if (!B(i)) throw new x("y is required.");
    if (!B(r)) throw new x("level is required.");
    var s = e.ellipsoid,
        n = e.tileXYToNativeRectangle(t, i, r),
        o = e.tileXYToRectangle(t, i, r);
    h = p(h, 1);
    var a = s.cartographicToCartesian(T.center(o)),
        d = this._structure,
        c = M.getEstimatedLevelZeroGeometricErrorForAHeightmap(s, this._width, e.getNumberOfXTilesAtLevel(0)) / (1 << r);
    this._skirtHeight = Math.min(4 * c, 1e3), b.underEarth.enableSkirt && (this._skirtHeight = 0);
    var u = E.scheduleTask({
      heightmap: this._buffer,
      structure: d,
      includeWebMercatorT: !0,
      width: this._width,
      height: this._height,
      nativeRectangle: n,
      rectangle: o,
      relativeToCenter: a,
      ellipsoid: s,
      skirtHeight: this._skirtHeight,
      isGeographic: e.projection instanceof m,
      exaggeration: h
    });

    if (B(u)) {
      var g = this;
      return l(u, function (e) {
        return g._mesh = new k(a, new Float32Array(e.vertices), M.getRegularGridIndices(e.gridWidth, e.gridHeight), e.minimumHeight, e.maximumHeight, f.clone(e.boundingSphere3D), w.clone(e.occludeePointInScaledSpace), e.numberOfAttributes, v.clone(e.orientedBoundingBox), H.clone(e.encoding), h, e.westIndicesSouthToNorth, e.southIndicesEastToWest, e.eastIndicesNorthToSouth, e.northIndicesWestToEast), g._buffer = void 0, g._mesh;
      });
    }
  }, I.prototype._createMeshSync = function (e, t, i, r, h) {
    if (!B(e)) throw new x("tilingScheme is required.");
    if (!B(t)) throw new x("x is required.");
    if (!B(i)) throw new x("y is required.");
    if (!B(r)) throw new x("level is required.");
    var s = e.ellipsoid,
        n = e.tileXYToNativeRectangle(t, i, r),
        o = e.tileXYToRectangle(t, i, r);
    h = p(h, 1);
    var a = s.cartographicToCartesian(T.center(o)),
        d = this._structure,
        c = M.getEstimatedLevelZeroGeometricErrorForAHeightmap(s, this._width, e.getNumberOfXTilesAtLevel(0)) / (1 << r);
    this._skirtHeight = Math.min(4 * c, 1e3);

    var u = _.computeVertices({
      heightmap: this._buffer,
      structure: d,
      includeWebMercatorT: !0,
      width: this._width,
      height: this._height,
      nativeRectangle: n,
      rectangle: o,
      relativeToCenter: a,
      ellipsoid: s,
      skirtHeight: this._skirtHeight,
      isGeographic: e.projection instanceof m,
      exaggeration: h
    });

    this._buffer = void 0;
    var g = this._width,
        l = this._height;
    return 0 < this._skirtHeight && (g += 2, l += 2), new k(a, u.vertices, M.getRegularGridIndices(g, l), u.minimumHeight, u.maximumHeight, u.boundingSphere3D, u.occludeePointInScaledSpace, u.encoding.getStride(), u.orientedBoundingBox, u.encoding, h, u.westIndicesSouthToNorth, u.southIndicesEastToWest, u.eastIndicesNorthToSouth, u.northIndicesWestToEast);
  }, I.prototype.interpolateHeight = function (e, t, i) {
    var r = this._width,
        h = this._height,
        s = this._structure,
        n = s.stride,
        o = s.elementsPerHeight,
        a = s.elementMultiplier,
        d = s.isBigEndian,
        c = s.heightOffset,
        u = s.heightScale;
    return B(this._mesh) ? P(this._mesh.vertices, this._mesh.encoding, c, u, this._skirtHeight, e, r, h, t, i, this._mesh.exaggeration) : function (e, t, i, r, h, s, n, o, a, d) {
      var c = (a - s.west) * (n - 1) / (s.east - s.west),
          u = (d - s.south) * (o - 1) / (s.north - s.south),
          g = 0 | c,
          l = g + 1;
      n <= l && (l = n - 1, g = n - 2);
      var f = 0 | u,
          w = f + 1;
      o <= w && (w = o - 1, f = o - 2);
      var p = c - g,
          m = u - f;
      w = o - 1 - w;

      var _ = q(e, t, i, r, h, (f = o - 1 - f) * n + g),
          v = q(e, t, i, r, h, f * n + l),
          T = q(e, t, i, r, h, w * n + g),
          H = q(e, t, i, r, h, w * n + l);

      return S(p, m, _, v, T, H);
    }(this._buffer, o, a, n, d, e, r, h, t, i) * u + c;
  }, I.prototype.upsample = function (e, t, i, r, h, s, n) {
    if (!B(e)) throw new x("tilingScheme is required.");
    if (!B(t)) throw new x("thisX is required.");
    if (!B(i)) throw new x("thisY is required.");
    if (!B(r)) throw new x("thisLevel is required.");
    if (!B(h)) throw new x("descendantX is required.");
    if (!B(s)) throw new x("descendantY is required.");
    if (!B(n)) throw new x("descendantLevel is required.");
    if (1 < n - r) throw new x("Upsampling through more than one level at a time is not currently supported.");
    var o = this._mesh;

    if (B(o)) {
      for (var a = this._width, d = this._height, c = this._structure, u = this._skirtHeight, g = c.stride, l = new this._bufferType(a * d * g), f = o.vertices, w = o.encoding, p = e.tileXYToRectangle(t, i, r), m = e.tileXYToRectangle(h, s, n), _ = c.heightOffset, v = c.heightScale, T = o.exaggeration, H = c.elementsPerHeight, k = c.elementMultiplier, M = c.isBigEndian, b = Math.pow(k, H - 1), E = 0; E < d; ++E) {
        for (var S = R.lerp(m.north, m.south, E / (d - 1)), q = 0; q < a; ++q) {
          var y = P(f, w, _, v, u, p, a, d, R.lerp(m.west, m.east, q / (a - 1)), S, T);

          (function (e, t, i, r, h, s, n, o) {
            var a;
            if (n *= h, s) for (a = 0; a < t - 1; ++a) {
              e[n + a] = o / r | 0, o -= e[n + a] * r, r /= i;
            } else for (a = t - 1; 0 < a; --a) {
              e[n + a] = o / r | 0, o -= e[n + a] * r, r /= i;
            }
            e[n + a] = o;
          })(l, H, k, b, g, M, E * a + q, y = (y = y < c.lowestEncodedHeight ? c.lowestEncodedHeight : y) > c.highestEncodedHeight ? c.highestEncodedHeight : y);
        }
      }

      return new I({
        buffer: l,
        width: a,
        height: d,
        childTileMask: 0,
        structure: this._structure,
        createdByUpsampling: !0
      });
    }
  }, I.prototype.isChildAvailable = function (e, t, i, r) {
    if (!B(e)) throw new x("thisX is required.");
    if (!B(t)) throw new x("thisY is required.");
    if (!B(i)) throw new x("childX is required.");
    if (!B(r)) throw new x("childY is required.");
    var h = 2;
    return i !== 2 * e && ++h, r !== 2 * t && (h -= 2), 0 != (this._childTileMask & 1 << h);
  }, I.prototype.wasCreatedByUpsampling = function () {
    return this._createdByUpsampling;
  }, I;
});