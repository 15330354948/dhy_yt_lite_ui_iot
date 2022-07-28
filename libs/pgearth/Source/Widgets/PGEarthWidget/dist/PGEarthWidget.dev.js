"use strict";

define(["../../Core/buildModuleUrl", "../../Core/Cartesian3", "../../Core/Clock", "../../Core/defaultValue", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/Ellipsoid", "../../Core/FeatureDetection", "../../Core/formatError", "../../Core/requestAnimationFrame", "../../Core/ScreenSpaceEventHandler", "../../Scene/createWorldImagery", "../../Scene/Globe", "../../Scene/Moon", "../../Scene/Scene", "../../Scene/SceneMode", "../../Scene/ShadowMode", "../../Scene/SkyAtmosphere", "../../Scene/SkyBox", "../../Scene/Sun", "../getElement"], function (t, v, _, f, w, e, r, E, R, C, g, s, y, L, S, P, b, x, D, k, N, M, z) {
  "use strict";

  function H(e) {
    return t("Assets/Textures/SkyBox/tycho2t3_80_" + e + ".jpg");
  }

  function n(o) {
    o._renderLoopRunning = !0;
    var a = 0;
    s(function e(t) {
      if (!o.isDestroyed()) if (o._useDefaultRenderLoop) try {
        var r,
            n,
            i = o._targetFrameRate;
        w(i) ? (r = 1e3 / i) < (n = t - a) && (o.resize(), o.render(), a = t - n % r) : (o.resize(), o.render()), s(e);
      } catch (e) {
        o._useDefaultRenderLoop = !1, o._renderLoopRunning = !1, o._showRenderLoopErrors && o.showErrorPanel("An error occurred while rendering.  Rendering has stopped.", void 0, e);
      } else o._renderLoopRunning = !1;
    });
  }

  function T(e) {
    var t = e._canvas,
        r = t.clientWidth,
        n = t.clientHeight,
        i = e._resolutionScale;
    e._supportsImageRenderingPixelated || (i *= f(window.devicePixelRatio, 1)), e._canvasWidth = r, e._canvasHeight = n, r *= i, n *= i, t.width = r, t.height = n, e._canRender = 0 !== r && 0 !== n;
  }

  function V(e) {
    var t,
        r = e._canvas,
        n = r.width,
        i = r.height;
    0 !== n && 0 !== i && (t = e._scene.camera.frustum, w(t.aspectRatio) ? t.aspectRatio = n / i : (t.top = t.right * (i / n), t.bottom = -t.top));
  }

  function i(e, t) {
    if (!w(e)) throw new E("container is required.");
    e = z(e), t = f(t, {});
    var r = document.createElement("div");
    r.className = "pgEarth-widget", e.appendChild(r);
    var n = document.createElement("canvas"),
        i = C.supportsImageRenderingPixelated();
    (this._supportsImageRenderingPixelated = i) && (n.style.imageRendering = C.imageRenderingValue()), n.oncontextmenu = function () {
      return !1;
    }, n.onselectstart = function () {
      return !1;
    }, r.appendChild(n);
    var o = document.createElement("div");
    o.className = "pgEarth-widget-credits";
    var a = w(t.creditContainer) ? z(t.creditContainer) : r;
    a.appendChild(o);
    var s = w(t.creditViewport) ? z(t.creditViewport) : r,
        c = f(t.showRenderLoopErrors, !0);
    this._element = r, this._container = e, this._canvas = n, this._canvasWidth = 0, this._canvasHeight = 0, this._creditViewport = s, this._creditContainer = a, this._innerCreditContainer = o, this._canRender = !1, this._renderLoopRunning = !1, this._showRenderLoopErrors = c, this._resolutionScale = 1, this._forceResize = !1, this._clock = w(t.clock) ? t.clock : new _(), T(this);

    try {
      var d = new b({
        canvas: n,
        contextOptions: t.contextOptions,
        creditContainer: o,
        creditViewport: s,
        mapProjection: t.mapProjection,
        orderIndependentTranslucency: t.orderIndependentTranslucency,
        scene3DOnly: f(t.scene3DOnly, !1),
        terrainExaggeration: t.terrainExaggeration,
        shadows: t.shadows,
        mapMode2D: t.mapMode2D,
        requestRenderMode: t.requestRenderMode,
        maximumRenderTimeChange: t.maximumRenderTimeChange
      });
      (this._scene = d).camera.constrainedAxis = v.UNIT_Z, V(this);
      var h = f(d.mapProjection.ellipsoid, R.WGS84),
          u = t.globe;
      w(u) || (u = new S(h)), !1 !== u && (d.globe = u, d.globe.shadows = f(t.terrainShadows, D.RECEIVE_ONLY));
      var l = t.skyBox;
      w(l) || (l = new N({
        sources: {
          positiveX: H("px"),
          negativeX: H("mx"),
          positiveY: H("py"),
          negativeY: H("my"),
          positiveZ: H("pz"),
          negativeZ: H("mz")
        }
      })), !1 !== l && (d.skyBox = l, d.sun = new M(), d.moon = new P());
      var p = t.skyAtmosphere;
      w(p) || (p = new k(h)), !1 !== p && (d.skyAtmosphere = p);
      var g = !1 !== t.globe && t.imageryProvider;
      w(g) || (g = L()), !1 !== g && d.imageryLayers.addImageryProvider(g), w(t.terrainProvider) && !1 !== t.globe && (d.terrainProvider = t.terrainProvider), this._screenSpaceEventHandler = new y(n, !1), w(t.sceneMode) && (t.sceneMode === x.SCENE2D && this._scene.morphTo2D(0), t.sceneMode === x.COLUMBUS_VIEW && this._scene.morphToColumbusView(0)), this._useDefaultRenderLoop = void 0, this.useDefaultRenderLoop = f(t.useDefaultRenderLoop, !0), this._targetFrameRate = void 0, this.targetFrameRate = t.targetFrameRate;
      var m = this;
      d.renderError.addEventListener(function (e, t) {
        m._useDefaultRenderLoop = !1, m._renderLoopRunning = !1, m._showRenderLoopErrors && m.showErrorPanel("An error occurred while rendering.  Rendering has stopped.", void 0, t);
      });
    } catch (e) {
      throw c && this.showErrorPanel("Error constructing PGEarthWidget.", 'Visit <a href="http://get.webgl.org">http://get.webgl.org</a> to verify that your web browser and hardware support WebGL.  Consider trying a different web browser or updating your video drivers.  Detailed error information is below:', e), e;
    }
  }

  return e(i.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    canvas: {
      get: function get() {
        return this._canvas;
      }
    },
    creditContainer: {
      get: function get() {
        return this._creditContainer;
      }
    },
    creditViewport: {
      get: function get() {
        return this._creditViewport;
      }
    },
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    imageryLayers: {
      get: function get() {
        return this._scene.imageryLayers;
      }
    },
    terrainProvider: {
      get: function get() {
        return this._scene.terrainProvider;
      },
      set: function set(e) {
        this._scene.terrainProvider = e;
      }
    },
    camera: {
      get: function get() {
        return this._scene.camera;
      }
    },
    clock: {
      get: function get() {
        return this._clock;
      }
    },
    screenSpaceEventHandler: {
      get: function get() {
        return this._screenSpaceEventHandler;
      }
    },
    targetFrameRate: {
      get: function get() {
        return this._targetFrameRate;
      },
      set: function set(e) {
        if (e <= 0) throw new E("targetFrameRate must be greater than 0, or undefined.");
        this._targetFrameRate = e;
      }
    },
    useDefaultRenderLoop: {
      get: function get() {
        return this._useDefaultRenderLoop;
      },
      set: function set(e) {
        this._useDefaultRenderLoop !== e && (this._useDefaultRenderLoop = e) && !this._renderLoopRunning && n(this);
      }
    },
    resolutionScale: {
      get: function get() {
        return this._resolutionScale;
      },
      set: function set(e) {
        if (e <= 0) throw new E("resolutionScale must be greater than 0.");
        this._resolutionScale = e, this._forceResize = !0;
      }
    }
  }), i.prototype.showErrorPanel = function (e, t, r) {
    var n = this._element,
        i = document.createElement("div");
    i.className = "pgEarth-widget-errorPanel";
    var o = document.createElement("div");
    o.className = "pgEarth-widget-errorPanel-content", i.appendChild(o);
    var a = document.createElement("div");
    a.className = "pgEarth-widget-errorPanel-header", a.appendChild(document.createTextNode(e)), o.appendChild(a);
    var s,
        c = document.createElement("div");

    function d() {
      c.style.maxHeight = Math.max(Math.round(.9 * n.clientHeight - 100), 30) + "px";
    }

    c.className = "pgEarth-widget-errorPanel-scroll", o.appendChild(c), d(), w(window.addEventListener) && window.addEventListener("resize", d, !1), w(t) && ((s = document.createElement("div")).className = "pgEarth-widget-errorPanel-message", s.innerHTML = "<p>" + t + "</p>", c.appendChild(s));
    var h = "(no error details available)";
    w(r) && (h = g(r));
    var u = document.createElement("div");
    u.className = "pgEarth-widget-errorPanel-message", u.appendChild(document.createTextNode(h)), c.appendChild(u);
    var l = document.createElement("div");
    l.className = "pgEarth-widget-errorPanel-buttonPanel", o.appendChild(l);
    var p = document.createElement("button");
    p.setAttribute("type", "button"), p.className = "pgEarth-button", p.appendChild(document.createTextNode("OK")), p.onclick = function () {
      w(d) && w(window.removeEventListener) && window.removeEventListener("resize", d, !1), n.removeChild(i);
    }, l.appendChild(p), n.appendChild(i), "undefined" != typeof console && console.error(e + "\n" + t + "\n" + h);
  }, i.prototype.isDestroyed = function () {
    return !1;
  }, i.prototype.destroy = function () {
    this._scene = this._scene && this._scene.destroy(), this._container.removeChild(this._element), this._creditContainer.removeChild(this._innerCreditContainer), r(this);
  }, i.prototype.resize = function () {
    var e = this._canvas,
        t = e.clientWidth,
        r = e.clientHeight;
    !this._forceResize && this._canvasWidth === t && this._canvasHeight === r || (this._forceResize = !1, T(this), V(this), this._scene.requestRender());
  }, i.prototype.render = function () {
    var e;
    this._canRender ? (this._scene.initializeFrame(), e = this._clock.tick(), this._scene.render(e)) : this._clock.tick();
  }, i;
});