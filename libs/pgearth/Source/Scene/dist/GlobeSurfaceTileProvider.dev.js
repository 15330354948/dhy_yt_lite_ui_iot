"use strict";

define(["../Core/BoundingSphere", "../Core/BoxOutlineGeometry", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartesian4", "../Core/Cartographic", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Event", "../Core/GeometryInstance", "../Core/GeometryPipeline", "../Core/IndexDatatype", "../Core/Intersect", "../Core/Math", "../Core/Matrix4", "../Core/OrientedBoundingBox", "../Core/OrthographicFrustum", "../Core/PrimitiveType", "../Core/Rectangle", "../Core/SphereOutlineGeometry", "../Core/TerrainMesh", "../Core/TerrainQuantization", "../Core/Visibility", "../Core/WebMercatorProjection", "../Renderer/Buffer", "../Renderer/BufferUsage", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Pass", "../Renderer/RenderState", "../Renderer/VertexArray", "./BlendingState", "./ImageryState", "./TileBoundingRegion", "./TileSelectionResult", "./ClippingPlaneCollection", "./DepthFunction", "./GlobeSurfaceTile", "./ImageryLayer", "./PerInstanceColorAppearance", "./Primitive", "./QuadtreeTileLoadState", "./SceneMode", "./ShadowMode", "./TerrainFillMesh", "./TerrainState", "../extends/core/ExpendUtil"], function (Ve, e, Ge, Ue, We, qe, ze, t, ke, m, je, r, i, Ye, a, n, Qe, Xe, p, Ze, Je, Ke, y, $e, er, o, s, rr, f, tr, ir, ar, nr, or, sr, d, dr, l, C, _, w, u, h, T, lr, c, g, v, ur, hr, cr, E, mr) {
  "use strict";

  function x(e) {
    if (!je(e)) throw new Ye("options is required.");
    if (!je(e.terrainProvider)) throw new Ye("options.terrainProvider is required.");
    if (!je(e.imageryLayers)) throw new Ye("options.imageryLayers is required.");
    if (!je(e.surfaceShaderSet)) throw new Ye("options.surfaceShaderSet is required.");
    this.lightingFadeOutDistance = 65e5, this.lightingFadeInDistance = 9e6, this.hasWaterMask = !1, this.oceanNormalMap = void 0, this.zoomedOutOceanSpecularIntensity = .5, this.enableLighting = !1, this.showGroundAtmosphere = !1, this.shadows = hr.RECEIVE_ONLY, this.fillHighlightColor = void 0, this.hueShift = 0, this.saturationShift = 0, this.brightnessShift = 0, this._quadtree = void 0, this._terrainProvider = e.terrainProvider, this._imageryLayers = e.imageryLayers, this._surfaceShaderSet = e.surfaceShaderSet, this._renderState = void 0, this._blendRenderState = void 0, this._errorEvent = new a(), this._imageryLayers.layerAdded.addEventListener(x.prototype._onLayerAdded, this), this._imageryLayers.layerRemoved.addEventListener(x.prototype._onLayerRemoved, this), this._imageryLayers.layerMoved.addEventListener(x.prototype._onLayerMoved, this), this._imageryLayers.layerShownOrHidden.addEventListener(x.prototype._onLayerShownOrHidden, this), this._imageryLayersUpdatedEvent = new a(), this._layerOrderChanged = !1, this._tilesToRenderByTextureCount = [], this._drawCommands = [], this._uniformMaps = [], this._usedDrawCommands = 0, this._vertexArraysToDestroy = [], this._debug = {
      wireframe: !1,
      boundingSphereTile: void 0
    }, this._baseColor = void 0, this._firstPassInitialColor = void 0, this.baseColor = new ze(0, 0, .5, 1), this._clippingPlanes = void 0, this.cartographicLimitRectangle = er.clone(er.MAX_VALUE), this._hasLoadedTilesThisFrame = !1, this._hasFillTilesThisFrame = !1;
  }

  function S(e, r) {
    var t = e.loadingImagery;
    je(t) || (t = e.readyImagery);
    var i = r.loadingImagery;
    return je(i) || (i = r.readyImagery), t.imageryLayer._layerIndex - i.imageryLayer._layerIndex;
  }

  r(x.prototype, {
    baseColor: {
      get: function get() {
        return this._baseColor;
      },
      set: function set(e) {
        if (!je(e)) throw new Ye("value is required.");
        this._baseColor = e, this._firstPassInitialColor = We.fromColor(e, this._firstPassInitialColor);
      }
    },
    quadtree: {
      get: function get() {
        return this._quadtree;
      },
      set: function set(e) {
        if (!je(e)) throw new Ye("value is required.");
        this._quadtree = e;
      }
    },
    ready: {
      get: function get() {
        return this._terrainProvider.ready && (0 === this._imageryLayers.length || this._imageryLayers.get(0).imageryProvider.ready);
      }
    },
    tilingScheme: {
      get: function get() {
        return this._terrainProvider.tilingScheme;
      }
    },
    errorEvent: {
      get: function get() {
        return this._errorEvent;
      }
    },
    imageryLayersUpdatedEvent: {
      get: function get() {
        return this._imageryLayersUpdatedEvent;
      }
    },
    terrainProvider: {
      get: function get() {
        return this._terrainProvider;
      },
      set: function set(e) {
        if (this._terrainProvider !== e) {
          if (!je(e)) throw new Ye("terrainProvider is required.");
          this._terrainProvider = e, je(this._quadtree) && this._quadtree.invalidateAllTiles();
        }
      }
    },
    clippingPlanes: {
      get: function get() {
        return this._clippingPlanes;
      },
      set: function set(e) {
        u.setOwner(e, this, "_clippingPlanes");
      }
    }
  }), x.prototype.update = function (e) {
    this._imageryLayers._update();
  }, x.prototype.initialize = function (e) {
    this._imageryLayers.queueReprojectionCommands(e), this._layerOrderChanged && (this._layerOrderChanged = !1, this._quadtree.forEachLoadedTile(function (e) {
      e.data.imagery.sort(S);
    })), function (e, r) {
      var t = r.creditDisplay;
      e._terrainProvider.ready && je(e._terrainProvider.credit) && t.addCredit(e._terrainProvider.credit);

      for (var i = e._imageryLayers, a = 0, n = i.length; a < n; ++a) {
        var o = i.get(a).imageryProvider;
        o.ready && je(o.credit) && t.addCredit(o.credit);
      }
    }(this, e);

    for (var r = this._vertexArraysToDestroy, t = r.length, i = 0; i < t; ++i) {
      T._freeVertexArray(r[i]);
    }

    r.length = 0;
  }, x.prototype.beginUpdate = function (e) {
    for (var r = this._tilesToRenderByTextureCount, t = 0, i = r.length; t < i; ++t) {
      var a = r[t];
      je(a) && (a.length = 0);
    }

    var n = this._clippingPlanes;
    je(n) && n.enabled && n.update(e), this._usedDrawCommands = 0, this._hasLoadedTilesThisFrame = !1, this._hasFillTilesThisFrame = !1;
  }, x.prototype.endUpdate = function (e) {
    je(this._renderState) || (this._renderState = d.fromCache({
      cull: {
        enabled: !0
      },
      depthTest: {
        enabled: !0,
        func: h.LESS
      }
    }), this._blendRenderState = d.fromCache({
      cull: {
        enabled: !0
      },
      depthTest: {
        enabled: !0,
        func: h.LESS_OR_EQUAL
      },
      blending: l.ALPHA_BLEND
    })), this._hasFillTilesThisFrame && this._hasLoadedTilesThisFrame && cr.updateFillTiles(this, this._quadtree._tilesToRender, e, this._vertexArraysToDestroy);

    for (var r = this._tilesToRenderByTextureCount, t = 0, i = r.length; t < i; ++t) {
      var a = r[t];
      if (je(a)) for (var n = 0, o = a.length; n < o; ++n) {
        !function (e, r, t) {
          var i = r.data;
          je(i.vertexArray) || (void 0 === i.fill && (i.fill = new cr(r)), i.fill.update(e, t));
          var a = t.creditDisplay,
              n = i.terrainData;
          if (je(n) && je(n.credits)) for (var o = n.credits, s = 0, d = o.length; s < d; ++s) {
            a.addCredit(o[s]);
          }
          var l = nr.maximumTextureImageUnits,
              u = i.waterMaskTexture,
              h = i.waterMaskTranslationAndScale;
          !je(u) && je(i.fill) && (u = i.fill.waterMaskTexture, h = i.fill.waterMaskTranslationAndScale);

          var c,
              m = e.hasWaterMask && je(u),
              g = e.oceanNormalMap,
              p = m && je(g),
              y = e.terrainProvider.ready && e.terrainProvider.hasVertexNormals,
              f = t.fog.enabled,
              v = e.showGroundAtmosphere,
              _ = hr.castShadows(e.shadows),
              T = hr.receiveShadows(e.shadows),
              x = e.hueShift,
              S = e.saturationShift,
              C = e.brightnessShift,
              w = !(Ze.equalsEpsilon(x, 0, Ze.EPSILON7) && Ze.equalsEpsilon(S, 0, Ze.EPSILON7) && Ze.equalsEpsilon(C, 0, Ze.EPSILON7)),
              E = !1;

          {
            var A, L, I;
            v && (A = t.mode, L = t.camera, c = A === ur.SCENE2D || A === ur.COLUMBUS_VIEW ? L.positionCartographic.height : Ue.magnitude(L.positionWC), I = e.nightFadeOutDistance, A !== ur.SCENE3D && (I -= t.mapProjection.ellipsoid.maximumRadius), E = I < c);
          }
          m && --l;
          p && --l;
          var R = i.renderedMesh,
              P = R.center,
              b = R.encoding,
              D = vr,
              M = 0,
              O = 0,
              H = 0,
              B = 0,
              N = !1;
          {
            var F, V, G, U, W, q;
            t.mode !== ur.SCENE3D && (F = t.mapProjection, V = F.project(er.southwest(r.rectangle), Sr), G = F.project(er.northeast(r.rectangle), Cr), D.x = V.x, D.y = V.y, D.z = G.x, D.w = G.y, t.mode !== ur.MORPHING && ((P = Tr).x = 0, P.y = .5 * (D.z + D.x), P.z = .5 * (D.w + D.y), D.x -= P.y, D.y -= P.z, D.z -= P.y, D.w -= P.z), t.mode === ur.SCENE2D && b.quantization === rr.BITS12 && (U = 1 / (Math.pow(2, 12) - 1) * .5, W = (D.z - D.x) * U, q = (D.w - D.y) * U, D.x -= W, D.y -= q, D.z += W, D.w += q), F instanceof tr && (M = r.rectangle.south, O = r.rectangle.north, H = tr.geodeticLatitudeToMercatorAngle(M), B = 1 / (tr.geodeticLatitudeToMercatorAngle(O) - H), N = !0));
          }
          var z = Rr;
          z.frameState = t, z.surfaceTile = i, z.showReflectiveOcean = m, z.showOceanWaves = p, z.enableLighting = e.enableLighting, z.showGroundAtmosphere = v, z.perFragmentGroundAtmosphere = E, z.hasVertexNormals = y, z.useWebMercatorProjection = N, z.clippedByBoundaries = i.clippedByBoundaries;
          var k,
              j,
              Y = i.imagery,
              Q = 0,
              X = Y.length,
              Z = e._renderState,
              J = e._blendRenderState,
              K = Z,
              $ = e._firstPassInitialColor,
              ee = t.context;
          je(e._debug.boundingSphereTile) || Ar();

          do {
            var re,
                te = 0;
            e._drawCommands.length <= e._usedDrawCommands ? ((k = new or()).owner = r, k.cull = !1, k.boundingVolume = new Ve(), k.orientedBoundingBox = void 0, j = function (i, r) {
              return {
                u_initialColor: function u_initialColor() {
                  return this.properties.initialColor;
                },
                u_fillHighlightColor: function u_fillHighlightColor() {
                  return this.properties.fillHighlightColor;
                },
                u_zoomedOutOceanSpecularIntensity: function u_zoomedOutOceanSpecularIntensity() {
                  return this.properties.zoomedOutOceanSpecularIntensity;
                },
                u_oceanNormalMap: function u_oceanNormalMap() {
                  return this.properties.oceanNormalMap;
                },
                u_lightingFadeDistance: function u_lightingFadeDistance() {
                  return this.properties.lightingFadeDistance;
                },
                u_nightFadeDistance: function u_nightFadeDistance() {
                  return this.properties.nightFadeDistance;
                },
                u_center3D: function u_center3D() {
                  return this.properties.center3D;
                },
                u_tileRectangle: function u_tileRectangle() {
                  return this.properties.tileRectangle;
                },
                u_modifiedModelView: function u_modifiedModelView() {
                  var e = i.context.uniformState.view,
                      r = Je.multiplyByPoint(e, this.properties.rtc, xr);
                  return Je.setTranslation(e, r, yr), yr;
                },
                u_modifiedModelViewProjection: function u_modifiedModelViewProjection() {
                  var e = i.context.uniformState.view,
                      r = i.context.uniformState.projection,
                      t = Je.multiplyByPoint(e, this.properties.rtc, xr);
                  return Je.setTranslation(e, t, fr), Je.multiply(r, fr, fr), fr;
                },
                u_dayTextures: function u_dayTextures() {
                  return this.properties.dayTextures;
                },
                u_dayTextureTranslationAndScale: function u_dayTextureTranslationAndScale() {
                  return this.properties.dayTextureTranslationAndScale;
                },
                u_dayTextureTexCoordsRectangle: function u_dayTextureTexCoordsRectangle() {
                  return this.properties.dayTextureTexCoordsRectangle;
                },
                u_dayTextureUseWebMercatorT: function u_dayTextureUseWebMercatorT() {
                  return this.properties.dayTextureUseWebMercatorT;
                },
                u_dayTextureAlpha: function u_dayTextureAlpha() {
                  return this.properties.dayTextureAlpha;
                },
                u_dayTextureBrightness: function u_dayTextureBrightness() {
                  return this.properties.dayTextureBrightness;
                },
                u_dayTextureContrast: function u_dayTextureContrast() {
                  return this.properties.dayTextureContrast;
                },
                u_dayTextureHue: function u_dayTextureHue() {
                  return this.properties.dayTextureHue;
                },
                u_dayTextureSaturation: function u_dayTextureSaturation() {
                  return this.properties.dayTextureSaturation;
                },
                u_dayTextureOneOverGamma: function u_dayTextureOneOverGamma() {
                  return this.properties.dayTextureOneOverGamma;
                },
                u_dayIntensity: function u_dayIntensity() {
                  return this.properties.dayIntensity;
                },
                u_southAndNorthLatitude: function u_southAndNorthLatitude() {
                  return this.properties.southAndNorthLatitude;
                },
                u_southMercatorYAndOneOverHeight: function u_southMercatorYAndOneOverHeight() {
                  return this.properties.southMercatorYAndOneOverHeight;
                },
                u_waterMask: function u_waterMask() {
                  return this.properties.waterMask;
                },
                u_waterMaskTranslationAndScale: function u_waterMaskTranslationAndScale() {
                  return this.properties.waterMaskTranslationAndScale;
                },
                u_minMaxHeight: function u_minMaxHeight() {
                  return this.properties.minMaxHeight;
                },
                u_scaleAndBias: function u_scaleAndBias() {
                  return this.properties.scaleAndBias;
                },
                u_dayTextureSplit: function u_dayTextureSplit() {
                  return this.properties.dayTextureSplit;
                },
                u_dayTextureCutoutRectangles: function u_dayTextureCutoutRectangles() {
                  return this.properties.dayTextureCutoutRectangles;
                },
                u_clippingPlanes: function u_clippingPlanes() {
                  var e = r._clippingPlanes;
                  return je(e) && je(e.texture) ? e.texture : i.context.defaultTexture;
                },
                u_cartographicLimitRectangle: function u_cartographicLimitRectangle() {
                  return this.properties.localizedCartographicLimitRectangle;
                },
                u_clippingPlanesMatrix: function u_clippingPlanesMatrix() {
                  var e = r._clippingPlanes;
                  return je(e) ? Je.multiply(i.context.uniformState.view, e.modelMatrix, Lr) : Je.IDENTITY;
                },
                u_clippingPlanesEdgeStyle: function u_clippingPlanesEdgeStyle() {
                  var e = this.properties.clippingPlanesEdgeColor;
                  return e.alpha = this.properties.clippingPlanesEdgeWidth, e;
                },
                u_minimumBrightness: function u_minimumBrightness() {
                  return i.fog.minimumBrightness;
                },
                u_hsbShift: function u_hsbShift() {
                  return this.properties.hsbShift;
                },
                u_colorsToAlpha: function u_colorsToAlpha() {
                  return this.properties.colorsToAlpha;
                },
                properties: {
                  initialColor: new We(0, 0, .5, 1),
                  fillHighlightColor: new ze(0, 0, 0, 0),
                  zoomedOutOceanSpecularIntensity: .5,
                  oceanNormalMap: void 0,
                  lightingFadeDistance: new Ge(65e5, 9e6),
                  nightFadeDistance: new Ge(1e7, 4e7),
                  hsbShift: new Ue(),
                  center3D: void 0,
                  rtc: new Ue(),
                  modifiedModelView: new Je(),
                  tileRectangle: new We(),
                  dayTextures: [],
                  dayTextureTranslationAndScale: [],
                  dayTextureTexCoordsRectangle: [],
                  dayTextureUseWebMercatorT: [],
                  dayTextureAlpha: [],
                  dayTextureBrightness: [],
                  dayTextureContrast: [],
                  dayTextureHue: [],
                  dayTextureSaturation: [],
                  dayTextureOneOverGamma: [],
                  dayTextureSplit: [],
                  dayTextureCutoutRectangles: [],
                  dayIntensity: 0,
                  colorsToAlpha: [],
                  southAndNorthLatitude: new Ge(),
                  southMercatorYAndOneOverHeight: new Ge(),
                  waterMask: void 0,
                  waterMaskTranslationAndScale: new We(),
                  minMaxHeight: new Ge(),
                  scaleAndBias: new Je(),
                  clippingPlanesEdgeColor: ze.clone(ze.WHITE),
                  clippingPlanesEdgeWidth: 0,
                  localizedCartographicLimitRectangle: new We()
                }
              };
            }(t, e), e._drawCommands.push(k), e._uniformMaps.push(j)) : (k = e._drawCommands[e._usedDrawCommands], j = e._uniformMaps[e._usedDrawCommands]), k.owner = r, ++e._usedDrawCommands, r === e._debug.boundingSphereTile && (re = i.orientedBoundingBox, je(re) ? wr(re, ze.RED).update(t) : je(R) && je(R.boundingSphere3D) && Er(R.boundingSphere3D, ze.RED).update(t));
            var ie = j.properties;
            We.clone($, ie.initialColor), ie.oceanNormalMap = g, ie.lightingFadeDistance.x = e.lightingFadeOutDistance, ie.lightingFadeDistance.y = e.lightingFadeInDistance, ie.nightFadeDistance.x = e.nightFadeOutDistance, ie.nightFadeDistance.y = e.nightFadeInDistance, ie.zoomedOutOceanSpecularIntensity = e.zoomedOutOceanSpecularIntensity;
            var ae = !je(i.vertexArray) && je(e.fillHighlightColor) && 0 < e.fillHighlightColor.alpha;
            ae && ze.clone(e.fillHighlightColor, ie.fillHighlightColor), ie.center3D = R.center, Ue.clone(P, ie.rtc), We.clone(D, ie.tileRectangle), ie.southAndNorthLatitude.x = M, ie.southAndNorthLatitude.y = O, ie.southMercatorYAndOneOverHeight.x = H, ie.southMercatorYAndOneOverHeight.y = B;
            var ne = _r,
                oe = pr(r.rectangle, e.cartographicLimitRectangle);
            Ue.fromElements(x, S, C, ie.hsbShift);
            var se = r.rectangle,
                de = 1 / se.width,
                le = 1 / se.height;
            ne.x = (oe.west - se.west) * de, ne.y = (oe.south - se.south) * le, ne.z = (oe.east - se.west) * de, ne.w = (oe.north - se.south) * le, We.clone(ne, ie.localizedCartographicLimitRectangle);
            var ue = f && Ze.fog(r._distance, t.fog.density) > Ze.EPSILON3;
            w = w && (ue || v);

            for (var he = !1, ce = !1, me = !1, ge = !1, pe = !1, ye = !1, fe = !1, ve = !1, _e = !1; te < l && Q < X;) {
              var Te = Y[Q],
                  xe = Te.readyImagery;

              if (++Q, je(xe) && 0 !== xe.imageryLayer.alpha) {
                var Se = Te.useWebMercatorT ? xe.textureWebMercator : xe.texture;
                if (!je(Se)) throw new Ye("readyImagery is not actually ready!");
                var Ce = xe.imageryLayer;
                je(Te.textureTranslationAndScale) || (Te.textureTranslationAndScale = Ce._calculateTextureTranslationAndScale(r, Te)), ie.dayTextures[te] = Se, ie.dayTextureTranslationAndScale[te] = Te.textureTranslationAndScale, ie.dayTextureTexCoordsRectangle[te] = Te.textureCoordinateRectangle, ie.dayTextureUseWebMercatorT[te] = Te.useWebMercatorT, ie.dayTextureAlpha[te] = Ce.alpha, ye = ye || 1 !== ie.dayTextureAlpha[te], ie.dayTextureBrightness[te] = Ce.brightness, he = he || ie.dayTextureBrightness[te] !== lr.DEFAULT_BRIGHTNESS, ie.dayTextureContrast[te] = Ce.contrast, ce = ce || ie.dayTextureContrast[te] !== lr.DEFAULT_CONTRAST, ie.dayTextureHue[te] = Ce.hue, me = me || ie.dayTextureHue[te] !== lr.DEFAULT_HUE, ie.dayTextureSaturation[te] = Ce.saturation, ge = ge || ie.dayTextureSaturation[te] !== lr.DEFAULT_SATURATION, ie.dayTextureOneOverGamma[te] = 1 / Ce.gamma, pe = pe || ie.dayTextureOneOverGamma[te] !== 1 / lr.DEFAULT_GAMMA, ie.dayTextureSplit[te] = Ce.splitDirection, fe = fe || 0 !== ie.dayTextureSplit[te];
                var we,
                    Ee,
                    Ae = ie.dayTextureCutoutRectangles[te];
                je(Ae) || (Ae = ie.dayTextureCutoutRectangles[te] = new We()), We.clone(We.ZERO, Ae), je(Ce.cutoutRectangle) && (we = pr(se, Ce.cutoutRectangle), Ee = er.simpleIntersection(we, se, gr), ve = je(Ee) || ve, Ae.x = (we.west - se.west) * de, Ae.y = (we.south - se.south) * le, Ae.z = (we.east - se.west) * de, Ae.w = (we.north - se.south) * le);
                var Le = ie.colorsToAlpha[te];
                je(Le) || (Le = ie.colorsToAlpha[te] = new We());
                var Ie,
                    Re = je(Ce.colorToAlpha) && 0 < Ce.colorToAlphaThreshold;
                if (_e = _e || Re, Re ? (Ie = Ce.colorToAlpha, Le.x = Ie.red, Le.y = Ie.green, Le.z = Ie.blue, Le.w = Ce.colorToAlphaThreshold) : Le.w = -1, je(xe.credits)) for (var Pe = xe.credits, be = 0, De = Pe.length; be < De; ++be) {
                  a.addCredit(Pe[be]);
                }
                ++te;
              }
            }

            ie.dayTextures.length = te, ie.waterMask = u, We.clone(h, ie.waterMaskTranslationAndScale), ie.minMaxHeight.x = b.minimumHeight, ie.minMaxHeight.y = b.maximumHeight, Je.clone(b.matrix, ie.scaleAndBias);
            var Me = e._clippingPlanes,
                Oe = je(Me) && Me.enabled && r.isClipped;
            Oe && (ie.clippingPlanesEdgeColor = ze.clone(Me.edgeColor, ie.clippingPlanesEdgeColor), ie.clippingPlanesEdgeWidth = Me.edgeWidth), je(e.uniformMap) && (j = ke(j, e.uniformMap)), z.numberOfDayTextures = te, z.applyBrightness = he, z.applyContrast = ce, z.applyHue = me, z.applySaturation = ge, z.applyGamma = pe, z.applyAlpha = ye, z.applySplit = fe, z.enableFog = ue, z.enableClippingPlanes = Oe, z.clippingPlanes = Me, z.hasImageryLayerCutout = ve, z.colorCorrect = w, z.highlightFillTile = ae, z.colorToAlpha = _e, k.shaderProgram = e._surfaceShaderSet.getShaderProgram(z), k.castShadows = _, k.receiveShadows = T, k.renderState = K, k.primitiveType = $e.TRIANGLES, k.vertexArray = i.vertexArray || i.fill.vertexArray, k.uniformMap = j;
            var He = qe.fromCartesian(t.camera.position).height;
            k.pass = mr.underEarth.enable && He < 4e5 ? sr.TRANSLUCENT : sr.GLOBE, e._debug.wireframe && (function (e, r) {
              var t,
                  i,
                  a = r.data;
              je(a.vertexArray) ? (t = a.mesh, i = a.vertexArray) : je(a.fill) && je(a.fill.vertexArray) && (t = a.fill.mesh, i = a.fill.vertexArray);
              if (!je(t) || !je(i)) return;

              if (je(a.wireframeVertexArray)) {
                if (a.wireframeVertexArray.mesh === t) return;
                a.wireframeVertexArray.destroy(), a.wireframeVertexArray = void 0;
              }

              a.wireframeVertexArray = function (e, r, t) {
                var i = {
                  indices: t.indices,
                  primitiveType: $e.TRIANGLES
                };
                Qe.toWireframe(i);
                var a = i.indices,
                    n = ir.createIndexBuffer({
                  context: e,
                  typedArray: a,
                  usage: ar.STATIC_DRAW,
                  indexDatatype: Xe.fromSizeInBytes(a.BYTES_PER_ELEMENT)
                });
                return new dr({
                  context: e,
                  attributes: r._attributes,
                  indexBuffer: n
                });
              }(e, i, t), a.wireframeVertexArray.mesh = t;
            }(ee, r), je(i.wireframeVertexArray) && (k.vertexArray = i.wireframeVertexArray, k.primitiveType = $e.LINES));
            var Be,
                Ne = k.boundingVolume,
                Fe = k.orientedBoundingBox;
            t.mode !== ur.SCENE3D ? (Be = i.tileBoundingRegion, Ve.fromRectangleWithHeights2D(r.rectangle, t.mapProjection, Be.minimumHeight, Be.maximumHeight, Ne), Ue.fromElements(Ne.center.z, Ne.center.x, Ne.center.y, Ne.center), t.mode === ur.MORPHING && (Ne = Ve.union(R.boundingSphere3D, Ne, Ne))) : (k.boundingVolume = Ve.clone(R.boundingSphere3D, Ne), k.orientedBoundingBox = Ke.clone(i.orientedBoundingBox, Fe)), k.dirty = !0, t.commandList.push(k), K = J, $ = Ir;
          } while (Q < X);
        }(this, a[n], e);
      }
    }
  }, x.prototype.updateForPick = function (e) {
    for (var r = this._drawCommands, t = 0, i = this._usedDrawCommands; t < i; ++t) {
      e.commandList.push(r[t]);
    }
  }, x.prototype.cancelReprojections = function () {
    this._imageryLayers.cancelReprojections();
  }, x.prototype.getLevelMaximumGeometricError = function (e) {
    return this._terrainProvider.getLevelMaximumGeometricError(e);
  }, x.prototype.loadTile = function (e, r) {
    var t,
        i = r.data,
        a = !0;
    je(i) && (a = i.boundingVolumeSourceTile !== r || r._lastSelectionResult === w.CULLED_BUT_NEEDED, t = i.terrainState), T.processStateMachine(r, e, this.terrainProvider, this._imageryLayers, this._vertexArraysToDestroy, a), i = r.data, a && t !== r.data.terrainState && this.computeTileVisibility(r, e, this.quadtree.occluders) && i.boundingVolumeSourceTile === r && (a = !1, T.processStateMachine(r, e, this.terrainProvider, this._imageryLayers, this._vertexArraysToDestroy, a));
  };
  var A = new Ve(),
      gr = new er(),
      L = new er(),
      I = new qe();

  function pr(e, r) {
    if (r.west < r.east) return r;
    var t = er.clone(r, L);
    return 0 < er.center(e, I).longitude ? t.east = Ze.PI : t.west = -Ze.PI, t;
  }

  x.prototype.computeTileVisibility = function (e, r, t) {
    var i = this.computeDistanceToTile(e, r);
    if (e._distance = i, r.fog.enabled && 1 <= Ze.fog(i, r.fog.density)) return f.NONE;
    var a = e.data,
        n = a.tileBoundingRegion;
    if (void 0 === a.boundingVolumeSourceTile) return f.PARTIAL;
    var o = r.cullingVolume,
        s = a.orientedBoundingBox;
    !je(s) && je(a.renderedMesh) && (s = a.renderedMesh.boundingSphere3D), a.clippedByBoundaries = !1;
    var d = pr(e.rectangle, this.cartographicLimitRectangle),
        l = er.simpleIntersection(d, e.rectangle, gr);
    if (!je(l)) return f.NONE;
    er.equals(l, e.rectangle) || (a.clippedByBoundaries = !0), r.mode !== ur.SCENE3D && (s = A, Ve.fromRectangleWithHeights2D(e.rectangle, r.mapProjection, n.minimumHeight, n.maximumHeight, s), Ue.fromElements(s.center.z, s.center.x, s.center.y, s.center), r.mode === ur.MORPHING && je(a.renderedMesh) && (s = Ve.union(a.renderedMesh.boundingSphere3D, s, s)));
    var u = this._clippingPlanes;

    if (je(u) && u.enabled && je(s)) {
      var h = u.computeIntersectionWithBoundingVolume(s);
      if (e.isClipped = h !== p.INSIDE, h === p.OUTSIDE) return f.NONE;
    }

    var c = p.INTERSECTING;
    if (je(s) && (c = o.computeVisibility(s)) === p.OUTSIDE) return f.NONE;
    var m = r.mode === ur.SCENE3D && r.camera.frustum instanceof y;
    if (r.mode !== ur.SCENE3D || m || !je(t)) return c;
    var g = a.occludeePointInScaledSpace;
    return !je(g) || t.ellipsoid.isScaledSpacePointVisible(g) ? c : f.NONE;
  }, x.prototype.canRefine = function (e) {
    return !!je(e.data.terrainData) || void 0 !== this.terrainProvider.getTileDataAvailable(2 * e.x, 2 * e.y, e.level + 1);
  };
  var R = [],
      P = [];

  x.prototype.canRenderWithoutLosingDetail = function (e, r) {
    var t = e.data,
        i = R;
    i.length = this._imageryLayers.length;
    var a,
        n = !1,
        o = !1;

    for (je(t) && (n = t.terrainState === E.READY, o = !0, a = t.imagery), f = 0, v = i.length; f < v; ++f) {
      i[f] = o;
    }

    if (je(a)) for (f = 0, v = a.length; f < v; ++f) {
      var s = a[f],
          d = s.loadingImagery,
          l = !je(d) || d.state === C.FAILED || d.state === C.INVALID,
          u = (s.loadingImagery || s.readyImagery).imageryLayer._layerIndex;
      i[u] = l && i[u];
    }
    var h = this.quadtree._lastSelectionFrameNumber,
        c = P;

    for (c.length = 0, c.push(e.southwestChild, e.southeastChild, e.northwestChild, e.northeastChild); 0 < c.length;) {
      var m = c.pop(),
          g = m._lastSelectionResultFrame === h ? m._lastSelectionResult : w.NONE;

      if (g === w.RENDERED) {
        var p = m.data;
        if (!je(p)) continue;
        if (!n && m.data.terrainState === E.READY) return !1;

        for (var y = m.data.imagery, f = 0, v = y.length; f < v; ++f) {
          var _ = y[f],
              T = _.loadingImagery,
              x = !je(T) || T.state === C.FAILED || T.state === C.INVALID,
              S = (_.loadingImagery || _.readyImagery).imageryLayer._layerIndex;
          if (x && !i[S]) return !1;
        }
      } else g === w.REFINED && c.push(m.southwestChild, m.southeastChild, m.northwestChild, m.northeastChild);
    }

    return !0;
  };

  var b = new Ue();

  x.prototype.computeTileLoadPriority = function (e, r) {
    var t = e.data;
    if (void 0 === t) return 0;
    var i = t.orientedBoundingBox;
    if (void 0 === i) return 0;
    var a = r.camera.positionWC,
        n = r.camera.directionWC,
        o = Ue.subtract(i.center, a, b),
        s = Ue.magnitude(o);
    return s < Ze.EPSILON5 ? 0 : (Ue.divideByScalar(o, s, o), (1 - Ue.dot(o, n)) * e._distance);
  };

  var yr = new Je(),
      fr = new Je(),
      vr = new We(),
      _r = new We(),
      Tr = new Ue(),
      xr = new Ue(),
      Sr = new Ue(),
      Cr = new Ue();

  x.prototype.showTileThisFrame = function (e, r) {
    for (var t = 0, i = e.data.imagery, a = 0, n = i.length; a < n; ++a) {
      var o = i[a];
      je(o.readyImagery) && 0 !== o.readyImagery.imageryLayer.alpha && ++t;
    }

    var s = this._tilesToRenderByTextureCount[t];
    je(s) || (s = [], this._tilesToRenderByTextureCount[t] = s), s.push(e);
    var d = e.data;
    je(d.vertexArray) ? this._hasLoadedTilesThisFrame = !0 : this._hasFillTilesThisFrame = !0;
    var l = this._debug;
    ++l.tilesRendered, l.texturesRendered += t;
  };

  var D = [new Ue(), new Ue(), new Ue(), new Ue()];
  x.prototype.computeDistanceToTile = function (e, r) {
    var t,
        i,
        a,
        n,
        o,
        s,
        d,
        l,
        u,
        h = function (e, r) {
      var t = e.data;
      void 0 === t && (t = e.data = new T());
      void 0 === t.tileBoundingRegion && (t.tileBoundingRegion = new _({
        computeBoundingVolumes: !1,
        rectangle: e.rectangle,
        ellipsoid: e.tilingScheme.ellipsoid,
        minimumHeight: 0,
        maximumHeight: 0
      }));
      var i = t.terrainData,
          a = t.mesh,
          n = t.tileBoundingRegion;
      if (void 0 !== a && void 0 !== a.minimumHeight && void 0 !== a.maximumHeight) return n.minimumHeight = a.minimumHeight, n.maximumHeight = a.maximumHeight, e;
      if (void 0 !== i && void 0 !== i._minimumHeight && void 0 !== i._maximumHeight) return n.minimumHeight = i._minimumHeight * r.terrainExaggeration, n.maximumHeight = i._maximumHeight * r.terrainExaggeration, e;
      n.minimumHeight = Number.NaN, n.maximumHeight = Number.NaN;
      var o = e.parent;

      for (; void 0 !== o;) {
        var s = o.data;

        if (void 0 !== s) {
          var d = s.mesh;
          if (void 0 !== d && void 0 !== d.minimumHeight && void 0 !== d.maximumHeight) return n.minimumHeight = d.minimumHeight, n.maximumHeight = d.maximumHeight, o;
          var l = s.terrainData;
          if (void 0 !== l && void 0 !== l._minimumHeight && void 0 !== l._maximumHeight) return n.minimumHeight = l._minimumHeight * r.terrainExaggeration, n.maximumHeight = l._maximumHeight * r.terrainExaggeration, o;
        }

        o = o.parent;
      }

      return;
    }(e, (this.terrainProvider, r)),
        c = e.data,
        m = c.tileBoundingRegion;

    if (void 0 === h) return 9999999999;
    c.boundingVolumeSourceTile !== h && (c.boundingVolumeSourceTile = h, t = e.rectangle, je(t) && t.width < Ze.PI_OVER_TWO + Ze.EPSILON5 && (c.orientedBoundingBox = Ke.fromRectangle(e.rectangle, m.minimumHeight, m.maximumHeight, e.tilingScheme.ellipsoid, c.orientedBoundingBox), c.occludeePointInScaledSpace = (i = this, a = c.orientedBoundingBox.center, n = e.rectangle, o = m.maximumHeight, s = c.occludeePointInScaledSpace, d = i.quadtree._occluders.ellipsoid, l = d.ellipsoid, u = D, Ue.fromRadians(n.west, n.south, o, l, u[0]), Ue.fromRadians(n.east, n.south, o, l, u[1]), Ue.fromRadians(n.west, n.north, o, l, u[2]), Ue.fromRadians(n.east, n.north, o, l, u[3]), d.computeHorizonCullingPoint(a, u, s))));
    var g,
        p,
        y = m.minimumHeight,
        f = m.maximumHeight;
    c.boundingVolumeSourceTile !== e && (g = r.camera.positionCartographic.height, p = Math.abs(g - y), Math.abs(g - f) < p ? (m.minimumHeight = y, m.maximumHeight = y) : (m.minimumHeight = f, m.maximumHeight = f));
    var v = m.distanceToCamera(r);
    return m.minimumHeight = y, m.maximumHeight = f, v;
  }, x.prototype.isDestroyed = function () {
    return !1;
  }, x.prototype.destroy = function () {
    return this._tileProvider = this._tileProvider && this._tileProvider.destroy(), this._clippingPlanes = this._clippingPlanes && this._clippingPlanes.destroy(), i(this);
  }, x.prototype._onLayerAdded = function (h, e) {
    var c, r, t, i;
    h.show && (c = this._terrainProvider, r = this, t = h.imageryProvider, i = this._imageryLayersUpdatedEvent, t._reload = function () {
      h._imageryCache = {}, r._quadtree.forEachLoadedTile(function (e) {
        if (!je(e._loadedCallbacks[h._layerIndex])) {
          for (var r, d, l, u, t = e.data.imagery, i = t.length, a = -1, n = 0, o = 0; o < i; ++o) {
            var s = t[o];
            if (m(s.readyImagery, s.loadingImagery).imageryLayer === h) -1 === a && (a = o), ++n;else if (-1 !== a) break;
          }

          -1 !== a && (r = a + n, h._createTileImagerySkeletons(e, c, r) && (e._loadedCallbacks[h._layerIndex] = (d = n, l = h, u = c, function (e) {
            for (var r = -1, t = e.data.imagery, i = t.length, a = 0; a < i; ++a) {
              if (o = t[a], (s = m(o.readyImagery, o.loadingImagery)).imageryLayer === l) {
                r = a;
                break;
              }
            }

            if (-1 !== r) {
              var n = r + d,
                  o = t[n],
                  s = je(o) ? m(o.readyImagery, o.loadingImagery) : void 0;
              if (!je(s) || s.imageryLayer !== l) return !l._createTileImagerySkeletons(e, u, n);

              for (a = r; a < n; ++a) {
                t[a].freeResources();
              }

              t.splice(r, d);
            }

            return !0;
          }), e.state = v.LOADING));
        }
      });
    }, this._quadtree.forEachLoadedTile(function (e) {
      h._createTileImagerySkeletons(e, c) && (e.state = v.LOADING, 0 === e.level || e._lastSelectionResultFrame === r.quadtree._lastSelectionFrameNumber && e._lastSelectionResult === w.RENDERED || (e.renderable = !1));
    }), this._layerOrderChanged = !0, i.raiseEvent());
  }, x.prototype._onLayerRemoved = function (d, e) {
    this._quadtree.forEachLoadedTile(function (e) {
      for (var r = e.data.imagery, t = -1, i = 0, a = 0, n = r.length; a < n; ++a) {
        var o = r[a],
            s = o.loadingImagery;
        if (je(s) || (s = o.readyImagery), s.imageryLayer === d) -1 === t && (t = a), o.freeResources(), ++i;else if (-1 !== t) break;
      }

      -1 !== t && r.splice(t, i);
    }), je(d.imageryProvider) && (d.imageryProvider._reload = void 0), this._imageryLayersUpdatedEvent.raiseEvent();
  }, x.prototype._onLayerMoved = function (e, r, t) {
    this._layerOrderChanged = !0, this._imageryLayersUpdatedEvent.raiseEvent();
  }, x.prototype._onLayerShownOrHidden = function (e, r, t) {
    t ? this._onLayerAdded(e, r) : this._onLayerRemoved(e, r);
  };
  var wr,
      Er,
      Ar,
      M,
      O,
      H,
      B,
      N,
      Lr = new Je();

  function F(e) {
    return new g({
      geometryInstances: e,
      appearance: new c({
        translucent: !1,
        flat: !0
      }),
      asynchronous: !1
    });
  }

  H = new n({
    geometry: e.fromDimensions({
      dimensions: new Ue(2, 2, 2)
    })
  }), B = new n({
    geometry: new o({
      radius: 1
    })
  }), N = new Je(), wr = function wr(e, r) {
    return e === M ? O : (Ar(), M = e, N = Je.fromRotationTranslation(e.halfAxes, e.center, N), H.modelMatrix = N, H.attributes.color = t.fromColor(r), O = F(H));
  }, Er = function Er(e, r) {
    return e === M ? O : (Ar(), M = e, N = Je.fromTranslation(e.center, N), N = Je.multiplyByUniformScale(N, e.radius, N), B.modelMatrix = N, B.attributes.color = t.fromColor(r), O = F(B));
  }, Ar = function Ar() {
    je(O) && (O.destroy(), M = O = void 0);
  };
  var Ir = new We(0, 0, 0, 0),
      Rr = {
    frameState: void 0,
    surfaceTile: void 0,
    numberOfDayTextures: void 0,
    applyBrightness: void 0,
    applyContrast: void 0,
    applyHue: void 0,
    applySaturation: void 0,
    applyGamma: void 0,
    applyAlpha: void 0,
    applySplit: void 0,
    showReflectiveOcean: void 0,
    showOceanWaves: void 0,
    enableLighting: void 0,
    showGroundAtmosphere: void 0,
    perFragmentGroundAtmosphere: void 0,
    hasVertexNormals: void 0,
    useWebMercatorProjection: void 0,
    enableFog: void 0,
    enableClippingPlanes: void 0,
    clippingPlanes: void 0,
    clippedByBoundaries: void 0,
    hasImageryLayerCutout: void 0,
    colorCorrect: void 0,
    colorToAlpha: void 0
  };
  return x;
});