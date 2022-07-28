"use strict";

define(["../Core/Cartesian3", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/DeveloperError", "../Core/Event", "../Core/getTimestamp", "../Core/Math", "../Core/Matrix4", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/Ray", "../Core/Rectangle", "../Core/Visibility", "./QuadtreeOccluders", "./QuadtreeTile", "./QuadtreeTileLoadState", "./SceneMode", "./TileReplacementQueue", "./TileSelectionResult"], function (y, Q, N, x, e, i, a, w, H, _, W, M, t, k, h, r, v, O, V, l, A) {
  "use strict";

  function n(e) {
    if (!x(e) || !x(e.tileProvider)) throw new i("options.tileProvider is required.");
    if (x(e.tileProvider.quadtree)) throw new i("A QuadtreeTileProvider can only be used with a single QuadtreePrimitive");
    this._tileProvider = e.tileProvider, (this._tileProvider.quadtree = this)._debug = {
      enableDebugOutput: !1,
      maxDepth: 0,
      maxDepthVisited: 0,
      tilesVisited: 0,
      tilesCulled: 0,
      tilesRendered: 0,
      tilesWaitingForChildren: 0,
      lastMaxDepth: -1,
      lastMaxDepthVisited: -1,
      lastTilesVisited: -1,
      lastTilesCulled: -1,
      lastTilesRendered: -1,
      lastTilesWaitingForChildren: -1,
      suspendLodUpdate: !1
    };
    var t = this._tileProvider.tilingScheme.ellipsoid;
    this._tilesToRender = [], this._tileLoadQueueHigh = [], this._tileLoadQueueMedium = [], this._tileLoadQueueLow = [], this._tileReplacementQueue = new l(), this._levelZeroTiles = void 0, this._loadQueueTimeSlice = 5, this._tilesInvalidated = !1, this._addHeightCallbacks = [], this._removeHeightCallbacks = [], this._tileToUpdateHeights = [], this._lastTileIndex = 0, this._updateHeightsTimeSlice = 2, this._cameraPositionCartographic = void 0, this._cameraReferenceFrameOriginCartographic = void 0, this.maximumScreenSpaceError = N(e.maximumScreenSpaceError, 2), this.tileCacheSize = N(e.tileCacheSize, 100), this.loadingDescendantLimit = 20, this.preloadAncestors = !0, this.preloadSiblings = !1, this._occluders = new r({
      ellipsoid: t
    }), this._tileLoadProgressEvent = new a(), this._lastTileLoadQueueLength = 0, this._lastSelectionFrameNumber = void 0;
  }

  function s(e) {
    var t = e._debug;
    t.maxDepth = 0, t.maxDepthVisited = 0, t.tilesVisited = 0, t.tilesCulled = 0, t.tilesRendered = 0, t.tilesWaitingForChildren = 0, e._tileLoadQueueHigh.length = 0, e._tileLoadQueueMedium.length = 0, e._tileLoadQueueLow.length = 0;
  }

  var R;
  e(n.prototype, {
    tileProvider: {
      get: function get() {
        return this._tileProvider;
      }
    },
    tileLoadProgressEvent: {
      get: function get() {
        return this._tileLoadProgressEvent;
      }
    },
    occluders: {
      get: function get() {
        return this._occluders;
      }
    }
  }), n.prototype.invalidateAllTiles = function () {
    this._tilesInvalidated = !0;
  }, n.prototype.forEachLoadedTile = function (e) {
    for (var t = this._tileReplacementQueue.head; x(t);) {
      t.state !== O.START && e(t), t = t.replacementNext;
    }
  }, n.prototype.forEachRenderedTile = function (e) {
    for (var t = this._tilesToRender, i = 0, r = t.length; i < r; ++i) {
      e(t[i]);
    }
  }, n.prototype.updateHeight = function (e, t) {
    var r = this,
        a = {
      positionOnEllipsoidSurface: void 0,
      positionCartographic: e,
      level: -1,
      callback: t,
      removeFunc: function removeFunc() {
        for (var e = r._addHeightCallbacks, t = e.length, i = 0; i < t; ++i) {
          if (e[i] === a) {
            e.splice(i, 1);
            break;
          }
        }

        r._removeHeightCallbacks.push(a);
      }
    };
    return r._addHeightCallbacks.push(a), a.removeFunc;
  }, n.prototype.update = function (e) {
    x(this._tileProvider.update) && this._tileProvider.update(e);
  }, n.prototype.beginFrame = function (e) {
    e.passes.render && (this._tilesInvalidated && (function (e) {
      var t = e._tileReplacementQueue;
      t.head = void 0, t.tail = void 0, t.count = 0, s(e);
      var i = e._levelZeroTiles;
      if (x(i)) for (var r = 0; r < i.length; ++r) {
        for (var a = i[r].customData, l = a.length, n = 0; n < l; ++n) {
          var o = a[n];
          o.level = 0, e._addHeightCallbacks.push(o);
        }

        i[r].freeResources();
      }
      e._levelZeroTiles = void 0, e._tileProvider.cancelReprojections();
    }(this), this._tilesInvalidated = !1), this._tileProvider.initialize(e), s(this), this._debug.suspendLodUpdate || this._tileReplacementQueue.markStartOfRenderFrame());
  }, n.prototype.render = function (e) {
    var t = e.passes,
        i = this._tileProvider;
    t.render && (i.beginUpdate(e), function (e, t) {
      var i,
          r = e._debug;
      if (r.suspendLodUpdate) return;
      e._tilesToRender.length = 0;
      var a,
          l = e._tileProvider;

      if (!x(e._levelZeroTiles)) {
        if (!l.ready) return;
        var n = l.tilingScheme;
        e._levelZeroTiles = v.createLevelZeroTiles(n);
        var o = e._levelZeroTiles.length;
        if (b.length < o) for (b = new Array(o), i = 0; i < o; ++i) {
          void 0 === b[i] && (b[i] = new L());
        }
      }

      e._occluders.ellipsoid.cameraPosition = t.camera.positionWC;
      var s = e._levelZeroTiles,
          d = 1 < s.length ? e._occluders : void 0;
      R = t.camera.positionCartographic, s.sort(f);
      var u,
          h = e._addHeightCallbacks,
          c = e._removeHeightCallbacks,
          m = t.frameNumber;

      if (0 < h.length || 0 < c.length) {
        for (i = 0, u = s.length; i < u; ++i) {
          (a = s[i])._updateCustomData(m, h, c);
        }

        h.length = 0, c.length = 0;
      }

      var g = t.camera;
      e._cameraPositionCartographic = g.positionCartographic;

      var p = _.getTranslation(g.transform, C);

      for (e._cameraReferenceFrameOriginCartographic = e.tileProvider.tilingScheme.ellipsoid.cartesianToCartographic(p, e._cameraReferenceFrameOriginCartographic), i = 0, u = s.length; i < u; ++i) {
        a = s[i], e._tileReplacementQueue.markTileRendered(a), a.renderable ? Y(e, a, l, t, d, !1, b[i]) : (U(e, e._tileLoadQueueHigh, a, t), ++r.tilesWaitingForChildren);
      }

      e._lastSelectionFrameNumber = m;
    }(this, e), function (e, t) {
      for (var i = e._tileProvider, r = e._tilesToRender, a = 0, l = r.length; a < l; ++a) {
        var n = r[a];
        i.showTileThisFrame(n, t);
      }
    }(this, e), i.endUpdate(e)), t.pick && 0 < this._tilesToRender.length && i.updateForPick(e);
  }, n.prototype.endFrame = function (e) {
    e.passes.render && e.mode !== V.MORPHING && (function (e, t) {
      var i = e._tileLoadQueueHigh,
          r = e._tileLoadQueueMedium,
          a = e._tileLoadQueueLow;
      if (0 === i.length && 0 === r.length && 0 === a.length) return;

      e._tileReplacementQueue.trimTiles(e.tileCacheSize);

      var l = w() + e._loadQueueTimeSlice,
          n = e._tileProvider,
          o = g(e, t, n, l, i, !1);

      o = g(e, t, n, l, r, o), g(e, t, n, l, a, o);
    }(this, e), function (e, t) {
      if (!e.tileProvider.ready) return;
      var i = q;
      i.length = 0;
      var r,
          a,
          l = e._tileToUpdateHeights,
          n = e._tileProvider.terrainProvider,
          o = w(),
          s = e._updateHeightsTimeSlice,
          d = o + s,
          u = t.mode,
          h = t.mapProjection,
          c = e.tileProvider.tilingScheme.ellipsoid;

      for (; 0 < l.length;) {
        var m = l[0];

        if (x(m.data) && x(m.data.mesh)) {
          var g = m.customData,
              p = g.length,
              _ = !1;

          for (r = e._lastTileIndex; r < p; ++r) {
            var v,
                R,
                f,
                C,
                b = g[r];

            if (m.level > b.level) {
              x(b.positionOnEllipsoidSurface) || (b.positionOnEllipsoidSurface = y.fromRadians(b.positionCartographic.longitude, b.positionCartographic.latitude, 0, c)), u === V.SCENE3D ? (v = c.geodeticSurfaceNormal(b.positionOnEllipsoidSurface, B.direction), R = c.getSurfaceNormalIntersectionWithZAxis(b.positionOnEllipsoidSurface, 11500, B.origin), x(R) || (f = Math.min(N(m.data.minimumHeight, 0), -11500), C = y.multiplyByScalar(v, Math.abs(f) + 1, j), y.subtract(b.positionOnEllipsoidSurface, C, B.origin))) : (Q.clone(b.positionCartographic, z), z.height = -11500, h.project(z, j), y.fromElements(j.z, j.x, j.y, j), y.clone(j, B.origin), y.clone(y.UNIT_X, B.direction));
              var L = m.data.pick(B, u, h, !1, j);
              x(L) && (b.callback(L), b.level = m.level);
            } else if (m.level === b.level) {
              for (var T = m.children, E = T.length, D = 0; D < E && (a = T[D], !k.contains(a.rectangle, b.positionCartographic)); ++D) {
                ;
              }

              var S = n.getTileDataAvailable(a.x, a.y, a.level),
                  F = m.parent;
              (x(S) && !S || x(F) && x(F.data) && x(F.data.terrainData) && !F.data.terrainData.isChildAvailable(F.x, F.y, a.x, a.y)) && b.removeFunc();
            }

            if (w() >= d) {
              _ = !0;
              break;
            }
          }

          if (_) {
            e._lastTileIndex = r;
            break;
          }

          e._lastTileIndex = 0, l.shift();
        } else {
          var P = m._lastSelectionResultFrame === e._lastSelectionFrameNumber ? m._lastSelectionResult : A.NONE;
          P !== A.RENDERED && P !== A.CULLED_BUT_NEEDED || i.push(m), l.shift(), e._lastTileIndex = 0;
        }
      }

      for (r = 0; r < i.length; r++) {
        l.push(i[r]);
      }
    }(this, e), function (e, t) {
      var i = e._tileLoadQueueHigh.length + e._tileLoadQueueMedium.length + e._tileLoadQueueLow.length;
      i === e._lastTileLoadQueueLength && !e._tilesInvalidated || (t.afterRender.push(a.prototype.raiseEvent.bind(e._tileLoadProgressEvent, i)), e._lastTileLoadQueueLength = i);
      var r = e._debug;
      r.enableDebugOutput && !r.suspendLodUpdate && (r.maxDepth = e._tilesToRender.reduce(function (e, t) {
        return Math.max(e, t.level);
      }, -1), r.tilesRendered = e._tilesToRender.length, r.tilesVisited === r.lastTilesVisited && r.tilesRendered === r.lastTilesRendered && r.tilesCulled === r.lastTilesCulled && r.maxDepth === r.lastMaxDepth && r.tilesWaitingForChildren === r.lastTilesWaitingForChildren && r.maxDepthVisited === r.lastMaxDepthVisited || (console.log("Visited " + r.tilesVisited + ", Rendered: " + r.tilesRendered + ", Culled: " + r.tilesCulled + ", Max Depth Rendered: " + r.maxDepth + ", Max Depth Visited: " + r.maxDepthVisited + ", Waiting for children: " + r.tilesWaitingForChildren), r.lastTilesVisited = r.tilesVisited, r.lastTilesRendered = r.tilesRendered, r.lastTilesCulled = r.tilesCulled, r.lastMaxDepth = r.maxDepth, r.lastTilesWaitingForChildren = r.tilesWaitingForChildren, r.lastMaxDepthVisited = r.maxDepthVisited));
    }(this, e));
  }, n.prototype.isDestroyed = function () {
    return !1;
  }, n.prototype.destroy = function () {
    this._tileProvider = this._tileProvider && this._tileProvider.destroy();
  };
  var o = new Q();

  function f(e, t) {
    var i = k.center(e.rectangle, o),
        r = i.longitude - R.longitude,
        a = i.latitude - R.latitude,
        l = (i = k.center(t.rectangle, o)).longitude - R.longitude,
        n = i.latitude - R.latitude;
    return r * r + a * a - (l * l + n * n);
  }

  var C = new y(),
      b = [];

  function U(e, t, i, r) {
    i.needsLoading && (void 0 !== e.tileProvider.computeTileLoadPriority && (i._loadPriority = e.tileProvider.computeTileLoadPriority(i, r)), t.push(i));
  }

  function L() {
    this.allAreRenderable = !0, this.anyWereRenderedLastFrame = !1, this.notYetRenderableCount = 0;
  }

  function d() {
    this.southwest = new L(), this.southeast = new L(), this.northwest = new L(), this.northeast = new L();
  }

  d.prototype.combine = function (e) {
    var t = this.southwest,
        i = this.southeast,
        r = this.northwest,
        a = this.northeast;
    e.allAreRenderable = t.allAreRenderable && i.allAreRenderable && r.allAreRenderable && a.allAreRenderable, e.anyWereRenderedLastFrame = t.anyWereRenderedLastFrame || i.anyWereRenderedLastFrame || r.anyWereRenderedLastFrame || a.anyWereRenderedLastFrame, e.notYetRenderableCount = t.notYetRenderableCount + i.notYetRenderableCount + r.notYetRenderableCount + a.notYetRenderableCount;
  };

  for (var I = new Array(30), u = 0; u < I.length; ++u) {
    I[u] = new d();
  }

  function c(e, t, i, r, a) {
    var l = e._debug;
    ++l.tilesVisited, e._tileReplacementQueue.markTileRendered(i), i._updateCustomData(t.frameNumber), i.level > l.maxDepthVisited && (l.maxDepthVisited = i.level);

    var n = function (e, t, i) {
      if (t.mode === V.SCENE2D || t.camera.frustum instanceof W || t.camera.frustum instanceof M) return function (e, t, i) {
        var r = t.camera.frustum;
        x(r._offCenterFrustum) && (r = r._offCenterFrustum);

        var a = t.context,
            l = a.drawingBufferWidth,
            n = a.drawingBufferHeight,
            o = e._tileProvider.getLevelMaximumGeometricError(i.level),
            s = Math.max(r.top - r.bottom, r.right - r.left) / Math.max(l, n),
            d = o / s;

        t.fog.enabled && t.mode !== V.SCENE2D && (d -= H.fog(i._distance, t.fog.density) * t.fog.sse);
        return d;
      }(e, t, i);

      var r = e._tileProvider.getLevelMaximumGeometricError(i.level),
          a = i._distance,
          l = t.context.drawingBufferHeight,
          n = t.camera.frustum.sseDenominator,
          o = r * l / (a * n);

      t.fog.enabled && (o -= H.fog(a, t.fog.density) * t.fog.sse);
      return o;
    }(e, t, i) < e.maximumScreenSpaceError,
        o = i.southwestChild,
        s = i.southeastChild,
        d = i.northwestChild,
        u = i.northeastChild,
        h = e._lastSelectionFrameNumber,
        c = i._lastSelectionResultFrame === h ? i._lastSelectionResult : A.NONE,
        m = e.tileProvider;

    if (n || r) {
      var g = A.originalResult(c) === A.RENDERED,
          p = A.originalResult(c) === A.CULLED || c === A.NONE,
          _ = i.state === O.DONE,
          v = g || p || _;

      if (v || x(m.canRenderWithoutLosingDetail) && (v = m.canRenderWithoutLosingDetail(i)), v) return n && U(e, e._tileLoadQueueMedium, i, t), Z(e, i), a.allAreRenderable = i.renderable, a.anyWereRenderedLastFrame = c === A.RENDERED, a.notYetRenderableCount = i.renderable ? 0 : 1, i._lastSelectionResultFrame = t.frameNumber, i._lastSelectionResult = A.RENDERED, void (a.anyWereRenderedLastFrame || e._tileToUpdateHeights.push(i));
      r = !0, n && U(e, e._tileLoadQueueHigh, i, t);
    }

    if (m.canRefine(i)) {
      if (o.upsampledFromParent && s.upsampledFromParent && d.upsampledFromParent && u.upsampledFromParent) return Z(e, i), U(e, e._tileLoadQueueMedium, i, t), e._tileReplacementQueue.markTileRendered(o), e._tileReplacementQueue.markTileRendered(s), e._tileReplacementQueue.markTileRendered(d), e._tileReplacementQueue.markTileRendered(u), a.allAreRenderable = i.renderable, a.anyWereRenderedLastFrame = c === A.RENDERED, a.notYetRenderableCount = i.renderable ? 0 : 1, i._lastSelectionResultFrame = t.frameNumber, i._lastSelectionResult = A.RENDERED, void (a.anyWereRenderedLastFrame || e._tileToUpdateHeights.push(i));
      i._lastSelectionResultFrame = t.frameNumber, i._lastSelectionResult = A.REFINED;
      var R = e._tilesToRender.length,
          f = e._tileLoadQueueLow.length,
          C = e._tileLoadQueueMedium.length,
          b = e._tileLoadQueueHigh.length,
          L = e._tileToUpdateHeights.length;

      if (!function (e, t, i, r, a, l, n, o) {
        var s = l.camera.positionCartographic,
            d = e._tileProvider,
            u = e._occluders,
            h = I[t.level],
            c = h.southwest,
            m = h.southeast,
            g = h.northwest,
            p = h.northeast;
        s.longitude < t.rectangle.east ? s.latitude < t.rectangle.north ? (Y(e, t, d, l, u, n, c), Y(e, i, d, l, u, n, m), Y(e, r, d, l, u, n, g), Y(e, a, d, l, u, n, p)) : (Y(e, r, d, l, u, n, g), Y(e, t, d, l, u, n, c), Y(e, a, d, l, u, n, p), Y(e, i, d, l, u, n, m)) : s.latitude < t.rectangle.north ? (Y(e, i, d, l, u, n, m), Y(e, t, d, l, u, n, c), Y(e, a, d, l, u, n, p), Y(e, r, d, l, u, n, g)) : (Y(e, a, d, l, u, n, p), Y(e, r, d, l, u, n, g), Y(e, i, d, l, u, n, m), Y(e, t, d, l, u, n, c));
        h.combine(o);
      }(e, o, s, d, u, t, r, a), R !== e._tilesToRender.length) {
        var T = a.allAreRenderable,
            E = a.anyWereRenderedLastFrame,
            D = a.notYetRenderableCount,
            S = !1;

        if (!T && !E) {
          for (var F = e._tilesToRender, P = R; P < F.length; ++P) {
            for (var y = F[P]; void 0 !== y && y._lastSelectionResult !== A.KICKED && y !== i;) {
              y._lastSelectionResult = A.kick(y._lastSelectionResult), y = y.parent;
            }
          }

          e._tilesToRender.length = R, e._tileToUpdateHeights.length = L, Z(e, i), i._lastSelectionResult = A.RENDERED;
          var Q = c === A.RENDERED;
          !Q && D > e.loadingDescendantLimit && (e._tileLoadQueueLow.length = f, e._tileLoadQueueMedium.length = C, e._tileLoadQueueHigh.length = b, U(e, e._tileLoadQueueMedium, i, t), a.notYetRenderableCount = i.renderable ? 0 : 1, S = !0), a.allAreRenderable = i.renderable, (a.anyWereRenderedLastFrame = Q) || e._tileToUpdateHeights.push(i), ++l.tilesWaitingForChildren;
        }

        e.preloadAncestors && !S && U(e, e._tileLoadQueueLow, i, t);
      }
    } else i._lastSelectionResultFrame = t.frameNumber, i._lastSelectionResult = A.RENDERED, Z(e, i), U(e, e._tileLoadQueueHigh, i, t), a.allAreRenderable = i.renderable, a.anyWereRenderedLastFrame = c === A.RENDERED, a.notYetRenderableCount = i.renderable ? 0 : 1;
  }

  function Y(e, t, i, r, a, l, n) {
    if (i.computeTileVisibility(t, r, a) !== h.NONE) return c(e, r, t, l, n), 0;
    var o, s, d, u;
    ++e._debug.tilesCulled, e._tileReplacementQueue.markTileRendered(t), n.allAreRenderable = !0, n.anyWereRenderedLastFrame = !1, n.notYetRenderableCount = 0, d = e, u = t.rectangle, x(d._cameraPositionCartographic) && k.contains(u, d._cameraPositionCartographic) || x(d._cameraReferenceFrameOriginCartographic) && k.contains(u, d._cameraReferenceFrameOriginCartographic) ? (x(t.data) && x(t.data.vertexArray) || U(e, e._tileLoadQueueMedium, t, r), o = e._lastSelectionFrameNumber, (s = t._lastSelectionResultFrame === o ? t._lastSelectionResult : A.NONE) !== A.CULLED_BUT_NEEDED && s !== A.RENDERED && e._tileToUpdateHeights.push(t), t._lastSelectionResult = A.CULLED_BUT_NEEDED) : (!e.preloadSiblings && 0 !== t.level || U(e, e._tileLoadQueueLow, t, r), t._lastSelectionResult = A.CULLED), t._lastSelectionResultFrame = r.frameNumber;
  }

  function Z(e, t) {
    e._tilesToRender.push(t);
  }

  function m(e, t) {
    return e._loadPriority - t._loadPriority;
  }

  function g(e, t, i, r, a, l) {
    void 0 !== i.computeTileLoadPriority && a.sort(m);

    for (var n = 0, o = a.length; n < o && (w() < r || !l); ++n) {
      var s = a[n];
      e._tileReplacementQueue.markTileRendered(s), i.loadTile(t, s), l = !0;
    }

    return l;
  }

  var B = new t(),
      z = new Q(),
      j = new y(),
      q = [];
  return n;
});