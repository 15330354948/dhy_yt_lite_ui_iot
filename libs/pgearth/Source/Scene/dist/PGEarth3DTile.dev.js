"use strict";

define(["../Core/BoundingSphere", "../Core/Cartesian3", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/CullingVolume", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/Ellipsoid", "../Core/getMagic", "../Core/Intersect", "../Core/JulianDate", "../Core/Math", "../Core/Matrix3", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/OrthographicFrustum", "../Core/Rectangle", "../Core/Request", "../Core/RequestScheduler", "../Core/RequestState", "../Core/RequestType", "../Core/Resource", "../Core/RuntimeError", "../Core/Transforms", "../ThirdParty/when", "./PGEarth3DTileContentFactory", "./PGEarth3DTileContentState", "./PGEarth3DTileOptimizationHint", "./PGEarth3DTilePass", "./PGEarth3DTileRefine", "./Empty3DTileContent", "./SceneMode", "./TileBoundingRegion", "./TileBoundingSphere", "./TileOrientedBoundingBox"], function (c, S, v, g, l, f, C, e, t, i, h, m, p, b, E, _, R, y, V, D, P, T, w, B, x, I, o, q, L, A, O, M, F, N, W, r, U, k) {
  "use strict";

  function z(e, t, i, o) {
    this._tileset = e;
    var n = (this._header = i).content;
    this.transform = C(i.transform) ? R.unpack(i.transform) : R.clone(R.IDENTITY);

    var r,
        s,
        u,
        a,
        d,
        c,
        l,
        h,
        m,
        p = C(o) ? o.computedTransform : e.modelMatrix,
        _ = R.multiply(p, this.transform, new R()),
        g = C(o) ? o._initialTransform : R.IDENTITY;

    this._initialTransform = R.multiply(g, this.transform, new R()), this.computedTransform = _, this._boundingVolume = this.createBoundingVolume(i.boundingVolume, _), this._boundingVolume2D = void 0, C(n) && C(n.boundingVolume) && (r = this.createBoundingVolume(n.boundingVolume, _)), this._contentBoundingVolume = r, this._contentBoundingVolume2D = void 0, C(i.viewerRequestVolume) && (s = this.createBoundingVolume(i.viewerRequestVolume, _)), this._viewerRequestVolume = s, this.geometricError = i.geometricError, C(this.geometricError) || (this.geometricError = C(o) ? o.geometricError : e._geometricError, z._deprecationWarning("geometricErrorUndefined", "Required property geometricError is undefined for this tile. Using parent's geometric error instead.")), u = C(i.refine) ? ("replace" !== i.refine && "add" !== i.refine || z._deprecationWarning("lowercase-refine", 'This tile uses a lowercase refine "' + i.refine + '". Instead use "' + i.refine.toUpperCase() + '".'), "REPLACE" === i.refine.toUpperCase() ? F.REPLACE : F.ADD) : C(o) ? o.refine : F.REPLACE, this.refine = u, this.children = [], this.parent = o, t = x.createIfNeeded(t), C(n) ? (m = n.uri, C(n.url) && (z._deprecationWarning("contentUrl", 'This tileset JSON uses the "content.url" property which has been deprecated. Use "content.uri" instead.'), m = n.url), d = !1, c = A.UNLOADED, l = t.getDerivedResource({
      url: m
    }), h = T.getServerKey(l.getUrlComponent())) : (a = new N(e, this), d = !0, c = A.READY), this._content = a, this._contentResource = l, this._contentState = c, this._contentReadyToProcessPromise = void 0, this._contentReadyPromise = void 0, this._expiredContent = void 0, this._serverKey = h, this.hasEmptyContent = d, this.hasTilesetContent = !1, this.cacheNode = void 0;
    var f,
        y,
        V = i.expire;
    C(V) && (f = V.duration, C(V.date) && (y = b.fromIso8601(V.date))), this.expireDuration = f, this.expireDate = y, this.lastStyleTime = 0, this._optimChildrenWithinParent = O.NOT_COMPUTED, this.clippingPlanesDirty = !1, this.priorityDeferred = !1, this._distanceToCamera = 0, this._centerZDepth = 0, this._screenSpaceError = 0, this._screenSpaceErrorProgressiveResolution = 0, this._visibilityPlaneMask = 0, this._visible = !1, this._inRequestVolume = !1, this._finalResolution = !0, this._depth = 0, this._stackLength = 0, this._selectionDepth = 0, this._updatedVisibilityFrame = 0, this._touchedFrame = 0, this._visitedFrame = 0, this._selectedFrame = 0, this._requestedFrame = 0, this._ancestorWithContent = void 0, this._ancestorWithContentAvailable = void 0, this._refines = !1, this._shouldSelect = !1, this._isClipped = !0, this._clippingPlanesState = 0, this._debugBoundingVolume = void 0, this._debugContentBoundingVolume = void 0, this._debugViewerRequestVolume = void 0, this._debugColor = v.fromRandom({
      alpha: 1
    }), this._debugColorizeTiles = !1, this._priority = 0, (this._priorityHolder = this)._priorityProgressiveResolution = !1, this._priorityProgressiveResolutionScreenSpaceErrorLeaf = !1, this._priorityReverseScreenSpaceError = 0, this._foveatedFactor = 0, this._wasMinPriorityChild = !1, this._loadTimestamp = new b(), this._commandsLength = 0, this._color = void 0, this._colorDirty = !1, this._request = void 0;
  }

  z._deprecationWarning = t, e(z.prototype, {
    tileset: {
      get: function get() {
        return this._tileset;
      }
    },
    content: {
      get: function get() {
        return this._content;
      }
    },
    boundingVolume: {
      get: function get() {
        return this._boundingVolume;
      }
    },
    contentBoundingVolume: {
      get: function get() {
        return f(this._contentBoundingVolume, this._boundingVolume);
      }
    },
    boundingSphere: {
      get: function get() {
        return this._boundingVolume.boundingSphere;
      }
    },
    extras: {
      get: function get() {
        return this._header.extras;
      }
    },
    color: {
      get: function get() {
        return C(this._color) || (this._color = new v()), v.clone(this._color);
      },
      set: function set(e) {
        this._color = v.clone(e, this._color), this._colorDirty = !0;
      }
    },
    contentAvailable: {
      get: function get() {
        return this.contentReady && !this.hasEmptyContent && !this.hasTilesetContent || C(this._expiredContent) && !this.contentFailed;
      }
    },
    contentReady: {
      get: function get() {
        return this._contentState === A.READY;
      }
    },
    contentUnloaded: {
      get: function get() {
        return this._contentState === A.UNLOADED;
      }
    },
    contentExpired: {
      get: function get() {
        return this._contentState === A.EXPIRED;
      }
    },
    contentFailed: {
      get: function get() {
        return this._contentState === A.FAILED;
      }
    },
    contentReadyToProcessPromise: {
      get: function get() {
        if (C(this._contentReadyToProcessPromise)) return this._contentReadyToProcessPromise.promise;
      }
    },
    contentReadyPromise: {
      get: function get() {
        if (C(this._contentReadyPromise)) return this._contentReadyPromise.promise;
      }
    },
    commandsLength: {
      get: function get() {
        return this._commandsLength;
      }
    }
  });
  var H = new S();
  var G = new b();
  z.prototype.getScreenSpaceError = function (e, t, i) {
    var o = this._tileset,
        n = f(i, 1),
        r = C(this.parent) ? this.parent.geometricError : o._geometricError,
        s = t ? r : this.geometricError;
    if (0 === s) return 0;

    var u,
        a,
        d,
        c,
        l = e.camera,
        h = l.frustum,
        m = e.context,
        p = m.drawingBufferWidth,
        _ = m.drawingBufferHeight * n;

    return e.mode === W.SCENE2D || h instanceof V ? (C(h._offCenterFrustum) && (h = h._offCenterFrustum), u = s / (Math.max(h.top - h.bottom, h.right - h.left) / Math.max(p, _))) : (u = s * _ / ((a = Math.max(this._distanceToCamera, E.EPSILON7)) * l.frustum.sseDenominator), o.dynamicScreenSpaceError && (d = o._dynamicScreenSpaceErrorComputedDensity, c = o.dynamicScreenSpaceErrorFactor, u -= E.fog(a, d) * c)), u;
  }, z.prototype.updateVisibility = function (e) {
    var t,
        i,
        o,
        n,
        r = this.parent,
        s = this._tileset,
        u = C(r) ? r.computedTransform : s.modelMatrix,
        a = C(r) ? r._visibilityPlaneMask : l.MASK_INDETERMINATE;
    this.updateTransform(u), this._distanceToCamera = this.distanceToTile(e), this._centerZDepth = this.distanceToTileCenter(e), this._screenSpaceError = this.getScreenSpaceError(e, !1), this._screenSpaceErrorProgressiveResolution = this.getScreenSpaceError(e, !1, s.progressiveResolutionHeightFraction), this._visibilityPlaneMask = this.visibility(e, a), this._visible = this._visibilityPlaneMask !== l.MASK_OUTSIDE, this._inRequestVolume = this.insideViewerRequestVolume(e), this._priorityReverseScreenSpaceError = (t = s, o = (i = this).parent, n = C(o) && (!t._skipLevelOfDetail || 0 === i._screenSpaceError || o.hasTilesetContent) ? o._screenSpaceError : i._screenSpaceError, t.root._screenSpaceError - n), this._priorityProgressiveResolution = function (e, t) {
      if (e.progressiveResolutionHeightFraction <= 0 || .5 < e.progressiveResolutionHeightFraction) return !1;
      var i = t._screenSpaceErrorProgressiveResolution > e._maximumScreenSpaceError;
      t._priorityProgressiveResolutionScreenSpaceErrorLeaf = !1;
      var o = t.parent,
          n = e._maximumScreenSpaceError,
          r = t._screenSpaceErrorProgressiveResolution <= n,
          s = C(o) && o._screenSpaceErrorProgressiveResolution > n;
      return r && s && (i = t._priorityProgressiveResolutionScreenSpaceErrorLeaf = !0), i;
    }(s, this), this.priorityDeferred = function (e, t) {
      var i,
          o,
          n,
          r,
          s,
          u = e._tileset,
          a = t.camera,
          d = e.boundingSphere,
          c = d.radius,
          l = S.multiplyByScalar(a.directionWC, e._centerZDepth, H),
          h = S.add(a.positionWC, l, H),
          m = S.subtract(h, d.center, H);
      c < S.magnitude(m) ? (i = S.normalize(m, H), o = S.multiplyByScalar(i, c, H), n = S.add(d.center, o, H), r = S.subtract(n, a.positionWC, H), s = S.normalize(r, H), e._foveatedFactor = 1 - Math.abs(S.dot(a.directionWC, s))) : e._foveatedFactor = 0;
      var p = e.refine === F.REPLACE,
          _ = u._skipLevelOfDetail;
      if (p && !_ || !u.foveatedScreenSpaceError || 1 === u.foveatedConeSize || e._priorityProgressiveResolution && p && _ || u._pass === M.PRELOAD_FLIGHT || u._pass === M.PRELOAD) return !1;
      var g = 1 - Math.cos(.5 * a.frustum.fov),
          f = u.foveatedConeSize * g;
      if (e._foveatedFactor <= f) return !1;
      var y = g - f,
          V = E.clamp((e._foveatedFactor - f) / y, 0, 1),
          v = u.foveatedInterpolationCallback(u.foveatedMinimumScreenSpaceErrorRelaxation, u.maximumScreenSpaceError, V),
          b = 0 === e._screenSpaceError && C(e.parent) ? .5 * e.parent._screenSpaceError : e._screenSpaceError;
      return u.maximumScreenSpaceError - v <= b;
    }(this, e);
  }, z.prototype.updateExpiration = function () {
    var e;
    C(this.expireDate) && this.contentReady && !this.hasEmptyContent && (e = b.now(G), b.lessThan(this.expireDate, e) && (this._contentState = A.EXPIRED, this._expiredContent = this._content));
  }, z.prototype.requestContent = function () {
    var r = this,
        s = this._tileset;
    if (this.hasEmptyContent) return !1;

    var e = this._contentResource.clone(),
        t = this.contentExpired;

    t && e.setQueryParameters({
      expired: this.expireDate.toString()
    });
    var i,
        o = new P({
      throttle: !0,
      throttleByServer: !0,
      type: B.TILES3D,
      priorityFunction: function priorityFunction() {
        return i._priority;
      },
      serverKey: (i = this)._serverKey
    });
    this._request = o, e.request = o;
    var n = e.fetchArrayBuffer();
    if (!C(n)) return !1;
    var u = this._contentState;
    this._contentState = A.LOADING, this._contentReadyToProcessPromise = q.defer(), this._contentReadyPromise = q.defer(), t && (this.expireDate = void 0);
    var a,
        d = (a = this, function (e) {
      a._contentState = A.FAILED, a._contentReadyPromise.reject(e), a._contentReadyToProcessPromise.reject(e);
    });
    return n.then(function (e) {
      if (!r.isDestroyed()) {
        var t,
            i = new Uint8Array(e),
            o = m(i),
            n = L[o];
        return s._disableSkipLevelOfDetail = s._disableSkipLevelOfDetail || "vctr" === o || "geom" === o, C(n) ? t = n(s, r, r._contentResource, e, 0) : (t = L.json(s, r, r._contentResource, e, 0), r.hasTilesetContent = !0), r._content = t, r._contentState = A.PROCESSING, r._contentReadyToProcessPromise.resolve(t), t.readyPromise.then(function (e) {
          var t, i;
          r.isDestroyed() ? d() : (C((t = r).expireDuration) && (i = b.now(G), b.addSeconds(i, t.expireDuration, i), C(t.expireDate) ? b.lessThan(t.expireDate, i) && b.clone(i, t.expireDate) : t.expireDate = b.clone(i)), r._selectedFrame = 0, r.lastStyleTime = 0, b.now(r._loadTimestamp), r._contentState = A.READY, r._contentReadyPromise.resolve(e));
        });
      }

      d();
    }).otherwise(function (e) {
      return o.state === w.CANCELLED ? (r._contentState = u, --s.statistics.numberOfPendingRequests, void ++s.statistics.numberOfAttemptedRequests) : void d(e);
    }), !0;
  }, z.prototype.unloadContent = function () {
    this.hasEmptyContent || this.hasTilesetContent || (this._content = this._content && this._content.destroy(), this._contentState = A.UNLOADED, this._contentReadyToProcessPromise = void 0, this._contentReadyPromise = void 0, this.lastStyleTime = 0, this.clippingPlanesDirty = 0 === this._clippingPlanesState, this._clippingPlanesState = 0, this._debugColorizeTiles = !1, this._debugBoundingVolume = this._debugBoundingVolume && this._debugBoundingVolume.destroy(), this._debugContentBoundingVolume = this._debugContentBoundingVolume && this._debugContentBoundingVolume.destroy(), this._debugViewerRequestVolume = this._debugViewerRequestVolume && this._debugViewerRequestVolume.destroy());
  };
  var K = new c();

  function u(e, t) {
    var i, o;
    return t.mode === W.SCENE3D || C(e._boundingVolume2D) || (i = e._boundingVolume.boundingSphere, o = c.projectTo2D(i, t.mapProjection, K), e._boundingVolume2D = new U(o.center, o.radius)), t.mode !== W.SCENE3D ? e._boundingVolume2D : e._boundingVolume;
  }

  z.prototype.visibility = function (e, t) {
    var i = e.cullingVolume,
        o = u(this, e),
        n = this._tileset,
        r = n.clippingPlanes;

    if (C(r) && r.enabled) {
      var s = r.computeIntersectionWithBoundingVolume(o, n.clippingPlanesOriginMatrix);
      if (this._isClipped = s !== p.INSIDE, s === p.OUTSIDE) return l.MASK_OUTSIDE;
    }

    return i.computeVisibilityWithPlaneMask(o, t);
  }, z.prototype.contentVisibility = function (e) {
    if (!C(this._contentBoundingVolume)) return p.INSIDE;
    if (this._visibilityPlaneMask === l.MASK_INSIDE) return p.INSIDE;
    var t,
        i,
        o,
        n,
        r = e.cullingVolume,
        s = (t = this, (i = e).mode === W.SCENE3D || C(t._contentBoundingVolume2D) || (o = t._contentBoundingVolume.boundingSphere, n = c.projectTo2D(o, i.mapProjection, K), t._contentBoundingVolume2D = new U(n.center, n.radius)), i.mode !== W.SCENE3D ? t._contentBoundingVolume2D : t._contentBoundingVolume),
        u = this._tileset,
        a = u.clippingPlanes;

    if (C(a) && a.enabled) {
      var d = a.computeIntersectionWithBoundingVolume(s, u.clippingPlanesOriginMatrix);
      if (this._isClipped = d !== p.INSIDE, d === p.OUTSIDE) return p.OUTSIDE;
    }

    return r.computeVisibility(s);
  }, z.prototype.distanceToTile = function (e) {
    return u(this, e).distanceToCamera(e);
  };
  var n = new S();
  z.prototype.distanceToTileCenter = function (e) {
    var t = u(this, e).boundingVolume,
        i = S.subtract(t.center, e.camera.positionWC, n);
    return S.dot(e.camera.directionWC, i);
  }, z.prototype.insideViewerRequestVolume = function (e) {
    var t = this._viewerRequestVolume;
    return !C(t) || 0 === t.distanceToCamera(e);
  };
  var Y = new _(),
      j = new S(),
      Z = new _(),
      J = new S(),
      X = new D(),
      Q = new y(),
      $ = new R();

  function ee(e, t, i, o) {
    if (!R.equalsEpsilon(t, i, E.EPSILON8)) return function (e, t, i, o) {
      var n = D.unpack(e, 0, X),
          r = e[4],
          s = e[5],
          u = y.fromRectangle(n, r, s, h.WGS84, Q),
          a = u.center,
          d = u.halfAxes;
      t = R.multiplyTransformation(t, R.inverseTransformation(i, $), $), a = R.multiplyByPoint(t, a, a);

      var c = R.getRotation(t, Y),
          d = _.multiply(c, d, d);

      return C(o) && o instanceof k ? (o.update(a, d), o) : new k(a, d);
    }(e, t, i, o);
    if (C(o)) return o;
    var n = D.unpack(e, 0, X);
    return new r({
      rectangle: n,
      minimumHeight: e[4],
      maximumHeight: e[5]
    });
  }

  z.prototype.createBoundingVolume = function (e, t, i) {
    if (!C(e)) throw new I("boundingVolume must be defined");
    if (C(e.box)) return o = e.box, n = t, r = i, s = S.fromElements(o[0], o[1], o[2], J), u = _.fromArray(o, 3, Z), s = R.multiplyByPoint(n, s, s), a = R.getRotation(n, Y), u = _.multiply(a, u, u), C(r) ? (r.update(s, u), r) : new k(s, u);
    var o, n, r, s, u, a, d, c, l, h, m, p;
    if (C(e.region)) return ee(e.region, t, this._initialTransform, i);
    if (C(e.sphere)) return d = e.sphere, c = t, l = i, h = S.fromElements(d[0], d[1], d[2], J), m = d[3], h = R.multiplyByPoint(c, h, h), p = R.getScale(c, j), m *= S.maximumComponent(p), C(l) ? (l.update(h, m), l) : new U(h, m);
    throw new I("boundingVolume must contain a sphere, region, or box");
  }, z.prototype.updateTransform = function (e) {
    e = f(e, R.IDENTITY);
    var t,
        i,
        o = R.multiply(e, this.transform, $);
    R.equals(o, this.computedTransform) || (R.clone(o, this.computedTransform), t = this._header, i = this._header.content, this._boundingVolume = this.createBoundingVolume(t.boundingVolume, this.computedTransform, this._boundingVolume), C(this._contentBoundingVolume) && (this._contentBoundingVolume = this.createBoundingVolume(i.boundingVolume, this.computedTransform, this._contentBoundingVolume)), C(this._viewerRequestVolume) && (this._viewerRequestVolume = this.createBoundingVolume(t.viewerRequestVolume, this.computedTransform, this._viewerRequestVolume)), this._debugBoundingVolume = this._debugBoundingVolume && this._debugBoundingVolume.destroy(), this._debugContentBoundingVolume = this._debugContentBoundingVolume && this._debugContentBoundingVolume.destroy(), this._debugViewerRequestVolume = this._debugViewerRequestVolume && this._debugViewerRequestVolume.destroy());
  }, z.prototype.update = function (e, t) {
    var i,
        o,
        n,
        r,
        s,
        u,
        a,
        d,
        c,
        l,
        h,
        m,
        p,
        _ = t.commandList.length;
    i = this, o = e.clippingPlanes, n = 0, C(o) && i._isClipped && o.enabled && (n = o.clippingPlanesState), n !== i._clippingPlanesState && (i._clippingPlanesState = n, i.clippingPlanesDirty = !0), r = this, s = e, (u = t).passes.render && (a = C(r._header.content) && C(r._header.content.boundingVolume), d = r.hasEmptyContent || r.hasTilesetContent, (c = s.debugShowBoundingVolume || s.debugShowContentBoundingVolume && !a) ? (l = r._finalResolution ? d ? v.DARKGRAY : v.WHITE : v.YELLOW, C(r._debugBoundingVolume) || (r._debugBoundingVolume = r._boundingVolume.createDebugVolume(l)), r._debugBoundingVolume.update(u), (h = r._debugBoundingVolume.getGeometryInstanceAttributes("outline")).color = g.toValue(l, h.color)) : !c && C(r._debugBoundingVolume) && (r._debugBoundingVolume = r._debugBoundingVolume.destroy()), s.debugShowContentBoundingVolume && a ? (C(r._debugContentBoundingVolume) || (r._debugContentBoundingVolume = r._contentBoundingVolume.createDebugVolume(v.BLUE)), r._debugContentBoundingVolume.update(u)) : !s.debugShowContentBoundingVolume && C(r._debugContentBoundingVolume) && (r._debugContentBoundingVolume = r._debugContentBoundingVolume.destroy()), s.debugShowViewerRequestVolume && C(r._viewerRequestVolume) ? (C(r._debugViewerRequestVolume) || (r._debugViewerRequestVolume = r._viewerRequestVolume.createDebugVolume(v.YELLOW)), r._debugViewerRequestVolume.update(u)) : !s.debugShowViewerRequestVolume && C(r._debugViewerRequestVolume) && (r._debugViewerRequestVolume = r._debugViewerRequestVolume.destroy()), m = s.debugColorizeTiles && !r._debugColorizeTiles || C(s._heatmap.tilePropertyName), p = !s.debugColorizeTiles && r._debugColorizeTiles, m ? (s._heatmap.colorize(r, u), r._debugColorizeTiles = !0, r.color = r._debugColor) : p && (r._debugColorizeTiles = !1, r.color = v.WHITE), r._colorDirty && (r._colorDirty = !1, r._content.applyDebugSettings(!0, r._color)), p && s.makeStyleDirty()), function (e, t, i) {
      var o = e._content,
          n = e._expiredContent;

      if (C(n)) {
        if (!e.contentReady) return n.update(t, i);
        e._expiredContent.destroy(), e._expiredContent = void 0;
      }

      o.update(t, i);
    }(this, e, t), this._commandsLength = t.commandList.length - _, this.clippingPlanesDirty = !1;
  };
  var s = [];

  function te(e, t, i) {
    var o = e * Math.pow(10, t);
    return parseInt(o) * Math.pow(10, i);
  }

  function ie(e, t, i) {
    return Math.max(E.normalize(e, t, i) - E.EPSILON7, 0);
  }

  return z.prototype.process = function (e, t) {
    var i = t.commandList;
    t.commandList = s, this._content.update(e, t), s.length = 0, t.commandList = i;
  }, z.prototype.updatePriority = function () {
    var e = this.tileset,
        t = e.preferLeaves,
        i = e._minimumPriority,
        o = e._maximumPriority,
        n = Math.pow(10, 8),
        r = Math.pow(10, 9),
        s = Math.pow(10, 10),
        u = ie(this._depth, i.depth, o.depth),
        u = t ? 1 - u : u,
        a = te(!e._skipLevelOfDetail && this.refine === F.REPLACE ? ie(this._priorityHolder._distanceToCamera, i.distance, o.distance) : ie(this._priorityReverseScreenSpaceError, i.reverseScreenSpaceError, o.reverseScreenSpaceError), 4, 0),
        d = this._priorityProgressiveResolution ? 0 : n,
        c = te(ie(this._priorityHolder._foveatedFactor, i.foveatedFactor, o.foveatedFactor), 4, 4),
        l = this.priorityDeferred ? r : 0,
        h = e._pass === M.PRELOAD_FLIGHT ? 0 : s;
    this._priority = u + a + d + c + l + h;
  }, z.prototype.isDestroyed = function () {
    return !1;
  }, z.prototype.destroy = function () {
    return this._content = this._content && this._content.destroy(), this._expiredContent = this._expiredContent && !this._expiredContent.isDestroyed() && this._expiredContent.destroy(), this._debugBoundingVolume = this._debugBoundingVolume && this._debugBoundingVolume.destroy(), this._debugContentBoundingVolume = this._debugContentBoundingVolume && this._debugContentBoundingVolume.destroy(), this._debugViewerRequestVolume = this._debugViewerRequestVolume && this._debugViewerRequestVolume.destroy(), i(this);
  }, z;
});