"use strict";

define(["../../Core/Check", "../../Core/Color", "../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/ScreenSpaceEventHandler", "../../Core/ScreenSpaceEventType", "../../Scene/PGEarth3DTileColorBlendMode", "../../Scene/PGEarth3DTileFeature", "../../Scene/PGEarth3DTilePass", "../../Scene/PGEarth3DTileset", "../../Scene/PGEarth3DTileStyle", "../../Scene/PerformanceDisplay", "../../ThirdParty/knockout"], function (q, i, B, e, r, A, I, H, U, s, z, t, G, K) {
  "use strict";

  function j(i, e) {
    e ? i._eventHandler.setInputAction(function (e) {
      var t = i._scene.pick(e.endPosition);

      B(t) && t.primitive instanceof z && (i.tileset = t.primitive);
    }, I.MOUSE_MOVE) : (i._eventHandler.removeInputAction(I.MOUSE_MOVE), i.picking = i.picking);
  }

  var n = {
    maximumFractionDigits: 3
  };

  function o(e) {
    var t = e / 1048576;
    return t < 1 ? t.toLocaleString(void 0, n) : Math.round(t).toLocaleString();
  }

  function l(e, t) {
    if (!B(e)) return "";
    var i = t ? e._statisticsPerPass[s.PICK] : e._statisticsPerPass[s.RENDER],
        r = '<ul class="pgEarth-pgEarthInspector-statistics">';
    return r += "<li><strong>Visited: </strong>" + i.visited.toLocaleString() + "</li><li><strong>Selected: </strong>" + i.selected.toLocaleString() + "</li><li><strong>Commands: </strong>" + i.numberOfCommands.toLocaleString() + "</li>", r += "</ul>", t || (r += '<ul class="pgEarth-pgEarthInspector-statistics">', r += "<li><strong>Requests: </strong>" + i.numberOfPendingRequests.toLocaleString() + "</li><li><strong>Attempted: </strong>" + i.numberOfAttemptedRequests.toLocaleString() + "</li><li><strong>Processing: </strong>" + i.numberOfTilesProcessing.toLocaleString() + "</li><li><strong>Content Ready: </strong>" + i.numberOfTilesWithContentReady.toLocaleString() + "</li><li><strong>Total: </strong>" + i.numberOfTilesTotal.toLocaleString() + "</li>", r += "</ul>", r += '<ul class="pgEarth-pgEarthInspector-statistics">', r += "<li><strong>Features Selected: </strong>" + i.numberOfFeaturesSelected.toLocaleString() + "</li><li><strong>Features Loaded: </strong>" + i.numberOfFeaturesLoaded.toLocaleString() + "</li><li><strong>Points Selected: </strong>" + i.numberOfPointsSelected.toLocaleString() + "</li><li><strong>Points Loaded: </strong>" + i.numberOfPointsLoaded.toLocaleString() + "</li><li><strong>Triangles Selected: </strong>" + i.numberOfTrianglesSelected.toLocaleString() + "</li>", r += "</ul>", r += '<ul class="pgEarth-pgEarthInspector-statistics">', r += "<li><strong>Tiles styled: </strong>" + i.numberOfTilesStyled.toLocaleString() + "</li><li><strong>Features styled: </strong>" + i.numberOfFeaturesStyled.toLocaleString() + "</li>", r += "</ul>", r += '<ul class="pgEarth-pgEarthInspector-statistics">', r += "<li><strong>Children Union Culled: </strong>" + i.numberOfTilesCulledWithChildrenUnion.toLocaleString() + "</li>", r += "</ul>", r += '<ul class="pgEarth-pgEarthInspector-statistics">', r += "<li><strong>Geometry Memory (MB): </strong>" + o(i.geometryByteLength) + "</li><li><strong>Texture Memory (MB): </strong>" + o(i.texturesByteLength) + "</li><li><strong>Batch Table Memory (MB): </strong>" + o(i.batchTableByteLength) + "</li>", r += "</ul>"), r;
  }

  var a = [{
    text: "Highlight",
    value: H.HIGHLIGHT
  }, {
    text: "Replace",
    value: H.REPLACE
  }, {
    text: "Mix",
    value: H.MIX
  }],
      c = new i(1, 1, 0, .4),
      u = new i(),
      h = new i();

  function d(r, e) {
    q.typeOf.object("scene", r), q.typeOf.object("performanceContainer", e);
    var s = this,
        t = r.canvas;
    this._eventHandler = new A(t), this._scene = r, this._performanceContainer = e, this._canvas = t, this._performanceDisplay = new G({
      container: e
    }), this._statisticsText = "", this._pickStatisticsText = "", this._editorError = "", this.performance = !1, this.showStatistics = !0, this.showPickStatistics = !0, this.inspectorVisible = !0, this.tilesetVisible = !1, this.displayVisible = !1, this.updateVisible = !1, this.loggingVisible = !1, this.styleVisible = !1, this.tileDebugLabelsVisible = !1, this.optimizationVisible = !1, this.styleString = "{}", this._tileset = void 0, this._feature = void 0, this._tile = void 0, K.track(this, ["performance", "inspectorVisible", "_statisticsText", "_pickStatisticsText", "_editorError", "showPickStatistics", "showStatistics", "tilesetVisible", "displayVisible", "updateVisible", "loggingVisible", "styleVisible", "optimizationVisible", "tileDebugLabelsVisible", "styleString", "_feature", "_tile"]), this._properties = K.observable({}), this.properties = [], K.defineProperty(this, "properties", function () {
      var e = [],
          t = s._properties();

      for (var i in t) {
        t.hasOwnProperty(i) && e.push(i);
      }

      return e;
    });
    var i = K.observable();
    K.defineProperty(this, "dynamicScreenSpaceError", {
      get: function get() {
        return i();
      },
      set: function set(e) {
        i(e), B(s._tileset) && (s._tileset.dynamicScreenSpaceError = e);
      }
    }), this.dynamicScreenSpaceError = !1;
    var n = K.observable();
    K.defineProperty(this, "colorBlendMode", {
      get: function get() {
        return n();
      },
      set: function set(e) {
        n(e), B(s._tileset) && (s._tileset.colorBlendMode = e, s._scene.requestRender());
      }
    }), this.colorBlendMode = H.HIGHLIGHT;
    var o = K.observable();
    K.defineProperty(this, "picking", {
      get: function get() {
        return o();
      },
      set: function set(e) {
        o(e), e ? s._eventHandler.setInputAction(function (e) {
          var t,
              i = r.pick(e.endPosition);
          i instanceof U ? (s.feature = i, s.tile = i.content.tile) : B(i) && B(i.content) ? (s.feature = void 0, s.tile = i.content.tile) : (s.feature = void 0, s.tile = void 0), B(s._tileset) && (g && B(i) && B(i.content) ? (r.pickPositionSupported && (t = r.pickPosition(e.endPosition), B(t) && (s._tileset.debugPickPosition = t)), s._tileset.debugPickedTile = i.content.tile) : s._tileset.debugPickedTile = void 0, s._scene.requestRender());
        }, I.MOUSE_MOVE) : (s.feature = void 0, s.tile = void 0, s._eventHandler.removeInputAction(I.MOUSE_MOVE));
      }
    }), this.picking = !0;
    var l = K.observable();
    K.defineProperty(this, "colorize", {
      get: function get() {
        return l();
      },
      set: function set(e) {
        l(e), B(s._tileset) && (s._tileset.debugColorizeTiles = e, s._scene.requestRender());
      }
    }), this.colorize = !1;
    var a = K.observable();
    K.defineProperty(this, "wireframe", {
      get: function get() {
        return a();
      },
      set: function set(e) {
        a(e), B(s._tileset) && (s._tileset.debugWireframe = e, s._scene.requestRender());
      }
    }), this.wireframe = !1;
    var c = K.observable();
    K.defineProperty(this, "showBoundingVolumes", {
      get: function get() {
        return c();
      },
      set: function set(e) {
        c(e), B(s._tileset) && (s._tileset.debugShowBoundingVolume = e, s._scene.requestRender());
      }
    }), this.showBoundingVolumes = !1;
    var u = K.observable();
    K.defineProperty(this, "showContentBoundingVolumes", {
      get: function get() {
        return u();
      },
      set: function set(e) {
        u(e), B(s._tileset) && (s._tileset.debugShowContentBoundingVolume = e, s._scene.requestRender());
      }
    }), this.showContentBoundingVolumes = !1;
    var h = K.observable();
    K.defineProperty(this, "showRequestVolumes", {
      get: function get() {
        return h();
      },
      set: function set(e) {
        h(e), B(s._tileset) && (s._tileset.debugShowViewerRequestVolume = e, s._scene.requestRender());
      }
    }), this.showRequestVolumes = !1;
    var d = K.observable();
    K.defineProperty(this, "freezeFrame", {
      get: function get() {
        return d();
      },
      set: function set(e) {
        d(e), B(s._tileset) && (s._tileset.debugFreezeFrame = e, s._scene.debugShowFrustumPlanes = e, s._scene.requestRender());
      }
    }), this.freezeFrame = !1;
    var g = K.observable();
    K.defineProperty(this, "showOnlyPickedTileDebugLabel", {
      get: function get() {
        return g();
      },
      set: function set(e) {
        g(e), B(s._tileset) && (s._tileset.debugPickedTileLabelOnly = e, s._scene.requestRender());
      }
    }), this.showOnlyPickedTileDebugLabel = !1;
    var p = K.observable();
    K.defineProperty(this, "showGeometricError", {
      get: function get() {
        return p();
      },
      set: function set(e) {
        p(e), B(s._tileset) && (s._tileset.debugShowGeometricError = e, s._scene.requestRender());
      }
    }), this.showGeometricError = !1;
    var f = K.observable();
    K.defineProperty(this, "showRenderingStatistics", {
      get: function get() {
        return f();
      },
      set: function set(e) {
        f(e), B(s._tileset) && (s._tileset.debugShowRenderingStatistics = e, s._scene.requestRender());
      }
    }), this.showRenderingStatistics = !1;
    var m = K.observable();
    K.defineProperty(this, "showMemoryUsage", {
      get: function get() {
        return m();
      },
      set: function set(e) {
        m(e), B(s._tileset) && (s._tileset.debugShowMemoryUsage = e, s._scene.requestRender());
      }
    }), this.showMemoryUsage = !1;
    var S = K.observable();
    K.defineProperty(this, "showUrl", {
      get: function get() {
        return S();
      },
      set: function set(e) {
        S(e), B(s._tileset) && (s._tileset.debugShowUrl = e, s._scene.requestRender());
      }
    }), this.showUrl = !1;
    var y = K.observable();
    K.defineProperty(this, "maximumScreenSpaceError", {
      get: function get() {
        return y();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (y(e), B(s._tileset) && (s._tileset.maximumScreenSpaceError = e));
      }
    }), this.maximumScreenSpaceError = 16;
    var b = K.observable();
    K.defineProperty(this, "dynamicScreenSpaceErrorDensity", {
      get: function get() {
        return b();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (b(e), B(s._tileset) && (s._tileset.dynamicScreenSpaceErrorDensity = e));
      }
    }), this.dynamicScreenSpaceErrorDensity = .00278, this.dynamicScreenSpaceErrorDensitySliderValue = void 0, K.defineProperty(this, "dynamicScreenSpaceErrorDensitySliderValue", {
      get: function get() {
        return Math.pow(b(), 1 / 6);
      },
      set: function set(e) {
        b(Math.pow(e, 6));
      }
    });
    var v = K.observable();
    K.defineProperty(this, "dynamicScreenSpaceErrorFactor", {
      get: function get() {
        return v();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (v(e), B(s._tileset) && (s._tileset.dynamicScreenSpaceErrorFactor = e));
      }
    }), this.dynamicScreenSpaceErrorFactor = 4;

    var _,
        E = (_ = this, function (e) {
      var t = _._scene.pick(e.position);

      B(t) && t.primitive instanceof z && (_.tileset = t.primitive), _.pickActive = !1;
    }),
        L = K.observable();

    K.defineProperty(this, "pickActive", {
      get: function get() {
        return L();
      },
      set: function set(e) {
        L(e), e ? s._eventHandler.setInputAction(E, I.LEFT_CLICK) : s._eventHandler.removeInputAction(I.LEFT_CLICK);
      }
    });
    var P = K.observable();
    K.defineProperty(this, "pointCloudShading", {
      get: function get() {
        return P();
      },
      set: function set(e) {
        P(e), B(s._tileset) && (s._tileset.pointCloudShading.attenuation = e);
      }
    }), this.pointCloudShading = !1;
    var D = K.observable();
    K.defineProperty(this, "geometricErrorScale", {
      get: function get() {
        return D();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (D(e), B(s._tileset) && (s._tileset.pointCloudShading.geometricErrorScale = e));
      }
    }), this.geometricErrorScale = 1;
    var w = K.observable();
    K.defineProperty(this, "maximumAttenuation", {
      get: function get() {
        return w();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (w(e), B(s._tileset) && (s._tileset.pointCloudShading.maximumAttenuation = 0 === e ? void 0 : e));
      }
    }), this.maximumAttenuation = 0;
    var k = K.observable();
    K.defineProperty(this, "baseResolution", {
      get: function get() {
        return k();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (k(e), B(s._tileset) && (s._tileset.pointCloudShading.baseResolution = 0 === e ? void 0 : e));
      }
    }), this.baseResolution = 0;
    var V = K.observable();
    K.defineProperty(this, "eyeDomeLighting", {
      get: function get() {
        return V();
      },
      set: function set(e) {
        V(e), B(s._tileset) && (s._tileset.pointCloudShading.eyeDomeLighting = e);
      }
    }), this.eyeDomeLighting = !1;
    var R = K.observable();
    K.defineProperty(this, "eyeDomeLightingStrength", {
      get: function get() {
        return R();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (R(e), B(s._tileset) && (s._tileset.pointCloudShading.eyeDomeLightingStrength = e));
      }
    }), this.eyeDomeLightingStrength = 1;
    var C = K.observable();
    K.defineProperty(this, "eyeDomeLightingRadius", {
      get: function get() {
        return C();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (C(e), B(s._tileset) && (s._tileset.pointCloudShading.eyeDomeLightingRadius = e));
      }
    }), this.eyeDomeLightingRadius = 1, this.pickActive = !1;
    var T = K.observable();
    K.defineProperty(this, "skipLevelOfDetail", {
      get: function get() {
        return T();
      },
      set: function set(e) {
        T(e), B(s._tileset) && (s._tileset.skipLevelOfDetail = e);
      }
    }), this.skipLevelOfDetail = !0;
    var O = K.observable();
    K.defineProperty(this, "skipScreenSpaceErrorFactor", {
      get: function get() {
        return O();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (O(e), B(s._tileset) && (s._tileset.skipScreenSpaceErrorFactor = e));
      }
    }), this.skipScreenSpaceErrorFactor = 16;
    var N = K.observable();
    K.defineProperty(this, "baseScreenSpaceError", {
      get: function get() {
        return N();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (N(e), B(s._tileset) && (s._tileset.baseScreenSpaceError = e));
      }
    }), this.baseScreenSpaceError = 1024;
    var x = K.observable();
    K.defineProperty(this, "skipLevels", {
      get: function get() {
        return x();
      },
      set: function set(e) {
        e = Number(e), isNaN(e) || (x(e), B(s._tileset) && (s._tileset.skipLevels = e));
      }
    }), this.skipLevels = 1;
    var M = K.observable();
    K.defineProperty(this, "immediatelyLoadDesiredLevelOfDetail", {
      get: function get() {
        return M();
      },
      set: function set(e) {
        M(e), B(s._tileset) && (s._tileset.immediatelyLoadDesiredLevelOfDetail = e);
      }
    }), this.immediatelyLoadDesiredLevelOfDetail = !1;
    var F = K.observable();
    K.defineProperty(this, "loadSiblings", {
      get: function get() {
        return F();
      },
      set: function set(e) {
        F(e), B(s._tileset) && (s._tileset.loadSiblings = e);
      }
    }), this.loadSiblings = !1, this._style = void 0, this._shouldStyle = !1, this._definedProperties = ["properties", "dynamicScreenSpaceError", "colorBlendMode", "picking", "colorize", "wireframe", "showBoundingVolumes", "showContentBoundingVolumes", "showRequestVolumes", "freezeFrame", "maximumScreenSpaceError", "dynamicScreenSpaceErrorDensity", "baseScreenSpaceError", "skipScreenSpaceErrorFactor", "skipLevelOfDetail", "skipLevels", "immediatelyLoadDesiredLevelOfDetail", "loadSiblings", "dynamicScreenSpaceErrorDensitySliderValue", "dynamicScreenSpaceErrorFactor", "pickActive", "showOnlyPickedTileDebugLabel", "showGeometricError", "showRenderingStatistics", "showMemoryUsage", "showUrl", "pointCloudShading", "geometricErrorScale", "maximumAttenuation", "baseResolution", "eyeDomeLighting", "eyeDomeLightingStrength", "eyeDomeLightingRadius"], this._removePostRenderEvent = r.postRender.addEventListener(function () {
      s._update();
    }), B(this._tileset) || j(this, !0);
  }

  function g(e) {
    if (0 < e.featuresLength) return 1;
    var t = e.innerContents;

    if (B(t)) {
      for (var i = t.length, r = 0; r < i; ++r) {
        if (!g(t[r])) return;
      }

      return 1;
    }
  }

  return e(d.prototype, {
    scene: {
      get: function get() {
        return this._scene;
      }
    },
    performanceContainer: {
      get: function get() {
        return this._performanceContainer;
      }
    },
    statisticsText: {
      get: function get() {
        return this._statisticsText;
      }
    },
    pickStatisticsText: {
      get: function get() {
        return this._pickStatisticsText;
      }
    },
    colorBlendModes: {
      get: function get() {
        return a;
      }
    },
    editorError: {
      get: function get() {
        return this._editorError;
      }
    },
    tileset: {
      get: function get() {
        return this._tileset;
      },
      set: function set(e) {
        if (this._tileset = e, this._style = void 0, this.styleString = "{}", this.feature = void 0, this.tile = void 0, B(e)) {
          var t = this;
          e.readyPromise.then(function (e) {
            t.isDestroyed() || t._properties(e.properties);
          });

          for (var i = ["colorize", "wireframe", "showBoundingVolumes", "showContentBoundingVolumes", "showRequestVolumes", "freezeFrame", "showOnlyPickedTileDebugLabel", "showGeometricError", "showRenderingStatistics", "showMemoryUsage", "showUrl"], r = i.length, s = 0; s < r; ++s) {
            var n = i[s];
            this[n] = this[n];
          }

          this.maximumScreenSpaceError = e.maximumScreenSpaceError, this.dynamicScreenSpaceError = e.dynamicScreenSpaceError, this.dynamicScreenSpaceErrorDensity = e.dynamicScreenSpaceErrorDensity, this.dynamicScreenSpaceErrorFactor = e.dynamicScreenSpaceErrorFactor, this.colorBlendMode = e.colorBlendMode, this.skipLevelOfDetail = e.skipLevelOfDetail, this.skipScreenSpaceErrorFactor = e.skipScreenSpaceErrorFactor, this.baseScreenSpaceError = e.baseScreenSpaceError, this.skipLevels = e.skipLevels, this.immediatelyLoadDesiredLevelOfDetail = e.immediatelyLoadDesiredLevelOfDetail, this.loadSiblings = e.loadSiblings;
          var o = e.pointCloudShading;
          this.pointCloudShading = o.attenuation, this.geometricErrorScale = o.geometricErrorScale, this.maximumAttenuation = o.maximumAttenuation ? o.maximumAttenuation : 0, this.baseResolution = o.baseResolution ? o.baseResolution : 0, this.eyeDomeLighting = o.eyeDomeLighting, this.eyeDomeLightingStrength = o.eyeDomeLightingStrength, this.eyeDomeLightingRadius = o.eyeDomeLightingRadius, this._scene.requestRender();
        } else this._properties({});

        this._statisticsText = l(e, !1), this._pickStatisticsText = l(e, !0), j(this, !1);
      }
    },
    feature: {
      get: function get() {
        return this._feature;
      },
      set: function set(e) {
        var t;
        this._feature !== e && (t = this._feature, B(t) && !t.content.isDestroyed() && (!this.colorize && B(this._style) ? t.color = B(this._style.color) ? this._style.color.evaluateColor(t, u) : i.WHITE : t.color = h, this._scene.requestRender()), B(e) && (i.clone(e.color, h), e.color = c, this._scene.requestRender()), this._feature = e);
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      },
      set: function set(e) {
        var t;
        this._tile !== e && (t = this._tile, !B(t) || t.isDestroyed() || g(t.content) || (t.color = h, this._scene.requestRender()), B(e) && !g(e.content) && (i.clone(e.color, h), e.color = c, this._scene.requestRender()), this._tile = e);
      }
    }
  }), d.prototype.togglePickTileset = function () {
    this.pickActive = !this.pickActive;
  }, d.prototype.toggleInspector = function () {
    this.inspectorVisible = !this.inspectorVisible;
  }, d.prototype.toggleTileset = function () {
    this.tilesetVisible = !this.tilesetVisible;
  }, d.prototype.toggleDisplay = function () {
    this.displayVisible = !this.displayVisible;
  }, d.prototype.toggleUpdate = function () {
    this.updateVisible = !this.updateVisible;
  }, d.prototype.toggleLogging = function () {
    this.loggingVisible = !this.loggingVisible;
  }, d.prototype.toggleStyle = function () {
    this.styleVisible = !this.styleVisible;
  }, d.prototype.toggleTileDebugLabels = function () {
    this.tileDebugLabelsVisible = !this.tileDebugLabelsVisible;
  }, d.prototype.toggleOptimization = function () {
    this.optimizationVisible = !this.optimizationVisible;
  }, d.prototype.trimTilesCache = function () {
    B(this._tileset) && this._tileset.trimLoadedTiles();
  }, d.prototype.compileStyle = function () {
    var e = this._tileset;

    if (B(e) && this.styleString !== JSON.stringify(e.style)) {
      this._editorError = "";

      try {
        0 === this.styleString.length && (this.styleString = "{}"), this._style = new t(JSON.parse(this.styleString)), this._shouldStyle = !0, this._scene.requestRender();
      } catch (e) {
        this._editorError = e.toString();
      }

      this.feature = this._feature, this.tile = this._tile;
    }
  }, d.prototype.styleEditorKeyPress = function (e, t) {
    if (9 === t.keyCode) {
      t.preventDefault();
      var i,
          r = t.target,
          s = r.selectionStart,
          n = r.selectionEnd,
          o = n,
          l = r.value.slice(s, n).split("\n"),
          a = l.length;
      if (t.shiftKey) for (i = 0; i < a; ++i) {
        " " === l[i][0] && (" " === l[i][1] ? (l[i] = l[i].substr(2), o -= 2) : (l[i] = l[i].substr(1), --o));
      } else for (i = 0; i < a; ++i) {
        l[i] = "  " + l[i], o += 2;
      }
      var c = l.join("\n");
      r.value = r.value.slice(0, s) + c + r.value.slice(n), r.selectionStart = s !== n ? s : o, r.selectionEnd = o;
    } else !t.ctrlKey || 10 !== t.keyCode && 13 !== t.keyCode || this.compileStyle();

    return !0;
  }, d.prototype._update = function () {
    var e = this._tileset;

    if (this.performance && this._performanceDisplay.update(), B(e)) {
      if (e.isDestroyed()) return this.tile = void 0, this.feature = void 0, void (this.tileset = void 0);
      var t = e.style;
      this._style !== e.style && (this._shouldStyle ? (e.style = this._style, this._shouldStyle = !1) : (this._style = t, this.styleString = JSON.stringify(t.style, null, "  ")));
    }

    this.showStatistics && (this._statisticsText = l(e, !1), this._pickStatisticsText = l(e, !0));
  }, d.prototype.isDestroyed = function () {
    return !1;
  }, d.prototype.destroy = function () {
    this._eventHandler.destroy(), this._removePostRenderEvent();
    var t = this;
    return this._definedProperties.forEach(function (e) {
      K.getObservable(t, e).dispose();
    }), r(this);
  }, d.getStatistics = l, d;
});