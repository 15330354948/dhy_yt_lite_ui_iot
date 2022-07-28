"use strict";

define(["../Core/ApproximateTerrainHeights", "../Core/BoundingRectangle", "../Core/BoundingSphere", "../Core/BoxGeometry", "../Core/Cartesian2", "../Core/Cartesian3", "../Core/Cartographic", "../Core/Check", "../Core/Color", "../Core/ColorGeometryInstanceAttribute", "../Core/createGuid", "../Core/CullingVolume", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/EllipsoidGeometry", "../Core/Event", "../Core/GeographicProjection", "../Core/GeometryInstance", "../Core/GeometryPipeline", "../Core/Intersect", "../Core/JulianDate", "../Core/Math", "../Core/Matrix4", "../Core/mergeSort", "../Core/Occluder", "../Core/OrthographicFrustum", "../Core/OrthographicOffCenterFrustum", "../Core/PerspectiveFrustum", "../Core/PerspectiveOffCenterFrustum", "../Core/PixelFormat", "../Core/Ray", "../Core/RequestScheduler", "../Core/ShowGeometryInstanceAttribute", "../Core/TaskProcessor", "../Core/Transforms", "../Renderer/ClearCommand", "../Renderer/ComputeEngine", "../Renderer/Context", "../Renderer/ContextLimits", "../Renderer/DrawCommand", "../Renderer/Framebuffer", "../Renderer/Pass", "../Renderer/PixelDatatype", "../Renderer/RenderState", "../Renderer/ShaderProgram", "../Renderer/ShaderSource", "../Renderer/Texture", "../ThirdParty/when", "./BrdfLutGenerator", "./Camera", "./PGEarth3DTileFeature", "./PGEarth3DTilePass", "./PGEarth3DTilePassState", "./PGEarth3DTileset", "./CreditDisplay", "./DebugCameraPrimitive", "./DepthPlane", "./DerivedCommand", "./DeviceOrientationCameraController", "./Fog", "./FrameState", "./GlobeDepth", "./InvertClassification", "./JobScheduler", "./MapMode2D", "./OctahedralProjectedCubeMap", "./PerformanceDisplay", "./PerInstanceColorAppearance", "./PickDepth", "./PostProcessStageCollection", "./Primitive", "./PrimitiveCollection", "./SceneMode", "./SceneTransforms", "./SceneTransitioner", "./ScreenSpaceCameraController", "./ShadowMap", "./StencilConstants", "./SunPostProcess", "./TweenCollection", "./View", "../Oblique/PGPageLOD/PGPageLODCollection"], function (m, b, e, _, t, S, d, n, C, g, h, r, v, N, i, o, w, D, c, l, y, P, s, p, x, E, u, f, T, F, a, R, L, O, k, A, I, V, M, G, B, W, H, U, j, q, z, Q, K, Y, J, X, Z, $, ee, te, re, ie, oe, se, ne, ae, ue, me, de, he, ce, le, pe, fe, _e, ge, Ce, ve, we, be, Se, De, ye, Pe, xe, Ee, Te, Fe, Re) {
  "use strict";

  function Le(e) {
    return function () {
      e.frameState.afterRender.push(function () {
        e.requestRender();
      });
    };
  }

  function Oe(e, t, r) {
    this.ray = e, this.width = t, this.tilesets = r, this.ready = !1, this.deferred = J.defer(), this.promise = this.deferred.promise;
  }

  function ke(e) {
    var t = (e = v(e, v.EMPTY_OBJECT)).canvas,
        r = e.contextOptions,
        i = e.creditContainer,
        o = e.creditViewport;
    if (!N(t)) throw new w("options and options.canvas are required.");
    var s = N(i),
        n = new B(t, r);
    s || ((i = document.createElement("div")).style.position = "absolute", i.style.bottom = "0", i.style["text-shadow"] = "0 0 2px #000000", i.style.color = "#ffffff", i.style["font-size"] = "10px", i.style["padding-right"] = "5px", t.parentNode.appendChild(i)), N(o) || (o = t.parentNode), this._id = h(), this._jobScheduler = new ce(), this._frameState = new me(n, new ie(i, " • ", o), this._jobScheduler), this._frameState.scene3DOnly = v(e.scene3DOnly, !1), this._removeCreditContainer = !s, this._creditContainer = i, this._canvas = t, this._context = n, this._computeEngine = new G(n), this._globe = void 0, this._primitives = new we(), this._groundPrimitives = new we(), this._mostDetailedRayPicks = [], this._logDepthBuffer = !1, this._logDepthBufferDirty = !0, this._tweens = new Te(), this._pageLODs = new Re(), this._shaderFrameCount = 0, this._sunPostProcess = void 0, this._computeCommandList = [], this._overlayCommandList = [], this._useOIT = v(e.orderIndependentTranslucency, !0), this._executeOITFunction = void 0, this._depthPlane = new se(), this._clearColorCommand = new M({
      color: new C(),
      stencil: 0,
      owner: this
    }), this._depthClearCommand = new M({
      depth: 1,
      owner: this
    }), this._stencilClearCommand = new M({
      stencil: 0
    }), this._classificationStencilClearCommand = new M({
      stencil: 0,
      renderState: z.fromCache({
        stencilMask: xe.CLASSIFICATION_MASK
      })
    }), this._depthOnlyRenderStateCache = {}, this._pickRenderStateCache = {}, this._transitioner = new De(this), this._preUpdate = new c(), this._postUpdate = new c(), this._renderError = new c(), this._preRender = new c(), this._postRender = new c(), this._pickPositionCache = {}, this._pickPositionCacheDirty = !1, this._minimumDisableDepthTestDistance = 0, this.rethrowRenderErrors = !1, this.completeMorphOnUserInput = !0, this.morphStart = new c(), this.morphComplete = new c(), this.skyBox = void 0, this.skyAtmosphere = void 0, this.sun = void 0, this.sunBloom = !0, this._sunBloom = void 0, this.moon = void 0, this.backgroundColor = C.clone(C.BLACK), this._mode = be.SCENE3D, this._mapProjection = N(e.mapProjection) ? e.mapProjection : new l(), this.morphTime = 1, this.farToNearRatio = 1e3, this.logarithmicDepthFarToNearRatio = 1e9, this.nearToFarDistance2D = 175e4, this.debugCommandFilter = void 0, this.debugShowCommands = !1, this.debugShowFrustums = !1, this.debugShowFramesPerSecond = !1, this.debugShowGlobeDepth = !1, this.debugShowDepthFrustum = 1, this.debugShowFrustumPlanes = !1, this._debugShowFrustumPlanes = !1, this._debugFrustumPlanes = void 0, this.useDepthPicking = !0, this.pickTranslucentDepth = !1, this.cameraEventWaitTime = 500, this.fog = new ue(), this._sunCamera = new Z(this), this.shadowMap = new Pe({
      context: n,
      lightCamera: this._sunCamera,
      enabled: v(e.shadows, !1)
    }), this.invertClassification = !1, this.invertClassificationColor = C.clone(C.WHITE), this._actualInvertClassificationColor = C.clone(this._invertClassificationColor), this._invertClassification = new he(), this.focalLength = void 0, this.eyeSeparation = void 0, this.postProcessStages = new Ce(), this._brdfLutGenerator = new X(), this._terrainExaggeration = v(e.terrainExaggeration, 1), this._performanceDisplay = void 0, this._debugVolume = void 0, this._screenSpaceCameraController = new ye(this), this._mapMode2D = v(e.mapMode2D, le.INFINITE_SCROLL), this._environmentState = {
      skyBoxCommand: void 0,
      skyAtmosphereCommand: void 0,
      sunDrawCommand: void 0,
      sunComputeCommand: void 0,
      moonCommand: void 0,
      isSunVisible: !1,
      isMoonVisible: !1,
      isReadyForAtmosphere: !1,
      isSkyAtmosphereVisible: !1,
      clearGlobeDepth: !1,
      useDepthPlane: !1,
      renderTranslucentDepthForPick: !1,
      originalFramebuffer: void 0,
      useGlobeDepthFramebuffer: !1,
      useOIT: !1,
      useInvertClassification: !1,
      usePostProcess: !1,
      usePostProcessSelected: !1,
      useWebVR: !1
    }, this._useWebVR = !1, this._cameraVR = void 0, this._aspectRatioVR = void 0, this._useSingleFrustum = !0, this.requestRenderMode = v(e.requestRenderMode, !1), this._renderRequested = !0, this.maximumRenderTimeChange = v(e.maximumRenderTimeChange, 0), this._lastRenderTime = void 0, this._frameRateMonitor = void 0, this._removeRequestListenerCallback = k.requestCompletedEvent.addEventListener(Le(this)), this._removeTaskProcessorListenerCallback = I.taskCompletedEvent.addEventListener(Le(this)), this._removeGlobeCallbacks = [];
    var a = new b(0, 0, n.drawingBufferWidth, n.drawingBufferHeight),
        u = new Z(this);
    this._logDepthBuffer && (u.frustum.near = .1, u.frustum.far = 1e10);
    var m = new b(0, 0, 1, 1),
        d = new Z(this);
    d.frustum = new T({
      width: .1,
      aspectRatio: 1,
      near: .1
    }), this._pickOffscreenView = new Fe(this, d, m), this.preloadFlightCamera = new Z(this), this.preloadFlightCullingVolume = void 0, this.pickOffscreenDefaultWidth = .1, this._defaultView = new Fe(this, u, a), this._view = this._defaultView, this._hdr = void 0, this._hdrDirty = void 0, this.highDynamicRange = !1, this.gamma = 2.2, this._sunColor = new S(1.8, 1.85, 2), this.sphericalHarmonicCoefficients = void 0, this.specularEnvironmentMaps = void 0, this._specularEnvironmentMapAtlas = void 0, qe(this, 0, p.now()), ze(this), this.initializeFrame();
  }

  function Ae(e, t, r) {
    var i = e._frameState,
        o = e._context,
        s = e._view.oit,
        n = i.shadowState.lightShadowMaps,
        a = i.shadowState.lightShadowsEnabled,
        u = t.derivedCommands;
    N(t.pickId) && (u.picking = ne.createPickDerivedCommand(e, t, o, u.picking)), t.pickOnly || (u.depth = ne.createDepthOnlyDerivedCommand(e, t, o, u.depth)), u.originalCommand = t, e._hdr && (u.hdr = ne.createHdrCommand(t, o, u.hdr), u = (t = u.hdr.command).derivedCommands), a && t.receiveShadows && (u.shadows = Pe.createReceiveDerivedCommand(n, t, r, o, u.shadows)), t.pass === j.TRANSLUCENT && N(s) && s.isSupported() && (a && t.receiveShadows ? (u.oit = N(u.oit) ? u.oit : {}, u.oit.shadows = s.createDerivedCommands(u.shadows.receiveCommand, o, u.oit.shadows)) : u.oit = s.createDerivedCommands(t, o, u.oit));
  }

  i(ke.prototype, {
    canvas: {
      get: function get() {
        return this._canvas;
      }
    },
    drawingBufferHeight: {
      get: function get() {
        return this._context.drawingBufferHeight;
      }
    },
    drawingBufferWidth: {
      get: function get() {
        return this._context.drawingBufferWidth;
      }
    },
    maximumAliasedLineWidth: {
      get: function get() {
        return W.maximumAliasedLineWidth;
      }
    },
    maximumCubeMapSize: {
      get: function get() {
        return W.maximumCubeMapSize;
      }
    },
    pickPositionSupported: {
      get: function get() {
        return this._context.depthTexture;
      }
    },
    sampleHeightSupported: {
      get: function get() {
        return this._context.depthTexture;
      }
    },
    clampToHeightSupported: {
      get: function get() {
        return this._context.depthTexture;
      }
    },
    invertClassificationSupported: {
      get: function get() {
        return this._context.depthTexture;
      }
    },
    globe: {
      get: function get() {
        return this._globe;
      },
      set: function set(e) {
        this._globe = this._globe && this._globe.destroy(), this._globe = e, function (e, t) {
          for (var r = 0; r < e._removeGlobeCallbacks.length; ++r) {
            e._removeGlobeCallbacks[r]();
          }

          e._removeGlobeCallbacks.length = 0;
          var i = [];
          N(t) && (i.push(t.imageryLayersUpdatedEvent.addEventListener(Le(e))), i.push(t.terrainProviderChanged.addEventListener(Le(e)))), e._removeGlobeCallbacks = i;
        }(this, e);
      }
    },
    primitives: {
      get: function get() {
        return this._primitives;
      }
    },
    groundPrimitives: {
      get: function get() {
        return this._groundPrimitives;
      }
    },
    pageLODLayers: {
      get: function get() {
        return this._pageLODs;
      }
    },
    camera: {
      get: function get() {
        return this._view.camera;
      },
      set: function set(e) {
        this._view.camera = e;
      }
    },
    screenSpaceCameraController: {
      get: function get() {
        return this._screenSpaceCameraController;
      }
    },
    mapProjection: {
      get: function get() {
        return this._mapProjection;
      }
    },
    frameState: {
      get: function get() {
        return this._frameState;
      }
    },
    tweens: {
      get: function get() {
        return this._tweens;
      }
    },
    imageryLayers: {
      get: function get() {
        if (N(this.globe)) return this.globe.imageryLayers;
      }
    },
    terrainProvider: {
      get: function get() {
        if (N(this.globe)) return this.globe.terrainProvider;
      },
      set: function set(e) {
        N(this.globe) && (this.globe.terrainProvider = e);
      }
    },
    terrainProviderChanged: {
      get: function get() {
        if (N(this.globe)) return this.globe.terrainProviderChanged;
      }
    },
    preUpdate: {
      get: function get() {
        return this._preUpdate;
      }
    },
    postUpdate: {
      get: function get() {
        return this._postUpdate;
      }
    },
    renderError: {
      get: function get() {
        return this._renderError;
      }
    },
    preRender: {
      get: function get() {
        return this._preRender;
      }
    },
    postRender: {
      get: function get() {
        return this._postRender;
      }
    },
    lastRenderTime: {
      get: function get() {
        return this._lastRenderTime;
      }
    },
    context: {
      get: function get() {
        return this._context;
      }
    },
    debugFrustumStatistics: {
      get: function get() {
        return this._view.debugFrustumStatistics;
      }
    },
    scene3DOnly: {
      get: function get() {
        return this._frameState.scene3DOnly;
      }
    },
    orderIndependentTranslucency: {
      get: function get() {
        return this._useOIT;
      }
    },
    id: {
      get: function get() {
        return this._id;
      }
    },
    mode: {
      get: function get() {
        return this._mode;
      },
      set: function set(e) {
        if (this.scene3DOnly && e !== be.SCENE3D) throw new w("Only SceneMode.SCENE3D is valid when scene3DOnly is true.");
        if (e === be.SCENE2D) this.morphTo2D(0);else if (e === be.SCENE3D) this.morphTo3D(0);else {
          if (e !== be.COLUMBUS_VIEW) throw new w("value must be a valid SceneMode enumeration.");
          this.morphToColumbusView(0);
        }
        this._mode = e;
      }
    },
    frustumCommandsList: {
      get: function get() {
        return this._view.frustumCommandsList;
      }
    },
    numberOfFrustums: {
      get: function get() {
        return this._view.frustumCommandsList.length;
      }
    },
    terrainExaggeration: {
      get: function get() {
        return this._terrainExaggeration;
      }
    },
    useWebVR: {
      get: function get() {
        return this._useWebVR;
      },
      set: function set(e) {
        if (this.camera.frustum instanceof T) throw new w("VR is unsupported with an orthographic projection.");
        this._useWebVR = e, this._useWebVR ? (this._frameState.creditDisplay.container.style.visibility = "hidden", this._cameraVR = new Z(this), N(this._deviceOrientationCameraController) || (this._deviceOrientationCameraController = new ae(this)), this._aspectRatioVR = this.camera.frustum.aspectRatio) : (this._frameState.creditDisplay.container.style.visibility = "visible", this._cameraVR = void 0, this._deviceOrientationCameraController = this._deviceOrientationCameraController && !this._deviceOrientationCameraController.isDestroyed() && this._deviceOrientationCameraController.destroy(), this.camera.frustum.aspectRatio = this._aspectRatioVR, this.camera.frustum.xOffset = 0);
      }
    },
    mapMode2D: {
      get: function get() {
        return this._mapMode2D;
      }
    },
    imagerySplitPosition: {
      get: function get() {
        return this._frameState.imagerySplitPosition;
      },
      set: function set(e) {
        this._frameState.imagerySplitPosition = e;
      }
    },
    minimumDisableDepthTestDistance: {
      get: function get() {
        return this._minimumDisableDepthTestDistance;
      },
      set: function set(e) {
        if (!N(e) || e < 0) throw new w("minimumDisableDepthTestDistance must be greater than or equal to 0.0.");
        this._minimumDisableDepthTestDistance = e;
      }
    },
    logarithmicDepthBuffer: {
      get: function get() {
        return this._logDepthBuffer;
      },
      set: function set(e) {
        e = this._context.fragmentDepth && e, this._logDepthBuffer !== e && (this._logDepthBuffer = e, this._logDepthBufferDirty = !0, this._defaultView.updateFrustums = !0);
      }
    },
    gamma: {
      get: function get() {
        return this._context.uniformState.gamma;
      },
      set: function set(e) {
        this._context.uniformState.gamma = e;
      }
    },
    highDynamicRange: {
      get: function get() {
        return this._hdr;
      },
      set: function set(e) {
        var t = this._context,
            r = e && t.depthTexture && (t.colorBufferFloat || t.colorBufferHalfFloat);
        this._hdrDirty = r !== this._hdr, this._hdr = r;
      }
    },
    highDynamicRangeSupported: {
      get: function get() {
        var e = this._context;
        return e.depthTexture && (e.colorBufferFloat || e.colorBufferHalfFloat);
      }
    },
    sunColor: {
      get: function get() {
        return this._sunColor;
      },
      set: function set(e) {
        this._sunColor = e;
      }
    },
    opaqueFrustumNearOffset: {
      get: function get() {
        return this._frameState.useLogDepth ? .9 : .9999;
      }
    },
    useSingleFrustum: {
      get: function get() {
        return this._useSingleFrustum;
      },
      set: function set(e) {
        (this._useSingleFrustum = e) && (this.camera.frustum.near = 1, this.camera.frustum.far = 5e8);
      }
    }
  }), ke.prototype.getCompressedTextureFormatSupported = function (e) {
    var t = this.context;
    return ("WEBGL_compressed_texture_s3tc" === e || "s3tc" === e) && t.s3tc || ("WEBGL_compressed_texture_pvrtc" === e || "pvrtc" === e) && t.pvrtc || ("WEBGL_compressed_texture_etc1" === e || "etc1" === e) && t.etc1;
  }, ke.prototype.updateDerivedCommands = function (e) {
    var t, r, i, o, s, n, a, u, m, d, h, c, l, p;
    N(e.derivedCommands) && (t = this._frameState, r = this._context, i = !1, o = t.shadowState.lastDirtyTime, e.lastDirtyTime !== o && (e.lastDirtyTime = o, i = e.dirty = !0), s = t.useLogDepth, n = this._hdr, a = e.derivedCommands, u = N(a.logDepth), m = N(a.hdr), d = N(a.originalCommand), h = s && !u, c = n && !m, l = !(s && n || d), e.dirty = e.dirty || h || c || l, e.dirty && (e.dirty = !1, p = t.shadowState.shadowMaps, t.shadowState.shadowsEnabled && e.castShadows && (a.shadows = Pe.createCastDerivedCommand(p, e, i, r, a.shadows)), (u || h) && (a.logDepth = ne.createLogDepthCommand(e, r, a.logDepth), Ae(this, a.logDepth.command, i)), (d || l) && Ae(this, e, i)));
  };
  var Ie,
      Ve = new te({
    pass: ee.MOST_DETAILED_PRELOAD
  }),
      Me = new te({
    pass: ee.MOST_DETAILED_PICK
  }),
      Ne = new te({
    pass: ee.RENDER
  }),
      Ge = new te({
    pass: ee.PICK
  }),
      Be = new te({
    pass: ee.PRELOAD
  }),
      We = new te({
    pass: ee.PRELOAD_FLIGHT
  }),
      He = new te({
    pass: ee.REQUEST_RENDER_MODE_DEFER_CHECK
  }),
      Ue = new e();

  function je(e) {
    e.render = !1, e.pick = !1, e.depth = !1, e.postProcess = !1, e.offscreen = !1;
  }

  function qe(e, t, r) {
    var i = e._frameState;
    i.frameNumber = t, i.time = p.clone(r, i.time);
  }

  function ze(e) {
    var t,
        r,
        i,
        o,
        s,
        n,
        a = e.camera;
    e.useSingleFrustum && (t = Math.abs(a.positionCartographic.height), N(e.globe) && (r = e.globe.getHeight(a.positionCartographic), N(r) && (t = Math.abs(a.positionCartographic.height - r))), i = t / 100 * .05, .05 < (i *= i) && (i = .05), (o = i * t) < 1 && (o = 1), a.frustum.near = o, n = (s = S.magnitude(a.positionWC)) - a.positionCartographic.height, Math.sqrt(s * s - n * n), a.frustum.far = 1e8);
    var u = e._frameState;
    u.commandList.length = 0, u.shadowMaps.length = 0, u.brdfLutGenerator = e._brdfLutGenerator, u.environmentMap = e.skyBox && e.skyBox._cubeMap, u.mode = e._mode, u.morphTime = e.morphTime, u.mapProjection = e.mapProjection, u.camera = a, u.cullingVolume = a.frustum.computeCullingVolume(a.positionWC, a.directionWC, a.upWC), u.occluder = function (e) {
      var t = e.globe;

      if (e._mode === be.SCENE3D && N(t) && t.show) {
        var r = t.ellipsoid;
        return Ue.radius = r.minimumRadius, Ie = f.fromBoundingSphere(Ue, e.camera.positionWC, Ie);
      }
    }(e), u.terrainExaggeration = e._terrainExaggeration, u.minimumDisableDepthTestDistance = e._minimumDisableDepthTestDistance, u.invertClassification = e.invertClassification, u.useLogDepth = e._logDepthBuffer && !(e.camera.frustum instanceof T || e.camera.frustum instanceof F), u.sunColor = e._sunColor, N(e._specularEnvironmentMapAtlas) && e._specularEnvironmentMapAtlas.ready ? (u.specularEnvironmentMaps = e._specularEnvironmentMapAtlas.texture, u.specularEnvironmentMapsMaximumLOD = e._specularEnvironmentMapAtlas.maximumMipmapLevel) : (u.specularEnvironmentMaps = void 0, u.specularEnvironmentMapsMaximumLOD = void 0), u.sphericalHarmonicCoefficients = e.sphericalHarmonicCoefficients, e._actualInvertClassificationColor = C.clone(e.invertClassificationColor, e._actualInvertClassificationColor), he.isTranslucencySupported(e._context) || (e._actualInvertClassificationColor.alpha = 1), u.invertClassificationColor = e._actualInvertClassificationColor, N(e.globe) ? u.maximumScreenSpaceError = e.globe.maximumScreenSpaceError : u.maximumScreenSpaceError = 2, je(u.passes), u.tilesetPassState = void 0;
  }

  var Qe = new r();

  function Ke(e, t, r) {
    var i = t.context,
        o = v(r, e.shaderProgram),
        s = o.fragmentShaderSource.clone(),
        n = [];
    s.sources = s.sources.map(function (e) {
      e = K.replaceMain(e, "czm_Debug_main");

      for (var t, r = /gl_FragData\[(\d+)\]/g; null !== (t = r.exec(e));) {
        -1 === n.indexOf(t[1]) && n.push(t[1]);
      }

      return e;
    });
    var a,
        u = n.length,
        m = "void main() \n{ \n    czm_Debug_main(); \n";

    if (t.debugShowCommands) {
      N(e._debugColor) || (e._debugColor = C.fromRandom());
      var d = e._debugColor;
      if (0 < u) for (a = 0; a < u; ++a) {
        m += "    gl_FragData[" + n[a] + "].rgb *= vec3(" + d.red + ", " + d.green + ", " + d.blue + "); \n";
      } else m += "    gl_FragColor.rgb *= vec3(" + d.red + ", " + d.green + ", " + d.blue + "); \n";
    }

    if (t.debugShowFrustums) {
      var h = 1 & e.debugOverlappingFrustums ? "1.0" : "0.0",
          c = 2 & e.debugOverlappingFrustums ? "1.0" : "0.0",
          l = 4 & e.debugOverlappingFrustums ? "1.0" : "0.0";
      if (0 < u) for (a = 0; a < u; ++a) {
        m += "    gl_FragData[" + n[a] + "].rgb *= vec3(" + h + ", " + c + ", " + l + "); \n";
      } else m += "    gl_FragColor.rgb *= vec3(" + h + ", " + c + ", " + l + "); \n";
    }

    m += "}", s.sources.push(m);

    var p = function (e) {
      var t = {},
          r = e.vertexAttributes;

      for (var i in r) {
        r.hasOwnProperty(i) && (t[i] = r[i].index);
      }

      return t;
    }(o);

    return Q.fromCache({
      context: i,
      vertexShaderSource: o.vertexShaderSource,
      fragmentShaderSource: s,
      attributeLocations: p
    });
  }

  ke.prototype.isVisible = function (e, t, r) {
    return N(e) && (!N(e.boundingVolume) || !e.cull || t.computeVisibility(e.boundingVolume) !== s.OUTSIDE && (!N(r) || !e.occlude || !e.boundingVolume.isOccluded(r)));
  };

  var Ye = new E(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1);

  function Je(e, t, r, i, o) {
    var s = t._frameState;
    if (!N(t.debugCommandFilter) || t.debugCommandFilter(e)) if (e instanceof M) e.execute(r, i);else {
      e.debugShowBoundingVolume && N(e.boundingVolume) && function (e, t, r, i) {
        var o = t._frameState,
            s = o.context,
            n = e.boundingVolume;
        N(t._debugVolume) && t._debugVolume.destroy();
        var a,
            u,
            m,
            d,
            h,
            c = S.clone(n.center);
        o.mode !== be.SCENE3D && (c = E.multiplyByPoint(Ye, c, c), u = (a = o.mapProjection).unproject(c), c = a.ellipsoid.cartographicToCartesian(u)), N(n.radius) ? (m = n.radius, d = P.toWireframe(D.createGeometry(new D({
          radii: new S(m, m, m),
          vertexFormat: _e.FLAT_VERTEX_FORMAT
        }))), t._debugVolume = new ve({
          geometryInstances: new y({
            geometry: d,
            modelMatrix: E.fromTranslation(c),
            attributes: {
              color: new g(1, 0, 0, 1)
            }
          }),
          appearance: new _e({
            flat: !0,
            translucent: !1
          }),
          asynchronous: !1
        })) : (h = n.halfAxes, d = P.toWireframe(_.createGeometry(_.fromDimensions({
          dimensions: new S(2, 2, 2),
          vertexFormat: _e.FLAT_VERTEX_FORMAT
        }))), t._debugVolume = new ve({
          geometryInstances: new y({
            geometry: d,
            modelMatrix: E.fromRotationTranslation(h, c, new E()),
            attributes: {
              color: new g(1, 0, 0, 1)
            }
          }),
          appearance: new _e({
            flat: !0,
            translucent: !1
          }),
          asynchronous: !1
        }));
        var l,
            p = o.commandList,
            f = o.commandList = [];
        t._debugVolume.update(o), e = f[0], o.useLogDepth && (e = ne.createLogDepthCommand(e, s).command), N(i) && (l = r.framebuffer, r.framebuffer = i), e.execute(s, r), N(l) && (r.framebuffer = l), o.commandList = p;
      }(e, t, i, o), s.useLogDepth && N(e.derivedCommands.logDepth) && (e = e.derivedCommands.logDepth.command);
      var n,
          a,
          u,
          m,
          d = s.passes;

      if (!d.pick && t._hdr && N(e.derivedCommands) && N(e.derivedCommands.hdr) && (e = e.derivedCommands.hdr.command), d.pick || d.depth) {
        if (d.pick && !d.depth && N(e.derivedCommands.picking)) return void (e = e.derivedCommands.picking.pickCommand).execute(r, i);
        if (N(e.derivedCommands.depth)) return void (e = e.derivedCommands.depth.depthOnlyCommand).execute(r, i);
      }

      if (t.debugShowCommands || t.debugShowFrustums) return n = e, a = t, u = i, (m = H.shallowClone(n)).shaderProgram = Ke(n, a), m.execute(a.context, u), void m.shaderProgram.destroy();
      s.shadowState.lightShadowsEnabled && e.receiveShadows && N(e.derivedCommands.shadows) ? e.derivedCommands.shadows.receiveCommand.execute(r, i) : e.execute(r, i);
    }
  }

  function Xe(e, t, r, i) {
    var o = t._frameState,
        s = e.derivedCommands;
    N(s) && (o.useLogDepth && N(s.logDepth) && (e = s.logDepth.command), s = e.derivedCommands, N(s.picking) ? (e = s.picking.pickCommand).execute(r, i) : N(s.depth) && (e = s.depth.depthOnlyCommand).execute(r, i));
  }

  function Ze(e, t, r) {
    return t.boundingVolume.distanceSquaredTo(r) - e.boundingVolume.distanceSquaredTo(r);
  }

  function $e(e, t, r) {
    return e.boundingVolume.distanceSquaredTo(r) - t.boundingVolume.distanceSquaredTo(r) + x.EPSILON12;
  }

  function et(e, t, r, i, o) {
    var s = e.context;
    u(i, Ze, e.camera.positionWC), N(o) && t(o.unclassifiedCommand, e, s, r);

    for (var n = i.length, a = 0; a < n; ++a) {
      t(i[a], e, s, r);
    }
  }

  function tt(e, t, r, i, o) {
    var s = e.context;
    u(i, $e, e.camera.positionWC), N(o) && t(o.unclassifiedCommand, e, s, r);

    for (var n = i.length, a = 0; a < n; ++a) {
      t(i[a], e, s, r);
    }
  }

  function rt(e, t) {
    var r = e._view.debugGlobeDepths,
        i = r[t];
    return !N(i) && e.context.depthTexture && (i = new de(), r[t] = i), i;
  }

  function it(e, t) {
    var r = e._view.pickDepths,
        i = r[t];
    return N(i) || (i = new ge(), r[t] = i), i;
  }

  Ye = E.inverseTransformation(Ye, Ye);
  var ot = new a(),
      st = new R(),
      nt = new T(),
      at = new F();

  function ut(e, t) {
    var r,
        i = e.camera,
        o = e.context,
        s = o.uniformState;
    s.updateCamera(i), (r = N(i.frustum.fov) ? i.frustum.clone(ot) : N(i.frustum.infiniteProjectionMatrix) ? i.frustum.clone(st) : N(i.frustum.width) ? i.frustum.clone(nt) : i.frustum.clone(at)).near = i.frustum.near, r.far = i.frustum.far, s.updateFrustum(r), s.updatePass(j.ENVIRONMENT);
    var n,
        a,
        u,
        m = e._frameState.passes,
        d = m.pick,
        h = e._environmentState,
        c = e._view,
        l = h.renderTranslucentDepthForPick,
        p = h.useWebVR;
    d || (n = h.skyBoxCommand, N(n) && Je(n, e, o, t), h.isSkyAtmosphereVisible && Je(h.skyAtmosphereCommand, e, o, t), h.isSunVisible && (h.sunDrawCommand.execute(o, t), e.sunBloom && !p && (a = h.useGlobeDepthFramebuffer ? c.globeDepth.framebuffer : h.usePostProcess ? c.sceneFramebuffer.getFramebuffer() : h.originalFramebuffer, e._sunPostProcess.execute(o), e._sunPostProcess.copy(o, a), t.framebuffer = a)), h.isMoonVisible && h.moonCommand.execute(o, t)), u = h.useOIT ? (N(e._executeOITFunction) || (e._executeOITFunction = function (e, t, r, i, o) {
      c.oit.executeCommands(e, t, r, i, o);
    }), e._executeOITFunction) : m.render ? et : tt;

    for (var f = h.clearGlobeDepth, _ = h.useDepthPlane, g = e._depthClearCommand, C = e._stencilClearCommand, v = e._classificationStencilClearCommand, w = e._depthPlane, b = h.usePostProcessSelected, S = i.position.z, D = c.frustumCommandsList, y = D.length, P = i.workingFrustums.length = 0; P < y; ++P) {
      var x = y - P - 1,
          E = D[x];
      e.mode === be.SCENE2D ? (i.position.z = S - E.near + 1, r.far = Math.max(1, E.far - E.near), r.near = 1, s.update(e.frameState)) : (r.near = 0 != x ? E.near * e.opaqueFrustumNearOffset : E.near, r.far = E.far), s.updateFrustum(r), i.workingFrustums[x] = r.clone();
      var T,
          F = e.debugShowGlobeDepth ? rt(e, x) : c.globeDepth;
      e.debugShowGlobeDepth && N(F) && h.useGlobeDepthFramebuffer && (F.update(o, t, c.viewport), F.clear(o, t, e._clearColorCommand.color), T = t.framebuffer, t.framebuffer = F.framebuffer), g.execute(o, t), o.stencilBuffer && C.execute(o, t), s.updatePass(j.GLOBE);

      for (var R, L, O, k = E.commands[j.GLOBE], A = E.indices[j.GLOBE], I = 0; I < A; ++I) {
        Je(k[I], e, o, t);
      }

      for (N(F) && h.useGlobeDepthFramebuffer && F.executeCopyDepth(o, t), e.debugShowGlobeDepth && N(F) && h.useGlobeDepthFramebuffer && (t.framebuffer = T), s.updatePass(j.TERRAIN_CLASSIFICATION), k = E.commands[j.TERRAIN_CLASSIFICATION], A = E.indices[j.TERRAIN_CLASSIFICATION], I = 0; I < A; ++I) {
        Je(k[I], e, o, t);
      }

      if (f && (g.execute(o, t), _ && w.execute(o, t)), !h.useInvertClassification || d) {
        for (s.updatePass(j.PGEARTH_3D_TILE), k = E.commands[j.PGEARTH_3D_TILE], A = E.indices[j.PGEARTH_3D_TILE], I = 0; I < A; ++I) {
          Je(k[I], e, o, t);
        }

        if (0 < A) for (N(F) && h.useGlobeDepthFramebuffer && F.executeUpdateDepth(o, t, f), s.updatePass(j.PGEARTH_3D_TILE_CLASSIFICATION), k = E.commands[j.PGEARTH_3D_TILE_CLASSIFICATION], A = E.indices[j.PGEARTH_3D_TILE_CLASSIFICATION], I = 0; I < A; ++I) {
          Je(k[I], e, o, t);
        }
      } else {
        e._invertClassification.clear(o, t);

        var V = t.framebuffer;

        for (t.framebuffer = e._invertClassification._fbo, s.updatePass(j.PGEARTH_3D_TILE), k = E.commands[j.PGEARTH_3D_TILE], A = E.indices[j.PGEARTH_3D_TILE], I = 0; I < A; ++I) {
          Je(k[I], e, o, t);
        }

        for (N(F) && h.useGlobeDepthFramebuffer && F.executeUpdateDepth(o, t, f), s.updatePass(j.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW), k = E.commands[j.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW], A = E.indices[j.PGEARTH_3D_TILE_CLASSIFICATION_IGNORE_SHOW], I = 0; I < A; ++I) {
          Je(k[I], e, o, t);
        }

        for (t.framebuffer = V, e._invertClassification.executeClassified(o, t), 1 === e.frameState.invertClassificationColor.alpha && e._invertClassification.executeUnclassified(o, t), 0 < A && o.stencilBuffer && v.execute(o, t), s.updatePass(j.PGEARTH_3D_TILE_CLASSIFICATION), k = E.commands[j.PGEARTH_3D_TILE_CLASSIFICATION], A = E.indices[j.PGEARTH_3D_TILE_CLASSIFICATION], I = 0; I < A; ++I) {
          Je(k[I], e, o, t);
        }
      }

      for (0 < A && o.stencilBuffer && C.execute(o, t), s.updatePass(j.OPAQUE), k = E.commands[j.OPAQUE], A = E.indices[j.OPAQUE], I = 0; I < A; ++I) {
        Je(k[I], e, o, t);
      }

      if (0 != x && e.mode !== be.SCENE2D && (r.near = E.near, s.updateFrustum(r)), !d && h.useInvertClassification && e.frameState.invertClassificationColor.alpha < 1 && (R = e._invertClassification), s.updatePass(j.TRANSLUCENT), (k = E.commands[j.TRANSLUCENT]).length = E.indices[j.TRANSLUCENT], u(e, Je, t, k, R), o.depthTexture && e.useDepthPicking && (h.useGlobeDepthFramebuffer || l) && (L = l ? t.framebuffer.depthStencilTexture : F.framebuffer.depthStencilTexture, (O = it(e, x)).update(o, L), O.executeCopyDepth(o, t)), !d && b) {
        var M = t.framebuffer;

        for (t.framebuffer = c.sceneFramebuffer.getIdFramebuffer(), r.near = 0 != x ? E.near * e.opaqueFrustumNearOffset : E.near, r.far = E.far, s.updateFrustum(r), s.updatePass(j.GLOBE), k = E.commands[j.GLOBE], A = E.indices[j.GLOBE], I = 0; I < A; ++I) {
          Xe(k[I], e, o, t);
        }

        for (f && (g.framebuffer = t.framebuffer, g.execute(o, t), g.framebuffer = void 0), f && _ && w.execute(o, t), s.updatePass(j.PGEARTH_3D_TILE), k = E.commands[j.PGEARTH_3D_TILE], A = E.indices[j.PGEARTH_3D_TILE], I = 0; I < A; ++I) {
          Xe(k[I], e, o, t);
        }

        for (s.updatePass(j.OPAQUE), k = E.commands[j.OPAQUE], A = E.indices[j.OPAQUE], I = 0; I < A; ++I) {
          Xe(k[I], e, o, t);
        }

        for (s.updatePass(j.TRANSLUCENT), k = E.commands[j.TRANSLUCENT], A = E.indices[j.TRANSLUCENT], I = 0; I < A; ++I) {
          Xe(k[I], e, o, t);
        }

        t.framebuffer = M;
      }
    }
  }

  function mt(e) {
    e.context.uniformState.updatePass(j.COMPUTE);
    var t = e._environmentState.sunComputeCommand;
    N(t) && t.execute(e._computeEngine);

    for (var r = e._computeCommandList, i = r.length, o = 0; o < i; ++o) {
      r[o].execute(e._computeEngine);
    }
  }

  function dt(e) {
    var t = e.frameState,
        r = t.shadowState.shadowMaps,
        i = r.length;
    if (t.shadowState.shadowsEnabled) for (var o = e.context, s = o.uniformState, n = 0; n < i; ++n) {
      var a = r[n];

      if (!a.outOfView) {
        for (var u = a.passes, m = u.length, d = 0; d < m; ++d) {
          u[d].commandList.length = 0;
        }

        for (!function (e, t, r) {
          for (var i = r.shadowMapCullingVolume, o = r.isPointLight, s = r.passes, n = s.length, a = t.length, u = 0; u < a; ++u) {
            var m = t[u];
            if (e.updateDerivedCommands(m), m.castShadows && (m.pass === j.GLOBE || m.pass === j.PGEARTH_3D_TILE || m.pass === j.OPAQUE || m.pass === j.TRANSLUCENT) && e.isVisible(m, i)) if (o) for (var d = 0; d < n; ++d) {
              s[d].commandList.push(m);
            } else if (1 === n) s[0].commandList.push(m);else for (var h = !1, c = n - 1; 0 <= c; --c) {
              var l = s[c].cullingVolume;
              if (e.isVisible(m, l)) s[c].commandList.push(m), h = !0;else if (h) break;
            }
          }
        }(e, e.frameState.commandList, a), d = 0; d < m; ++d) {
          var h = a.passes[d];
          s.updateCamera(h.camera), a.updatePass(o, d);

          for (var c = h.commandList.length, l = 0; l < c; ++l) {
            var p = h.commandList[l];
            s.updatePass(p.pass), Je(p.derivedCommands.shadows.castCommands[n], e, o, h.passState);
          }
        }
      }
    }
  }

  var ht = new S();

  function ct(e, t, r) {
    var i = e._frameState.mode;
    e._environmentState.useWebVR ? function (e, t, r) {
      var i = e._view,
          o = i.camera,
          s = e._environmentState.renderTranslucentDepthForPick;
      yt(e, t, r), s || Dt(e);
      i.createPotentiallyVisibleSet(e), s || (mt(e), dt(e));
      var n = t.viewport;
      n.x = 0, n.y = 0, n.width = .5 * n.width;
      var a = Z.clone(o, e._cameraVR);
      a.frustum = o.frustum;
      var u = o.frustum.near,
          m = u * v(e.focalLength, 5),
          d = v(e.eyeSeparation, m / 30),
          h = S.multiplyByScalar(a.right, .5 * d, ht);
      o.frustum.aspectRatio = n.width / n.height;
      var c = .5 * d * u / m;
      S.add(a.position, h, o.position), o.frustum.xOffset = c, ut(e, t), n.x = n.width, S.subtract(a.position, h, o.position), o.frustum.xOffset = -c, ut(e, t), Z.clone(a, o);
    }(e, t, r) : i !== be.SCENE2D || e._mapMode2D === le.ROTATE ? bt(!0, e, t, r) : (yt(e, t, r), function (e, t) {
      var r = e.context,
          i = e.frameState,
          o = e.camera,
          s = t.viewport,
          n = b.clone(s, wt);
      t.viewport = n;
      var a = pt;
      e.mapProjection.project(lt, a);
      var u = S.clone(o.position, ft),
          m = E.clone(o.transform, gt),
          d = o.frustum.clone();

      o._setTransform(E.IDENTITY);

      var h = E.computeViewportTransformation(n, 0, 1, _t),
          c = o.frustum.projectionMatrix,
          l = o.positionWC.y,
          p = S.fromElements(x.sign(l) * a.x - l, 0, -o.positionWC.x, Ct),
          f = V.pointToGLWindowCoordinates(c, h, p, vt);
      f.x = Math.floor(f.x);
      var _ = n.x,
          g = n.width;
      {
        var C, v;
        0 === l || f.x <= _ || f.x >= _ + g ? bt(!0, e, t) : (Math.abs(_ + .5 * g - f.x) < 1 ? (n.width = f.x - n.x, o.position.x *= x.sign(o.position.x), o.frustum.right = 0, i.cullingVolume = o.frustum.computeCullingVolume(o.positionWC, o.directionWC, o.upWC), r.uniformState.update(i), bt(!0, e, t), n.x = f.x, o.position.x = -o.position.x, o.frustum.right = -o.frustum.left, o.frustum.left = 0) : f.x > _ + .5 * g ? (n.width = f.x - _, C = o.frustum.right, o.frustum.right = a.x - l, i.cullingVolume = o.frustum.computeCullingVolume(o.positionWC, o.directionWC, o.upWC), r.uniformState.update(i), bt(!0, e, t), n.x = f.x, n.width = _ + g - f.x, o.position.x = -o.position.x, o.frustum.left = -o.frustum.right, o.frustum.right = C - 2 * o.frustum.right) : (n.x = f.x, n.width = _ + g - f.x, v = o.frustum.left, o.frustum.left = -a.x - l, i.cullingVolume = o.frustum.computeCullingVolume(o.positionWC, o.directionWC, o.upWC), r.uniformState.update(i), bt(!0, e, t), n.x = _, n.width = f.x - _, o.position.x = -o.position.x, o.frustum.right = -o.frustum.left, o.frustum.left = v - 2 * o.frustum.left), i.cullingVolume = o.frustum.computeCullingVolume(o.positionWC, o.directionWC, o.upWC), r.uniformState.update(i), bt(!1, e, t));
      }
      o._setTransform(m), S.clone(u, o.position), o.frustum = d.clone(), t.viewport = s;
    }(e, t));
  }

  var lt = new d(Math.PI, x.PI_OVER_TWO),
      pt = new S(),
      ft = new S(),
      _t = new E(),
      gt = new E(),
      Ct = new S(),
      vt = new S(),
      wt = new b();

  function bt(e, t, r, i) {
    var o = t._environmentState,
        s = t._view,
        n = o.renderTranslucentDepthForPick;
    e || n || (t.frameState.commandList.length = 0), n || Dt(t), s.createPotentiallyVisibleSet(t), e && (N(i) && yt(t, r, i), n || (mt(t), dt(t))), ut(t, r);
  }

  function St(e) {
    var t,
        r = e._frameState,
        i = e._view,
        o = e._environmentState,
        s = r.passes.render,
        n = r.passes.offscreen,
        a = e.skyAtmosphere,
        u = e.globe;
    !s || e._mode !== be.SCENE2D && i.camera.frustum instanceof T ? (o.skyAtmosphereCommand = void 0, o.skyBoxCommand = void 0, o.sunDrawCommand = void 0, o.sunComputeCommand = void 0, o.moonCommand = void 0) : (N(a) && N(u) && (a.setDynamicAtmosphereColor(u.enableLighting), o.isReadyForAtmosphere = o.isReadyForAtmosphere || 0 < u._surface._tilesToRender.length), o.skyAtmosphereCommand = N(a) ? a.update(r) : void 0, o.skyBoxCommand = N(e.skyBox) ? e.skyBox.update(r, e._hdr) : void 0, t = N(e.sun) ? e.sun.update(r, i.passState, e._hdr) : void 0, o.sunDrawCommand = N(t) ? t.drawCommand : void 0, o.sunComputeCommand = N(t) ? t.computeCommand : void 0, o.moonCommand = N(e.moon) ? e.moon.update(r) : void 0);
    var m = o.clearGlobeDepth = N(u) && (!u.depthTestAgainstTerrain || e.mode === be.SCENE2D);
    (o.useDepthPlane = m && e.mode === be.SCENE3D) && e._depthPlane.update(r), o.renderTranslucentDepthForPick = !1, o.useWebVR = e._useWebVR && e.mode !== be.SCENE2D && !n;

    for (var d = r.mode === be.SCENE3D ? r.occluder : void 0, h = r.cullingVolume, c = Qe.planes, l = 0; l < 5; ++l) {
      c[l] = h.planes[l];
    }

    h = Qe, o.isSkyAtmosphereVisible = N(o.skyAtmosphereCommand) && o.isReadyForAtmosphere, o.isSunVisible = e.isVisible(o.sunDrawCommand, h, d), o.isMoonVisible = e.isVisible(o.moonCommand, h, d);
    var p = e.specularEnvironmentMaps,
        f = e._specularEnvironmentMapAtlas;
    !N(p) || N(f) && f.url === p ? !N(p) && N(f) && (f.destroy(), e._specularEnvironmentMapAtlas = void 0) : (f = f && f.destroy(), e._specularEnvironmentMapAtlas = new pe(p)), N(e._specularEnvironmentMapAtlas) && e._specularEnvironmentMapAtlas.update(r);
  }

  function Dt(e) {
    var t,
        r,
        i = e._frameState;
    e._groundPrimitives.update(i), e._primitives.update(i), e._pageLODs.update(i), r = (t = e)._frameState, t.debugShowFrustumPlanes !== t._debugShowFrustumPlanes && (t.debugShowFrustumPlanes ? t._debugFrustumPlanes = new oe({
      camera: t.camera,
      updateOnChange: !1
    }) : t._debugFrustumPlanes = t._debugFrustumPlanes && t._debugFrustumPlanes.destroy(), t._debugShowFrustumPlanes = t.debugShowFrustumPlanes), N(t._debugFrustumPlanes) && t._debugFrustumPlanes.update(r), function (e) {
      var t = e._frameState,
          r = t.shadowMaps,
          i = r.length,
          o = 0 < i && !t.passes.pick && e.mode === be.SCENE3D;

      if (o !== t.shadowState.shadowsEnabled && (++t.shadowState.lastDirtyTime, t.shadowState.shadowsEnabled = o), t.shadowState.lightShadowsEnabled = !1, o) {
        for (var s = 0; s < i; ++s) {
          if (r[s] !== t.shadowState.shadowMaps[s]) {
            ++t.shadowState.lastDirtyTime;
            break;
          }
        }

        t.shadowState.shadowMaps.length = 0;

        for (var n = t.shadowState.lightShadowMaps.length = 0; n < i; ++n) {
          var a = r[n];
          a.update(t), t.shadowState.shadowMaps.push(a), a.fromLightSource && (t.shadowState.lightShadowMaps.push(a), t.shadowState.lightShadowsEnabled = !0), a.dirty && (++t.shadowState.lastDirtyTime, a.dirty = !1);
        }
      }
    }(e), e._globe && e._globe.render(i);
  }

  function yt(e, t, r) {
    var i = e._context,
        o = e._frameState,
        s = e._environmentState,
        n = e._view,
        a = e._frameState.passes.pick,
        u = s.useWebVR;
    s.originalFramebuffer = t.framebuffer, N(e.sun) && e.sunBloom !== e._sunBloom ? (e.sunBloom && !u ? e._sunPostProcess = new Ee() : N(e._sunPostProcess) && (e._sunPostProcess = e._sunPostProcess.destroy()), e._sunBloom = e.sunBloom) : !N(e.sun) && N(e._sunPostProcess) && (e._sunPostProcess = e._sunPostProcess.destroy(), e._sunBloom = !1);
    var m = e._clearColorCommand;
    C.clone(r, m.color), m.execute(i, t);
    var d = s.useGlobeDepthFramebuffer = N(n.globeDepth);
    d && (n.globeDepth.update(i, t, n.viewport, e._hdr), n.globeDepth.clear(i, t, r));
    var h = n.oit,
        c = s.useOIT = !a && N(h) && h.isSupported();
    c && (h.update(i, t, n.globeDepth.framebuffer, e._hdr), h.clear(i, t, r), s.useOIT = h.isSupported());
    var l,
        p,
        f,
        _ = e.postProcessStages,
        g = s.usePostProcess = !a && (e._hdr || 0 < _.length || _.ambientOcclusion.enabled || _.fxaa.enabled || _.bloom.enabled);
    s.usePostProcessSelected = !1, g && (n.sceneFramebuffer.update(i, n.viewport, e._hdr), n.sceneFramebuffer.clear(i, t, r), _.update(i, o.useLogDepth, e._hdr), _.clear(i), g = s.usePostProcess = _.ready, s.usePostProcessSelected = g && _.hasSelected), s.isSunVisible && e.sunBloom && !u ? (t.framebuffer = e._sunPostProcess.update(t), e._sunPostProcess.clear(i, t, r)) : d ? t.framebuffer = n.globeDepth.framebuffer : g && (t.framebuffer = n.sceneFramebuffer.getFramebuffer()), N(t.framebuffer) && m.execute(i, t), (s.useInvertClassification = !a && N(t.framebuffer) && e.invertClassification) && (1 === e.frameState.invertClassificationColor.alpha && s.useGlobeDepthFramebuffer && (l = n.globeDepth.framebuffer), N(l) || i.depthTexture ? (e._invertClassification.previousFramebuffer = l, e._invertClassification.update(i), e._invertClassification.clear(i, t), e.frameState.invertClassificationColor.alpha < 1 && c && ((f = (p = e._invertClassification.unclassifiedCommand).derivedCommands).oit = h.createDerivedCommands(p, i, f.oit))) : s.useInvertClassification = !1);
  }

  function Pt(e, t) {
    var r,
        i,
        o,
        s,
        n,
        a = e._context,
        u = e._frameState,
        m = e._environmentState,
        d = e._view,
        h = m.useOIT,
        c = m.useGlobeDepthFramebuffer,
        l = m.usePostProcess,
        p = m.originalFramebuffer,
        f = c ? d.globeDepth.framebuffer : void 0,
        _ = d.sceneFramebuffer.getFramebuffer(),
        g = d.sceneFramebuffer.getIdFramebuffer();

    h && (t.framebuffer = l ? _ : p, d.oit.execute(a, t)), l && (r = c && !h ? f : _, i = e.postProcessStages, o = r.getColorTexture(0), s = g.getColorTexture(0), n = v(f, _).depthStencilTexture, i.execute(a, o, n, s), i.copy(a, p)), h || l || !c || (t.framebuffer = p, d.globeDepth.executeCopyColor(a, t));
    var C = u.useLogDepth;
    e.debugShowGlobeDepth && c && rt(e, e.debugShowDepthFrustum - 1).executeDebugGlobeDepth(a, t, C), e.debugShowPickDepth && c && it(e, e.debugShowDepthFrustum - 1).executeDebugPickDepth(a, t, C);
  }

  function xt(e) {
    e._jobScheduler.resetBudgets();

    var t = e._frameState;
    e.primitives.prePassesUpdate(t), N(e.globe) && e.globe.update(t), e._pickPositionCacheDirty = !0, t.creditDisplay.update();
  }

  function Et(e) {
    var t = e._frameState;
    e.primitives.postPassesUpdate(t), k.update();
  }

  ke.prototype.initializeFrame = function () {
    120 == this._shaderFrameCount++ && (this._shaderFrameCount = 0, this._context.shaderCache.destroyReleasedShaderPrograms(), this._context.textureCache.destroyReleasedTextures()), this._tweens.update(), this._screenSpaceCameraController.update(), N(this._deviceOrientationCameraController) && this._deviceOrientationCameraController.update(), this.camera.update(this._mode), this.camera._updateCameraChanged();
  };

  var Tt = new C();

  function Ft(e) {
    var t = e._frameState,
        r = e.context,
        i = r.uniformState,
        o = e._defaultView;
    e._view = o, ze(e), t.passes.render = !0, t.passes.postProcess = e.postProcessStages.hasSelected, t.tilesetPassState = Ne;
    var s = v(e.backgroundColor, C.BLACK);
    e._hdr && ((s = C.clone(s, Tt)).red = Math.pow(s.red, e.gamma), s.green = Math.pow(s.green, e.gamma), s.blue = Math.pow(s.blue, e.gamma)), t.backgroundColor = s, t.creditDisplay.beginFrame(), e.fog.update(t), i.update(t);
    var n = e.shadowMap;
    N(n) && n.enabled && (S.negate(i.sunDirectionWC, e._sunCamera.direction), t.shadowMaps.push(n)), e._computeCommandList.length = 0, e._overlayCommandList.length = 0;
    var a = o.viewport;
    a.x = 0, a.y = 0, a.width = r.drawingBufferWidth, a.height = r.drawingBufferHeight;
    var u = o.passState;
    u.framebuffer = void 0, u.blendingEnabled = void 0, u.scissorTest = void 0, u.viewport = b.clone(a, u.viewport), N(e.globe) && e.globe.beginFrame(t), St(e), ct(e, u, s), Pt(e, u), u.framebuffer = void 0, function (e, t) {
      e.context.uniformState.updatePass(j.OVERLAY);

      for (var r = e.context, i = e._overlayCommandList, o = i.length, s = 0; s < o; ++s) {
        i[s].execute(r, t);
      }
    }(e, u), N(e.globe) && (e.globe.endFrame(t), e.globe.tilesLoaded || (e._renderRequested = !0)), t.creditDisplay.endFrame(), r.endFrame();
  }

  function Rt(t, e) {
    try {
      e(t);
    } catch (e) {
      if (t._renderError.raiseEvent(t, e), t.rethrowRenderErrors) throw e;
    }
  }

  ke.prototype.render = function (e) {
    this._preUpdate.raiseEvent(this, e);

    var t = this._frameState;
    t.newFrame = !1, N(e) || (e = p.now());

    var r,
        i,
        o,
        s,
        n,
        a = this._view.checkForCameraUpdates(this),
        u = !this.requestRenderMode || this._renderRequested || a || this._logDepthBufferDirty || this._hdrDirty || this.mode === be.MORPHING;

    !u && N(this.maximumRenderTimeChange) && N(this._lastRenderTime) && (r = Math.abs(p.secondsDifference(this._lastRenderTime, e)), u = u || r > this.maximumRenderTimeChange), u && (this._lastRenderTime = p.clone(e, this._lastRenderTime), this._renderRequested = !1, this._logDepthBufferDirty = !1, this._hdrDirty = !1, qe(this, x.incrementWrap(t.frameNumber, 15e6, 1), e), t.newFrame = !0), Rt(this, xt), Rt(this, Xt), Rt(this, qt), Rt(this, zt), u || Rt(this, Qt), this._postUpdate.raiseEvent(this, e), u && (this._preRender.raiseEvent(this, e), Rt(this, Ft)), o = u, (i = this).debugShowFramesPerSecond ? (N(i._performanceDisplay) || ((s = document.createElement("div")).className = "pgEarth-performanceDisplay-defaultContainer", i._canvas.parentNode.appendChild(s), n = new fe({
      container: s
    }), i._performanceDisplay = n, i._performanceContainer = s), i._performanceDisplay.throttled = i.requestRenderMode, i._performanceDisplay.update(o)) : N(i._performanceDisplay) && (i._performanceDisplay = i._performanceDisplay && i._performanceDisplay.destroy(), i._performanceContainer.parentNode.removeChild(i._performanceContainer)), Rt(this, Et), function (e) {
      for (var t = e._frameState.afterRender, r = 0, i = t.length; r < i; ++r) {
        t[r](), e.requestRender();
      }

      t.length = 0;
    }(this), u && this._postRender.raiseEvent(this, e);
  }, ke.prototype.forceRender = function (e) {
    this._renderRequested = !0, this.render(e);
  }, ke.prototype.requestRender = function () {
    this._renderRequested = !0;
  }, ke.prototype.clampLineWidth = function (e) {
    return Math.max(W.minimumAliasedLineWidth, Math.min(e, W.maximumAliasedLineWidth));
  };
  var Lt = new F(),
      Ot = new S(),
      kt = new S(),
      At = new t(),
      It = new E();
  var Vt = new R();

  function Mt(e, t, r, i, o) {
    var s,
        n,
        a,
        u,
        m,
        d,
        h,
        c,
        l,
        p,
        f,
        _,
        g,
        C,
        v,
        w = e.camera.frustum;

    return w instanceof T || w instanceof F ? function (e, t, r) {
      var i = e.camera,
          o = i.frustum;
      N(o._offCenterFrustum) && (o = o._offCenterFrustum);
      var s = 2 * (t.x - r.x) / r.width - 1;
      s *= .5 * (o.right - o.left);
      var n = 2 * (r.height - t.y - r.y) / r.height - 1;
      n *= .5 * (o.top - o.bottom);
      var a = E.clone(i.transform, It);

      i._setTransform(E.IDENTITY);

      var u = S.clone(i.position, Ot);
      S.multiplyByScalar(i.right, s, kt), S.add(kt, u, u), S.multiplyByScalar(i.up, n, kt), S.add(kt, u, u), i._setTransform(a), e.mode === be.SCENE2D && S.fromElements(u.z, u.x, u.y, u);
      var m = o.getPixelDimensions(r.width, r.height, 1, At),
          d = Lt;
      return d.right = .5 * m.x, d.left = -d.right, d.top = .5 * m.y, d.bottom = -d.top, d.near = o.near, d.far = o.far, d.computeCullingVolume(u, i.directionWC, i.upWC);
    }(e, t, o) : (s = t, n = r, a = i, u = o, m = e.camera, d = m.frustum, h = d.near, c = Math.tan(.5 * d.fovy), l = d.aspectRatio * c, p = (2 * (s.x - u.x) / u.width - 1) * h * l, f = (2 * (u.height - s.y - u.y) / u.height - 1) * h * c, _ = d.getPixelDimensions(u.width, u.height, 1, At), g = _.x * n * .5, C = _.y * a * .5, (v = Vt).top = f + C, v.bottom = f - C, v.right = p + g, v.left = p - g, v.near = h, v.far = d.far, v.computeCullingVolume(m.positionWC, m.directionWC, m.upWC));
  }

  var Nt = 3,
      Gt = 3,
      Bt = new b(0, 0, Nt, Gt),
      Wt = new C(0, 0, 0, 0),
      Ht = new t();
  ke.prototype.pick = function (e, t, r) {
    if (!N(e)) throw new w("windowPosition is undefined.");
    Nt = v(t, 3), Gt = v(r, Nt);
    var i = this._context,
        o = i.uniformState,
        s = this._frameState,
        n = this._defaultView,
        a = (this._view = n).viewport;
    a.x = 0, a.y = 0, a.width = i.drawingBufferWidth, a.height = i.drawingBufferHeight;
    var u = n.passState;
    u.viewport = b.clone(a, u.viewport);
    var m = Se.transformWindowToDrawingBuffer(this, e, Ht);
    this._jobScheduler.disableThisFrame(), ze(this), s.cullingVolume = Mt(this, m, Nt, Gt, a), s.invertClassification = !1, s.passes.pick = !0, s.tilesetPassState = Ge, o.update(s), St(this), Bt.x = m.x - .5 * (Nt - 1), Bt.y = this.drawingBufferHeight - m.y - .5 * (Gt - 1), Bt.width = Nt, Bt.height = Gt, ct(this, u = n.pickFramebuffer.begin(Bt, n.viewport), Wt), Pt(this, u);
    var d = n.pickFramebuffer.end(Bt);
    return i.endFrame(), d;
  }, ke.prototype.pickPositionWorldCoordinates = function (e, t) {
    if (this.useDepthPicking) {
      if (!N(e)) throw new w("windowPosition is undefined.");
      if (!this._context.depthTexture) throw new w("Picking from the depth buffer is not supported. Check pickPositionSupported.");
      var r = e.toString();
      if (this._pickPositionCacheDirty) this._pickPositionCache = {}, this._pickPositionCacheDirty = !1;else if (this._pickPositionCache.hasOwnProperty(r)) return S.clone(this._pickPositionCache[r], t);
      var i = this._frameState,
          o = this._context,
          s = o.uniformState,
          n = this._defaultView;
      this._view = n;
      var a = Se.transformWindowToDrawingBuffer(this, e, Ht);
      this.pickTranslucentDepth ? function (e, t) {
        var r = e._context,
            i = e._frameState,
            o = e._environmentState,
            s = e._defaultView,
            n = (e._view = s).viewport;
        n.x = 0, n.y = 0, n.width = r.drawingBufferWidth, n.height = r.drawingBufferHeight;
        var a = s.passState;
        a.viewport = b.clone(n, a.viewport), je(i.passes), i.passes.pick = !0, i.passes.depth = !0, i.cullingVolume = Mt(e, t, 1, 1, n), i.tilesetPassState = Ge, St(e), o.renderTranslucentDepthForPick = !0, ct(e, a = s.pickDepthFramebuffer.update(r, t, n), Wt), Pt(e, a), r.endFrame();
      }(this, a) : (ze(this, i.frameNumber, i.time), s.update(i), St(this)), a.y = this.drawingBufferHeight - a.y;

      for (var u = this.camera, m = N(u.frustum.fov) ? u.frustum.clone(ot) : N(u.frustum.infiniteProjectionMatrix) ? u.frustum.clone(st) : N(u.frustum.width) ? u.frustum.clone(nt) : u.frustum.clone(at), d = n.frustumCommandsList, h = d.length, c = 0; c < h; ++c) {
        var l = it(this, c).getDepth(o, a.x, a.y);

        if (0 < l && l < 1) {
          var p,
              f = d[c];
          return this.mode === be.SCENE2D ? (p = u.position.z, u.position.z = p - f.near + 1, m.far = Math.max(1, f.far - f.near), m.near = 1, s.update(i)) : (m.near = f.near * (0 !== c ? this.opaqueFrustumNearOffset : 1), m.far = f.far), s.updateFrustum(m), t = Se.drawingBufferToWgs84Coordinates(this, a, l, t), this.mode === be.SCENE2D && (u.position.z = p, s.update(i)), this._pickPositionCache[r] = S.clone(t), t;
        }
      }

      this._pickPositionCache[r] = void 0;
    }
  };
  var Ut = new d();

  function jt(e, t) {
    var r,
        i,
        o = [],
        s = [],
        n = [],
        a = [];
    N(e) || (e = Number.MAX_VALUE);

    for (var u = t(); N(u);) {
      var m = u.object,
          d = u.position,
          h = u.exclude;

      if (N(d) && !N(m)) {
        o.push(u);
        break;
      }

      if (!N(m) || !N(m.primitive)) break;
      if (!h && (o.push(u), --e <= 0)) break;
      var c = m.primitive,
          l = !1;
      "function" == typeof c.getGeometryInstanceAttributes && N(m.id) && (i = c.getGeometryInstanceAttributes(m.id), N(i) && N(i.show) && (l = !0, i.show = A.toValue(!1, i.show), n.push(i))), m instanceof $ && (l = !0, m.show = !1, a.push(m)), l || (c.show = !1, s.push(c)), u = t();
    }

    for (r = 0; r < s.length; ++r) {
      s[r].show = !0;
    }

    for (r = 0; r < n.length; ++r) {
      (i = n[r]).show = A.toValue(!0, i.show);
    }

    for (r = 0; r < a.length; ++r) {
      a[r].show = !0;
    }

    return o;
  }

  function qt(e) {
    var t = e._frameState;
    Be.camera = t.camera, Be.cullingVolume = t.cullingVolume, e.primitives.updateForPass(t, Be);
  }

  function zt(e) {
    var t = e._frameState;
    t.camera.hasCurrentFlight() && (We.camera = e.preloadFlightCamera, We.cullingVolume = e.preloadFlightCullingVolume, e.primitives.updateForPass(t, We));
  }

  function Qt(e) {
    e.primitives.updateForPass(e._frameState, He);
  }

  ke.prototype.pickPosition = function (e, t) {
    var r, i, o;
    return t = this.pickPositionWorldCoordinates(e, t), N(t) && this.mode !== be.SCENE3D && (S.fromElements(t.y, t.z, t.x, t), i = (r = this.mapProjection).ellipsoid, o = r.unproject(t, Ut), i.cartographicToCartesian(o, t)), t;
  }, ke.prototype.drillPick = function (t, e, r, i) {
    var o = this;
    return jt(e, function () {
      var e = o.pick(t, r, i);
      if (N(e)) return {
        object: e,
        position: void 0,
        exclude: !1
      };
    }).map(function (e) {
      return e.object;
    });
  };
  var Kt = new S(),
      Yt = new S();

  function Jt(e, t, r, i) {
    var o = t.direction,
        s = S.mostOrthogonalAxis(o, Kt),
        n = S.cross(o, s, Kt),
        a = S.cross(o, n, Yt);
    return i.position = t.origin, i.direction = o, i.up = a, i.right = n, i.frustum.width = v(r, e.pickOffscreenDefaultWidth), i.frustum.computeCullingVolume(i.positionWC, i.directionWC, i.upWC);
  }

  function Xt(e) {
    for (var t = e._mostDetailedRayPicks, r = 0; r < t.length; ++r) {
      !function (e, t) {
        var r = e._frameState,
            i = t.ray,
            o = t.width,
            s = t.tilesets,
            n = e._pickOffscreenView.camera,
            a = Jt(e, i, o, n),
            u = Ve;
        u.camera = n, u.cullingVolume = a;

        for (var m = !0, d = s.length, h = 0; h < d; ++h) {
          var c = s[h];
          c.show && e.primitives.contains(c) && (c.updateForPass(r, u), m = m && u.ready);
        }

        return m && t.deferred.resolve(), m;
      }(e, t[r]) || t.splice(r--, 1);
    }
  }

  function Zt(e, t, r, i, o) {
    var s = [];
    if (!function e(t, r, i) {
      for (var o = t.length, s = 0; s < o; ++s) {
        var n = t.get(s);
        n.show && (n instanceof re ? N(r) && -1 !== r.indexOf(n) || i.push(n) : n instanceof we && e(n, r, i));
      }
    }(e.primitives, r, s), 0 === s.length) return J.resolve(o());
    var n = new Oe(t, i, s);
    return e._mostDetailedRayPicks.push(n), n.promise.then(function () {
      return o();
    });
  }

  function $t(e, t, r, i, o, s) {
    var n = e._context,
        a = n.uniformState,
        u = e._frameState,
        m = e._pickOffscreenView;
    e._view = m, Jt(e, t, i, m.camera), Bt = b.clone(m.viewport, Bt);
    var d = m.pickFramebuffer.begin(Bt, m.viewport);
    e._jobScheduler.disableThisFrame(), ze(e), u.invertClassification = !1, u.passes.pick = !0, u.passes.offscreen = !0, u.tilesetPassState = s ? Me : Ge, a.update(u), St(e), ct(e, d, Wt), Pt(e, d);
    var h,
        c,
        l = m.pickFramebuffer.end(n);
    if (e._context.depthTexture) for (var p = m.frustumCommandsList.length, f = 0; f < p; ++f) {
      var _ = it(e, f).getDepth(n, 0, 0);

      if (0 < _ && _ < 1) {
        var g = m.frustumCommandsList[f],
            C = g.near * (0 !== f ? e.opaqueFrustumNearOffset : 1),
            v = C + _ * (g.far - C),
            w = O.getPoint(t, v);
        break;
      }
    }
    if (e._view = e._defaultView, n.endFrame(), N(l) || N(w)) return {
      object: l,
      position: w,
      exclude: !N(w) && o || (c = r, !(!N(h = l) || !N(c) || 0 === c.length) && (-1 < c.indexOf(h) || -1 < c.indexOf(h.primitive) || -1 < c.indexOf(h.id)))
    };
  }

  function er(e, t, r, i, o, s, n) {
    return jt(r, function () {
      return $t(e, t, i, o, s, n);
    });
  }

  function tr(e, t, r, i, o, s) {
    var n = er(e, t, 1, r, i, o, s);
    if (0 < n.length) return n[0];
  }

  function rr(e, t, r, i, o, s, n) {
    return er(e, t, r, i, o, s, n);
  }

  function ir(r, e) {
    var i = J.defer();
    return e.then(function (e) {
      var t = r.postRender.addEventListener(function () {
        i.resolve(e), t();
      });
    }), i.promise;
  }

  ke.prototype.pickFromRay = function (e, t, r) {
    if (n.defined("ray", e), this._mode !== be.SCENE3D) throw new w("Ray intersections are only supported in 3D mode.");
    return tr(this, e, t, r, !1, !1);
  }, ke.prototype.drillPickFromRay = function (e, t, r, i) {
    if (n.defined("ray", e), this._mode !== be.SCENE3D) throw new w("Ray intersections are only supported in 3D mode.");
    return rr(this, e, t, r, i, !1, !1);
  }, ke.prototype.pickFromRayMostDetailed = function (e, t, r) {
    if (n.defined("ray", e), this._mode !== be.SCENE3D) throw new w("Ray intersections are only supported in 3D mode.");
    var i = this;
    return e = O.clone(e), t = N(t) ? t.slice() : t, ir(this, Zt(this, e, t, r, function () {
      return tr(i, e, t, r, !1, !0);
    }));
  }, ke.prototype.drillPickFromRayMostDetailed = function (e, t, r, i) {
    if (n.defined("ray", e), this._mode !== be.SCENE3D) throw new w("Ray intersections are only supported in 3D mode.");
    var o = this;
    return e = O.clone(e), r = N(r) ? r.slice() : r, ir(this, Zt(this, e, r, i, function () {
      return rr(o, e, t, r, i, !1, !0);
    }));
  };
  var or = new S(),
      sr = new S(),
      nr = new O(),
      ar = new d();

  function ur(e, t) {
    var r = e.globe,
        i = N(r) ? r.ellipsoid : e.mapProjection.ellipsoid,
        o = m._defaultMaxTerrainHeight,
        s = i.geodeticSurfaceNormalCartographic(t, sr),
        n = d.toCartesian(t, i, or),
        a = nr;
    a.origin = n, a.direction = s;
    var u = new O();
    return O.getPoint(a, o, u.origin), S.negate(s, u.direction), u;
  }

  function mr(e, t) {
    var r = e.globe,
        i = N(r) ? r.ellipsoid : e.mapProjection.ellipsoid;
    return ur(e, d.fromCartesian(t, i, ar));
  }

  function dr(e, t) {
    var r = e.globe,
        i = N(r) ? r.ellipsoid : e.mapProjection.ellipsoid;
    return d.fromCartesian(t, i, ar).height;
  }

  return ke.prototype.sampleHeight = function (e, t, r) {
    if (n.defined("position", e), this._mode !== be.SCENE3D) throw new w("sampleHeight is only supported in 3D mode.");
    if (!this.sampleHeightSupported) throw new w("sampleHeight requires depth texture support. Check sampleHeightSupported.");
    var i = tr(this, ur(this, e), t, r, !0, !1);
    if (N(i)) return dr(this, i.position);
  }, ke.prototype.clampToHeight = function (e, t, r, i) {
    if (n.defined("cartesian", e), this._mode !== be.SCENE3D) throw new w("sampleHeight is only supported in 3D mode.");
    if (!this.clampToHeightSupported) throw new w("clampToHeight requires depth texture support. Check clampToHeightSupported.");
    var o = tr(this, mr(this, e), t, r, !0, !1);
    if (N(o)) return S.clone(o.position, i);
  }, ke.prototype.sampleHeightMostDetailed = function (i, e, t) {
    if (n.defined("positions", i), this._mode !== be.SCENE3D) throw new w("sampleHeightMostDetailed is only supported in 3D mode.");
    if (!this.sampleHeightSupported) throw new w("sampleHeightMostDetailed requires depth texture support. Check sampleHeightSupported.");
    e = N(e) ? e.slice() : e;

    for (var r = i.length, o = new Array(r), s = 0; s < r; ++s) {
      o[s] = function (t, e, r, i) {
        var o = ur(t, e);
        return Zt(t, o, r, i, function () {
          var e = tr(t, o, r, i, !0, !0);
          if (N(e)) return dr(t, e.position);
        });
      }(this, i[s], e, t);
    }

    return ir(this, J.all(o).then(function (e) {
      for (var t = e.length, r = 0; r < t; ++r) {
        i[r].height = e[r];
      }

      return i;
    }));
  }, ke.prototype.clampToHeightMostDetailed = function (i, e, t) {
    if (n.defined("cartesians", i), this._mode !== be.SCENE3D) throw new w("clampToHeightMostDetailed is only supported in 3D mode.");
    if (!this.clampToHeightSupported) throw new w("clampToHeightMostDetailed requires depth texture support. Check clampToHeightSupported.");
    e = N(e) ? e.slice() : e;

    for (var r = i.length, o = new Array(r), s = 0; s < r; ++s) {
      o[s] = function (t, e, r, i, o) {
        var s = mr(t, e);
        return Zt(t, s, r, i, function () {
          var e = tr(t, s, r, i, !0, !0);
          if (N(e)) return S.clone(e.position, o);
        });
      }(this, i[s], e, t, i[s]);
    }

    return ir(this, J.all(o).then(function (e) {
      for (var t = e.length, r = 0; r < t; ++r) {
        i[r] = e[r];
      }

      return i;
    }));
  }, ke.prototype.cartesianToCanvasCoordinates = function (e, t) {
    return Se.wgs84ToWindowCoordinates(this, e, t);
  }, ke.prototype.completeMorph = function () {
    this._transitioner.completeMorph();
  }, ke.prototype.morphTo2D = function (e) {
    var t = this.globe,
        r = N(t) ? t.ellipsoid : this.mapProjection.ellipsoid;
    e = v(e, 2), this._transitioner.morphTo2D(e, r);
  }, ke.prototype.morphToColumbusView = function (e) {
    var t = this.globe,
        r = N(t) ? t.ellipsoid : this.mapProjection.ellipsoid;
    e = v(e, 2), this._transitioner.morphToColumbusView(e, r);
  }, ke.prototype.morphTo3D = function (e) {
    var t = this.globe,
        r = N(t) ? t.ellipsoid : this.mapProjection.ellipsoid;
    e = v(e, 2), this._transitioner.morphTo3D(e, r);
  }, ke.prototype.isDestroyed = function () {
    return !1;
  }, ke.prototype.destroy = function () {
    this._tweens.removeAll(), this._computeEngine = this._computeEngine && this._computeEngine.destroy(), this._screenSpaceCameraController = this._screenSpaceCameraController && this._screenSpaceCameraController.destroy(), this._deviceOrientationCameraController = this._deviceOrientationCameraController && !this._deviceOrientationCameraController.isDestroyed() && this._deviceOrientationCameraController.destroy(), this._primitives = this._primitives && this._primitives.destroy(), this._groundPrimitives = this._groundPrimitives && this._groundPrimitives.destroy(), this._globe = this._globe && this._globe.destroy(), this.skyBox = this.skyBox && this.skyBox.destroy(), this.skyAtmosphere = this.skyAtmosphere && this.skyAtmosphere.destroy(), this._debugSphere = this._debugSphere && this._debugSphere.destroy(), this.sun = this.sun && this.sun.destroy(), this._sunPostProcess = this._sunPostProcess && this._sunPostProcess.destroy(), this._depthPlane = this._depthPlane && this._depthPlane.destroy(), this._transitioner = this._transitioner && this._transitioner.destroy(), this._debugFrustumPlanes = this._debugFrustumPlanes && this._debugFrustumPlanes.destroy(), this._brdfLutGenerator = this._brdfLutGenerator && this._brdfLutGenerator.destroy(), this._defaultView = this._defaultView && this._defaultView.destroy(), this._pickOffscreenView = this._pickOffscreenView && this._pickOffscreenView.destroy(), this._view = void 0, this._removeCreditContainer && this._canvas.parentNode.removeChild(this._creditContainer), this.postProcessStages = this.postProcessStages && this.postProcessStages.destroy(), this._context = this._context && this._context.destroy(), this._frameState.creditDisplay = this._frameState.creditDisplay && this._frameState.creditDisplay.destroy(), N(this._performanceDisplay) && (this._performanceDisplay = this._performanceDisplay && this._performanceDisplay.destroy(), this._performanceContainer.parentNode.removeChild(this._performanceContainer)), this._removeRequestListenerCallback(), this._removeTaskProcessorListenerCallback();

    for (var e = 0; e < this._removeGlobeCallbacks.length; ++e) {
      this._removeGlobeCallbacks[e]();
    }

    return this._removeGlobeCallbacks.length = 0, o(this);
  }, ke;
});