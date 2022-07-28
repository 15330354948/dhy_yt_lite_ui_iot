"use strict";

define(["../../Core/BoundingSphere", "../../Core/Ellipsoid", "../../Core/Cartesian3", "../../Core/Cartesian2", "../../Core/Cartographic", "../../Core/Clock", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/Event", "../../Core/EventHelper", "../../Core/HeadingPitchRange", "../../Core/isArray", "../../Core/Matrix4", "../../Core/Rectangle", "../../Core/ScreenSpaceEventType", "../../DataSources/BoundingSphereState", "../../DataSources/ConstantPositionProperty", "../../DataSources/DataSourceCollection", "../../DataSources/DataSourceDisplay", "../../DataSources/Entity", "../../DataSources/EntityView", "../../DataSources/Property", "../../Scene/PGEarth3DTileset", "../../Scene/computeFlyToLocationForRectangle", "../../Scene/ImageryLayer", "../../Scene/SceneMode", "../../Scene/TimeDynamicPointCloud", "../../ThirdParty/knockout", "../../ThirdParty/when", "../Animation/Animation", "../Animation/AnimationViewModel", "../BaseLayerPicker/BaseLayerPicker", "../BaseLayerPicker/createDefaultImageryProviderViewModels", "../BaseLayerPicker/createDefaultTerrainProviderViewModels", "../PGEarthWidget/PGEarthWidget", "../ClockViewModel", "../FullscreenButton/FullscreenButton", "../Geocoder/Geocoder", "../getElement", "../HomeButton/HomeButton", "../InfoBox/InfoBox", "../NavigationHelpButton/NavigationHelpButton", "../ProjectionPicker/ProjectionPicker", "../SceneModePicker/SceneModePicker", "../SelectionIndicator/SelectionIndicator", "../subscribeAndEvaluate", "../Timeline/Timeline", "../VRButton/VRButton", "../../DataSources/PolylineDashMaterialProperty", "../../Core/Color", "../../extends/widgets/navigation/viewerPGEarthNavigationMixin"], function (p, e, h, t, m, J, Z, Q, i, o, X, $, ee, g, te, _, ie, oe, y, d, ne, re, l, c, ae, v, r, a, f, E, se, u, ce, de, le, he, ue, pe, me, ge, _e, ye, ve, fe, Ee, ke, Se, n, we, Ce, Te, s, k, Pe) {
  "use strict";

  var S = new p();

  function Be(e) {
    var t = e.clock;
    t.currentTime = e.timeJulian, t.shouldAnimate = !1;
  }

  function be(e, t) {
    var i = e.scene.pick(t.position);

    if (Q(i)) {
      var o = Z(i.id, i.primitive.id);
      if (o instanceof l) return o;
    }

    if (Q(e.scene.globe)) return function (n, r) {
      var e = n.scene,
          t = e.camera.getPickRay(r),
          i = e.imageryLayers.pickImageryLayerFeatures(t, e);
      if (!Q(i)) return;
      var a = new l({
        id: "Loading...",
        description: "Loading feature information..."
      }),
          o = e.globe.pick(t, e);
      {
        var s, c;
        Q(o) && n.infoBox && (s = e.globe.ellipsoid.cartesianToCartographic(o), c = n.scene.globe.ellipsoid.cartographicToCartesian(s, C), T(n, c), "lightLine" === n.infoBox._className && P(0, r));
      }
      return u(i, function (e) {
        var t, i, o;
        n.selectedEntity === a && (Q(e) && 0 !== e.length && 0 !== Object.keys(e[0].data.properties).length ? (t = e[0], i = new l({
          id: t.name,
          description: t.description
        }), Q(t.position) && (o = n.scene.globe.ellipsoid.cartographicToCartesian(t.position, C), i.position = new d(o), T(n, o)), n.selectedEntity = i, setTimeout(function () {
          n.infoBox && "lightLine" === n.infoBox._className && P(0, r);
        }, 20)) : n.selectedEntity = void 0);
      }, function () {
        n.selectedEntity === a && (n.selectedEntity = void 0);
      }), a;
    }(e, t.position);
  }

  function w(e, t, i) {
    var o;
    Q(i) && (o = i.clock, Q(o) && (o.getValue(t), Q(e) && (e.updateFromClock(), e.zoomTo(o.startTime, o.stopTime))));
  }

  var C = new h();

  function T(i, o) {
    i.scene.postRender.addEventListener(function () {
      var e,
          t = i.scene.cartesianToCanvasCoordinates(o);
      Q(t) && i.infoBox && (e = i._infoBox._container, "lightLine" === i.infoBox._className ? (e.style.top = t.y + "px", e.style.left = t.x + "px") : (e.style.top = t.y - e.clientHeight - 16 + "px", e.style.left = t.x - e.children[0].offsetWidth / 2 + "px"));
    });
  }

  function P(e, t) {
    var i = window.innerWidth,
        o = (window.innerHeight, document.getElementsByClassName("property-content")[0]);
    o.removeAttribute("style");
    var n = o.clientHeight,
        r = !1,
        a = !1;
    t.x + 440 > i && (r = !0), t.y < 240 && (a = !0);
    var s = "";
    r ? (s = "left-", s += a ? "bottom-pop" : "top-pop") : (s = "right-", a ? s += "bottom-pop" : s = ""), n > window.innerHeight - t.y + 247 && (r ? o.setAttribute("style", "transform:translate(-457px, -255px)") : o.setAttribute("style", "transform:translate(0, -255px)"));
    var c = document.getElementsByClassName("light-line-pop")[0];
    c.classList.remove("left-top-pop", "left-bottom-pop", "right-bottom-pop"), s && c.classList.add(s);
  }

  function De(e, t) {
    if (!Q(e)) throw new X("container is required.");
    e = ye(e), t = Z(t, Z.EMPTY_OBJECT);
    var i = !(Q(t.globe) && !1 === t.globe || Q(t.baseLayerPicker) && !1 === t.baseLayerPicker);
    if (!i && Q(t.selectedImageryProviderViewModel)) throw new X("options.selectedImageryProviderViewModel is not available when not using the BaseLayerPicker widget. Either specify options.imageryProvider instead or set options.baseLayerPicker to true.");
    if (!i && Q(t.selectedTerrainProviderViewModel)) throw new X("options.selectedTerrainProviderViewModel is not available when not using the BaseLayerPicker widget. Either specify options.terrainProvider instead or set options.baseLayerPicker to true.");
    var g = this,
        o = document.createElement("div");
    o.className = "pgEarth-viewer", e.appendChild(o);
    var n = document.createElement("div");
    n.className = "pgEarth-viewer-pgEarthWidgetContainer", o.appendChild(n);
    var r = document.createElement("div");
    r.className = "pgEarth-viewer-bottom", o.appendChild(r);
    var a,
        s,
        c = Z(t.scene3DOnly, !1),
        d = !1;
    Q(t.clockViewModel) ? a = (s = t.clockViewModel).clock : (a = new J(), s = new me(a), d = !0), Q(t.shouldAnimate) && (a.shouldAnimate = t.shouldAnimate);
    var l = new pe(n, {
      imageryProvider: !i && !Q(t.imageryProvider) && void 0,
      clock: a,
      skyBox: t.skyBox,
      skyAtmosphere: t.skyAtmosphere,
      sceneMode: t.sceneMode,
      mapProjection: t.mapProjection,
      globe: t.globe,
      orderIndependentTranslucency: t.orderIndependentTranslucency,
      contextOptions: t.contextOptions,
      useDefaultRenderLoop: t.useDefaultRenderLoop,
      targetFrameRate: t.targetFrameRate,
      showRenderLoopErrors: t.showRenderLoopErrors,
      creditContainer: Q(t.creditContainer) ? t.creditContainer : r,
      creditViewport: t.creditViewport,
      scene3DOnly: c,
      terrainExaggeration: t.terrainExaggeration,
      shadows: t.shadows,
      terrainShadows: t.terrainShadows,
      mapMode2D: t.mapMode2D,
      requestRenderMode: t.requestRenderMode,
      maximumRenderTimeChange: t.maximumRenderTimeChange
    }),
        h = t.dataSources,
        u = !1;
    Q(h) || (h = new ne(), u = !0);

    var p,
        m,
        _,
        y,
        v = l.scene,
        f = new re({
      scene: v,
      dataSourceCollection: h
    }),
        E = new ee();

    E.add(a.onTick, De.prototype._onTick, this), E.add(v.morphStart, De.prototype._clearTrackedObject, this), Q(t.selectionIndicator) && t.selectionIndicator, Q(t.infoBox) && !1 === t.infoBox || ((p = document.createElement("div")).className = "pgEarth-viewer-infoBoxContainer", o.appendChild(p), m = t.infoBox && Z(t.infoBox.className, "lightLine") || "lightLine", y = (_ = new fe(p, m)).viewModel, E.add(y.cameraClicked, De.prototype._onInfoBoxCameraClicked, this), E.add(y.closeClicked, De.prototype._onInfoBoxClockClicked, this));
    var k,
        S,
        w,
        C,
        T,
        P,
        B,
        b,
        D,
        x,
        M,
        I,
        L,
        V,
        z,
        R,
        A,
        H,
        W,
        N,
        O,
        F,
        j = document.createElement("div");
    if (j.className = "pgEarth-viewer-toolbar", o.appendChild(j), Q(t.geocoder) && !1 === t.geocoder || ((S = document.createElement("div")).className = "pgEarth-viewer-geocoderContainer", j.appendChild(S), Q(t.geocoder) && "boolean" != typeof t.geocoder && (w = te(t.geocoder) ? t.geocoder : [t.geocoder]), k = new _e({
      container: S,
      geocoderServices: w,
      scene: v
    }), E.add(k.viewModel.search.beforeExecute, De.prototype._clearObjects, this)), Q(t.homeButton) && !1 === t.homeButton || (C = new ve(j, v), Q(k) && E.add(C.viewModel.command.afterExecute, function () {
      var e = k.viewModel;
      e.searchText = "", e.isSearchInProgress && e.search();
    }), E.add(C.viewModel.command.beforeExecute, De.prototype._clearTrackedObject, this)), !0 === t.sceneModePicker && c) throw new X("options.sceneModePicker is not available when options.scene3DOnly is set to true.");

    if (c || Q(t.sceneModePicker) && !1 === t.sceneModePicker || (T = new Se(j, v)), t.projectionPicker && (P = new ke(j, v)), i && (B = Z(t.imageryProviderViewModels, he()), b = Z(t.terrainProviderViewModels, ue()), D = new le(j, {
      globe: v.globe,
      imageryProviderViewModels: B,
      selectedImageryProviderViewModel: t.selectedImageryProviderViewModel,
      terrainProviderViewModels: b,
      selectedTerrainProviderViewModel: t.selectedTerrainProviderViewModel
    }), x = j.getElementsByClassName("pgEarth-baseLayerPicker-dropDown")[0]), Q(t.imageryProvider) && !1 !== t.imageryProvider && (i && (D.viewModel.selectedImagery = void 0), v.imageryLayers.removeAll(), v.imageryLayers.addImageryProvider(t.imageryProvider)), Q(t.terrainProvider) && (i && (D.viewModel.selectedTerrain = void 0), v.terrainProvider = t.terrainProvider), !Q(t.navigationHelpButton) || !1 !== t.navigationHelpButton) {
      var U,
          G = !0;

      try {
        Q(window.localStorage) && (U = window.localStorage.getItem("pgEarth-hasSeenNavHelp"), Q(U) && Boolean(U) ? G = !1 : window.localStorage.setItem("pgEarth-hasSeenNavHelp", "true"));
      } catch (e) {}

      M = new Ee({
        container: j,
        instructionsInitiallyVisible: Z(t.navigationInstructionsInitiallyVisible, G)
      });
    }

    Q(t.animation) && !1 === t.animation || ((L = document.createElement("div")).className = "pgEarth-viewer-animationContainer", o.appendChild(L), I = new ce(L, new de(s))), Q(t.timeline) && !1 === t.timeline || ((z = document.createElement("div")).className = "pgEarth-viewer-timelineContainer", o.appendChild(z), (V = new Ce(z, a)).addEventListener("settime", Be, !1), V.zoomTo(a.startTime, a.stopTime)), Q(t.fullscreenButton) && !1 === t.fullscreenButton || ((H = document.createElement("div")).className = "pgEarth-viewer-fullscreenContainer", o.appendChild(H), R = new ge(H, t.fullscreenElement), A = we(R.viewModel, "isFullscreenEnabled", function (e) {
      H.style.display = e ? "block" : "none", Q(V) && (V.container.style.right = H.clientWidth + "px", V.resize());
    })), t.vrButton && ((F = document.createElement("div")).className = "pgEarth-viewer-vrContainer", o.appendChild(F), W = new Te(F, v, t.fullScreenElement), N = we(W.viewModel, "isVREnabled", function (e) {
      F.style.display = e ? "block" : "none", Q(R) && (F.style.right = H.clientWidth + "px"), Q(V) && (V.container.style.right = F.clientWidth + "px", V.resize());
    }), O = we(W.viewModel, "isVRMode", function (e) {
      var t, i, o, n, r, a, s, c, d, l, h, u, p, m;
      i = e, n = (t = g)._geocoder, r = t._homeButton, a = t._sceneModePicker, s = t._projectionPicker, c = t._baseLayerPicker, d = t._animation, l = t._timeline, h = t._fullscreenButton, u = t._infoBox, p = t._selectionIndicator, m = i ? "hidden" : "visible", Q(n) && (n.container.style.visibility = m), Q(r) && (r.container.style.visibility = m), Q(a) && (a.container.style.visibility = m), Q(s) && (s.container.style.visibility = m), Q(c) && (c.container.style.visibility = m), Q(d) && (d.container.style.visibility = m), Q(l) && (l.container.style.visibility = m), Q(h) && h.viewModel.isFullscreenEnabled && (h.container.style.visibility = m), Q(u) && (u.container.style.visibility = m), Q(p) && (p.container.style.visibility = m), t._container && (o = i || !Q(h) ? 0 : h.container.clientWidth, t._vrButton.container.style.right = o + "px", t.forceResize());
    })), this._baseLayerPickerDropDown = x, this._fullscreenSubscription = A, this._vrSubscription = N, this._vrModeSubscription = O, this._dataSourceChangedListeners = {}, this._automaticallyTrackDataSourceClocks = Z(t.automaticallyTrackDataSourceClocks, !0), this._container = e, this._bottomContainer = r, this._element = o, this._pgEarthWidget = l, this._selectionIndicator = void 0, this._infoBox = _, this._dataSourceCollection = h, this._destroyDataSourceCollection = u, this._dataSourceDisplay = f, this._clockViewModel = s, this._destroyClockViewModel = d, this._toolbar = j, this._homeButton = C, this._sceneModePicker = T, this._projectionPicker = P, this._baseLayerPicker = D, this._navigationHelpButton = M, this._animation = I, this._timeline = V, this._fullscreenButton = R, this._vrButton = W, this._geocoder = k, this._eventHelper = E, this._lastWidth = 0, this._lastHeight = 0, this._allowDataSourcesToSuspendAnimation = !0, this._entityView = void 0, this._enableInfoOrSelection = Q(_) || Q(void 0), this._clockTrackedDataSource = void 0, this._trackedEntity = void 0, this._needTrackedEntityUpdate = !1, this._selectedEntity = void 0, this._clockTrackedDataSource = void 0, this._forceResize = !1, this._zoomIsFlight = !1, this._zoomTarget = void 0, this._zoomPromise = void 0, this._zoomOptions = void 0, this._selectedEntityChanged = new $(), this._trackedEntityChanged = new $(), se.track(this, ["_trackedEntity", "_selectedEntity", "_clockTrackedDataSource"]), E.add(h.dataSourceAdded, De.prototype._onDataSourceAdded, this), E.add(h.dataSourceRemoved, De.prototype._onDataSourceRemoved, this), E.add(v.postUpdate, De.prototype.resize, this), E.add(v.postRender, De.prototype._postRender, this);

    for (var q = h.length, Y = 0; Y < q; Y++) {
      this._dataSourceAdded(h, h.get(Y));
    }

    this._dataSourceAdded(void 0, f.defaultDataSource), E.add(h.dataSourceAdded, De.prototype._dataSourceAdded, this), E.add(h.dataSourceRemoved, De.prototype._dataSourceRemoved, this), l.screenSpaceEventHandler.setInputAction(function (e) {
      g.selectedEntity = be(g, e);
    }, oe.LEFT_CLICK), l.screenSpaceEventHandler.setInputAction(function (e) {
      var t = be(g, e);
      Q(t) ? ae.getValueOrUndefined(t.position, g.clock.currentTime) ? g.trackedEntity = t : g.zoomTo(t) : Q(g.trackedEntity) && (g.trackedEntity = void 0);
    }, oe.LEFT_DOUBLE_CLICK);
    var K = {};
    K.defaultResetView = ie.fromDegrees(90, 17, 130, 45), K.enableCompass = !0, K.enableZoomControls = !0, K.enableDistanceLegend = !0, K.enableCompassOuterRing = !0;
    new Pe(this, K);
  }

  function B(i, e, t, o) {
    if (!Q(e)) throw new X("zoomTarget is required.");
    D(i);
    var n = u.defer();
    return i._zoomPromise = n, i._zoomIsFlight = o, i._zoomOptions = t, u(e, function (e) {
      var t;
      i._zoomPromise === n && (e instanceof a ? e.getViewableRectangle().then(function (e) {
        return r(e, i.scene);
      }).then(function (e) {
        i._zoomPromise === n && (i._zoomTarget = e);
      }) : e instanceof v || e instanceof E ? i._zoomTarget = e : e.isLoading && Q(e.loadingEvent) ? t = e.loadingEvent.addEventListener(function () {
        t(), i._zoomPromise === n && (i._zoomTarget = e.entities.values.slice(0));
      }) : te(e) ? i._zoomTarget = e.slice(0) : (e = Z(e.values, e), Q(e.entities) && (e = e.entities.values), te(e) ? i._zoomTarget = e.slice(0) : i._zoomTarget = [e]));
    }), i.scene.requestRender(), n.promise;
  }

  function b(e) {
    e._zoomPromise = void 0, e._zoomTarget = void 0, e._zoomOptions = void 0;
  }

  function D(e) {
    var t = e._zoomPromise;
    Q(t) && (b(e), t.resolve(!1));
  }

  return i(De.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    bottomContainer: {
      get: function get() {
        return this._bottomContainer;
      }
    },
    pgEarthWidget: {
      get: function get() {
        return this._pgEarthWidget;
      }
    },
    selectionIndicator: {
      get: function get() {
        return this._selectionIndicator;
      }
    },
    infoBox: {
      get: function get() {
        return this._infoBox;
      }
    },
    geocoder: {
      get: function get() {
        return this._geocoder;
      }
    },
    homeButton: {
      get: function get() {
        return this._homeButton;
      }
    },
    sceneModePicker: {
      get: function get() {
        return this._sceneModePicker;
      }
    },
    projectionPicker: {
      get: function get() {
        return this._projectionPicker;
      }
    },
    baseLayerPicker: {
      get: function get() {
        return this._baseLayerPicker;
      }
    },
    navigationHelpButton: {
      get: function get() {
        return this._navigationHelpButton;
      }
    },
    animation: {
      get: function get() {
        return this._animation;
      }
    },
    timeline: {
      get: function get() {
        return this._timeline;
      }
    },
    fullscreenButton: {
      get: function get() {
        return this._fullscreenButton;
      }
    },
    vrButton: {
      get: function get() {
        return this._vrButton;
      }
    },
    dataSourceDisplay: {
      get: function get() {
        return this._dataSourceDisplay;
      }
    },
    entities: {
      get: function get() {
        return this._dataSourceDisplay.defaultDataSource.entities;
      }
    },
    dataSources: {
      get: function get() {
        return this._dataSourceCollection;
      }
    },
    canvas: {
      get: function get() {
        return this._pgEarthWidget.canvas;
      }
    },
    scene: {
      get: function get() {
        return this._pgEarthWidget.scene;
      }
    },
    shadows: {
      get: function get() {
        return this.scene.shadowMap.enabled;
      },
      set: function set(e) {
        this.scene.shadowMap.enabled = e;
      }
    },
    terrainShadows: {
      get: function get() {
        return this.scene.globe.shadows;
      },
      set: function set(e) {
        this.scene.globe.shadows = e;
      }
    },
    shadowMap: {
      get: function get() {
        return this.scene.shadowMap;
      }
    },
    imageryLayers: {
      get: function get() {
        return this.scene.imageryLayers;
      }
    },
    terrainProvider: {
      get: function get() {
        return this.scene.terrainProvider;
      },
      set: function set(e) {
        this.scene.terrainProvider = e;
      }
    },
    camera: {
      get: function get() {
        return this.scene.camera;
      }
    },
    postProcessStages: {
      get: function get() {
        return this.scene.postProcessStages;
      }
    },
    clock: {
      get: function get() {
        return this._clockViewModel.clock;
      }
    },
    clockViewModel: {
      get: function get() {
        return this._clockViewModel;
      }
    },
    screenSpaceEventHandler: {
      get: function get() {
        return this._pgEarthWidget.screenSpaceEventHandler;
      }
    },
    targetFrameRate: {
      get: function get() {
        return this._pgEarthWidget.targetFrameRate;
      },
      set: function set(e) {
        this._pgEarthWidget.targetFrameRate = e;
      }
    },
    useDefaultRenderLoop: {
      get: function get() {
        return this._pgEarthWidget.useDefaultRenderLoop;
      },
      set: function set(e) {
        this._pgEarthWidget.useDefaultRenderLoop = e;
      }
    },
    resolutionScale: {
      get: function get() {
        return this._pgEarthWidget.resolutionScale;
      },
      set: function set(e) {
        this._pgEarthWidget.resolutionScale = e, this._forceResize = !0;
      }
    },
    allowDataSourcesToSuspendAnimation: {
      get: function get() {
        return this._allowDataSourcesToSuspendAnimation;
      },
      set: function set(e) {
        this._allowDataSourcesToSuspendAnimation = e;
      }
    },
    trackedEntity: {
      get: function get() {
        return this._trackedEntity;
      },
      set: function set(e) {
        var t, i;
        this._trackedEntity !== e && (this._trackedEntity = e, D(this), i = (t = this.scene).mode, Q(e) && Q(e.position) ? this._needTrackedEntityUpdate = !0 : (this._needTrackedEntityUpdate = !1, i !== f.COLUMBUS_VIEW && i !== f.SCENE2D || (t.screenSpaceCameraController.enableTranslate = !0), i !== f.COLUMBUS_VIEW && i !== f.SCENE3D || (t.screenSpaceCameraController.enableTilt = !0), this._entityView = void 0, this.camera.lookAtTransform(_.IDENTITY)), this._trackedEntityChanged.raiseEvent(e), this.scene.requestRender());
      }
    },
    selectedEntity: {
      get: function get() {
        return this._selectedEntity;
      },
      set: function set(e) {
        var t;
        this._selectedEntity !== e && (this._selectedEntity = e, t = Q(this._selectionIndicator) ? this._selectionIndicator.viewModel : void 0, Q(e) ? Q(t) && t.animateAppear() : Q(t) && t.animateDepart(), this._selectedEntityChanged.raiseEvent(e));
      }
    },
    selectedEntityChanged: {
      get: function get() {
        return this._selectedEntityChanged;
      }
    },
    trackedEntityChanged: {
      get: function get() {
        return this._trackedEntityChanged;
      }
    },
    clockTrackedDataSource: {
      get: function get() {
        return this._clockTrackedDataSource;
      },
      set: function set(e) {
        this._clockTrackedDataSource !== e && (this._clockTrackedDataSource = e, w(this._timeline, this.clock, e));
      }
    }
  }), De.prototype.extend = function (e, t) {
    if (!Q(e)) throw new X("mixin is required.");
    e(this, t);
  }, De.prototype.resize = function () {
    var e,
        t,
        i,
        o,
        n,
        r,
        a,
        s,
        c,
        d,
        l,
        h,
        u,
        p = this._pgEarthWidget,
        m = this._container,
        g = m.clientWidth,
        _ = m.clientHeight,
        y = Q(this._animation),
        v = Q(this._timeline);
    !this._forceResize && g === this._lastWidth && _ === this._lastHeight || (p.resize(), this._forceResize = !1, e = _ - 125, t = this._baseLayerPickerDropDown, Q(t) && (t.style.maxHeight = e + "px"), Q(this._geocoder) && (this._geocoder.searchSuggestionsContainer.style.maxHeight = e + "px"), Q(this._infoBox) && (this._infoBox.viewModel.maxHeight = e), i = this._timeline, h = n = o = 0, y && "hidden" !== window.getComputedStyle(this._animation.container).visibility && (r = this._lastWidth, a = this._animation.container, 900 < g ? (o = 169, r <= 900 && (a.style.width = "169px", a.style.height = "112px", this._animation.resize())) : 600 <= g ? (o = 136, (r < 600 || 900 < r) && (a.style.width = "136px", a.style.height = "90px", this._animation.resize())) : (o = 106, (600 < r || 0 === r) && (a.style.width = "106px", a.style.height = "70px", this._animation.resize())), n = o + 5), v && "hidden" !== window.getComputedStyle(this._timeline.container).visibility && (s = this._fullscreenButton, c = this._vrButton, l = (d = i.container).style, h = d.clientHeight + 3, l.left = o + "px", u = 0, Q(s) && (u += s.container.clientWidth), Q(c) && (u += c.container.clientWidth), l.right = u + "px", i.resize()), this._bottomContainer.style.left = n + "px", this._bottomContainer.style.bottom = h + "px", this._lastWidth = g, this._lastHeight = _);
  }, De.prototype.forceResize = function () {
    this._lastWidth = 0, this.resize();
  }, De.prototype.render = function () {
    this._pgEarthWidget.render();
  }, De.prototype.isDestroyed = function () {
    return !1;
  }, De.prototype.destroy = function () {
    this.screenSpaceEventHandler.removeInputAction(oe.LEFT_CLICK), this.screenSpaceEventHandler.removeInputAction(oe.LEFT_DOUBLE_CLICK);

    for (var e = this.dataSources, t = e.length, i = 0; i < t; i++) {
      this._dataSourceRemoved(e, e.get(i));
    }

    return this._dataSourceRemoved(void 0, this._dataSourceDisplay.defaultDataSource), this._container.removeChild(this._element), this._element.removeChild(this._toolbar), this._eventHelper.removeAll(), Q(this._geocoder) && (this._geocoder = this._geocoder.destroy()), Q(this._homeButton) && (this._homeButton = this._homeButton.destroy()), Q(this._sceneModePicker) && (this._sceneModePicker = this._sceneModePicker.destroy()), Q(this._projectionPicker) && (this._projectionPicker = this._projectionPicker.destroy()), Q(this._baseLayerPicker) && (this._baseLayerPicker = this._baseLayerPicker.destroy()), Q(this._animation) && (this._element.removeChild(this._animation.container), this._animation = this._animation.destroy()), Q(this._timeline) && (this._timeline.removeEventListener("settime", Be, !1), this._element.removeChild(this._timeline.container), this._timeline = this._timeline.destroy()), Q(this._fullscreenButton) && (this._fullscreenSubscription.dispose(), this._element.removeChild(this._fullscreenButton.container), this._fullscreenButton = this._fullscreenButton.destroy()), Q(this._vrButton) && (this._vrSubscription.dispose(), this._vrModeSubscription.dispose(), this._element.removeChild(this._vrButton.container), this._vrButton = this._vrButton.destroy()), Q(this._infoBox) && (this._element.removeChild(this._infoBox.container), this._infoBox = this._infoBox.destroy()), Q(this._selectionIndicator) && (this._element.removeChild(this._selectionIndicator.container), this._selectionIndicator = this._selectionIndicator.destroy()), this._destroyClockViewModel && (this._clockViewModel = this._clockViewModel.destroy()), this._dataSourceDisplay = this._dataSourceDisplay.destroy(), this._pgEarthWidget = this._pgEarthWidget.destroy(), this._destroyDataSourceCollection && (this._dataSourceCollection = this._dataSourceCollection.destroy()), o(this);
  }, De.prototype._dataSourceAdded = function (e, t) {
    t.entities.collectionChanged.addEventListener(De.prototype._onEntityCollectionChanged, this);
  }, De.prototype._dataSourceRemoved = function (e, t) {
    var i = t.entities;
    i.collectionChanged.removeEventListener(De.prototype._onEntityCollectionChanged, this), Q(this.trackedEntity) && i.getById(this.trackedEntity.id) === this.trackedEntity && (this.trackedEntity = void 0), Q(this.selectedEntity) && i.getById(this.selectedEntity.id) === this.selectedEntity && (this.selectedEntity = void 0);
  }, De.prototype._onTick = function (e) {
    var t = e.currentTime,
        i = this._dataSourceDisplay.update(t);

    this._allowDataSourcesToSuspendAnimation && (this._clockViewModel.canAnimate = i);
    var o,
        n,
        r = this._entityView;
    Q(r) && (o = this._trackedEntity, this._dataSourceDisplay.getBoundingSphere(o, !1, S) === y.DONE && r.update(t, S));

    var a = !1,
        s = this.selectedEntity,
        c = Q(s) && this._enableInfoOrSelection;

    c && s.isShowing && s.isAvailable(t) && (this._dataSourceDisplay.getBoundingSphere(s, !0, S) !== y.FAILED ? n = S.center : Q(s.position) && (n = s.position.getValue(t, n)), a = Q(n));
    var d = Q(this._selectionIndicator) ? this._selectionIndicator.viewModel : void 0;
    Q(d) && (d.position = h.clone(n, d.position), d.showSelection = c && a, d.update());
    var l = Q(this._infoBox) ? this._infoBox.viewModel : void 0;
    Q(l) && (l.showInfo = c && s._description, l.enableCamera = a, l.isCameraTracking = this.trackedEntity === this.selectedEntity, c ? (l.titleText = Z(s.name, s.id), l.description = ae.getValueOrDefault(s.description, t, "")) : (l.titleText = "", l.description = ""));
  }, De.prototype._onEntityCollectionChanged = function (e, t, i) {
    for (var o = i.length, n = 0; n < o; n++) {
      var r = i[n];
      this.trackedEntity === r && (this.trackedEntity = void 0), this.selectedEntity === r && (this.selectedEntity = void 0);
    }
  }, De.prototype._onInfoBoxCameraClicked = function (e) {
    var t;
    e.isCameraTracking && this.trackedEntity === this.selectedEntity ? this.trackedEntity = void 0 : (t = this.selectedEntity.position, Q(t) ? this.trackedEntity = this.selectedEntity : this.zoomTo(this.selectedEntity));
  }, De.prototype._clearTrackedObject = function () {
    this.trackedEntity = void 0;
  }, De.prototype._onInfoBoxClockClicked = function (e) {
    this.selectedEntity = void 0;
  }, De.prototype._clearObjects = function () {
    this.trackedEntity = void 0, this.selectedEntity = void 0;
  }, De.prototype._onDataSourceChanged = function (e) {
    this.clockTrackedDataSource === e && w(this.timeline, this.clock, e);
  }, De.prototype._onDataSourceAdded = function (e, t) {
    this._automaticallyTrackDataSourceClocks && (this.clockTrackedDataSource = t);

    var i = t.entities.id,
        o = this._eventHelper.add(t.changedEvent, De.prototype._onDataSourceChanged, this);

    this._dataSourceChangedListeners[i] = o;
  }, De.prototype._onDataSourceRemoved = function (e, t) {
    var i,
        o = this.clockTrackedDataSource === t,
        n = t.entities.id;
    this._dataSourceChangedListeners[n](), this._dataSourceChangedListeners[n] = void 0, o && (i = e.length, this._automaticallyTrackDataSourceClocks && 0 < i ? this.clockTrackedDataSource = e.get(i - 1) : this.clockTrackedDataSource = void 0);
  }, De.prototype.zoomTo = function (e, t) {
    return B(this, e, {
      offset: t
    }, !1);
  }, De.prototype.flyTo = function (e, t) {
    return B(this, e, t, !0);
  }, De.prototype._postRender = function () {
    !function (t) {
      var i = t._zoomTarget;
      if (!Q(i) || t.scene.mode === f.MORPHING) return;
      var o,
          e,
          n = t.scene,
          r = n.camera,
          a = t._zoomPromise,
          s = Z(t._zoomOptions, {});
      if (i instanceof v) return i.readyPromise.then(function () {
        var e = i.boundingSphere;
        Q(s.offset) || (s.offset = new g(0, -.5, e.radius)), o = {
          offset: s.offset,
          duration: s.duration,
          maximumHeight: s.maximumHeight,
          complete: function complete() {
            a.resolve(!0);
          },
          cancel: function cancel() {
            a.resolve(!1);
          }
        }, t._zoomIsFlight ? r.flyToBoundingSphere(i.boundingSphere, o) : (r.viewBoundingSphere(e, s.offset), r.lookAtTransform(_.IDENTITY), a.resolve(!0)), b(t);
      });
      if (i instanceof E) return i.readyPromise.then(function () {
        var e = i.boundingSphere;
        Q(s.offset) || (s.offset = new g(0, -.5, e.radius)), o = {
          offset: s.offset,
          duration: s.duration,
          maximumHeight: s.maximumHeight,
          complete: function complete() {
            a.resolve(!0);
          },
          cancel: function cancel() {
            a.resolve(!1);
          }
        }, t._zoomIsFlight ? r.flyToBoundingSphere(e, o) : (r.viewBoundingSphere(e, s.offset), r.lookAtTransform(_.IDENTITY), a.resolve(!0)), b(t);
      });
      if (i instanceof m) return o = {
        destination: n.mapProjection.ellipsoid.cartographicToCartesian(i),
        duration: s.duration,
        maximumHeight: s.maximumHeight,
        complete: function complete() {
          a.resolve(!0);
        },
        cancel: function cancel() {
          a.resolve(!1);
        }
      }, t._zoomIsFlight ? r.flyTo(o) : (r.setView(o), a.resolve(!0)), b(t);

      for (var c = i, d = [], l = 0, h = c.length; l < h; l++) {
        var u = t._dataSourceDisplay.getBoundingSphere(c[l], !1, S);

        if (u === y.PENDING) return;
        u !== y.FAILED && d.push(p.clone(S));
      }

      if (0 === d.length) return D(t);
      t.trackedEntity = void 0, e = p.fromBoundingSpheres(d), t._zoomIsFlight ? (b(t), r.flyToBoundingSphere(e, {
        duration: s.duration,
        maximumHeight: s.maximumHeight,
        complete: function complete() {
          a.resolve(!0);
        },
        cancel: function cancel() {
          a.resolve(!1);
        },
        offset: s.offset
      })) : (r.viewBoundingSphere(e, s.offset), r.lookAtTransform(_.IDENTITY), b(t), a.resolve(!0));
    }(this), function (e) {
      if (!e._needTrackedEntityUpdate) return;
      var t = e._trackedEntity,
          i = e.clock.currentTime,
          o = ae.getValueOrUndefined(t.position, i);
      if (!Q(o)) return;

      var n = e.scene,
          r = e._dataSourceDisplay.getBoundingSphere(t, !1, S);

      if (r === y.PENDING) return;
      var a = n.mode;
      a !== f.COLUMBUS_VIEW && a !== f.SCENE2D || (n.screenSpaceCameraController.enableTranslate = !1);
      a !== f.COLUMBUS_VIEW && a !== f.SCENE3D || (n.screenSpaceCameraController.enableTilt = !1);
      var s = r !== y.FAILED ? S : void 0;
      e._entityView = new c(t, n, n.mapProjection.ellipsoid), e._entityView.update(i, s), e._needTrackedEntityUpdate = !1;
    }(this);
  }, De;
});