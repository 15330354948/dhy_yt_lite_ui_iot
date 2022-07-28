"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/defined", "../Core/defineProperties", "../Core/IndexDatatype", "../Core/IntersectionTests", "../Core/OrientedBoundingBox", "../Core/PixelFormat", "../Core/Request", "../Core/RequestState", "../Core/RequestType", "../Core/TileProviderError", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/PixelDatatype", "../Renderer/Sampler", "../Renderer/Texture", "../Renderer/TextureMagnificationFilter", "../Renderer/TextureMinificationFilter", "../Renderer/TextureWrap", "../Renderer/VertexArray", "./ImageryState", "./QuadtreeTileLoadState", "./SceneMode", "./TerrainState", "./TileBoundingRegion", "../ThirdParty/when"], function (e, x, h, D, r, d, E, y, v, p, g, S, A, l, u, T, m, I, C, w, R, c, M, N, s, B, t, L) {
  "use strict";

  function k() {
    this.imagery = [], this.waterMaskTexture = void 0, this.waterMaskTranslationAndScale = new h(0, 0, 1, 1), this.terrainData = void 0, this.vertexArray = void 0, this.orientedBoundingBox = void 0, this.boundingVolumeSourceTile = void 0, this.tileBoundingRegion = void 0, this.occludeePointInScaledSpace = new x(), this.terrainState = B.UNLOADED, this.mesh = void 0, this.fill = void 0, this.pickBoundingSphere = new e(), this.surfaceShader = void 0, this.isClipped = !0, this.clippedByBoundaries = !1;
  }

  function _(e, r, t, a, i, n) {
    var o;
    return e.decodePosition(a, i, n), D(r) && r !== s.SCENE3D && (o = t.ellipsoid.cartesianToCartographic(n), t.project(o, n), x.fromElements(n.z, n.x, n.y, n)), n;
  }

  r(k.prototype, {
    eligibleForUnloading: {
      get: function get() {
        for (var e = this.terrainState, r = !(e === B.RECEIVING || e === B.TRANSFORMING), t = this.imagery, a = 0, i = t.length; r && a < i; ++a) {
          var n = t[a],
              r = !D(n.loadingImagery) || n.loadingImagery.state !== M.TRANSITIONING;
        }

        return r;
      }
    },
    renderedMesh: {
      get: function get() {
        return D(this.vertexArray) ? this.mesh : D(this.fill) ? this.fill.mesh : void 0;
      }
    }
  });
  var F = new x(),
      V = new x(),
      P = new x(),
      O = new x();
  return k.prototype.pick = function (e, r, t, a, i) {
    var n = this.renderedMesh;
    if (D(n)) for (var o = n.vertices, s = n.indices, d = n.encoding, l = s.length, u = 0; u < l; u += 3) {
      var c = s[u],
          f = s[u + 1],
          h = s[u + 2],
          y = _(d, r, t, o, c, F),
          v = _(d, r, t, o, f, V),
          p = _(d, r, t, o, h, P),
          g = E.rayTriangle(e, y, v, p, a, O);

      if (D(g)) return x.clone(g, i);
    }
  }, k.prototype.freeResources = function () {
    D(this.waterMaskTexture) && (--this.waterMaskTexture.referenceCount, 0 === this.waterMaskTexture.referenceCount && this.waterMaskTexture.destroy(), this.waterMaskTexture = void 0), this.terrainData = void 0, this.terrainState = B.UNLOADED, this.mesh = void 0, this.fill = this.fill && this.fill.destroy();

    for (var e = this.imagery, r = 0, t = e.length; r < t; ++r) {
      e[r].freeResources();
    }

    this.imagery.length = 0, this.freeVertexArray();
  }, k.prototype.freeVertexArray = function () {
    k._freeVertexArray(this.vertexArray), this.vertexArray = void 0, k._freeVertexArray(this.wireframeVertexArray), this.wireframeVertexArray = void 0;
  }, k.initialize = function (e, r, t) {
    var a = e.data;
    D(a) || (a = e.data = new k()), e.state === N.START && (function (e, r, t) {
      var a = r.getTileDataAvailable(e.x, e.y, e.level);
      {
        var i, n;
        !D(a) && D(e.parent) && (i = e.parent, n = i.data, D(n) && D(n.terrainData) && (a = n.terrainData.isChildAvailable(i.x, i.y, e.x, e.y)));
      }
      !1 === a && (e.data.terrainState = B.FAILED);

      for (var o = 0, s = t.length; o < s; ++o) {
        var d = t.get(o);
        d.show && d._createTileImagerySkeletons(e, r);
      }
    }(e, r, t), e.state = N.LOADING);
  }, k.processStateMachine = function (e, r, t, a, i, n) {
    k.initialize(e, t, a);
    var o = e.data;

    if (e.state === N.LOADING && function (e, r, t, a, i) {
      var n = e.data,
          o = e.parent;
      {
        n.terrainState === B.FAILED && void 0 !== o && (void 0 !== o.data && void 0 !== o.data.terrainData && !1 !== o.data.terrainData.canUpsample || k.processStateMachine(o, r, t, a, !0));
      }
      n.terrainState === B.FAILED && function (r, e, t, a, i, n) {
        var o = e.parent;
        if (!o) return e.state = N.FAILED;
        var s = o.data.terrainData,
            d = o.x,
            l = o.y,
            u = o.level;
        if (!D(s)) return;
        var c = s.upsample(t.tilingScheme, d, l, u, a, i, n);
        if (!D(c)) return;
        r.terrainState = B.RECEIVING, L(c, function (e) {
          r.terrainData = e, r.terrainState = B.RECEIVED;
        }, function () {
          r.terrainState = B.FAILED;
        });
      }(n, e, t, e.x, e.y, e.level);
      n.terrainState === B.UNLOADED && function (t, a, i, n, o) {
        function s(e) {
          t.terrainData = e, t.terrainState = B.RECEIVED, t.request = void 0;
        }

        function d() {
          if (t.request.state === g.CANCELLED) return t.terrainData = void 0, t.terrainState = B.UNLOADED, void (t.request = void 0);
          t.terrainState = B.FAILED, t.request = void 0;
          var e = "Failed to obtain terrain tile X: " + i + " Y: " + n + " Level: " + o + ".";
          a._requestError = A.handleError(a._requestError, a, a.errorEvent, e, i, n, o, r);
        }

        function r() {
          var e = new p({
            throttle: !1,
            throttleByServer: !0,
            type: S.TERRAIN
          });
          t.request = e;
          var r = a.requestTileGeometry(i, n, o, e);
          D(r) ? (t.terrainState = B.RECEIVING, L(r, s, d)) : (t.terrainState = B.UNLOADED, t.request = void 0);
        }

        r();
      }(n, t, e.x, e.y, e.level);
      n.terrainState === B.RECEIVED && function (r, e, t, a, i, n) {
        var o = t.tilingScheme,
            s = r.terrainData.createMesh(o, a, i, n, e.terrainExaggeration);
        if (!D(s)) return;
        r.terrainState = B.TRANSFORMING, L(s, function (e) {
          r.mesh = e, r.orientedBoundingBox = y.clone(e.orientedBoundingBox, r.orientedBoundingBox), r.occludeePointInScaledSpace = x.clone(e.occludeePointInScaledSpace, r.occludeePointInScaledSpace), r.terrainState = B.TRANSFORMED;
        }, function () {
          r.terrainState = B.FAILED;
        });
      }(n, r, t, e.x, e.y, e.level);
      n.terrainState === B.TRANSFORMED && function (e, r, t) {
        e.vertexArray = k._createVertexArrayForMesh(r, e.mesh), e.terrainState = B.READY, e.fill = e.fill && e.fill.destroy(t);
      }(n, r.context, (e.x, e.y, e.level, i));
      {
        var s;
        n.terrainState >= B.RECEIVED && void 0 === n.waterMaskTexture && t.hasWaterMask && (void 0 !== n.terrainData.waterMask ? function (e, r) {
          var t,
              a = r.terrainData.waterMask,
              i = function (e) {
            var r = e.cache.tile_waterMaskData;
            {
              var t, a;
              D(r) || ((t = I.create({
                context: e,
                pixelFormat: v.LUMINANCE,
                pixelDatatype: T.UNSIGNED_BYTE,
                source: {
                  arrayBufferView: new Uint8Array([255]),
                  width: 1,
                  height: 1
                }
              })).referenceCount = 1, a = new m({
                wrapS: R.CLAMP_TO_EDGE,
                wrapT: R.CLAMP_TO_EDGE,
                minificationFilter: w.LINEAR,
                magnificationFilter: C.LINEAR
              }), r = {
                allWaterTexture: t,
                sampler: a,
                destroy: function destroy() {
                  this.allWaterTexture.destroy();
                }
              }, e.cache.tile_waterMaskData = r);
            }
            return r;
          }(e),
              n = a.length;

          if (1 === n) {
            if (0 === a[0]) return;
            t = i.allWaterTexture;
          } else {
            var o = Math.sqrt(n);
            (t = I.create({
              context: e,
              pixelFormat: v.LUMINANCE,
              pixelDatatype: T.UNSIGNED_BYTE,
              source: {
                width: o,
                height: o,
                arrayBufferView: a
              },
              sampler: i.sampler,
              flipY: !1
            })).referenceCount = 0;
          }

          ++t.referenceCount, r.waterMaskTexture = t, h.fromElements(0, 0, 1, 1, r.waterMaskTranslationAndScale);
        }(r.context, n) : (s = n._findAncestorTileWithTerrainData(e), D(s) && D(s.data.waterMaskTexture) && (n.waterMaskTexture = s.data.waterMaskTexture, ++n.waterMaskTexture.referenceCount, n._computeWaterMaskTranslationAndScale(e, s, n.waterMaskTranslationAndScale))));
      }
    }(e, r, t, a, i), !n) {
      var s = e.renderable;
      e.renderable = D(o.vertexArray);
      var d = o.terrainState === B.READY;
      e.upsampledFromParent = D(o.terrainData) && o.terrainData.wasCreatedByUpsampling();
      var l = o.processImagery(e, t, r);

      if (d && l) {
        var u = e._loadedCallbacks,
            c = {};

        for (var f in u) {
          u.hasOwnProperty(f) && (u[f](e) || (c[f] = u[f]));
        }

        e._loadedCallbacks = c, e.state = N.DONE;
      }

      s && (e.renderable = !0);
    }
  }, k.prototype.processImagery = function (e, r, t, a) {
    for (var i = e.data, n = e.upsampledFromParent, o = e.renderable, s = !0, d = i.imagery, l = 0, u = d.length; l < u; ++l) {
      var c = d[l];

      if (D(c.loadingImagery)) {
        if (c.loadingImagery.state === M.PLACEHOLDER) {
          var f = c.loadingImagery.imageryLayer;

          if (f.imageryProvider.ready) {
            c.freeResources(), d.splice(l, 1), f._createTileImagerySkeletons(e, r, l), --l, u = d.length;
            continue;
          }

          n = !1;
        }

        var h = c.processStateMachine(e, t, a),
            s = s && h,
            o = o && (h || D(c.readyImagery)),
            n = n && D(c.loadingImagery) && (c.loadingImagery.state === M.FAILED || c.loadingImagery.state === M.INVALID);
      } else n = !1;
    }

    return e.upsampledFromParent = n, e.renderable = o, s;
  }, k._createVertexArrayForMesh = function (e, r) {
    var t,
        a = r.vertices,
        i = l.createVertexBuffer({
      context: e,
      typedArray: a,
      usage: u.STATIC_DRAW
    }),
        n = r.encoding.getAttributes(i),
        o = r.indices.indexBuffers || {},
        s = o[e.id];
    return !D(s) || s.isDestroyed() ? (t = r.indices, (s = l.createIndexBuffer({
      context: e,
      typedArray: t,
      usage: u.STATIC_DRAW,
      indexDatatype: d.fromSizeInBytes(t.BYTES_PER_ELEMENT)
    })).vertexArrayDestroyable = !1, s.referenceCount = 1, o[e.id] = s, r.indices.indexBuffers = o) : ++s.referenceCount, new c({
      context: e,
      attributes: n,
      indexBuffer: s
    });
  }, k._freeVertexArray = function (e) {
    var r;
    D(e) && (r = e.indexBuffer, e.destroy(), D(r) && !r.isDestroyed() && D(r.referenceCount) && (--r.referenceCount, 0 === r.referenceCount && r.destroy()));
  }, k.prototype._findAncestorTileWithTerrainData = function (e) {
    for (var r = e.parent; D(r) && (!D(r.data) || !D(r.data.terrainData) || r.data.terrainData.wasCreatedByUpsampling());) {
      r = r.parent;
    }

    return r;
  }, k.prototype._computeWaterMaskTranslationAndScale = function (e, r, t) {
    var a = r.rectangle,
        i = e.rectangle,
        n = i.width,
        o = i.height,
        s = n / a.width,
        d = o / a.height;
    return t.x = s * (i.west - a.west) / n, t.y = d * (i.south - a.south) / o, t.z = s, t.w = d, t;
  }, k;
});