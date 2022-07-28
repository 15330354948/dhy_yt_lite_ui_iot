"use strict";

define(["../Core/AttributeCompression", "../Core/Cartesian3", "../Core/Color", "../Core/ComponentDatatype", "../Core/defaultValue", "../Core/defined", "../Core/defineProperties", "../Core/deprecationWarning", "../Core/destroyObject", "../Core/DeveloperError", "../Core/Ellipsoid", "../Core/FeatureDetection", "../Core/getBaseUri", "../Core/getStringFromTypedArray", "../Core/Matrix3", "../Core/Matrix4", "../Core/Quaternion", "../Core/RequestType", "../Core/RuntimeError", "../Core/Transforms", "../Core/TranslationRotationScale", "../Renderer/Pass", "./Axis", "./PGEarth3DTileBatchTable", "./PGEarth3DTileFeature", "./PGEarth3DTileFeatureTable", "./ModelInstanceCollection"], function (te, ne, n, re, ie, oe, e, t, r, i, ae, o, a, se, le, ce, he, ue, de, pe, _e, ge, fe, Te, s, me, ye) {
  "use strict";

  if (!o.supportsTypedArrays()) return {};

  function be(e, t, n, r, i) {
    this._tileset = e, this._tile = t, this._resource = n, this._modelInstanceCollection = void 0, this._batchTable = void 0, this._features = void 0, this.featurePropertiesDirty = !1, function (e, t, n) {
      var r = ie(n, 0);
      n = r;
      var i = new Uint8Array(t),
          o = new DataView(t);
      n += Ce;
      var a = o.getUint32(n, !0);
      if (1 !== a) throw new de("Only Instanced 3D Model version 1 is supported. Version " + a + " is not.");
      n += Ce;
      var s = o.getUint32(n, !0);
      n += Ce;
      var l = o.getUint32(n, !0);
      if (0 === l) throw new de("featureTableJsonByteLength is zero, the feature table must be defined.");
      n += Ce;
      var c = o.getUint32(n, !0);
      n += Ce;
      var h = o.getUint32(n, !0);
      n += Ce;
      var u = o.getUint32(n, !0);
      n += Ce;
      var d = o.getUint32(n, !0);
      if (1 !== d && 0 !== d) throw new de("Only glTF format 0 (uri) or 1 (embedded) are supported. Format " + d + " is not.");

      var p = se(i, n += Ce, l),
          _ = JSON.parse(p);

      n += l;
      var g = new Uint8Array(t, n, c);
      n += c;
      var f,
          T,
          m = new me(_, g),
          y = m.getGlobalProperty("INSTANCES_LENGTH");
      if (m.featuresLength = y, !oe(y)) throw new de("Feature table global property: INSTANCES_LENGTH must be defined");
      {
        var b;
        0 < h && (b = se(i, n, h), f = JSON.parse(b), n += h, 0 < u && (T = new Uint8Array(t, n, u), T = new Uint8Array(T), n += u));
      }
      e._batchTable = new Te(e, y, f, T);
      var C,
          I = r + s - n;
      if (0 == I) throw new de("glTF byte length is zero, i3dm must have a glTF to instance.");
      C = n % 4 == 0 ? new Uint8Array(t, n, I) : (be._deprecationWarning("i3dm-glb-unaligned", "The embedded glb is not aligned to a 4-byte boundary."), new Uint8Array(i.subarray(n, n + I)));
      var v = e._tileset,
          A = {
        instances: new Array(y),
        batchTable: e._batchTable,
        cull: !1,
        url: void 0,
        requestType: ue.TILES3D,
        gltf: void 0,
        basePath: void 0,
        incrementallyLoadTextures: !1,
        upAxis: v._gltfUpAxis,
        forwardAxis: fe.X,
        opaquePass: ge.PGEARTH_3D_TILE,
        pickIdLoaded: function (e) {
          return function () {
            return e._batchTable.getPickId();
          };
        }(e),
        imageBasedLightingFactor: v.imageBasedLightingFactor,
        lightColor: v.lightColor,
        luminanceAtZenith: v.luminanceAtZenith,
        sphericalHarmonicCoefficients: v.sphericalHarmonicCoefficients,
        specularEnvironmentMaps: v.specularEnvironmentMaps
      };
      {
        var w;
        0 === d ? (w = (w = se(C)).replace(/[\s\0]+$/, ""), A.url = e._resource.getDerivedResource({
          url: w
        })) : (A.gltf = C, A.basePath = e._resource.clone());
      }
      var P,
          L = m.getGlobalProperty("EAST_NORTH_UP"),
          E = m.getGlobalProperty("RTC_CENTER", re.FLOAT, 3);
      oe(E) && (P = ne.unpack(E));

      for (var O = A.instances, N = new ne(), U = new Array(3), S = new ne(), R = new ne(), D = new ne(), F = new le(), M = new he(), G = new ne(), H = new _e(), x = new ce(), B = 0; B < y; B++) {
        var Z = m.getProperty("POSITION", re.FLOAT, 3, B, Ie);

        if (!oe(Z)) {
          Z = U;
          var z = m.getProperty("POSITION_QUANTIZED", re.UNSIGNED_SHORT, 3, B, Ie);
          if (!oe(z)) throw new de("Either POSITION or POSITION_QUANTIZED must be defined for each instance.");
          var k = m.getGlobalProperty("QUANTIZED_VOLUME_OFFSET", re.FLOAT, 3);
          if (!oe(k)) throw new de("Global property: QUANTIZED_VOLUME_OFFSET must be defined for quantized positions.");
          var Q = m.getGlobalProperty("QUANTIZED_VOLUME_SCALE", re.FLOAT, 3);
          if (!oe(Q)) throw new de("Global property: QUANTIZED_VOLUME_SCALE must be defined for quantized positions.");

          for (var V = 0; V < 3; V++) {
            Z[V] = z[V] / 65535 * Q[V] + k[V];
          }
        }

        ne.unpack(Z, 0, N), oe(P) && ne.add(N, P, N), H.translation = N;
        var W = m.getProperty("NORMAL_UP", re.FLOAT, 3, B, Ie),
            q = m.getProperty("NORMAL_RIGHT", re.FLOAT, 3, B, ve),
            J = !1;

        if (oe(W)) {
          if (!oe(q)) throw new de("To define a custom orientation, both NORMAL_UP and NORMAL_RIGHT must be defined.");
          ne.unpack(W, 0, R), ne.unpack(q, 0, S), J = !0;
        } else {
          var Y = m.getProperty("NORMAL_UP_OCT32P", re.UNSIGNED_SHORT, 2, B, Ie),
              j = m.getProperty("NORMAL_RIGHT_OCT32P", re.UNSIGNED_SHORT, 2, B, ve);

          if (oe(Y)) {
            if (!oe(j)) throw new de("To define a custom orientation with oct-encoded vectors, both NORMAL_UP_OCT32P and NORMAL_RIGHT_OCT32P must be defined.");
            te.octDecodeInRange(Y[0], Y[1], 65535, R), te.octDecodeInRange(j[0], j[1], 65535, S), J = !0;
          } else L ? (pe.eastNorthUpToFixedFrame(N, ae.WGS84, x), ce.getRotation(x, F)) : le.clone(le.IDENTITY, F);
        }

        J && (ne.cross(S, R, D), ne.normalize(D, D), le.setColumn(F, 0, S, F), le.setColumn(F, 1, R, F), le.setColumn(F, 2, D, F)), he.fromRotationMatrix(F, M), H.rotation = M, G = ne.fromElements(1, 1, 1, G);
        var X = m.getProperty("SCALE", re.FLOAT, 1, B);
        oe(X) && ne.multiplyByScalar(G, X, G);
        var $ = m.getProperty("SCALE_NON_UNIFORM", re.FLOAT, 3, B, Ie);
        oe($) && (G.x *= $[0], G.y *= $[1], G.z *= $[2]), H.scale = G;
        var K = m.getProperty("BATCH_ID", re.UNSIGNED_SHORT, 1, B);
        oe(K) || (K = B), ce.fromTranslationRotationScale(H, x);
        var ee = x.clone();
        O[B] = {
          modelMatrix: ee,
          batchId: K
        };
      }

      e._modelInstanceCollection = new ye(A);
    }(this, r, i);
  }

  be._deprecationWarning = t, e(be.prototype, {
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
        var e = this._modelInstanceCollection._model;
        return oe(e) ? e.trianglesLength : 0;
      }
    },
    geometryByteLength: {
      get: function get() {
        var e = this._modelInstanceCollection._model;
        return oe(e) ? e.geometryByteLength : 0;
      }
    },
    texturesByteLength: {
      get: function get() {
        var e = this._modelInstanceCollection._model;
        return oe(e) ? e.texturesByteLength : 0;
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
        return this._modelInstanceCollection.readyPromise;
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
  var Ce = Uint32Array.BYTES_PER_ELEMENT,
      Ie = new Array(4),
      ve = new Array(4);
  return be.prototype.hasProperty = function (e, t) {
    return this._batchTable.hasProperty(e, t);
  }, be.prototype.getFeature = function (e) {
    var t = this.featuresLength;
    if (!oe(e) || e < 0 || t <= e) throw new i("batchId is required and between zero and featuresLength - 1 (" + (t - 1) + ").");
    return function (e) {
      var t = e.featuresLength;

      if (!oe(e._features) && 0 < t) {
        for (var n = new Array(t), r = 0; r < t; ++r) {
          n[r] = new s(e, r);
        }

        e._features = n;
      }
    }(this), this._features[e];
  }, be.prototype.applyDebugSettings = function (e, t) {
    t = e ? t : n.WHITE, this._batchTable.setAllColor(t);
  }, be.prototype.applyStyle = function (e) {
    this._batchTable.applyStyle(e);
  }, be.prototype.update = function (e, t) {
    var n = t.commandList.length;
    this._batchTable.update(e, t), this._modelInstanceCollection.modelMatrix = this._tile.computedTransform, this._modelInstanceCollection.shadows = this._tileset.shadows, this._modelInstanceCollection.lightColor = this._tileset.lightColor, this._modelInstanceCollection.luminanceAtZenith = this._tileset.luminanceAtZenith, this._modelInstanceCollection.sphericalHarmonicCoefficients = this._tileset.sphericalHarmonicCoefficients, this._modelInstanceCollection.specularEnvironmentMaps = this._tileset.specularEnvironmentMaps, this._modelInstanceCollection.debugWireframe = this._tileset.debugWireframe;
    var r,
        i = this._modelInstanceCollection._model;
    oe(i) && (r = this._tileset.clippingPlanes, i.clippingPlanesOriginMatrix = this._tileset.clippingPlanesOriginMatrix, oe(r) && this._tile.clippingPlanesDirty && (i._clippingPlanes = r.enabled && this._tile._isClipped ? r : void 0), oe(r) && oe(i._clippingPlanes) && i._clippingPlanes !== r && (i._clippingPlanes = r)), this._modelInstanceCollection.update(t), n < t.commandList.length && (t.passes.render || t.passes.pick) && this._batchTable.addDerivedCommands(t, n, !1);
  }, be.prototype.isDestroyed = function () {
    return !1;
  }, be.prototype.destroy = function () {
    return this._modelInstanceCollection = this._modelInstanceCollection && this._modelInstanceCollection.destroy(), this._batchTable = this._batchTable && this._batchTable.destroy(), r(this);
  }, be;
});