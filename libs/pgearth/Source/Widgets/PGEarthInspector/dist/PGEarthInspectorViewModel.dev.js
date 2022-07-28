"use strict";

define(["../../Core/defined", "../../Core/defineProperties", "../../Core/destroyObject", "../../Core/DeveloperError", "../../Core/Rectangle", "../../Core/ScreenSpaceEventHandler", "../../Core/ScreenSpaceEventType", "../../Scene/DebugModelMatrixPrimitive", "../../Scene/PerformanceDisplay", "../../Scene/TileCoordinatesImageryProvider", "../../ThirdParty/knockout", "../createCommand"], function (l, e, i, u, m, c, h, d, v, _, f, b) {
  "use strict";

  function g(e, i, t) {
    var r = Math.min(t, i);
    return r = Math.max(r, e);
  }

  function t(e, i) {
    if (!l(e)) throw new u("scene is required");
    if (!l(i)) throw new u("performanceContainer is required");
    var p = this,
        t = e.canvas,
        r = new c(t);
    this._eventHandler = r, this._scene = e, this._canvas = t, this._primitive = void 0, this._tile = void 0, this._modelMatrixPrimitive = void 0, this._performanceDisplay = void 0, this._performanceContainer = i;
    var s,
        a = this._scene.globe;

    function n(e) {
      var i = p._scene.pick({
        x: e.position.x,
        y: e.position.y
      });

      l(i) && (p.primitive = l(i.collection) ? i.collection : i.primitive), p._scene.requestRender(), p.pickPrimitiveActive = !1;
    }

    function o(e) {
      var i,
          t = a.ellipsoid,
          r = p._scene.camera.pickEllipsoid({
        x: e.position.x,
        y: e.position.y
      }, t);

      if (l(r)) for (var s = t.cartesianToCartographic(r), n = a._surface.tileProvider._tilesToRenderByTextureCount, o = 0; !i && o < n.length; ++o) {
        var u = n[o];
        if (l(u)) for (var c = 0; !i && c < u.length; ++c) {
          var h = u[c];
          m.contains(h.rectangle, s) && (i = h);
        }
      }
      p.tile = i, p.pickTileActive = !1;
    }

    a.depthTestAgainstTerrain = !0, this.frustums = !1, this.frustumPlanes = !1, this.performance = !1, this.shaderCacheText = "", this.primitiveBoundingSphere = !1, this.primitiveReferenceFrame = !1, this.filterPrimitive = !1, this.tileBoundingSphere = !1, this.filterTile = !1, this.wireframe = !1, this.globeDepth = !1, this.pickDepth = !1, this.depthFrustum = 1, this._numberOfFrustums = 1, this.suspendUpdates = !1, this.tileCoordinates = !1, this.frustumStatisticText = !1, this.tileText = "", this.hasPickedPrimitive = !1, this.hasPickedTile = !1, this.pickPrimitiveActive = !1, this.pickTileActive = !1, this.dropDownVisible = !0, this.generalVisible = !0, this.primitivesVisible = !1, this.terrainVisible = !1, this.depthFrustumText = "", f.track(this, ["frustums", "frustumPlanes", "performance", "shaderCacheText", "primitiveBoundingSphere", "primitiveReferenceFrame", "filterPrimitive", "tileBoundingSphere", "filterTile", "wireframe", "globeDepth", "pickDepth", "depthFrustum", "suspendUpdates", "tileCoordinates", "frustumStatisticText", "tileText", "hasPickedPrimitive", "hasPickedTile", "pickPrimitiveActive", "pickTileActive", "dropDownVisible", "generalVisible", "primitivesVisible", "terrainVisible", "depthFrustumText"]), this._toggleDropDown = b(function () {
      p.dropDownVisible = !p.dropDownVisible;
    }), this._toggleGeneral = b(function () {
      p.generalVisible = !p.generalVisible;
    }), this._togglePrimitives = b(function () {
      p.primitivesVisible = !p.primitivesVisible;
    }), this._toggleTerrain = b(function () {
      p.terrainVisible = !p.terrainVisible;
    }), this._frustumsSubscription = f.getObservable(this, "frustums").subscribe(function (e) {
      p._scene.debugShowFrustums = e, p._scene.requestRender();
    }), this._frustumPlanesSubscription = f.getObservable(this, "frustumPlanes").subscribe(function (e) {
      p._scene.debugShowFrustumPlanes = e, p._scene.requestRender();
    }), this._performanceSubscription = f.getObservable(this, "performance").subscribe(function (e) {
      e ? p._performanceDisplay = new v({
        container: p._performanceContainer
      }) : p._performanceContainer.innerHTML = "";
    }), this._showPrimitiveBoundingSphere = b(function () {
      return p._primitive.debugShowBoundingVolume = p.primitiveBoundingSphere, p._scene.requestRender(), !0;
    }), this._primitiveBoundingSphereSubscription = f.getObservable(this, "primitiveBoundingSphere").subscribe(function () {
      p._showPrimitiveBoundingSphere();
    }), this._showPrimitiveReferenceFrame = b(function () {
      var e;
      return p.primitiveReferenceFrame ? (e = p._primitive.modelMatrix, p._modelMatrixPrimitive = new d({
        modelMatrix: e
      }), p._scene.primitives.add(p._modelMatrixPrimitive)) : l(p._modelMatrixPrimitive) && (p._scene.primitives.remove(p._modelMatrixPrimitive), p._modelMatrixPrimitive = void 0), p._scene.requestRender(), !0;
    }), this._primitiveReferenceFrameSubscription = f.getObservable(this, "primitiveReferenceFrame").subscribe(function () {
      p._showPrimitiveReferenceFrame();
    }), this._doFilterPrimitive = b(function () {
      return p.filterPrimitive ? p._scene.debugCommandFilter = function (e) {
        return !(!l(p._modelMatrixPrimitive) || e.owner !== p._modelMatrixPrimitive._primitive) || !!l(p._primitive) && (e.owner === p._primitive || e.owner === p._primitive._billboardCollection || e.owner.primitive === p._primitive);
      } : p._scene.debugCommandFilter = void 0, !0;
    }), this._filterPrimitiveSubscription = f.getObservable(this, "filterPrimitive").subscribe(function () {
      p._doFilterPrimitive(), p._scene.requestRender();
    }), this._wireframeSubscription = f.getObservable(this, "wireframe").subscribe(function (e) {
      a._surface.tileProvider._debug.wireframe = e, p._scene.requestRender();
    }), this._globeDepthSubscription = f.getObservable(this, "globeDepth").subscribe(function (e) {
      p._scene.debugShowGlobeDepth = e, p._scene.requestRender();
    }), this._pickDepthSubscription = f.getObservable(this, "pickDepth").subscribe(function (e) {
      p._scene.debugShowPickDepth = e, p._scene.requestRender();
    }), this._depthFrustumSubscription = f.getObservable(this, "depthFrustum").subscribe(function (e) {
      p._scene.debugShowDepthFrustum = e, p._scene.requestRender();
    }), this._incrementDepthFrustum = b(function () {
      var e = p.depthFrustum + 1;
      return p.depthFrustum = g(1, p._numberOfFrustums, e), p._scene.requestRender(), !0;
    }), this._decrementDepthFrustum = b(function () {
      var e = p.depthFrustum - 1;
      return p.depthFrustum = g(1, p._numberOfFrustums, e), p._scene.requestRender(), !0;
    }), this._suspendUpdatesSubscription = f.getObservable(this, "suspendUpdates").subscribe(function (e) {
      (a._surface._debug.suspendLodUpdate = e) || (p.filterTile = !1);
    }), this._showTileCoordinates = b(function () {
      return p.tileCoordinates && !l(s) ? s = e.imageryLayers.addImageryProvider(new _({
        tilingScheme: e.terrainProvider.tilingScheme
      })) : !p.tileCoordinates && l(s) && (e.imageryLayers.remove(s), s = void 0), !0;
    }), this._tileCoordinatesSubscription = f.getObservable(this, "tileCoordinates").subscribe(function () {
      p._showTileCoordinates(), p._scene.requestRender();
    }), this._tileBoundingSphereSubscription = f.getObservable(this, "tileBoundingSphere").subscribe(function () {
      p._showTileBoundingSphere(), p._scene.requestRender();
    }), this._showTileBoundingSphere = b(function () {
      return p.tileBoundingSphere ? a._surface.tileProvider._debug.boundingSphereTile = p._tile : a._surface.tileProvider._debug.boundingSphereTile = void 0, p._scene.requestRender(), !0;
    }), this._doFilterTile = b(function () {
      return p.filterTile ? (p.suspendUpdates = !0, a._surface._tilesToRender = [], l(p._tile) && p._tile.renderable && a._surface._tilesToRender.push(p._tile)) : p.suspendUpdates = !1, !0;
    }), this._filterTileSubscription = f.getObservable(this, "filterTile").subscribe(function () {
      p.doFilterTile(), p._scene.requestRender();
    }), this._pickPrimitive = b(function () {
      p.pickPrimitiveActive = !p.pickPrimitiveActive;
    }), this._pickPrimitiveActiveSubscription = f.getObservable(this, "pickPrimitiveActive").subscribe(function (e) {
      e ? r.setInputAction(n, h.LEFT_CLICK) : r.removeInputAction(h.LEFT_CLICK);
    }), this._pickTile = b(function () {
      p.pickTileActive = !p.pickTileActive;
    }), this._pickTileActiveSubscription = f.getObservable(this, "pickTileActive").subscribe(function (e) {
      e ? r.setInputAction(o, h.LEFT_CLICK) : r.removeInputAction(h.LEFT_CLICK);
    }), this._removePostRenderEvent = e.postRender.addEventListener(function () {
      p._update();
    });
  }

  return e(t.prototype, {
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
    toggleDropDown: {
      get: function get() {
        return this._toggleDropDown;
      }
    },
    showPrimitiveBoundingSphere: {
      get: function get() {
        return this._showPrimitiveBoundingSphere;
      }
    },
    showPrimitiveReferenceFrame: {
      get: function get() {
        return this._showPrimitiveReferenceFrame;
      }
    },
    doFilterPrimitive: {
      get: function get() {
        return this._doFilterPrimitive;
      }
    },
    incrementDepthFrustum: {
      get: function get() {
        return this._incrementDepthFrustum;
      }
    },
    decrementDepthFrustum: {
      get: function get() {
        return this._decrementDepthFrustum;
      }
    },
    showTileCoordinates: {
      get: function get() {
        return this._showTileCoordinates;
      }
    },
    showTileBoundingSphere: {
      get: function get() {
        return this._showTileBoundingSphere;
      }
    },
    doFilterTile: {
      get: function get() {
        return this._doFilterTile;
      }
    },
    toggleGeneral: {
      get: function get() {
        return this._toggleGeneral;
      }
    },
    togglePrimitives: {
      get: function get() {
        return this._togglePrimitives;
      }
    },
    toggleTerrain: {
      get: function get() {
        return this._toggleTerrain;
      }
    },
    pickPrimitive: {
      get: function get() {
        return this._pickPrimitive;
      }
    },
    pickTile: {
      get: function get() {
        return this._pickTile;
      }
    },
    selectParent: {
      get: function get() {
        var e = this;
        return b(function () {
          e.tile = e.tile.parent;
        });
      }
    },
    selectNW: {
      get: function get() {
        var e = this;
        return b(function () {
          e.tile = e.tile.northwestChild;
        });
      }
    },
    selectNE: {
      get: function get() {
        var e = this;
        return b(function () {
          e.tile = e.tile.northeastChild;
        });
      }
    },
    selectSW: {
      get: function get() {
        var e = this;
        return b(function () {
          e.tile = e.tile.southwestChild;
        });
      }
    },
    selectSE: {
      get: function get() {
        var e = this;
        return b(function () {
          e.tile = e.tile.southeastChild;
        });
      }
    },
    primitive: {
      get: function get() {
        return this._primitive;
      },
      set: function set(e) {
        var i = this._primitive;
        e !== i && (this.hasPickedPrimitive = !0, l(i) && (i.debugShowBoundingVolume = !1), this._scene.debugCommandFilter = void 0, l(this._modelMatrixPrimitive) && (this._scene.primitives.remove(this._modelMatrixPrimitive), this._modelMatrixPrimitive = void 0), (this._primitive = e).show = !1, setTimeout(function () {
          e.show = !0;
        }, 50), this.showPrimitiveBoundingSphere(), this.showPrimitiveReferenceFrame(), this.doFilterPrimitive());
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      },
      set: function set(e) {
        var i;
        l(e) ? (this.hasPickedTile = !0, e !== this._tile && (this.tileText = "L: " + e.level + " X: " + e.x + " Y: " + e.y, this.tileText += "<br>SW corner: " + e.rectangle.west + ", " + e.rectangle.south, this.tileText += "<br>NE corner: " + e.rectangle.east + ", " + e.rectangle.north, i = e.data, l(i) ? this.tileText += "<br>Min: " + i.minimumHeight + " Max: " + i.maximumHeight : this.tileText += "<br>(Tile is not loaded)"), this._tile = e, this.showTileBoundingSphere(), this.doFilterTile()) : (this.hasPickedTile = !1, this._tile = void 0);
      }
    }
  }), t.prototype._update = function () {
    this.frustums && (this.frustumStatisticText = function (e) {
      var i;

      if (l(e)) {
        i = "Command Statistics";
        var t = e.commandsInFrustums;

        for (var r in t) {
          if (t.hasOwnProperty(r)) {
            var s,
                n = parseInt(r, 10);
            if (7 === n) s = "1, 2 and 3";else {
              for (var o = [], u = 2; 0 <= u; u--) {
                var c = Math.pow(2, u);
                c <= n && (o.push(u + 1), n -= c);
              }

              s = o.reverse().join(" and ");
            }
            i += "<br>&nbsp;&nbsp;&nbsp;&nbsp;" + t[r] + " in frustum " + s;
          }
        }

        i += "<br>Total: " + e.totalCommands;
      }

      return i;
    }(this._scene.debugFrustumStatistics));
    var e = this._scene.numberOfFrustums;
    this._numberOfFrustums = e, this.depthFrustum = g(1, e, this.depthFrustum), this.depthFrustumText = this.depthFrustum + " of " + e, this.performance && this._performanceDisplay.update(), this.primitiveReferenceFrame && (this._modelMatrixPrimitive.modelMatrix = this._primitive.modelMatrix), this.shaderCacheText = "Cached shaders: " + this._scene.context.shaderCache.numberOfShaders;
  }, t.prototype.isDestroyed = function () {
    return !1;
  }, t.prototype.destroy = function () {
    return this._eventHandler.destroy(), this._removePostRenderEvent(), this._frustumsSubscription.dispose(), this._frustumPlanesSubscription.dispose(), this._performanceSubscription.dispose(), this._primitiveBoundingSphereSubscription.dispose(), this._primitiveReferenceFrameSubscription.dispose(), this._filterPrimitiveSubscription.dispose(), this._wireframeSubscription.dispose(), this._globeDepthSubscription.dispose(), this._pickDepthSubscription.dispose(), this._depthFrustumSubscription.dispose(), this._suspendUpdatesSubscription.dispose(), this._tileCoordinatesSubscription.dispose(), this._tileBoundingSphereSubscription.dispose(), this._filterTileSubscription.dispose(), this._pickPrimitiveActiveSubscription.dispose(), this._pickTileActiveSubscription.dispose(), i(this);
  }, t;
});