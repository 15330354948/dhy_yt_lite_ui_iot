"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/Credit", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/DeveloperError", "../Core/DoublyLinkedList", "../Core/Ellipsoid", "../Core/Event", "../Core/JulianDate", "../Core/ManagedArray", "../Core/Math", "../Core/Matrix4", "../Core/Resource", "../Core/RuntimeError", "../Core/Transforms", "../Renderer/ClearCommand", "../Renderer/Pass", "../Renderer/RenderState", "../ThirdParty/when", "./Axis", "./PGEarth3DTile", "./PGEarth3DTileColorBlendMode", "./PGEarth3DTileContentState", "./PGEarth3DTileOptimizations", "./PGEarth3DTilePass", "./PGEarth3DTilePassState", "./PGEarth3DTileRefine", "./PGEarth3DTilesetCache", "./PGEarth3DTilesetHeatmap", "./PGEarth3DTilesetMostDetailedTraversal", "./PGEarth3DTilesetStatistics", "./PGEarth3DTilesetTraversal", "./PGEarth3DTileStyleEngine", "./ClippingPlaneCollection", "./LabelCollection", "./PointCloudEyeDomeLighting", "./PointCloudShading", "./SceneMode", "./ShadowMode", "./StencilConstants", "./TileBoundingRegion", "./TileBoundingSphere", "./TileOrientedBoundingBox", "../Core/createGuid", "../DataSources/GeoJsonDataSource"], function (c, y, T, E, m, g, p, b, e, t, n, i, r, s, a, o, l, P, C, h, _, f, v, S, L, D, O, x, w, d, M, A, u, R, U, F, B, V, G, N, k, q, I, W, H, z, X, Q, J, j, Y, K) {
  "use strict";

  function Z(e) {
    e = p(e, p.EMPTY_OBJECT), m.defined("options.url", e.url), this._url = void 0, this._basePath = void 0, this._root = void 0, this._asset = void 0, this._properties = void 0, this._geometricError = void 0, this._extensionsUsed = void 0, this._gltfUpAxis = void 0, this._cache = new U(), this._processingQueue = [], this._selectedTiles = [], this._emptyTiles = [], this._requestedTiles = [], this._selectedTilesToStyle = [], this._loadTimestamp = void 0, this._timeSinceLoad = 0, this._updatedVisibilityFrame = 0, this._extras = void 0, this._credits = void 0, this._cullWithChildrenBounds = p(e.cullWithChildrenBounds, !0), this._allTilesAdditive = !0, this._hasMixedContent = !1, this._stencilClearCommand = void 0, this._backfaceCommands = new l(), this._maximumScreenSpaceError = p(e.maximumScreenSpaceError, 2), this._maximumMemoryUsage = p(e.maximumMemoryUsage, 512), this._styleEngine = new N(), this._modelMatrix = b(e.modelMatrix) ? C.clone(e.modelMatrix) : C.clone(C.IDENTITY), this._statistics = new V(), this._statisticsLast = new V(), this._statisticsPerPass = new Array(A.NUMBER_OF_PASSES);

    for (var t = 0; t < A.NUMBER_OF_PASSES; ++t) {
      this._statisticsPerPass[t] = new V();
    }

    this._requestedTilesInFlight = [], this._maximumPriority = {
      foveatedFactor: -Number.MAX_VALUE,
      depth: -Number.MAX_VALUE,
      distance: -Number.MAX_VALUE,
      reverseScreenSpaceError: -Number.MAX_VALUE
    }, this._minimumPriority = {
      foveatedFactor: Number.MAX_VALUE,
      depth: Number.MAX_VALUE,
      distance: Number.MAX_VALUE,
      reverseScreenSpaceError: Number.MAX_VALUE
    }, this._heatmap = new F(e.debugHeatmapTilePropertyName), this._type = "PGEarth3DTileset", this.cullRequestsWhileMoving = p(e.cullRequestsWhileMoving, !0), this.cullRequestsWhileMovingMultiplier = p(e.cullRequestsWhileMovingMultiplier, 60), this.progressiveResolutionHeightFraction = P.clamp(p(e.progressiveResolutionHeightFraction, .3), 0, .5), this.preferLeaves = p(e.preferLeaves, !1), this._tilesLoaded = !1, this._initialTilesLoaded = !1, this._tileDebugLabels = void 0, this._readyPromise = D.defer(), this._classificationType = e.classificationType, this._ellipsoid = p(e.ellipsoid, s.WGS84), this._initialClippingPlanesOriginMatrix = C.IDENTITY, this._clippingPlanesOriginMatrix = void 0, this._clippingPlanesOriginMatrixDirty = !0, this.preloadWhenHidden = p(e.preloadWhenHidden, !1), this.preloadFlightDestinations = p(e.preloadFlightDestinations, !0), this._pass = void 0, this.dynamicScreenSpaceError = p(e.dynamicScreenSpaceError, !1), this.foveatedScreenSpaceError = p(e.foveatedScreenSpaceError, !0), this._foveatedConeSize = p(e.foveatedConeSize, .1), this._foveatedMinimumScreenSpaceErrorRelaxation = p(e.foveatedMinimumScreenSpaceErrorRelaxation, 0), this.foveatedInterpolationCallback = p(e.foveatedInterpolationCallback, P.lerp), this.foveatedTimeDelay = p(e.foveatedTimeDelay, .2), this.dynamicScreenSpaceErrorDensity = .00278, this.dynamicScreenSpaceErrorFactor = 4, this.dynamicScreenSpaceErrorHeightFalloff = .25, this._dynamicScreenSpaceErrorComputedDensity = 0, this.shadows = p(e.shadows, z.ENABLED), this.show = p(e.show, !0), this.colorBlendMode = w.HIGHLIGHT, this.colorBlendAmount = .5, this.pointCloudShading = new W(e.pointCloudShading), this._pointCloudEyeDomeLighting = new I(), this.loadProgress = new a(), this.allTilesLoaded = new a(), this.initialTilesLoaded = new a(), this.tileLoad = new a(), this.tileUnload = new a(), this.tileFailed = new a(), this.tileVisible = new a(), this.skipLevelOfDetail = p(e.skipLevelOfDetail, !0), this._skipLevelOfDetail = this.skipLevelOfDetail, this._disableSkipLevelOfDetail = !1, this.baseScreenSpaceError = p(e.baseScreenSpaceError, 1024), this.skipScreenSpaceErrorFactor = p(e.skipScreenSpaceErrorFactor, 16), this.skipLevels = p(e.skipLevels, 1), this.immediatelyLoadDesiredLevelOfDetail = p(e.immediatelyLoadDesiredLevelOfDetail, !1), this.loadSiblings = p(e.loadSiblings, !1), this._clippingPlanes = void 0, this.clippingPlanes = e.clippingPlanes, this._imageBasedLightingFactor = new y(1, 1), y.clone(e.imageBasedLightingFactor, this._imageBasedLightingFactor), this.lightColor = e.lightColor, this.luminanceAtZenith = p(e.luminanceAtZenith, .5), this.sphericalHarmonicCoefficients = e.sphericalHarmonicCoefficients, this.specularEnvironmentMaps = e.specularEnvironmentMaps, this.debugFreezeFrame = p(e.debugFreezeFrame, !1), this.debugColorizeTiles = p(e.debugColorizeTiles, !1), this.debugWireframe = p(e.debugWireframe, !1), this.debugShowBoundingVolume = p(e.debugShowBoundingVolume, !1), this.debugShowContentBoundingVolume = p(e.debugShowContentBoundingVolume, !1), this.debugShowViewerRequestVolume = p(e.debugShowViewerRequestVolume, !1), this._tileDebugLabels = void 0, this.debugPickedTileLabelOnly = !1, this.debugPickedTile = void 0, this.debugPickPosition = void 0, this.debugShowGeometricError = p(e.debugShowGeometricError, !1), this.debugShowRenderingStatistics = p(e.debugShowRenderingStatistics, !1), this.debugShowMemoryUsage = p(e.debugShowMemoryUsage, !1), this.debugShowUrl = p(e.debugShowUrl, !1);
    var d,
        u = this,
        r = Y();
    D(e.url).then(function (e) {
      var t = h.createIfNeeded(e);
      return t.setQueryParameters({
        uuid: r
      }), Z.loadJson(t);
    }).then(function (i) {
      D(e.url).then(function (e) {
        var t;
        return (d = h.createIfNeeded(e)).setQueryParameters({
          uuid: r
        }), d = d.getDerivedResource({
          url: i.data
        }), u._credits = d.credits, "json" === d.extension ? t = d.getBaseUri(!0) : d.isDataUri && (t = ""), u._url = d.url, u._basePath = t, Z.loadJson(d);
      }).then(function (e) {
        u._root = u.loadTileset(d, e);
        var t = b(e.asset.gltfUpAxis) ? O.fromName(e.asset.gltfUpAxis) : O.Y,
            i = e.asset;
        u._asset = i, u._properties = e.properties, u._geometricError = e.geometricError, u._extensionsUsed = e.extensionsUsed, u._gltfUpAxis = t, u._extras = e.extras;
        var r = i.extras;

        if (b(r) && b(r.pgEarth) && b(r.pgEarth.credits)) {
          var s = r.pgEarth.credits,
              n = u._credits;
          b(n) || (n = [], u._credits = n);

          for (var a = 0; a < s.length; ++a) {
            var o = s[a];
            n.push(new g(o.html, o.showOnScreen));
          }
        }

        var l = u._root.createBoundingVolume(e.root.boundingVolume, C.IDENTITY).boundingSphere.center,
            h = u._ellipsoid.cartesianToCartographic(l);

        b(h) && h.height > c._defaultMinTerrainHeight && (u._initialClippingPlanesOriginMatrix = f.eastNorthUpToFixedFrame(l)), u._clippingPlanesOriginMatrix = C.clone(u._initialClippingPlanesOriginMatrix), u._readyPromise.resolve(u);
      }).otherwise(function (e) {
        u._readyPromise.reject(e);
      });
    });
  }

  e(Z.prototype, {
    asset: {
      get: function get() {
        if (!this.ready) throw new i("The tileset is not loaded.  Use PGEarth3DTileset.readyPromise or wait for PGEarth3DTileset.ready to be true.");
        return this._asset;
      }
    },
    clippingPlanes: {
      get: function get() {
        return this._clippingPlanes;
      },
      set: function set(e) {
        k.setOwner(e, this, "_clippingPlanes");
      }
    },
    properties: {
      get: function get() {
        if (!this.ready) throw new i("The tileset is not loaded.  Use PGEarth3DTileset.readyPromise or wait for PGEarth3DTileset.ready to be true.");
        return this._properties;
      }
    },
    ready: {
      get: function get() {
        return b(this._root);
      }
    },
    readyPromise: {
      get: function get() {
        return this._readyPromise.promise;
      }
    },
    tilesLoaded: {
      get: function get() {
        return this._tilesLoaded;
      }
    },
    url: {
      get: function get() {
        return this._url;
      }
    },
    basePath: {
      get: function get() {
        return t("PGEarth3DTileset.basePath", "PGEarth3DTileset.basePath has been deprecated. All tiles are relative to the url of the tileset JSON file that contains them. Use the url property instead."), this._basePath;
      }
    },
    style: {
      get: function get() {
        return this._styleEngine.style;
      },
      set: function set(e) {
        this._styleEngine.style = e;
      }
    },
    maximumScreenSpaceError: {
      get: function get() {
        return this._maximumScreenSpaceError;
      },
      set: function set(e) {
        m.typeOf.number.greaterThanOrEquals("maximumScreenSpaceError", e, 0), this._maximumScreenSpaceError = e;
      }
    },
    maximumMemoryUsage: {
      get: function get() {
        return this._maximumMemoryUsage;
      },
      set: function set(e) {
        m.typeOf.number.greaterThanOrEquals("value", e, 0), this._maximumMemoryUsage = e;
      }
    },
    root: {
      get: function get() {
        if (!this.ready) throw new i("The tileset is not loaded.  Use PGEarth3DTileset.readyPromise or wait for PGEarth3DTileset.ready to be true.");
        return this._root;
      }
    },
    boundingSphere: {
      get: function get() {
        if (!this.ready) throw new i("The tileset is not loaded.  Use PGEarth3DTileset.readyPromise or wait for PGEarth3DTileset.ready to be true.");
        return this._root.updateTransform(this._modelMatrix), this._root.boundingSphere;
      }
    },
    modelMatrix: {
      get: function get() {
        return this._modelMatrix;
      },
      set: function set(e) {
        this._modelMatrix = C.clone(e, this._modelMatrix);
      }
    },
    timeSinceLoad: {
      get: function get() {
        return this._timeSinceLoad;
      }
    },
    totalMemoryUsageInBytes: {
      get: function get() {
        var e = this._statistics;
        return e.texturesByteLength + e.geometryByteLength + e.batchTableByteLength;
      }
    },
    clippingPlanesOriginMatrix: {
      get: function get() {
        return b(this._clippingPlanesOriginMatrix) ? (this._clippingPlanesOriginMatrixDirty && (C.multiply(this.root.computedTransform, this._initialClippingPlanesOriginMatrix, this._clippingPlanesOriginMatrix), this._clippingPlanesOriginMatrixDirty = !1), this._clippingPlanesOriginMatrix) : C.IDENTITY;
      }
    },
    styleEngine: {
      get: function get() {
        return this._styleEngine;
      }
    },
    statistics: {
      get: function get() {
        return this._statistics;
      }
    },
    classificationType: {
      get: function get() {
        return this._classificationType;
      }
    },
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    foveatedConeSize: {
      get: function get() {
        return this._foveatedConeSize;
      },
      set: function set(e) {
        m.typeOf.number.greaterThanOrEquals("foveatedConeSize", e, 0), m.typeOf.number.lessThanOrEquals("foveatedConeSize", e, 1), this._foveatedConeSize = e;
      }
    },
    foveatedMinimumScreenSpaceErrorRelaxation: {
      get: function get() {
        return this._foveatedMinimumScreenSpaceErrorRelaxation;
      },
      set: function set(e) {
        m.typeOf.number.greaterThanOrEquals("foveatedMinimumScreenSpaceErrorRelaxation", e, 0), m.typeOf.number.lessThanOrEquals("foveatedMinimumScreenSpaceErrorRelaxation", e, this.maximumScreenSpaceError), this._foveatedMinimumScreenSpaceErrorRelaxation = e;
      }
    },
    extras: {
      get: function get() {
        if (!this.ready) throw new i("The tileset is not loaded.  Use PGEarth3DTileset.readyPromise or wait for PGEarth3DTileset.ready to be true.");
        return this._extras;
      }
    },
    imageBasedLightingFactor: {
      get: function get() {
        return this._imageBasedLightingFactor;
      },
      set: function set(e) {
        m.typeOf.object("imageBasedLightingFactor", e), m.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.x", e.x, 0), m.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.x", e.x, 1), m.typeOf.number.greaterThanOrEquals("imageBasedLightingFactor.y", e.y, 0), m.typeOf.number.lessThanOrEquals("imageBasedLightingFactor.y", e.y, 1), y.clone(e, this._imageBasedLightingFactor);
      }
    }
  }), Z.loadJson = function (e) {
    return h.createIfNeeded(e).fetchJson();
  }, Z.prototype.makeStyleDirty = function () {
    this._styleEngine.makeDirty();
  }, Z.prototype.loadTileset = function (e, t, i) {
    var r = t.asset;
    if (!b(r)) throw new _("Tileset must have an asset property.");
    if ("0.0" !== r.version && "1.0" !== r.version) throw new _("The tileset must be 3D Tiles version 0.0 or 1.0.");
    var s = this._statistics,
        n = r.tilesetVersion;
    b(n) ? (this._basePath += "?v=" + n, e.setQueryParameters({
      v: n
    })) : delete e.queryParameters.v;
    var a = new x(this, e, t.root, i);
    b(i) && (i.children.push(a), a._depth = i._depth + 1);
    var o = [];

    for (o.push(a); 0 < o.length;) {
      var l = o.pop();
      ++s.numberOfTilesTotal, this._allTilesAdditive = this._allTilesAdditive && l.refine === R.ADD;
      var h = l._header.children;
      if (b(h)) for (var d = h.length, u = 0; u < d; ++u) {
        var c = h[u],
            m = new x(this, e, c, l);
        l.children.push(m), m._depth = l._depth + 1, o.push(m);
      }
      this._cullWithChildrenBounds && M.checkChildrenWithinParent(l);
    }

    return a;
  };
  var $ = new T(),
      ee = new E(),
      te = new C(),
      ie = new T(),
      re = new T(),
      se = new T();

  function ne(e, t) {
    var i, r, s, n, a, o, l, h;
    t.hasEmptyContent || (i = e._statistics, r = t.contentExpired, t.requestContent() ? (r && (t.hasTilesetContent ? function (e, t) {
      var i = t,
          r = me;
      r.push(t);

      for (; 0 < r.length;) {
        for (var s = (t = r.pop()).children, n = s.length, a = 0; a < n; ++a) {
          r.push(s[a]);
        }

        t !== i && (function (e, t) {
          e._cache.unloadTile(e, t, ge), t.destroy();
        }(e, t), --e._statistics.numberOfTilesTotal);
      }

      i.children = [];
    }(e, t) : (i.decrementLoadCounts(t.content), --i.numberOfTilesWithContentReady)), ++i.numberOfPendingRequests, e._requestedTilesInFlight.push(t), t.contentReadyToProcessPromise.then((s = e, n = t, function () {
      s._processingQueue.push(n), --s._statistics.numberOfPendingRequests, ++s._statistics.numberOfTilesProcessing;
    })), t.contentReadyPromise.then((l = e, h = t, function () {
      --l._statistics.numberOfTilesProcessing, h.hasTilesetContent || (l._statistics.incrementLoadCounts(h.content), ++l._statistics.numberOfTilesWithContentReady, ++l._statistics.numberOfLoadedTilesTotal, l._cache.add(h)), l.tileLoad.raiseEvent(h);
    })).otherwise((a = e, o = t, function (e) {
      0 <= a._processingQueue.indexOf(o) ? --a._statistics.numberOfTilesProcessing : --a._statistics.numberOfPendingRequests;
      var t = o._contentResource.url,
          i = b(e.message) ? e.message : e.toString();
      0 < a.tileFailed.numberOfListeners ? a.tileFailed.raiseEvent({
        url: t,
        message: i
      }) : (console.log("A 3D tile failed to load: " + t), console.log("Error: " + i));
    }))) : ++i.numberOfAttemptedRequests);
  }

  function ae(e, t) {
    return e._priority - t._priority;
  }

  Z.prototype.postPassesUpdate = function (e) {
    this.ready && (function (e, t) {
      for (var i = e._requestedTilesInFlight, r = 0, s = i.length, n = 0; n < s; ++n) {
        var a = i[n],
            o = 1 <= t.frameNumber - a._touchedFrame;
        a._contentState === d.LOADING ? o ? (a._request.cancel(), ++r) : 0 < r && (i[n - r] = a) : ++r;
      }

      i.length -= r;
    }(this, e), function (e, t) {
      var i = e._statistics,
          r = e._statisticsLast,
          s = i.numberOfPendingRequests,
          n = i.numberOfTilesProcessing,
          a = r.numberOfPendingRequests,
          o = r.numberOfTilesProcessing;
      V.clone(i, r);
      var l = s !== a || n !== o;
      l && t.afterRender.push(function () {
        e.loadProgress.raiseEvent(s, n);
      });
      e._tilesLoaded = 0 === i.numberOfPendingRequests && 0 === i.numberOfTilesProcessing && 0 === i.numberOfAttemptedRequests, l && e._tilesLoaded && (t.afterRender.push(function () {
        e.allTilesLoaded.raiseEvent();
      }), e._initialTilesLoaded || (e._initialTilesLoaded = !0, t.afterRender.push(function () {
        e.initialTilesLoaded.raiseEvent();
      })));
    }(this, e), this._cache.unloadTiles(this, ge));
  }, Z.prototype.prePassesUpdate = function (e) {
    var t;
    this.ready && (function (e, t) {
      !function (e) {
        for (var t = e._processingQueue, i = t.length, r = 0, s = 0; s < i; ++s) {
          var n = t[s];
          n._contentState === d.PROCESSING ? 0 < r && (t[s - r] = n) : ++r;
        }

        t.length -= r;
      }(e);

      for (var i = e._processingQueue, r = i.length, s = 0; s < r; ++s) {
        i[s].process(e, t);
      }
    }(this, e), t = this._clippingPlanes, this._clippingPlanesOriginMatrixDirty = !0, b(t) && t.enabled && t.update(e), b(this._loadTimestamp) || (this._loadTimestamp = o.clone(e.time)), this._timeSinceLoad = Math.max(1e3 * o.secondsDifference(e.time, this._loadTimestamp), 0), this._skipLevelOfDetail = this.skipLevelOfDetail && !b(this._classificationType) && !this._disableSkipLevelOfDetail && !this._allTilesAdditive, this.dynamicScreenSpaceError && function (e, t) {
      var i,
          r,
          s,
          n,
          a,
          o,
          l,
          h,
          d,
          u,
          c,
          m,
          g,
          p = t.camera,
          _ = e._root,
          f = _.contentBoundingVolume;
      f instanceof Q ? (o = T.normalize(p.positionWC, $), l = p.directionWC, h = p.positionCartographic.height, d = f.minimumHeight, u = f.maximumHeight) : (i = C.inverseTransformation(_.computedTransform, te), r = t.mapProjection.ellipsoid, s = f.boundingVolume, n = C.multiplyByPoint(i, s.center, ie), T.magnitude(n) > r.minimumRadius ? (a = E.fromCartesian(n, r, ee), o = T.normalize(p.positionWC, $), l = p.directionWC, h = p.positionCartographic.height, d = 0, u = 2 * a.height) : (c = C.multiplyByPoint(i, p.positionWC, re), o = T.UNIT_Z, l = C.multiplyByPointAsVector(i, p.directionWC, se), l = T.normalize(l, l), h = c.z, f instanceof j ? (m = _._header.boundingVolume.box[11], d = n.z - m, u = n.z + m) : f instanceof J && (g = s.radius, d = n.z - g, u = n.z + g)));
      var y = d + (u - d) * e.dynamicScreenSpaceErrorHeightFalloff,
          b = P.clamp((h - y) / (u - y), 0, 1),
          v = 1 - Math.abs(T.dot(l, o));
      v *= 1 - b;
      var S = e.dynamicScreenSpaceErrorDensity;
      S *= v, e._dynamicScreenSpaceErrorComputedDensity = S;
    }(this, e), e.newFrame && this._cache.reset());
  };
  var oe = new T(),
      le = {
    maximumFractionDigits: 3
  };

  function he(e) {
    var t = e / 1048576;
    return t < 1 ? t.toLocaleString(void 0, le) : Math.round(t).toLocaleString();
  }

  function de(e) {
    var t,
        i = e.boundingVolume.boundingVolume,
        r = i.halfAxes,
        s = i.radius,
        n = T.clone(i.center, oe);
    return b(r) ? (n.x += .75 * (r[0] + r[3] + r[6]), n.y += .75 * (r[1] + r[4] + r[7]), n.z += .75 * (r[2] + r[5] + r[8])) : b(s) && (t = T.normalize(i.center, oe), t = T.multiplyByScalar(t, .75 * s, oe), n = T.add(t, i.center, oe)), n;
  }

  function ue(e, t, i) {
    var r = "",
        s = 0;
    t.debugShowGeometricError && (r += "\nGeometric error: " + e.geometricError, s++), t.debugShowRenderingStatistics && (r += "\nCommands: " + e.commandsLength, s++, 0 < e.content.pointsLength && (r += "\nPoints: " + e.content.pointsLength, s++), 0 < e.content.trianglesLength && (r += "\nTriangles: " + e.content.trianglesLength, s++), r += "\nFeatures: " + e.content.featuresLength, s++), t.debugShowMemoryUsage && (r += "\nTexture Memory: " + he(e.content.texturesByteLength), r += "\nGeometry Memory: " + he(e.content.geometryByteLength), s += 2), t.debugShowUrl && (r += "\nUrl: " + e._header.content.uri, s++);
    var n = {
      text: r.substring(1),
      position: i,
      font: 19 - s + "px sans-serif",
      showBackground: !0,
      disableDepthTestDistance: Number.POSITIVE_INFINITY
    };
    return t._tileDebugLabels.add(n);
  }

  function ce(e, t, i) {
    e._styleEngine.applyStyle(e, t);

    var r,
        s = e._statistics,
        n = t.commandList,
        a = n.length,
        o = e._selectedTiles,
        l = o.length,
        h = e._emptyTiles,
        d = h.length,
        u = e.tileVisible,
        c = e._skipLevelOfDetail && e._hasMixedContent && t.context.stencilBuffer && 0 < l;
    e._backfaceCommands.length = 0, c && (b(e._stencilClearCommand) || (e._stencilClearCommand = new v({
      stencil: 0,
      pass: S.PGEARTH_3D_TILE,
      renderState: L.fromCache({
        stencilMask: X.SKIP_LOD_MASK
      })
    })), n.push(e._stencilClearCommand));

    for (var m = n.length, g = 0; g < l; ++g) {
      r = o[g], i && u.raiseEvent(r), r.update(e, t), s.incrementSelectionCounts(r.content), ++s.selected;
    }

    for (g = 0; g < d; ++g) {
      (r = h[g]).update(e, t);
    }

    var p = n.length - m;

    if (e._backfaceCommands.trim(), c) {
      var _ = e._backfaceCommands.values,
          f = _.length;

      for (n.length += f, g = p - 1; 0 <= g; --g) {
        n[m + f + g] = n[m + g];
      }

      for (g = 0; g < f; ++g) {
        n[m + g] = _[g];
      }
    }

    p = n.length - a, s.numberOfCommands = p, i && e.pointCloudShading.attenuation && e.pointCloudShading.eyeDomeLighting && 0 < p && e._pointCloudEyeDomeLighting.update(t, a, e.pointCloudShading), i && (e.debugShowGeometricError || e.debugShowRenderingStatistics || e.debugShowMemoryUsage || e.debugShowUrl ? (b(e._tileDebugLabels) || (e._tileDebugLabels = new q()), function (e, t) {
      var i,
          r,
          s,
          n = e._selectedTiles,
          a = n.length,
          o = e._emptyTiles,
          l = o.length;

      if (e._tileDebugLabels.removeAll(), e.debugPickedTileLabelOnly) {
        b(e.debugPickedTile) && (s = b(e.debugPickPosition) ? e.debugPickPosition : de(e.debugPickedTile), ue(e.debugPickedTile, e, s).pixelOffset = new y(15, -15));
      } else {
        for (i = 0; i < a; ++i) {
          ue(r = n[i], e, de(r));
        }

        for (i = 0; i < l; ++i) {
          (r = o[i]).hasTilesetContent && ue(r, e, de(r));
        }
      }

      e._tileDebugLabels.update(t);
    }(e, t)) : e._tileDebugLabels = e._tileDebugLabels && e._tileDebugLabels.destroy());
  }

  var me = [];

  function ge(e, t) {
    e.tileUnload.raiseEvent(t), e._statistics.decrementLoadCounts(t.content), --e._statistics.numberOfTilesWithContentReady, t.unloadContent();
  }

  function pe(e, t, i, r) {
    if (t.mode === H.MORPHING) return !1;
    if (!e.ready) return !1;
    var s = e._statistics;
    s.clear();
    var n,
        a = r.isRender;
    ++e._updatedVisibilityFrame, (n = e)._heatmap.resetMinimumMaximum(), n._minimumPriority.depth = Number.MAX_VALUE, n._maximumPriority.depth = -Number.MAX_VALUE, n._minimumPriority.foveatedFactor = Number.MAX_VALUE, n._maximumPriority.foveatedFactor = -Number.MAX_VALUE, n._minimumPriority.distance = Number.MAX_VALUE, n._maximumPriority.distance = -Number.MAX_VALUE, n._minimumPriority.reverseScreenSpaceError = Number.MAX_VALUE, n._maximumPriority.reverseScreenSpaceError = -Number.MAX_VALUE;
    var o = r.traversal.selectTiles(e, t);

    if (r.requestTiles && function (e) {
      var t = e._requestedTiles,
          i = t.length;
      t.sort(ae);

      for (var r = 0; r < i; ++r) {
        ne(e, t[r]);
      }
    }(e), ce(e, t, a), V.clone(s, i), a) {
      var l = e._credits;
      if (b(l) && 0 !== s.selected) for (var h = l.length, d = 0; d < h; ++d) {
        t.creditDisplay.addCredit(l[d]);
      }
    }

    return o;
  }

  return Z.prototype.trimLoadedTiles = function () {
    this._cache.trim();
  }, Z.prototype.update = function (e) {
    this.updateForPass(e, e.tilesetPassState);
  }, Z.prototype.updateForPass = function (e, t) {
    m.typeOf.object("frameState", e), m.typeOf.object("tilesetPassState", t);
    var i,
        r,
        s,
        n,
        a,
        o,
        l,
        h,
        d = t.pass;
    d === A.PRELOAD && (!this.preloadWhenHidden || this.show) || d === A.PRELOAD_FLIGHT && (!this.preloadFlightDestinations || !this.show && !this.preloadWhenHidden) || d === A.REQUEST_RENDER_MODE_DEFER_CHECK && !this.cullRequestsWhileMoving && this.foveatedTimeDelay <= 0 || (i = e.commandList, r = e.camera, s = e.cullingVolume, t.ready = !1, a = (n = A.getPassOptions(d)).ignoreCommands, l = (o = p(t.commandList, i)).length, e.commandList = o, e.camera = p(t.camera, r), e.cullingVolume = p(t.cullingVolume, s), h = this._statisticsPerPass[d], (this.show || a) && (this._pass = d, t.ready = pe(this, e, h, n)), a && (o.length = l), e.commandList = i, e.camera = r, e.cullingVolume = s);
  }, Z.prototype.hasExtension = function (e) {
    return !!b(this._extensionsUsed) && -1 < this._extensionsUsed.indexOf(e);
  }, Z.prototype.isDestroyed = function () {
    return !1;
  }, Z.prototype.destroy = function () {
    if (this._tileDebugLabels = this._tileDebugLabels && this._tileDebugLabels.destroy(), this._clippingPlanes = this._clippingPlanes && this._clippingPlanes.destroy(), b(this._root)) {
      var e = me;

      for (e.push(this._root); 0 < e.length;) {
        var t = e.pop();
        t.destroy();

        for (var i = t.children, r = i.length, s = 0; s < r; ++s) {
          e.push(i[s]);
        }
      }
    }

    return this._root = void 0, n(this);
  }, Z;
});