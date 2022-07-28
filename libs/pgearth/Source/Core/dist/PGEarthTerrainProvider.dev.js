"use strict";

define(["../ThirdParty/Uri", "../ThirdParty/when", "./AttributeCompression", "./BoundingSphere", "./Cartesian2", "./Cartesian3", "./Credit", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Event", "./GeographicTilingScheme", "./getStringFromTypedArray", "./HeightmapTerrainData", "./IndexDatatype", "./Math", "./OrientedBoundingBox", "./QuantizedMeshTerrainData", "./Request", "./RequestType", "./Resource", "./RuntimeError", "./TerrainProvider", "./TileAvailability", "./TileProviderError", "./createGuid"], function (e, P, ie, re, t, ae, l, n, ne, i, h, s, o, se, y, le, oe, he, de, m, c, d, _, v, k, B, u) {
  "use strict";

  function W(e) {
    this.resource = e.resource, this.version = e.version, this.isHeightmap = e.isHeightmap, this.tileUrlTemplates = e.tileUrlTemplates, this.availability = e.availability, this.hasVertexNormals = e.hasVertexNormals, this.hasWaterMask = e.hasWaterMask, this.hasMetadata = e.hasMetadata, this.availabilityLevels = e.availabilityLevels, this.availabilityTilesLoaded = e.availabilityTilesLoaded, this.littleEndianExtensionSize = e.littleEndianExtensionSize, this.availabilityTilesLoaded = e.availabilityTilesLoaded, this.availabilityPromiseCache = {};
  }

  function r(e) {
    if (!ne(e) || !ne(e.url)) throw new h("options.url is required.");
    this._tilingScheme = new o({
      numberOfLevelZeroTilesX: 2,
      numberOfLevelZeroTilesY: 1,
      ellipsoid: e.ellipsoid
    }), this._heightmapWidth = 65, this._levelZeroMaximumGeometricError = v.getEstimatedLevelZeroGeometricErrorForAHeightmap(this._tilingScheme.ellipsoid, this._heightmapWidth, this._tilingScheme.getNumberOfXTilesAtLevel(0)), this._heightmapStructure = void 0, this._hasWaterMask = !1, this._hasVertexNormals = !1, this._requestVertexNormals = n(e.requestVertexNormals, !1), this._requestWaterMask = n(e.requestWaterMask, !1), this._requestMetadata = n(e.requestMetadata, !0), this._errorEvent = new s();
    var t = e.credit;
    "string" == typeof t && (t = new l(t)), this._credit = t, this._availability = void 0;
    var i = P.defer();
    this._ready = !1, this._readyPromise = i, this._tileCredits = void 0;
    var b,
        A,
        M,
        x = this,
        S = this._layers = [],
        w = "",
        L = [],
        N = 0;

    function R(e) {
      var t;
      if (!e.format) return t = "The tile format is not specified in the layer.json file.", void (M = B.handleError(M, x, x._errorEvent, t, void 0, void 0, void 0, U));
      if (!e.tiles || 0 === e.tiles.length) return t = "The layer.json file does not specify any tile URL templates.", void (M = B.handleError(M, x, x._errorEvent, t, void 0, void 0, void 0, U));
      var i = !1,
          r = !1,
          a = !1,
          n = !0,
          s = !1;
      if ("heightmap-1.0" === e.format) s = !0, ne(x._heightmapStructure) || (x._heightmapStructure = {
        heightScale: .2,
        heightOffset: -1e3,
        elementsPerHeight: 1,
        stride: 1,
        elementMultiplier: 256,
        isBigEndian: !1,
        lowestEncodedHeight: 0,
        highestEncodedHeight: 65535
      }), r = !0, x._requestWaterMask = !0;else if (0 !== e.format.indexOf("quantized-mesh-1.")) return t = 'The tile format "' + e.format + '" is invalid or not supported.', void (M = B.handleError(M, x, x._errorEvent, t, void 0, void 0, void 0, U));
      var l,
          o = e.tiles,
          h = e.maxzoom;
      N = Math.max(N, h), ne(e.extensions) && -1 !== e.extensions.indexOf("octvertexnormals") ? i = !0 : ne(e.extensions) && -1 !== e.extensions.indexOf("vertexnormals") && (n = !(i = !0)), ne(e.extensions) && -1 !== e.extensions.indexOf("watermask") && (r = !0), ne(e.extensions) && -1 !== e.extensions.indexOf("metadata") && (a = !0);
      var d,
          v = e.metadataAvailability,
          u = e.available;

      if (ne(u) && !ne(v)) {
        d = new k(x._tilingScheme, u.length);

        for (var m = 0; m < u.length; ++m) {
          var y = u[m],
              c = x._tilingScheme.getNumberOfYTilesAtLevel(m);

          ne(L[m]) || (L[m] = []);

          for (var _ = 0; _ < y.length; ++_) {
            var f = y[_],
                g = c - f.endY - 1,
                E = c - f.startY - 1;
            L[m].push([f.startX, g, f.endX, E]), d.addAvailableTileRange(m, f.startX, g, f.endX, E);
          }
        }
      } else ne(v) && (l = new k(x._tilingScheme, h), d = new k(x._tilingScheme, h), L[0] = [[0, 0, 1, 0]], d.addAvailableTileRange(0, 0, 0, 1, 0));

      x._hasWaterMask = x._hasWaterMask || r, x._hasVertexNormals = x._hasVertexNormals || i, x._hasMetadata = x._hasMetadata || a, ne(e.attribution) && (0 < w.length && (w += " "), w += e.attribution), S.push(new W({
        resource: b,
        version: e.version,
        isHeightmap: s,
        tileUrlTemplates: o,
        availability: d,
        hasVertexNormals: i,
        hasWaterMask: r,
        hasMetadata: a,
        availabilityLevels: v,
        availabilityTilesLoaded: l,
        littleEndianExtensionSize: n
      }));
      var T = e.parentUrl;

      if (ne(T)) {
        if (!ne(d)) return console.log("A layer.json can't have a parentUrl if it does't have an available array."), P.resolve();
        (b = b.getDerivedResource({
          url: T
        })).appendForwardSlash();
        var p = (A = b.getDerivedResource({
          url: "layer.json"
        })).fetchJson();
        return P(p, R, q);
      }

      return P.resolve();
    }

    function q(e) {
      var t = "An error occurred while accessing " + A.url + ".";
      M = B.handleError(M, x, x._errorEvent, t, void 0, void 0, void 0, U);
    }

    function r(e) {
      R(e).then(function () {
        if (!ne(M)) {
          var e,
              t = L.length;
          if (0 < t) for (var i = x._availability = new k(x._tilingScheme, N), r = 0; r < t; ++r) {
            for (var a = L[r], n = 0; n < a.length; ++n) {
              var s = a[n];
              i.addAvailableTileRange(r, s[0], s[1], s[2], s[3]);
            }
          }
          0 < w.length && (e = new l(w), ne(x._tileCredits) ? x._tileCredits.push(e) : x._tileCredits = [e]), x._ready = !0, x._readyPromise.resolve(!0);
        }
      });
    }

    function a(e) {
      ne(e) && 404 === e.statusCode ? r({
        tilejson: "2.1.0",
        format: "heightmap-1.0",
        version: "1.0.0",
        scheme: "tms",
        tiles: ["{z}/{x}/{y}.terrain?v={version}"]
      }) : q();
    }

    function U() {
      P(A.fetchJson()).then(r).otherwise(a);
    }

    P(e.url).then(function (e) {
      var t = d.createIfNeeded(e);
      t.appendForwardSlash(), t.setQueryParameters({
        uuid: u()
      }), A = (b = t).getDerivedResource({
        url: "layer.json"
      }), x._tileCredits = t.credits, U();
    }).otherwise(function (e) {
      i.reject(e);
    });
  }

  var ve = {
    OCT_VERTEX_NORMALS: 1,
    WATER_MASK: 2,
    METADATA: 4
  };

  function f(e) {
    return ne(e) && 0 !== e.length ? {
      Accept: "application/vnd.quantized-mesh;extensions=" + e.join("-") + ",application/octet-stream;q=0.9,*/*;q=0.01"
    } : {
      Accept: "application/vnd.quantized-mesh,application/octet-stream;q=0.9,*/*;q=0.01"
    };
  }

  function g(a, n, s, l, o, e) {
    if (!ne(o)) return P.reject(new _("Terrain tile doesn't exist"));
    var t = o.tileUrlTemplates;

    if (0 !== t.length) {
      var i,
          r = a._tilingScheme.getNumberOfYTilesAtLevel(l) - s - 1,
          h = [];
      a._requestVertexNormals && o.hasVertexNormals && h.push(o.littleEndianExtensionSize ? "octvertexnormals" : "vertexnormals"), a._requestWaterMask && o.hasWaterMask && h.push("watermask"), a._requestMetadata && o.hasMetadata && h.push("metadata");
      var d = t[(n + r + l) % t.length],
          v = o.resource,
          u = ne(v._ionEndpoint) && !ne(v._ionEndpoint.externalType) ? (0 !== h.length && (i = {
        extensions: h.join("-")
      }), f(void 0)) : f(h),
          m = v.getDerivedResource({
        url: d,
        templateValues: {
          version: o.version,
          z: l,
          x: n,
          y: r
        },
        queryParameters: i,
        headers: u,
        request: e
      }).fetchArrayBuffer();
      if (ne(m)) return m.then(function (e) {
        return ne(a._heightmapStructure) ? (t = a, i = e, r = new Uint16Array(i, 0, t._heightmapWidth * t._heightmapWidth), new y({
          buffer: r,
          childTileMask: new Uint8Array(i, r.byteLength, 1)[0],
          waterMask: new Uint8Array(i, r.byteLength + 1, i.byteLength - r.byteLength - 1),
          width: t._heightmapWidth,
          height: t._heightmapWidth,
          structure: t._heightmapStructure,
          credits: t._tileCredits
        })) : function (e, t, i, r, a, n) {
          var s = n.littleEndianExtensionSize,
              l = 0,
              o = 3 * Float64Array.BYTES_PER_ELEMENT,
              h = 4 * Float64Array.BYTES_PER_ELEMENT,
              d = 3 * Uint16Array.BYTES_PER_ELEMENT,
              v = Uint16Array.BYTES_PER_ELEMENT,
              u = 3 * v,
              m = new DataView(t),
              y = new ae(m.getFloat64(l, !0), m.getFloat64(l + 8, !0), m.getFloat64(l + 16, !0));
          l += o;
          var c = m.getFloat32(l, !0);
          l += Float32Array.BYTES_PER_ELEMENT;

          var _ = m.getFloat32(l, !0);

          l += Float32Array.BYTES_PER_ELEMENT;
          var f = new re(new ae(m.getFloat64(l, !0), m.getFloat64(l + 8, !0), m.getFloat64(l + 16, !0)), m.getFloat64(l + o, !0));
          l += h;
          var g = new ae(m.getFloat64(l, !0), m.getFloat64(l + 8, !0), m.getFloat64(l + 16, !0));
          l += o;
          var E = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var T = new Uint16Array(t, l, 3 * E);
          l += E * d, 65536 < E && (u = 3 * (v = Uint32Array.BYTES_PER_ELEMENT));
          var p = T.subarray(0, E),
              b = T.subarray(E, 2 * E),
              A = T.subarray(2 * E, 3 * E);
          ie.zigZagDeltaDecode(p, b, A), l % v != 0 && (l += v - l % v);
          var M = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var x = le.createTypedArrayFromArrayBuffer(E, t, l, 3 * M);
          l += M * u;

          for (var S = 0, w = x.length, L = 0; L < w; ++L) {
            var N = x[L];
            x[L] = S - N, 0 === N && ++S;
          }

          var R = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var q = le.createTypedArrayFromArrayBuffer(E, t, l, R);
          l += R * v;
          var U = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var P = le.createTypedArrayFromArrayBuffer(E, t, l, U);
          l += U * v;
          var k = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var B = le.createTypedArrayFromArrayBuffer(E, t, l, k);
          l += k * v;
          var W = m.getUint32(l, !0);
          l += Uint32Array.BYTES_PER_ELEMENT;
          var F,
              Y,
              V = le.createTypedArrayFromArrayBuffer(E, t, l, W);

          for (l += W * v; l < m.byteLength;) {
            var O = m.getUint8(l, !0);
            l += Uint8Array.BYTES_PER_ELEMENT;
            var C = m.getUint32(l, s);
            if (l += Uint32Array.BYTES_PER_ELEMENT, O === ve.OCT_VERTEX_NORMALS && e._requestVertexNormals) F = new Uint8Array(t, l, 2 * E);else if (O === ve.WATER_MASK && e._requestWaterMask) Y = new Uint8Array(t, l, C);else if (O === ve.METADATA && e._requestMetadata) {
              var z = m.getUint32(l, !0);

              if (0 < z) {
                var D = se(new Uint8Array(t), l + Uint32Array.BYTES_PER_ELEMENT, z),
                    H = JSON.parse(D).available;
                if (ne(H)) for (var X = 0; X < H.length; ++X) {
                  for (var j = i + X + 1, G = H[X], I = e._tilingScheme.getNumberOfYTilesAtLevel(j), Z = 0; Z < G.length; ++Z) {
                    var J = G[Z],
                        K = I - J.endY - 1,
                        Q = I - J.startY - 1;
                    e.availability.addAvailableTileRange(j, J.startX, K, J.endX, Q), n.availability.addAvailableTileRange(j, J.startX, K, J.endX, Q);
                  }
                }
              }

              n.availabilityTilesLoaded.addAvailableTileRange(i, r, a, r, a);
            }
            l += C;
          }

          var $,
              ee = 5 * e.getLevelMaximumGeometricError(i),
              te = e._tilingScheme.tileXYToRectangle(r, a, i);

          return te.width < oe.PI_OVER_TWO + oe.EPSILON5 && ($ = he.fromRectangle(te, c, _, e._tilingScheme.ellipsoid)), new de({
            center: y,
            minimumHeight: c,
            maximumHeight: _,
            boundingSphere: f,
            orientedBoundingBox: $,
            horizonOcclusionPoint: g,
            quantizedVertices: T,
            encodedNormals: F,
            indices: x,
            westIndices: q,
            southIndices: P,
            eastIndices: B,
            northIndices: V,
            westSkirtHeight: ee,
            southSkirtHeight: ee,
            eastSkirtHeight: ee,
            northSkirtHeight: ee,
            childTileMask: e.availability.computeChildMaskForTile(i, r, a),
            waterMask: Y,
            credits: e._tileCredits
          });
        }(a, e, l, n, s, o);
        var t, i, r;
      });
    }
  }

  function E(e, t, i, r) {
    if (0 !== r) {
      var a = e.availabilityLevels,
          n = r % a == 0 ? r - a : (r / a | 0) * a,
          s = 1 << r - n;
      return {
        level: n,
        x: t / s | 0,
        y: i / s | 0
      };
    }
  }

  function T(e, t, i, r, a, n) {
    if (!ne(a.availabilityLevels)) return {
      result: !1
    };

    for (var s, l, o, h = function h() {
      delete a.availabilityPromiseCache[o];
    }, d = a.availabilityTilesLoaded, v = a.availability, u = E(a, t, i, r); ne(u);) {
      if (v.isTileAvailable(u.level, u.x, u.y) && !d.isTileAvailable(u.level, u.x, u.y)) return n || (o = u.level + "-" + u.x + "-" + u.y, l = a.availabilityPromiseCache[o], ne(l) || (s = new m({
        throttle: !0,
        throttleByServer: !0,
        type: c.TERRAIN
      }), l = g(e, u.x, u.y, u.level, a, s), ne(l) && (a.availabilityPromiseCache[o] = l).then(h))), {
        result: !0,
        promise: l
      };
      u = E(a, u.x, u.y, u.level);
    }

    return {
      result: !1
    };
  }

  return r.prototype.requestTileGeometry = function (e, t, i, r) {
    if (!this._ready) throw new h("requestTileGeometry must not be called before the terrain provider is ready.");
    var a,
        n = this._layers,
        s = n.length;
    if (1 === s) a = n[0];else for (var l = 0; l < s; ++l) {
      var o = n[l];

      if (!ne(o.availability) || o.availability.isTileAvailable(i, e, t)) {
        a = o;
        break;
      }
    }
    return g(this, e, t, i, a, r);
  }, i(r.prototype, {
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    credit: {
      get: function get() {
        if (!this._ready) throw new h("credit must not be called before the terrain provider is ready.");
        return this._credit;
      }
    },
    tilingScheme: {
      get: function get() {
        if (!this._ready) throw new h("tilingScheme must not be called before the terrain provider is ready.");
        return this._tilingScheme;
      }
    },
    ready: {
      get: function get() {
        return this._ready;
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    hasWaterMask: {
      get: function get() {
        if (!this._ready) throw new h("hasWaterMask must not be called before the terrain provider is ready.");
        return this._hasWaterMask && this._requestWaterMask;
      }
    },
    hasVertexNormals: {
      get: function get() {
        if (!this._ready) throw new h("hasVertexNormals must not be called before the terrain provider is ready.");
        return this._hasVertexNormals && this._requestVertexNormals;
      }
    },
    hasMetadata: {
      get: function get() {
        if (!this._ready) throw new h("hasMetadata must not be called before the terrain provider is ready.");
        return this._hasMetadata && this._requestMetadata;
      }
    },
    requestVertexNormals: {
      get: function get() {
        return this._requestVertexNormals;
      }
    },
    requestWaterMask: {
      get: function get() {
        return this._requestWaterMask;
      }
    },
    requestMetadata: {
      get: function get() {
        return this._requestMetadata;
      }
    },
    availability: {
      get: function get() {
        if (!this._ready) throw new h("availability must not be called before the terrain provider is ready.");
        return this._availability;
      }
    }
  }), r.prototype.getLevelMaximumGeometricError = function (e) {
    return this._levelZeroMaximumGeometricError / (1 << e);
  }, r.prototype.getTileDataAvailable = function (e, t, i) {
    if (ne(this._availability)) {
      if (i > this._availability._maximumLevel) return !1;
      if (this._availability.isTileAvailable(i, e, t)) return !0;
      if (!this._hasMetadata) return !1;

      for (var r = this._layers, a = r.length, n = 0; n < a; ++n) {
        if (T(this, e, t, i, r[n], 0 === n).result) return;
      }

      return !1;
    }
  }, r.prototype.loadTileDataAvailability = function (e, t, i) {
    if (!(!ne(this._availability) || i > this._availability._maximumLevel || this._availability.isTileAvailable(i, e, t)) && this._hasMetadata) for (var r = this._layers, a = r.length, n = 0; n < a; ++n) {
      var s = T(this, e, t, i, r[n], 0 === n);
      if (ne(s.promise)) return s.promise;
    }
  }, r._getAvailabilityTile = E, r;
});