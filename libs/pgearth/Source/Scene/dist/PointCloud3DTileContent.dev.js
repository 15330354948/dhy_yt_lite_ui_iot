"use strict";

define(["../Core/Color", "../Core/combine", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/Math", "../Renderer/Pass", "../Renderer/ShaderSource", "./PGEarth3DTileBatchTable", "./PGEarth3DTileFeature", "./PGEarth3DTileRefine", "./PointCloud", "./PointCloudShading", "./SceneMode"], function (i, s, _, g, t, e, n, r, f, c, o, d, a, m, p, u, y) {
  "use strict";

  function l(t, e, i, n, r) {
    var o, a, u, l, h;
    this._tileset = t, this._tile = e, this._resource = i, this._pickId = void 0, this._batchTable = void 0, this._styleDirty = !1, this._features = void 0, this.featurePropertiesDirty = !1, this._pointCloud = new p({
      arrayBuffer: n,
      byteOffset: r,
      cull: !1,
      opaquePass: c.PGEARTH_3D_TILE,
      vertexShaderLoaded: function vertexShaderLoaded(t) {
        return g(h._batchTable) ? h._batchTable.getVertexShaderCallback(!1, "a_batchId", void 0)(t) : t;
      },
      fragmentShaderLoaded: function fragmentShaderLoaded(t) {
        return g(l._batchTable) ? l._batchTable.getFragmentShaderCallback(!1, void 0)(t) : "uniform vec4 czm_pickColor;\n" + t;
      },
      uniformMapLoaded: function uniformMapLoaded(t) {
        return g(u._batchTable) ? u._batchTable.getUniformMapCallback()(t) : s(t, {
          czm_pickColor: function czm_pickColor() {
            return u._pickId.color;
          }
        });
      },
      batchTableLoaded: function batchTableLoaded(t, e, i) {
        a._batchTable = new d(a, t, e, i);
      },
      pickIdLoaded: (o = a = u = l = h = this, function () {
        return g(o._batchTable) ? o._batchTable.getPickId() : "czm_pickColor";
      })
    });
  }

  t(l.prototype, {
    featuresLength: {
      get: function get() {
        return g(this._batchTable) ? this._batchTable.featuresLength : 0;
      }
    },
    pointsLength: {
      get: function get() {
        return this._pointCloud.pointsLength;
      }
    },
    trianglesLength: {
      get: function get() {
        return 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._pointCloud.geometryByteLength;
      }
    },
    texturesByteLength: {
      get: function get() {
        return 0;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return g(this._batchTable) ? this._batchTable.memorySizeInBytes : 0;
      }
    },
    innerContents: {
      get: function get() {}
    },
    readyPromise: {
      get: function get() {
        return this._pointCloud.readyPromise;
      }
    },
    tileset: {
      get: function get() {
        return this._tileset;
      }
    },
    tile: {
      get: function get() {
        return this._tile;
      }
    },
    url: {
      get: function get() {
        return this._resource.getUrlComponent(!0);
      }
    },
    batchTable: {
      get: function get() {
        return this._batchTable;
      }
    }
  }), l.prototype.hasProperty = function (t, e) {
    return !!g(this._batchTable) && this._batchTable.hasProperty(t, e);
  }, l.prototype.getFeature = function (t) {
    if (g(this._batchTable)) {
      var e = this.featuresLength;
      if (!g(t) || t < 0 || e <= t) throw new n("batchId is required and between zero and featuresLength - 1 (" + (e - 1) + ").");
      return function (t) {
        var e = t.featuresLength;

        if (!g(t._features) && 0 < e) {
          for (var i = new Array(e), n = 0; n < e; ++n) {
            i[n] = new a(t, n);
          }

          t._features = i;
        }
      }(this), this._features[t];
    }
  }, l.prototype.applyDebugSettings = function (t, e) {
    this._pointCloud.color = t ? e : i.WHITE;
  }, l.prototype.applyStyle = function (t) {
    g(this._batchTable) ? this._batchTable.applyStyle(t) : this._styleDirty = !0;
  };
  var C = new u();
  return l.prototype.update = function (t, e) {
    var i,
        n = this._pointCloud,
        r = _(t.pointCloudShading, C),
        o = this._tile,
        a = this._batchTable,
        u = e.mode,
        l = t.clippingPlanes;

    g(this._pickId) || g(a) || (this._pickId = e.context.createPickId({
      primitive: t,
      content: this
    })), g(a) && a.update(t, e), i = g(o._contentBoundingVolume) ? u === y.SCENE3D ? o._contentBoundingVolume.boundingSphere : o._contentBoundingVolume2D.boundingSphere : u === y.SCENE3D ? o._boundingVolume.boundingSphere : o._boundingVolume2D.boundingSphere;
    var h,
        s,
        c,
        d,
        p,
        b = this._styleDirty;
    this._styleDirty = !1, n.clippingPlanesOriginMatrix = t.clippingPlanesOriginMatrix, n.style = g(a) ? void 0 : t.style, n.styleDirty = b, n.modelMatrix = o.computedTransform, n.time = t.timeSinceLoad, n.shadows = t.shadows, n.boundingSphere = i, n.clippingPlanes = l, n.isClipped = g(l) && l.enabled && o._isClipped, n.clippingPlanesDirty = o.clippingPlanesDirty, n.attenuation = r.attenuation, n.backFaceCulling = r.backFaceCulling, n.normalShading = r.normalShading, n.geometricError = (s = (h = this)._tileset.pointCloudShading, c = h._tile.contentBoundingVolume.boundingSphere.volume(), d = f.cbrt(c / h.pointsLength), 0 === (p = h._tile.geometricError) && (p = g(s) && g(s.baseResolution) ? s.baseResolution : d), p), n.geometricErrorScale = r.geometricErrorScale, g(r) && g(r.maximumAttenuation) ? n.maximumAttenuation = r.maximumAttenuation : o.refine === m.ADD ? n.maximumAttenuation = 5 : n.maximumAttenuation = t.maximumScreenSpaceError, n.update(e);
  }, l.prototype.isDestroyed = function () {
    return !1;
  }, l.prototype.destroy = function () {
    return this._pickId = this._pickId && this._pickId.destroy(), this._pointCloud = this._pointCloud && this._pointCloud.destroy(), this._batchTable = this._batchTable && this._batchTable.destroy(), e(this);
  }, l;
});