"use strict";

define(["../Core/Cartesian3", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/DeveloperError", "../Core/FeatureDetection", "../Core/getStringFromTypedArray", "../Core/Matrix4", "../Core/RequestType", "../Core/RuntimeError", "../Core/Transforms", "../Renderer/Pass", "./Axis", "./PGEarth3DTileBatchTable", "./PGEarth3DTileFeature", "./PGEarth3DTileFeatureTable", "./ClassificationModel", "./Model", "./ModelUtility"], function (x, r, P, D, E, e, t, i, a, n, I, S, O, F, o, H, N, W, s, G, k, J, R) {
  "use strict";

  if (!n.supportsTypedArrays()) return {};

  function q(e, t, i, r, a) {
    this._tileset = e, this._tile = t, this._resource = i, this._model = void 0, this._batchTable = void 0, this._features = void 0, this._batchIdAttributeName = void 0, this._diffuseAttributeOrUniformName = {}, this._rtcCenterTransform = void 0, this._contentModelMatrix = void 0, this.featurePropertiesDirty = !1, function (e, t, i) {
      var r = e._tileset,
          a = e._tile,
          n = e._resource,
          o = D(i, 0);
      i = o;
      var s = new Uint8Array(t),
          l = new DataView(t);
      i += V;
      var h = l.getUint32(i, !0);
      if (1 !== h) throw new F("Only Batched 3D Model version 1 is supported.  Version " + h + " is not.");
      i += V;
      var c = l.getUint32(i, !0);
      i += V;
      var d = l.getUint32(i, !0);
      i += V;
      var u = l.getUint32(i, !0);
      i += V;
      var f = l.getUint32(i, !0);
      i += V;
      var m,
          g,
          p = l.getUint32(i, !0);
      i += V, 570425344 <= f ? (i -= 2 * V, m = d, f = u, u = d = p = 0, q._deprecationWarning("b3dm-legacy-header", "This b3dm header is using the legacy format [batchLength] [batchTableByteLength]. The new format is [featureTableJsonByteLength] [featureTableBinaryByteLength] [batchTableJsonByteLength] [batchTableBinaryByteLength] from https://github.com/AnalyticalGraphicsInc/3d-tiles/tree/master/specification/TileFormats/Batched3DModel.")) : 570425344 <= p && (i -= V, m = f, f = d, p = u, u = d = 0, q._deprecationWarning("b3dm-legacy-header", "This b3dm header is using the legacy format [batchTableJsonByteLength] [batchTableBinaryByteLength] [batchLength]. The new format is [featureTableJsonByteLength] [featureTableBinaryByteLength] [batchTableJsonByteLength] [batchTableBinaryByteLength] from https://github.com/AnalyticalGraphicsInc/3d-tiles/tree/master/specification/TileFormats/Batched3DModel."));
      {
        var b;
        0 === d ? g = {
          BATCH_LENGTH: D(m, 0)
        } : (b = I(s, i, d), g = JSON.parse(b), i += d);
      }

      var _ = new Uint8Array(t, i, u);

      i += u;
      var y,
          T,
          C,
          L = new G(g, _);
      {
        var v;
        m = L.getGlobalProperty("BATCH_LENGTH"), L.featuresLength = m, 0 < f && (v = I(s, i, f), y = JSON.parse(v), i += f, 0 < p && (T = new Uint8Array(t, i, p), T = new Uint8Array(T), i += p));
      }
      E(r.classificationType) && (C = function (i) {
        return function (e, t) {
          i._model.updateCommands(e, t);
        };
      }(e));
      var A = new W(e, m, y, T, C);
      e._batchTable = A;
      var B,
          w = o + c - i;
      if (0 == w) throw new F("glTF byte length must be greater than 0.");
      B = i % 4 == 0 ? new Uint8Array(t, i, w) : (q._deprecationWarning("b3dm-glb-unaligned", "The embedded glb is not aligned to a 4-byte boundary."), new Uint8Array(s.subarray(i, i + w)));
      var M = {
        content: e,
        primitive: r
      };
      e._rtcCenterTransform = S.IDENTITY;
      var U = L.getGlobalProperty("RTC_CENTER", P.FLOAT, 3);
      E(U) && (e._rtcCenterTransform = S.fromTranslation(x.fromArray(U)));
      e._contentModelMatrix = S.multiply(a.computedTransform, e._rtcCenterTransform, new S()), E(r.classificationType) ? e._model = new k({
        gltf: B,
        cull: !1,
        basePath: n,
        requestType: O.TILES3D,
        modelMatrix: e._contentModelMatrix,
        upAxis: r._gltfUpAxis,
        forwardAxis: N.X,
        debugWireframe: r.debugWireframe,
        vertexShaderLoaded: Z(e),
        classificationShaderLoaded: function (i) {
          return function (e) {
            var t = i._batchTable.getClassificationFragmentShaderCallback();

            return E(t) ? t(e) : e;
          };
        }(e),
        uniformMapLoaded: A.getUniformMapCallback(),
        pickIdLoaded: j(e),
        classificationType: r._classificationType,
        batchTable: A
      }) : e._model = new J({
        gltf: B,
        cull: !1,
        releaseGltfJson: !0,
        opaquePass: H.PGEARTH_3D_TILE,
        basePath: n,
        requestType: O.TILES3D,
        modelMatrix: e._contentModelMatrix,
        upAxis: r._gltfUpAxis,
        forwardAxis: N.X,
        shadows: r.shadows,
        debugWireframe: r.debugWireframe,
        incrementallyLoadTextures: !1,
        vertexShaderLoaded: Z(e),
        fragmentShaderLoaded: function (o) {
          return function (e, t) {
            var i = o._batchTable,
                r = !E(o._tileset.classificationType),
                a = o._model.gltf;
            E(a) && (o._diffuseAttributeOrUniformName[t] = R.getDiffuseAttributeOrUniform(a, t));
            var n = i.getFragmentShaderCallback(r, o._diffuseAttributeOrUniformName[t]);
            return E(n) ? n(e) : e;
          };
        }(e),
        uniformMapLoaded: A.getUniformMapCallback(),
        pickIdLoaded: j(e),
        addBatchIdToGeneratedShaders: 0 < m,
        pickObject: M,
        imageBasedLightingFactor: r.imageBasedLightingFactor,
        lightColor: r.lightColor,
        luminanceAtZenith: r.luminanceAtZenith,
        sphericalHarmonicCoefficients: r.sphericalHarmonicCoefficients,
        specularEnvironmentMaps: r.specularEnvironmentMaps
      });
    }(this, r, a);
  }

  q._deprecationWarning = t, e(q.prototype, {
    featuresLength: {
      get: function get() {
        return this._batchTable.featuresLength;
      }
    },
    pointsLength: {
      get: function get() {
        return 0;
      }
    },
    trianglesLength: {
      get: function get() {
        return this._model.trianglesLength;
      }
    },
    geometryByteLength: {
      get: function get() {
        return this._model.geometryByteLength;
      }
    },
    texturesByteLength: {
      get: function get() {
        return this._model.texturesByteLength;
      }
    },
    batchTableByteLength: {
      get: function get() {
        return this._batchTable.memorySizeInBytes;
      }
    },
    innerContents: {
      get: function get() {}
    },
    readyPromise: {
      get: function get() {
        return this._model.readyPromise;
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
  });
  var V = Uint32Array.BYTES_PER_ELEMENT;

  function Z(l) {
    return function (e, t) {
      var i,
          r,
          a = l._batchTable,
          n = !E(l._tileset.classificationType),
          o = l._model.gltf;
      E(o) && (l._batchIdAttributeName = (i = o, r = R.getAttributeOrUniformBySemantic(i, "_BATCHID"), E(r) || (r = R.getAttributeOrUniformBySemantic(i, "BATCHID"), E(r) && q._deprecationWarning("b3dm-legacy-batchid", "The glTF in this b3dm uses the semantic `BATCHID`. Application-specific semantics should be prefixed with an underscore: `_BATCHID`.")), r), l._diffuseAttributeOrUniformName[t] = R.getDiffuseAttributeOrUniform(o, t));
      var s = a.getVertexShaderCallback(n, l._batchIdAttributeName, l._diffuseAttributeOrUniformName[t]);
      return E(s) ? s(e) : e;
    };
  }

  function j(e) {
    return function () {
      return e._batchTable.getPickId();
    };
  }

  q.prototype.hasProperty = function (e, t) {
    return this._batchTable.hasProperty(e, t);
  }, q.prototype.getFeature = function (e) {
    var t = this.featuresLength;
    if (!E(e) || e < 0 || t <= e) throw new a("batchId is required and between zero and featuresLength - 1 (" + (t - 1) + ").");
    return function (e) {
      var t = e.featuresLength;

      if (!E(e._features) && 0 < t) {
        for (var i = new Array(t), r = 0; r < t; ++r) {
          i[r] = new s(e, r);
        }

        e._features = i;
      }
    }(this), this._features[e];
  }, q.prototype.applyDebugSettings = function (e, t) {
    t = e ? t : r.WHITE, 0 === this.featuresLength ? this._model.color = t : this._batchTable.setAllColor(t);
  };
  var l = new r();
  return q.prototype.applyStyle = function (e) {
    var t, i;
    0 === this.featuresLength ? (t = E(e) && E(e.color), i = E(e) && E(e.show), this._model.color = t ? e.color.evaluateColor(void 0, l) : r.WHITE, this._model.show = !i || e.show.evaluate(void 0)) : this._batchTable.applyStyle(e);
  }, q.prototype.update = function (e, t) {
    var i = t.commandList.length;
    this._batchTable.update(e, t), this._contentModelMatrix = S.multiply(this._tile.computedTransform, this._rtcCenterTransform, this._contentModelMatrix), this._model.modelMatrix = this._contentModelMatrix, this._model.shadows = this._tileset.shadows, this._model.imageBasedLightingFactor = this._tileset.imageBasedLightingFactor, this._model.lightColor = this._tileset.lightColor, this._model.luminanceAtZenith = this._tileset.luminanceAtZenith, this._model.sphericalHarmonicCoefficients = this._tileset.sphericalHarmonicCoefficients, this._model.specularEnvironmentMaps = this._tileset.specularEnvironmentMaps, this._model.debugWireframe = this._tileset.debugWireframe;
    var r = this._tileset.clippingPlanes;
    this._model.clippingPlanesOriginMatrix = this._tileset.clippingPlanesOriginMatrix, E(r) && this._tile.clippingPlanesDirty && (this._model._clippingPlanes = r.enabled && this._tile._isClipped ? r : void 0), E(r) && E(this._model._clippingPlanes) && this._model._clippingPlanes !== r && (this._model._clippingPlanes = r), this._model.update(t), i < t.commandList.length && (t.passes.render || t.passes.pick) && !E(e.classificationType) && this._batchTable.addDerivedCommands(t, i);
  }, q.prototype.isDestroyed = function () {
    return !1;
  }, q.prototype.destroy = function () {
    return this._model = this._model && this._model.destroy(), this._batchTable = this._batchTable && this._batchTable.destroy(), i(this);
  }, q;
});