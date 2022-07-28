"use strict";

define(["../Core/BoundingSphere", "../Core/buildModuleUrl", "../Core/Cartesian3", "../Core/Cartographic", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/EllipsoidTerrainProvider", "../Core/Event", "../Core/IntersectionTests", "../Core/Ray", "../Core/Rectangle", "../Core/Resource", "../Renderer/ShaderSource", "../Renderer/Texture", "../Shaders/GlobeFS", "../Shaders/GlobeVS", "../Shaders/GroundAtmosphere", "../ThirdParty/when", "./GlobeSurfaceShaderSet", "./GlobeSurfaceTileProvider", "./ImageryLayerCollection", "./QuadtreePrimitive", "./SceneMode", "./ShadowMode", "./TileSelectionResult"], function (m, i, f, e, p, _, t, r, S, a, o, n, v, s, g, h, c, l, d, u, y, C, P, w, M, N, E, D, L) {
  "use strict";

  function R(e) {
    e = p(e, a.WGS84);
    var t = new o({
      ellipsoid: e
    }),
        r = new M();
    this._ellipsoid = e, this._imageryLayerCollection = r, this._surfaceShaderSet = new P(), this._material = void 0, this._surface = new N({
      tileProvider: new w({
        terrainProvider: t,
        imageryLayers: r,
        surfaceShaderSet: this._surfaceShaderSet
      })
    }), this._terrainProvider = t, this._terrainProviderChanged = new n(), b(this), this.show = !0, this._oceanNormalMapResourceDirty = !0, this._oceanNormalMapResource = new h({
      url: i("Assets/Textures/waterNormalsSmall.jpg")
    }), this.maximumScreenSpaceError = 2, this.tileCacheSize = 100, this.loadingDescendantLimit = 20, this.preloadAncestors = !0, this.preloadSiblings = !1, this.fillHighlightColor = void 0, this.enableLighting = !1, this.showGroundAtmosphere = !0, this.lightingFadeOutDistance = 1e7, this.lightingFadeInDistance = 2e7, this.nightFadeOutDistance = 1e7, this.nightFadeInDistance = 5e7, this.showWaterEffect = !0, this.depthTestAgainstTerrain = !1, this.shadows = D.RECEIVE_ONLY, this.atmosphereHueShift = 0, this.atmosphereSaturationShift = 0, this.atmosphereBrightnessShift = 0, this._oceanNormalMap = void 0, this._zoomedOutOceanSpecularIntensity = void 0;
  }

  function b(e) {
    var t = [],
        r = _(e._material) && (e._material.shaderSource.match(/slope/) || e._material.shaderSource.match("normalEC")),
        i = [y];

    !_(e._material) || r && !e._terrainProvider.requestVertexNormals ? e._surface._tileProvider.uniformMap = void 0 : (i.push(e._material.shaderSource), t.push("APPLY_MATERIAL"), e._surface._tileProvider.uniformMap = e._material._uniforms), i.push(d), e._surfaceShaderSet.baseVertexShaderSource = new c({
      sources: [y, u],
      defines: t
    }), e._surfaceShaderSet.baseFragmentShaderSource = new c({
      sources: i,
      defines: t
    }), e._surfaceShaderSet.material = e._material;
  }

  t(R.prototype, {
    ellipsoid: {
      get: function get() {
        return this._ellipsoid;
      }
    },
    imageryLayers: {
      get: function get() {
        return this._imageryLayerCollection;
      }
    },
    imageryLayersUpdatedEvent: {
      get: function get() {
        return this._surface.tileProvider.imageryLayersUpdatedEvent;
      }
    },
    tilesLoaded: {
      get: function get() {
        return !_(this._surface) || this._surface.tileProvider.ready && 0 === this._surface._tileLoadQueueHigh.length && 0 === this._surface._tileLoadQueueMedium.length && 0 === this._surface._tileLoadQueueLow.length;
      }
    },
    baseColor: {
      get: function get() {
        return this._surface.tileProvider.baseColor;
      },
      set: function set(e) {
        this._surface.tileProvider.baseColor = e;
      }
    },
    clippingPlanes: {
      get: function get() {
        return this._surface.tileProvider.clippingPlanes;
      },
      set: function set(e) {
        this._surface.tileProvider.clippingPlanes = e;
      }
    },
    cartographicLimitRectangle: {
      get: function get() {
        return this._surface.tileProvider.cartographicLimitRectangle;
      },
      set: function set(e) {
        _(e) || (e = g.clone(g.MAX_VALUE)), this._surface.tileProvider.cartographicLimitRectangle = e;
      }
    },
    oceanNormalMapUrl: {
      get: function get() {
        return this._oceanNormalMapResource.url;
      },
      set: function set(e) {
        this._oceanNormalMapResource.url = e, this._oceanNormalMapResourceDirty = !0;
      }
    },
    terrainProvider: {
      get: function get() {
        return this._terrainProvider;
      },
      set: function set(e) {
        e !== this._terrainProvider && (this._terrainProvider = e, this._terrainProviderChanged.raiseEvent(e), _(this._material) && b(this));
      }
    },
    terrainProviderChanged: {
      get: function get() {
        return this._terrainProviderChanged;
      }
    },
    tileLoadProgressEvent: {
      get: function get() {
        return this._surface.tileLoadProgressEvent;
      }
    },
    material: {
      get: function get() {
        return this._material;
      },
      set: function set(e) {
        this._material !== e && (this._material = e, b(this));
      }
    }
  });
  var F = [],
      I = {
    start: 0,
    stop: 0
  };

  R.prototype.pickWorldCoordinates = function (e, t, r) {
    if (!_(e)) throw new S("ray is required");
    if (!_(t)) throw new S("scene is required");
    var i = t.mode,
        a = t.mapProjection,
        o = F;
    o.length = 0;

    for (var n, s, h, c = this._surface._tilesToRender, l = c.length, d = 0; d < l; ++d) {
      var u = (n = c[d]).data;

      if (_(u)) {
        var p = u.pickBoundingSphere;
        if (i !== E.SCENE3D) u.pickBoundingSphere = p = m.fromRectangleWithHeights2D(n.rectangle, a, u.tileBoundingRegion.minimumHeight, u.tileBoundingRegion.maximumHeight, p), f.fromElements(p.center.z, p.center.x, p.center.y, p.center);else {
          if (!_(u.renderedMesh)) continue;
          m.clone(u.renderedMesh.boundingSphere3D, p);
        }
        var g = v.raySphere(e, p, I);
        _(g) && o.push(u);
      }
    }

    for (o.sort((s = e.origin, function (e, t) {
      return m.distanceSquaredTo(e.pickBoundingSphere, s) - m.distanceSquaredTo(t.pickBoundingSphere, s);
    })), l = o.length, d = 0; d < l && (h = o[d].pick(e, t.mode, t.mapProjection, !0, r), !_(h)); ++d) {
      ;
    }

    return h;
  };

  var O = new e();

  R.prototype.pick = function (e, t, r) {
    var i;
    return r = this.pickWorldCoordinates(e, t, r), _(r) && t.mode !== E.SCENE3D && (r = f.fromElements(r.y, r.z, r.x, r), i = t.mapProjection.unproject(r, O), r = t.globe.ellipsoid.cartographicToCartesian(i, r)), r;
  };

  var A = new f(),
      T = new f(),
      x = new e(),
      k = new s();

  function H(e, t) {
    return g.contains(e.rectangle, t) ? e : void 0;
  }

  return R.prototype.getHeight = function (e) {
    if (!_(e)) throw new S("cartographic is required");
    var t = this._surface._levelZeroTiles;

    if (_(t)) {
      for (var r, i = t.length, a = 0; a < i && (r = t[a], !g.contains(r.rectangle, e)); ++a) {
        ;
      }

      if (!(i <= a)) {
        for (; r._lastSelectionResult === L.REFINED;) {
          r = H(r.southwestChild, e) || H(r.southeastChild, e) || H(r.northwestChild, e) || r.northeastChild;
        }

        if (_(r.data) && _(r.data.renderedMesh)) {
          var o,
              n,
              s = this._surface._tileProvider.tilingScheme.ellipsoid,
              h = f.fromRadians(e.longitude, e.latitude, 0, s, A),
              c = k,
              l = s.geodeticSurfaceNormal(h, c.direction),
              d = s.getSurfaceNormalIntersectionWithZAxis(h, 11500, c.origin);
          _(d) || (o = Math.min(p(r.data.minimumHeight, 0), -11500), n = f.multiplyByScalar(l, Math.abs(o) + 1, T), f.subtract(h, n, c.origin));
          var u = r.data.pick(c, void 0, void 0, !1, T);
          if (_(u)) return s.cartesianToCartographic(u, x).height;
        }
      }
    }
  }, R.prototype.update = function (e) {
    this.show && e.passes.render && this._surface.update(e);
  }, R.prototype.beginFrame = function (t) {
    var e,
        r,
        i,
        a = this._surface,
        o = a.tileProvider,
        n = this.terrainProvider,
        s = this.showWaterEffect && n.ready && n.hasWaterMask;
    s && this._oceanNormalMapResourceDirty && (this._oceanNormalMapResourceDirty = !1, e = this._oceanNormalMapResource, r = e.url, _(r) ? (i = this, C(e.fetchImage(), function (e) {
      r === i._oceanNormalMapResource.url && (i._oceanNormalMap = i._oceanNormalMap && i._oceanNormalMap.destroy(), i._oceanNormalMap = new l({
        context: t.context,
        source: e
      }));
    })) : this._oceanNormalMap = this._oceanNormalMap && this._oceanNormalMap.destroy());
    var h = t.passes,
        c = t.mode;
    h.render && (this.showGroundAtmosphere ? this._zoomedOutOceanSpecularIntensity = .4 : this._zoomedOutOceanSpecularIntensity = .5, a.maximumScreenSpaceError = this.maximumScreenSpaceError, a.tileCacheSize = this.tileCacheSize, a.loadingDescendantLimit = this.loadingDescendantLimit, a.preloadAncestors = this.preloadAncestors, a.preloadSiblings = this.preloadSiblings, o.terrainProvider = this.terrainProvider, o.lightingFadeOutDistance = this.lightingFadeOutDistance, o.lightingFadeInDistance = this.lightingFadeInDistance, o.nightFadeOutDistance = this.nightFadeOutDistance, o.nightFadeInDistance = this.nightFadeInDistance, o.zoomedOutOceanSpecularIntensity = c === E.SCENE3D ? this._zoomedOutOceanSpecularIntensity : 0, o.hasWaterMask = s, o.oceanNormalMap = this._oceanNormalMap, o.enableLighting = this.enableLighting, o.showGroundAtmosphere = this.showGroundAtmosphere, o.shadows = this.shadows, o.hueShift = this.atmosphereHueShift, o.saturationShift = this.atmosphereSaturationShift, o.brightnessShift = this.atmosphereBrightnessShift, o.fillHighlightColor = this.fillHighlightColor, a.beginFrame(t));
  }, R.prototype.render = function (e) {
    this.show && (_(this._material) && this._material.update(e.context), this._surface.render(e));
  }, R.prototype.endFrame = function (e) {
    this.show && e.passes.render && this._surface.endFrame(e);
  }, R.prototype.isDestroyed = function () {
    return !1;
  }, R.prototype.destroy = function () {
    return this._surfaceShaderSet = this._surfaceShaderSet && this._surfaceShaderSet.destroy(), this._surface = this._surface && this._surface.destroy(), this._oceanNormalMap = this._oceanNormalMap && this._oceanNormalMap.destroy(), r(this);
  }, R;
});